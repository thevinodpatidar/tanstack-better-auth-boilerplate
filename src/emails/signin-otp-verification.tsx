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

type SigninOtpVerificationEmailProps = {
  verificationCode: string;
  expiresIn: string;
};

export const SigninOtpVerificationEmail = ({
  verificationCode,
  expiresIn,
}: SigninOtpVerificationEmailProps) => (
  <Html>
    <Tailwind>
      <Head />
      <Preview>Your verification code is: {verificationCode}</Preview>
      <Body className="bg-[#f6f9fc] py-[40px] font-sans">
        <Container className="mx-auto max-w-[465px] rounded-[8px] bg-white p-[20px]">
          <Section className="mt-[32px]">
            <Heading className="m-0 p-0 text-center font-bold text-[#333] text-[24px]">
              Verify Your Email Address
            </Heading>
          </Section>
          <Section className="mt-[24px]">
            <Text className="text-[#333] text-[16px] leading-[24px]">
              Hello,
            </Text>
            <Text className="text-[#333] text-[16px] leading-[24px]">
              Thank you for signing up! To complete your registration, please
              use the verification code below to confirm your email address.
            </Text>
          </Section>
          <Section className="mx-0 my-[24px] rounded-[8px] bg-[#f4f7fa] p-[20px] text-center">
            <Text className="m-0 font-bold text-[#333] text-[32px] tracking-[5px]">
              {verificationCode}
            </Text>
          </Section>
          <Section>
            <Text className="m-0 text-[#555] text-[16px] leading-[24px]">
              This code will expire in {expiresIn} for security reasons. If you
              didn&apos;t request this verification, please ignore this email.
            </Text>
          </Section>
          <Section className="mt-[32px]">
            <Text className="text-[#666] text-[14px] leading-[24px]">
              If you have any questions, please contact our support team.
            </Text>
          </Section>
          <Section className="mt-[32px] border-[#e6ebf1] border-t border-solid pt-[32px]">
            <Text className="m-0 text-[#8898aa] text-[12px] leading-[20px]">
              © {new Date().getFullYear()} Next Better Auth Boilerplate. All
              rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
