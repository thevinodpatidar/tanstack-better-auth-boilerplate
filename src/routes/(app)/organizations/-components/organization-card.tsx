"use client";

import { Link } from "@tanstack/react-router";
import type { Organization } from "better-auth/plugins/organization";
import { ArrowRightIcon, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrganizationAvatar } from "@/components/ui/organization-avatar";

export function OrganizationCard({
  organization,
  memberCount,
}: {
  organization: Organization;
  memberCount: number;
}) {
  return (
    <Link
      className="group transition-all duration-200"
      key={organization.id}
      params={{ id: organization.id }}
      to={"/organizations/$id/dashboard"}
    >
      <Card className="h-full overflow-hidden border border-border/50 transition-all duration-200 group-hover:border-primary/20 group-hover:shadow-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <OrganizationAvatar
              border
              orgId={organization.id}
              orgName={organization.name}
              shape="square"
              size="lg"
            />
            <div className="min-w-0 flex-1">
              <CardTitle className="text-xl transition-colors group-hover:text-primary">
                {organization.name}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Badge className="flex items-center gap-1" variant="outline">
              <UsersRound size={12} />
              <span>{memberCount} members</span>
            </Badge>
            <span className="flex items-center text-muted-foreground text-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              View dashboard
              <ArrowRightIcon
                className="ml-1 transition-transform group-hover:translate-x-1"
                size={14}
              />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
