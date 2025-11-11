import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authClient } from "../auth/auth-client";
import { authQueryOptions } from "../auth/queries";
import { $updatePassword } from "./functions";
import {
  listActiveSessionsQueryOptions,
  listPasskeysQueryOptions,
} from "./queries";

export const revokeSessionMutationOptions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["revoke-session"],
    mutationFn: async (token: string) => {
      await authClient.revokeSession({ token });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: listActiveSessionsQueryOptions().queryKey,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const revokeOtherSessionsMutationOptions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["revoke-other-sessions"],
    mutationFn: async () => {
      await authClient.revokeOtherSessions();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: listActiveSessionsQueryOptions().queryKey,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const addPasskeyMutationOptions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-passkey"],
    mutationFn: async ({ name }: { name: string }) => {
      await authClient.passkey.addPasskey({
        name,
        authenticatorAttachment: "cross-platform",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: listPasskeysQueryOptions().queryKey,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const setPasswordMutationOptions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-password"],
    mutationFn: async (password: string) =>
      $updatePassword({ data: { newPassword: password } }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryOptions().queryKey,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
