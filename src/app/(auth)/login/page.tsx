"use client";

import { PencilLine } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useState, Suspense } from "react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleLogin = async (userData: { email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", userData);
      console.log("Login success", response.data);
      toast.success("Logged into account successfully!");
      router.push(callbackUrl);
    } catch (error: unknown) {
      console.log("Log in failed");

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || error.message || "Login failed"
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid bg-background min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <PencilLine className="size-4" />
            </div>
            FusionNote
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm onLogin={handleLogin} loading={loading} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/login.png"
          alt="Image"
          fill
          className="absolute inset-0 object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div className="text-center p-6">Loading login...</div>}>
      <LoginContent />
    </Suspense>
  );
}
