import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type MagicLinkEmailProps = {
  magicLink: string;
};

export const MagicLinkEmail = ({ magicLink }: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Your secure login link</Preview>
    <Tailwind>
      <Body className="bg-gray-100 py-[40px] font-sans">
        <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[20px]">
          <Section className="mt-[32px]">
            <Heading className="text-center font-bold text-[24px] text-gray-800">
              Login to Your Account
            </Heading>

            <Text className="mb-[24px] text-[16px] text-gray-600">
              Hello there,
            </Text>

            <Text className="mb-[24px] text-[16px] text-gray-600">
              We received a request to log in to your account. Click the secure
              button below to access your account instantly - no password
              needed!
            </Text>

            <Section className="mb-[32px] text-center">
              <Button
                className="box-border rounded-[4px] px-[24px] py-[12px] text-center font-bold no-underline"
                href={magicLink}
              >
                Secure Login
              </Button>
            </Section>

            <Text className="mb-[24px] text-[14px] text-gray-600">
              This link will expire in 5 minutes and can only be used once.
            </Text>

            <Text className="mb-[24px] text-[14px] text-gray-600">
              If you didn&apos;t request this login link, you can safely ignore
              this email.
            </Text>

            <Text className="text-[14px] text-gray-600">
              For security reasons, please never share this link with anyone.
            </Text>
          </Section>

          <Section className="mt-[32px] border-gray-200 border-t pt-[32px] text-center">
            <Text className="m-0 text-[12px] text-gray-500">
              © {new Date().getFullYear()} Next Better Auth Neon Boilerplate.
              All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
