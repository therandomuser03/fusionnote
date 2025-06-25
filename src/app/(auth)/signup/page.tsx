"use client";

import { PencilLine } from "lucide-react";
import { SignupForm } from "@/components/auth/SignupForm";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (userData: {
    email: string;
    password: string;
    username: string;
  }) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", userData);
      console.log("Sign up success", response.data);
      toast.success("Account created successfully!");
      setTimeout(() => {
        toast.success("Check your email for verification");
      }, 1000);
      router.push("/login");
    } catch (error: unknown) {
      console.log("Sign up failed");
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || error.message || "Signup failed"
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
            <SignupForm onSignup={handleSignup} loading={loading} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/signup.png"
          alt="Image"
          fill
          className="absolute inset-0 object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
