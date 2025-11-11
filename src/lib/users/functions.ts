import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import z from "zod";
import { auth } from "../auth/auth";
import { authMiddleware } from "../auth/middleware";

export const $listActiveSessions = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async () => {
    const sessions = await auth.api.listSessions({
      headers: getRequest().headers,
    });
    return sessions;
  });

export const $getCurrentSession = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async () => {
    const session = await auth.api.getSession({
      headers: getRequest().headers,
    });
    return session?.session ?? null;
  });

export const $listLinkedAccounts = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async () => {
    const accounts = await auth.api.listUserAccounts({
      headers: getRequest().headers,
    });
    return accounts;
  });

export const $listPasskeys = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async () => {
    const passkeys = await auth.api.listPasskeys({
      headers: getRequest().headers,
    });
    return passkeys;
  });

export const $updatePassword = createServerFn({
  method: "POST",
})
  .middleware([authMiddleware])
  .inputValidator(z.object({ newPassword: z.string().min(8) }))
  .handler(async ({ data: { newPassword } }) => {
    await auth.api.setPassword({
      body: { newPassword },
      headers: getRequest().headers,
    });
  });
