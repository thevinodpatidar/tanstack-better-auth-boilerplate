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

type ChangeEmailVerificationEmailProps = {
  url: string;
  newEmailAddress: string;
  expiresIn: string;
};

export const ChangeEmailVerificationEmail = ({
  url,
  newEmailAddress,
  expiresIn,
}: ChangeEmailVerificationEmailProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Preview>Confirm your new email address</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] py-[40px] font-sans">
          <Container className="max-w-[600px] rounded-[8px] bg-white p-[20px]">
            <Heading className="mt-0 mb-[16px] font-bold text-[#333] text-[24px]">
              Confirm your new email address
            </Heading>

            <Text className="mb-[12px] text-[#555] text-[16px] leading-[24px]">
              We received a request to change your email address to:
            </Text>

            <Text className="mb-[24px] font-bold text-[#333] text-[18px]">
              {newEmailAddress}
            </Text>

            <Text className="mb-[24px] text-[#555] text-[16px] leading-[24px]">
              To complete this process and verify this new email address, please
              click the button below.
            </Text>

            <Section className="mb-[32px] text-center">
              <Button
                className="box-border rounded-[4px] bg-[#0070f3] px-[20px] py-[12px] text-center font-medium text-white no-underline"
                href={url}
              >
                Confirm Email Change
              </Button>
            </Section>

            <Text className="mb-[24px] text-[#555] text-[16px] leading-[24px]">
              If you didn&apos;t request this change, please ignore this email
              or contact our support team immediately to secure your account.
            </Text>

            <Text className="mb-[24px] text-[#555] text-[16px] leading-[24px]">
              This link will expire in {expiresIn} for security reasons.
            </Text>

            <Hr className="my-[24px] border-[#e6ebf1] border-solid" />

            <Text className="text-[#666] text-[14px] leading-[24px]">
              If the button above doesn&apos;t work, copy and paste this URL
              into your browser:
            </Text>

            <Text className="mb-[32px] text-[#0070f3] text-[14px] leading-[24px]">
              <Link className="text-[#0070f3] no-underline" href={url}>
                {url}
              </Link>
            </Text>

            <Hr className="my-[24px] border-[#e6ebf1] border-solid" />

            <Text className="text-[#8898aa] text-[12px] leading-[20px]">
              This is an automated email. Please do not reply to this message.
            </Text>

            <Text className="m-0 text-[#8898aa] text-[12px] leading-[20px]">
              &copy; {currentYear} Next Auth Boilerplate. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
