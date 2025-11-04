import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type ResetPasswordEmailProps = {
  url: string;
  expiresIn: string;
};

export const ResetPasswordEmail = ({
  url,
  expiresIn,
}: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your password</Preview>
    <Tailwind>
      <Body className="bg-[#f6f9fc] py-[40px] font-sans">
        <Container className="mx-auto my-0 max-w-[600px] rounded-[8px] bg-white p-[20px]">
          <Section className="mt-[32px]">
            <Heading className="m-0 p-0 text-center font-bold text-[#333] text-[24px]">
              Password Reset Request
            </Heading>
          </Section>
          <Section className="mt-[24px]">
            <Text className="text-[#333] text-[16px] leading-[24px]">
              Hello,
            </Text>
            <Text className="text-[#333] text-[16px] leading-[24px]">
              We received a request to reset your password. If you didn&apos;t
              make this request, you can safely ignore this email.
            </Text>
            <Text className="text-[#333] text-[16px] leading-[24px]">
              To reset your password, please click the button below:
            </Text>
          </Section>
          <Section className="mt-[32px] mb-[32px] text-center">
            <Button
              className="box-border rounded-[4px] bg-[#0366d6] px-[20px] py-[12px] text-center font-semibold text-[16px] text-white no-underline"
              href={url}
            >
              Reset Password
            </Button>
          </Section>
          <Section>
            <Text className="text-[#333] text-[16px] leading-[24px]">
              If the button doesn&apos;t work, copy and paste the following link
              into your browser:
            </Text>
            <Text className="break-all text-[#0366d6] text-[14px] leading-[24px]">
              <Link className="text-[#0366d6] no-underline" href={url}>
                {url}
              </Link>
            </Text>
            <Text className="text-[#333] text-[16px] leading-[24px]">
              This password reset link will expire in {expiresIn} for security
              reasons.
            </Text>
          </Section>
          <Section className="mt-[32px]">
            <Text className="text-[#333] text-[16px] leading-[24px]">
              If you didn&apos;t request a password reset, please contact our
              support team immediately.
            </Text>
          </Section>
          <Hr className="mx-0 my-[24px] w-full border border-[#e6ebf1] border-solid" />
          <Section>
            <Text className="text-[#666] text-[14px] leading-[24px]">
              Regards,
            </Text>
          </Section>
        </Container>
        <Container className="mx-auto my-0 max-w-[600px]">
          <Text className="m-0 text-center text-[#8898aa] text-[12px] leading-[24px]">
            © {new Date().getFullYear()} Next Better Auth Boilerplate. All
            Rights Reserved.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
