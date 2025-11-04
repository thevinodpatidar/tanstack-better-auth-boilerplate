type AppConfig = {
  authRoutes: {
    default: string;
    signin: string;
    signup: string;
    signinWithOtp: string;
    verifyOtp: string;
    onboarding: string;
    resetPassword: string;
    magicLink: string;
    chooseProvider: string;
    forgotPassword: string;
    verify2fa: string;
  };
  appRoutes: {
    acceptInvitation: string;
    userProfile: string;
  };
};

export const appConfig: AppConfig = {
  authRoutes: {
    default: "/organizations",
    signin: "/signin",
    signup: "/signup",
    signinWithOtp: "/signin-otp",
    verifyOtp: "/verify-otp",
    onboarding: "/onboarding",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    magicLink: "/magic-link",
    chooseProvider: "/choose-provider",
    verify2fa: "/verify-2fa",
  },
  appRoutes: {
    acceptInvitation: "/accept-invitation",
    userProfile: "/profile",
  },
};

export const MIN_PASSWORD_LENGTH = 8;
export const OTP_LENGTH = 6;

export const HTTP_STATUS_CODES = {
  FORBIDDEN: 403,
};
