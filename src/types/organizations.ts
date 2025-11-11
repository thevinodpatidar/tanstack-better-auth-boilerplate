import type { Organization } from "better-auth/plugins";
import type { authClient } from "@/lib/auth/auth-client";

export type MemberInfer = typeof authClient.$Infer.Member;

export type InvitationInfer = typeof authClient.$Infer.Invitation;

export type OrganizationRelations = Organization & {
  members: MemberInfer[];
  invitations: InvitationInfer[];
};

export type InvitationWithOrganization = InvitationInfer & {
  organizationName: string;
  organizationSlug: string;
};

export type OrganizationMemberRole = "member" | "admin" | "owner";
export type ProviderType = "github" | "google" | "facebook" | "apple";
