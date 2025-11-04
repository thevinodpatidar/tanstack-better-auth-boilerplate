import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type VerificationEmailProps = {
  verificationUrl: string;
  expiresIn: string;
};

export const VerificationEmail = ({
  verificationUrl,
  expiresIn,
}: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Verify your email address</Preview>
    <Tailwind>
      <Body className="bg-[#f6f9fc] py-[40px] font-sans">
        <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[20px]">
          <Section className="mt-[32px]">
            <Heading className="text-center font-bold text-[#333] text-[24px]">
              Verify Your Email Address
            </Heading>

            <Text className="text-[#555] text-[16px] leading-[24px]">
              Hello,
            </Text>

            <Text className="text-[#555] text-[16px] leading-[24px]">
              Thank you for signing up! To complete your registration and access
              all features, please verify your email address by clicking the
              button below:
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="box-border rounded-[8px] bg-[#0070f3] px-[20px] py-[12px] text-center font-medium text-white no-underline"
                href={verificationUrl}
              >
                Verify Email Address
              </Button>
            </Section>

            <Text className="text-[#555] text-[16px] leading-[24px]">
              If the button above doesn&apos;t work, you can also verify by
              copying and pasting the following link into your browser:
            </Text>

            <Text className="break-all text-[#0070f3] text-[14px] leading-[24px]">
              <Link
                className="text-[#0070f3] no-underline"
                href={verificationUrl}
              >
                {verificationUrl}
              </Link>
            </Text>

            <Text className="text-[#555] text-[16px] leading-[24px]">
              This verification link will expire in {expiresIn} for security
              reasons.
            </Text>

            <Text className="text-[#555] text-[16px] leading-[24px]">
              If you did not create an account, please ignore this email or
              contact our support team if you have any concerns.
            </Text>

            <Text className="text-[#555] text-[16px] leading-[24px]">
              Best regards,
            </Text>
          </Section>

          <Section className="mt-[32px] border-[#e6ebf1] border-t border-solid pt-[32px] text-[#8898aa] text-[12px]">
            <Text className="m-0">
              © {new Date().getFullYear()} Next Better Auth Boilerplate. All
              rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
