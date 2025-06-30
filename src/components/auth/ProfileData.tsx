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
// import { CldImage } from 'next-cloudinary';
// import Image from "next/image"; // No longer strictly needed if CldImage is always used for images with URLs

export default function ProfileData() {
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // `image` stores the *persisted* Cloudinary URL from the database or after successful save.
  const [image, setImage] = useState<string | null>(null);
  // `imageFile` is for the *currently selected file* for upload.
  const [imageFile] = useState<File | null>(null);
  // `previewUrl` is for displaying either the existing `image` or the locally selected `imageFile`.
  const [, setPreviewUrl] = useState<string | null>(null);

  // AlertDialog state
  const [openDialog, setOpenDialog] = useState(false);

  // --- Fetch Profile Data ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/users/profile", {
          method: "POST",
        });
        const json = await res.json();
        if (json?.data) {
          const { name, username, email, image: fetchedImage } = json.data; // Renamed to avoid clash
          setName(name || "");
          setUsername(username || "");
          setEmail(email || "");
          setImage(fetchedImage || null); // Set the actual saved image URL
          setPreviewUrl(fetchedImage || null); // Initialize preview with saved image
        }
      } catch (err) {
        toast.error("Failed to load profile");
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  // --- Effect to create and revoke object URL for local image preview ---
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url); // Clean up URL when component unmounts or imageFile changes
    }
    // If imageFile is cleared, but there's a saved image, show that.
    // If both are null, then preview will be null.
    else if (!imageFile && image) {
      setPreviewUrl(image);
    } else if (!imageFile && !image) {
        setPreviewUrl(null);
    }
  }, [imageFile, image]); // Depend on both imageFile (local selection) and image (persisted URL)


  // --- Handle Image File Selection and Upload ---
  // const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setImageFile(file); // Store the file for local preview (via useEffect)

  //     setIsUploading(true);
      
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     try {
  //       const res = await fetch("/api/users/upload-image", { // Keep your chosen path
  //         method: "POST",
  //         body: formData,
  //       });
  //       const json = await res.json();

  //       if (!res.ok) {
  //           // If upload fails, revert to previous image or null
  //           setPreviewUrl(image);
  //           setImageFile(null); // Clear selected file
  //           throw new Error(json.message || "Failed to upload image");
  //       }

  //       setImage(json.imageUrl); // This is the KEY: Update the `image` state with the Cloudinary URL
  //       toast.success("Profile photo uploaded successfully! Click Save to apply.");
  //     } catch (err: unknown) {
  //       if (err instanceof Error) {
  //         toast.error(err.message || "Image upload failed");
  //       } else {
  //         toast.error("An unknown error occurred during upload.");
  //       }
  //     } finally {
  //       setIsUploading(false);
  //       // Clear the file input value after upload attempt to allow re-uploading the same file
  //       if (fileInputRef.current) {
  //           fileInputRef.current.value = '';
  //       }
  //     }
  //   }
  // };

  // // --- Handle Remove Image ---
  // const handleRemoveImage = () => {
  //   setImage(null); // Clear the persisted image URL
  //   setImageFile(null); // Clear any locally selected file
  //   setPreviewUrl(null); // Clear the preview
  //   toast.info("Profile photo cleared. Click Save to apply.");
  // };

  // --- Handle Save Profile Data ---
const handleSave = async () => {
  // Add this console.log *before* the fetch call
  console.log("Saving profile with image URL:", image); // <--- ADD THIS LINE

  try {
    const res = await fetch("/api/users/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        username,
        email,
        ...(password && { password }),
        image, // Send the current `image` state (which holds the Cloudinary URL or null)
      }),
    });

    const json = await res.json();

    if (!res.ok) throw new Error(json.message || "Failed to update");

    toast.success("Profile updated successfully");
    setOpenDialog(false); // Close dialog on success
    // OPTIONAL: Re-fetch profile data to ensure all UI is perfectly in sync with DB
    // const profileRes = await fetch("/api/users/profile", { method: "POST" });
    // const profileJson = await profileRes.json();
    // if (profileJson?.data) {
    //   setImage(profileJson.data.image || null);
    //   setPreviewUrl(profileJson.data.image || null);
    // }

  } catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message || "Update failed");
    } else {
      toast.error("An unknown error occurred.");
    }
  } finally {
    // Don't close dialog on error, let user see error and potentially fix.
    // If you want to close it regardless, put it here.
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
              <input
                type="text"
                id="username"
                className="ml-1 w-full bg-transparent border-none p-0 text-sm placeholder:text-muted-foreground focus:ring-0"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Photo Upload Section */}

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
                placeholder="Enter your new password"
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