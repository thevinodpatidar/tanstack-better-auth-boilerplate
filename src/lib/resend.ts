import { Resend } from "resend";
import { env } from "@/env/server";

export const resend = new Resend(env.RESEND_API_KEY);