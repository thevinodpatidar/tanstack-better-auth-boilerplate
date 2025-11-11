import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type TwoFactorOtpEmailProps = {
  otpCode: string;
  expiresIn: string;
};

export const TwoFactorOtpEmail = ({
  otpCode,
  expiresIn,
}: TwoFactorOtpEmailProps) => (
  <Html>
    <Head />
    <Preview>Your verification code for secure login</Preview>
    <Tailwind>
      <Body className="bg-gray-100 py-[40px] font-sans">
        <Container className="mx-auto max-w-[465px] rounded-[8px] bg-white p-[20px]">
          <Heading className="mt-[20px] mb-[16px] font-bold text-[24px] text-gray-800">
            Verification Code
          </Heading>
          <Text className="mb-[12px] text-[16px] text-gray-600 leading-[24px]">
            To complete your sign-in, please enter the following verification
            code:
          </Text>

          <Section className="mx-0 my-[24px] rounded-[8px] bg-[#f4f7fa] p-[20px] text-center">
            <Text className="m-0 font-bold text-[#333] text-[32px] tracking-[5px]">
              {otpCode}
            </Text>
          </Section>

          <Text className="m-0 text-[16px] text-gray-600 leading-[24px]">
            This code will expire in <strong>{expiresIn}</strong>. If you
            didn&apos;t request this code, you can safely ignore this email.
          </Text>

          <Text className="mb-[24px] text-[16px] text-gray-600 leading-[24px]">
            For security reasons, never share this code with anyone.
          </Text>

          <Hr className="my-[24px] border-gray-200" />

          <Text className="mb-[12px] text-[14px] text-gray-500">
            If you&apos;re having trouble with the verification code, you can
            contact our support team for assistance.
          </Text>

          <Text className="m-0 text-[12px] text-gray-400">
            © {new Date().getFullYear()} Next Better Auth Neon Boilerplate. All
            rights reserved.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
