import {
  Body,
  Button,
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

type OrganizationInviteEmailProps = {
  organizationName: string;
  inviteLink: string;
};

const OrganizationInviteEmail = ({
  organizationName,
  inviteLink,
}: OrganizationInviteEmailProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>You&apos;ve been invited to join an organization</Preview>
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[48px]">
            <Heading className="m-0 mb-[24px] font-bold text-[24px] text-gray-800">
              You&apos;ve been invited to join an organization
            </Heading>

            <Text className="mb-[24px] text-[16px] text-gray-600 leading-[24px]">
              Hello,
            </Text>

            <Text className="mb-[24px] text-[16px] text-gray-600 leading-[24px]">
              You have been invited to join <strong>{organizationName}</strong>.
              Join the team to collaborate, share resources, and work together
              effectively.
            </Text>

            <Text className="mb-[32px] text-[16px] text-gray-600 leading-[24px]">
              Click the button below to accept the invitation and set up your
              account:
            </Text>

            <Section className="mb-[32px] text-center">
              <Button
                className="box-border rounded-[4px] bg-blue-600 px-[24px] py-[12px] text-center font-bold text-white no-underline"
                href={inviteLink}
              >
                Accept Invitation
              </Button>
            </Section>

            <Text className="mb-[24px] text-[16px] text-gray-600 leading-[24px]">
              This invitation will expire in 2 days. If you have any questions
              or need assistance, please contact our support team.
            </Text>

            <Text className="mb-[32px] text-[16px] text-gray-600 leading-[24px]">
              We&apos;re excited to have you on board!
            </Text>

            <Text className="mb-[8px] text-[16px] text-gray-600 leading-[24px]">
              Best regards,
            </Text>

            <Hr className="my-[32px] border-gray-300 border-t" />

            <Text className="m-0 text-[12px] text-gray-500 leading-[16px]">
              If you didn&apos;t request this invitation, you can safely ignore
              this email.
            </Text>

            <Text className="mt-[16px] mb-[32px] text-[12px] text-gray-500 leading-[16px]">
              This is an automated message, please do not reply to this email.
            </Text>

            <Hr className="my-[32px] border-gray-300 border-t" />

            <Text className="m-0 text-[12px] text-gray-500 leading-[16px]">
              © {currentYear} Next Better Auth Boilerplate. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default OrganizationInviteEmail;
