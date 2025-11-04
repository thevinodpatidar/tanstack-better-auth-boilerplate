import {
  apiKeyClient,
  customSessionClient,
  emailOTPClient,
  magicLinkClient,
  organizationClient,
  passkeyClient,
  twoFactorClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "@/env/client";

export const authClient = createAuthClient({
  baseURL: env.VITE_BASE_URL,
  plugins: [
    magicLinkClient(),
    twoFactorClient(),
    emailOTPClient(),
    organizationClient(),
    apiKeyClient(),
    passkeyClient(),
    customSessionClient(),
  ],
});
