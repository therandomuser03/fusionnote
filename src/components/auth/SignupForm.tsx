'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

interface SignupFormProps extends React.ComponentProps<"form"> {
  onSignup: (userData: { name: string; email: string; password: string; username: string }) => void;
  loading?: boolean;
}

export function SignupForm({
  className,
  onSignup,
  loading = false,
  ...props
}: SignupFormProps) {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    username: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buttonDisabled && !loading) {
      onSignup(user);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            value={user.name} 
            onChange={(e) => setUser({...user, name: e.target.value})} 
            type="text" 
            placeholder="Your Name" 
            required 
            disabled={loading}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            value={user.email} 
            onChange={(e) => setUser({...user, email: e.target.value})} 
            type="email" 
            placeholder="email@example.com" 
            required 
            disabled={loading}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input 
            id="username" 
            value={user.username} 
            onChange={(e) => setUser({...user, username: e.target.value})} 
            type="text" 
            placeholder="username" 
            required 
            disabled={loading}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input 
              id="password" 
              value={user.password} 
              onChange={(e) => setUser({...user, password: e.target.value})} 
              type={showPassword ? "text" : "password"} 
              required 
              disabled={loading}
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0" 
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
            >
              {showPassword ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
            </Button>
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={buttonDisabled || loading}>
          {loading ? "Creating account..." : buttonDisabled ? "Please fill the form" : "Sign up"}
        </Button>
        
        {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        
        <div className="flex justify-center items-center gap-2">
          <Button variant="ghost" className="w-fit" disabled={loading}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </Button>
          <Button variant="ghost" className="w-fit" disabled={loading}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12"
                fill="currentColor"
              />
            </svg>
          </Button>
        </div> */}
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  )
}