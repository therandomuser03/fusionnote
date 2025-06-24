'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

interface VerifyEmailFormProps extends React.ComponentProps<"form"> {
  defaultToken?: string;
  onVerify: (token: string) => Promise<void>;
  loading?: boolean;
}

export function VerifyEmailForm({
  className,
  defaultToken = "",
  onVerify,
  loading = false,
  ...props
}: VerifyEmailFormProps) {
  const [token, setToken] = useState(defaultToken);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await onVerify(token);
      setVerified(true);
    } catch {
      setVerified(false);
      setError("Invalid or expired token.");
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Verify Your Email</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Enter your token to complete verification.
        </p>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="token">Verification Token</Label>
        <Input
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste token here"
          required
          disabled={loading || verified}
        />
      </div>

      <Button
        type="submit"
        disabled={loading || token.length === 0 || verified}
      >
        {loading ? "Verifying..." : verified ? "Verified" : "Verify Email"}
      </Button>

      {verified && (
        <Alert variant="default" className="border-green-500">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <AlertTitle>Email Verified</AlertTitle>
          <AlertDescription>Your email has been verified.</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <XCircle className="h-5 w-5 text-red-500" />
          <AlertTitle>Verification Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
