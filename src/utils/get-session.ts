import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";

export const getSessionFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const { headers } = getRequest();

    return await auth.api.getSession({
      headers,
    });
  }
);
