"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";

export default function ProfileData() {
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  // AlertDialog state
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/users/profile", {
          method: "POST",
        });
        const json = await res.json();
        if (json?.data) {
          const { name, username, email } = json.data;
          setName(name || "");
          setUsername(username || "");
          setEmail(email || "");
        }
      } catch (err) {
        toast.error("Failed to load profile");
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch("/api/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          image,
        }),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.message || "Failed to update");

      toast.success("Profile updated successfully");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Update failed");
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setOpenDialog(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setOpenDialog(true);
      }}
      className="z-20 w-full max-w-3xl mx-auto space-y-10 p-6 rounded-lg shadow-sm dark:shadow-neutral-700"
    >
      <section className="space-y-6">
        <header>
          <h2 className="text-xl font-semibold text-primary">Profile</h2>
          <p className="text-sm text-muted-foreground">
            This information will be displayed publicly. Be careful what you
            share.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-primary mb-1"
            >
              Username
            </label>
            <div className="flex items-center rounded-md border border-input bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
              <span className="text-muted-foreground select-none">
                fusionnote.vercel.app/
              </span>
              <input
                type="text"
                id="username"
                className="ml-1 w-full bg-transparent border-none p-0 text-sm placeholder:text-muted-foreground focus:ring-0"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-primary mb-1"
            >
              Photo URL
            </label>
            <Input
              id="photo"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Paste image URL"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <header>
          <h2 className="text-xl font-semibold text-primary">
            Personal Information
          </h2>
          <p className="text-sm text-muted-foreground">
            Use a permanent address where you can receive mail.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-primary mb-1"
            >
              Name
            </label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-primary mb-1"
            >
              Email address
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-primary mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide" : "Show"} password
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Save Button */}
      <div className="flex justify-end gap-4 pt-6 border-t border-border">
        <Button variant="ghost" type="button">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Changes</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to update your profile?</p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
