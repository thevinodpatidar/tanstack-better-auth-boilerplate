import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type ResetPasswordOtpEmailProps = {
  otp: string;
  expiresIn: string;
};

export const ResetPasswordOtpEmail = ({
  otp,
  expiresIn,
}: ResetPasswordOtpEmailProps) => (
  <Html>
    <Tailwind>
      <Head />
      <Preview>Your password reset code is: {otp}</Preview>
      <Body className="bg-[#f6f9fc] py-[40px] font-sans">
        <Container className="mx-auto my-0 max-w-[600px] rounded-[8px] bg-white p-[20px]">
          <Section className="mt-[32px]">
            <Heading className="mx-0 my-[16px] font-bold text-[#333] text-[24px]">
              Reset Your Password
            </Heading>
            <Text className="m-0 text-[#555] text-[16px] leading-[24px]">
              We received a request to reset your password. Please use the
              verification code below to complete the process:
            </Text>

            <Section className="mx-0 my-[24px] rounded-[8px] bg-[#f4f7fa] p-[20px] text-center">
              <Text className="m-0 font-bold text-[#333] text-[32px] tracking-[5px]">
                {otp}
              </Text>
            </Section>

            <Text className="m-0 text-[#555] text-[16px] leading-[24px]">
              This code will expire in {expiresIn}. If you didn&apos;t request a
              password reset, please ignore this email or contact support if you
              have concerns.
            </Text>

            <Text className="mx-0 mt-[24px] mb-0 text-[#555] text-[16px] leading-[24px]">
              For security reasons, we recommend creating a strong password
              that:
            </Text>
            <ul className="mt-[8px] mb-[16px] pl-[20px]">
              <li className="m-0 text-[#555] text-[16px] leading-[24px]">
                Is at least 8 characters long
              </li>
              <li className="m-0 text-[#555] text-[16px] leading-[24px]">
                Contains uppercase and lowercase letters
              </li>
              <li className="m-0 text-[#555] text-[16px] leading-[24px]">
                Includes numbers and special characters
              </li>
            </ul>

            <Text className="mx-0 mt-[24px] mb-0 text-[#555] text-[16px] leading-[24px]">
              Need help? Contact our support team.
            </Text>
          </Section>

          <Section className="mt-[32px] border-[#e6ebf1] border-t border-solid pt-[32px] text-[#8898aa] text-[14px]">
            <Text className="m-0">
              © {new Date().getFullYear()} Next Better Auth Neon Boilerplate.
              All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
