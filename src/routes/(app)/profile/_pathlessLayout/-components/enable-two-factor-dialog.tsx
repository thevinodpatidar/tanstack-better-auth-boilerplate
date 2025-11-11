import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PasswordValidation from "./password-validation";
import VerifyTOTPQRCode from "./verify-totp-qrcode";

export default function EnableTwoFactorDialog() {
  const [state, setState] = useState<{
    step: "password" | "qr-code" | "backup-codes";
    password?: string;
    otp?: string;
    backupCodes?: string[];
    totpURI?: string;
  }>({
    step: "password",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Enable 2FA</Button>
      </DialogTrigger>
      <DialogContent>
        {state.step === "password" && (
          <PasswordValidation
            onEnable2FA={(data) => {
              setState({
                step: "qr-code",
                totpURI: data?.totpURI,
                backupCodes: data?.backupCodes,
              });
            }}
          />
        )}
        {state.step === "qr-code" && (
          <VerifyTOTPQRCode secret={state.totpURI ?? ""} />
        )}
      </DialogContent>
    </Dialog>
  );
}
