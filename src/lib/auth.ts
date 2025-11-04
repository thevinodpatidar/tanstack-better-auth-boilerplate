import { render } from "@react-email/components";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  apiKey,
  emailOTP,
  magicLink,
  organization,
  twoFactor,
} from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { reactStartCookies } from "better-auth/react-start";
import { db } from "@/db";
import { TwoFactorOtpEmail } from "@/emails/2fa-otp-verification";
import { ChangeEmailVerificationEmail } from "@/emails/change-email-verification";
import { VerificationEmail } from "@/emails/email-verification";
import MagicLinkEmail from "@/emails/magic-link-login";
import OrganizationInviteEmail from "@/emails/organization-invitation";
import { ResetPasswordEmail } from "@/emails/reset-password";
import { ResetPasswordOtpEmail } from "@/emails/reset-password-otp";
import { SigninOtpVerificationEmail } from "@/emails/signin-otp-verification";
import { resend } from "@/lib/resend";
import { getUserDefaultOrganizationIdFn } from "@/utils/user-default-organization-id";

const FIVE_MINUTES_IN_SECONDS = 300;

export const auth = betterAuth({
  appName: "Next Better Auth Neon Boilerplate",
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, { provider: "pg", usePlural: true }),
  trustedOrigins: [process.env.BETTER_AUTH_URL],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: FIVE_MINUTES_IN_SECONDS,
    },
  },
  user: {
    deleteUser: { enabled: true },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        await resend.emails.send({
          from: process.env.BETTER_AUTH_EMAIL_FROM ?? "",
          to: user.email, // verification email must be sent to the current user email to approve the change
          subject: "Approve email change",
          react: ChangeEmailVerificationEmail({
            url,
            newEmailAddress: newEmail,
            expiresIn: "24 hours",
          }),
          text: await render(
            ChangeEmailVerificationEmail({
              url,
              newEmailAddress: newEmail,
              expiresIn: "24 hours",
            }),
            { plainText: true }
          ),
        });
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
    sendOnSignUp: false,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: process.env.BETTER_AUTH_EMAIL_FROM,
        to: user.email,
        subject: "Reset your password",
        react: ResetPasswordEmail({ url, expiresIn: "24 hours" }),
        text: await render(ResetPasswordEmail({ url, expiresIn: "24 hours" }), {
          plainText: true,
        }),
      });
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: [
        "google",
        "email-password",
        "github",
        "facebook",
        "apple",
      ],
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 600, // 10 minutes
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: process.env.BETTER_AUTH_EMAIL_FROM,
        to: user.email,
        subject: "Verify your email address",
        react: VerificationEmail({
          verificationUrl: url,
          expiresIn: "10 minutes",
        }),
        text: await render(
          VerificationEmail({
            verificationUrl: url,
            expiresIn: "10 minutes",
          }),
          { plainText: true }
        ),
      });
    },
  },
  plugins: [
    twoFactor({
      totpOptions: {
        digits: 6,
      },
      otpOptions: {
        digits: 6,
        period: 300, // 5 minutes
        allowedAttempts: 3,
        async sendOTP({ user, otp }) {
          await resend.emails.send({
            from: process.env.BETTER_AUTH_EMAIL_FROM,
            to: user.email,
            subject: "2FA OTP for Next Better Auth Boilerplate",
            react: TwoFactorOtpEmail({
              otpCode: otp,
              expiresIn: "5 minutes",
            }),
            text: await render(
              TwoFactorOtpEmail({
                otpCode: otp,
                expiresIn: "5 minutes",
              }),
              { plainText: true }
            ),
          });
        },
      },
    }),
    organization({
      cancelPendingInvitationsOnReInvite: true,
      async sendInvitationEmail(data) {
        const inviteLink = `${process.env.BETTER_AUTH_URL}/accept-invitation/${data.id}`;
        await resend.emails.send({
          from: process.env.BETTER_AUTH_EMAIL_FROM,
          to: data.email,
          subject: "Invitation to join organization",
          react: OrganizationInviteEmail({
            organizationName: data.organization.name,
            inviteLink,
          }),
          text: await render(
            OrganizationInviteEmail({
              organizationName: data.organization.name,
              inviteLink,
            }),
            { plainText: true }
          ),
        });
      },
    }),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await resend.emails.send({
          from: process.env.BETTER_AUTH_EMAIL_FROM,
          to: email,
          subject: "Magic Link for Next Better Auth Boilerplate",
          react: MagicLinkEmail({ magicLink: url }),
          text: await render(MagicLinkEmail({ magicLink: url }), {
            plainText: true,
          }),
        });
      },
    }),
    emailOTP({
      otpLength: 6,
      expiresIn: 300, // 5 minutes
      allowedAttempts: 1,
      disableSignUp: true, // If the user is not registered, they'll be automatically registered. If you want to prevent this, set to true
      sendVerificationOnSignUp: false,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          await resend.emails.send({
            from: process.env.BETTER_AUTH_EMAIL_FROM,
            to: email,
            subject: "Sign in to Next Better Auth Boilerplate",
            react: SigninOtpVerificationEmail({
              verificationCode: otp,
              expiresIn: "5 minutes",
            }),
            text: await render(
              SigninOtpVerificationEmail({
                verificationCode: otp,
                expiresIn: "5 minutes",
              }),
              { plainText: true }
            ),
          });
        } else if (type === "forget-password") {
          await resend.emails.send({
            from: process.env.BETTER_AUTH_EMAIL_FROM,
            to: email,
            subject: "Reset your password",
            react: ResetPasswordOtpEmail({
              otp,
              expiresIn: "5 minutes",
            }),
            text: await render(
              ResetPasswordOtpEmail({
                otp,
                expiresIn: "5 minutes",
              }),
              { plainText: true }
            ),
          });
        }
      },
    }),
    apiKey(),
    passkey({
      rpID: "localhost",
      rpName: "Next Better Auth TanStack Boilerplate",
      origin: process.env.BETTER_AUTH_URL,
    }),
    reactStartCookies(),
  ],
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const organizationId = await getUserDefaultOrganizationIdFn({
            data: { userId: session.userId },
          });
          return {
            data: {
              ...session,
              activeOrganizationId: organizationId,
            },
          };
        },
      },
    },
  },
});
