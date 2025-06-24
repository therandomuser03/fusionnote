"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    const res = await axios.post("/api/users/profile");
    console.log(res.data.data._id);
    setData(res.data.data._id);
  };

  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("Logout Success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <Button variant="destructive" onClick={logout}>
        Logout
      </Button>
      <Button variant="outline" onClick={getUserDetails}>
        Details
      </Button>
    </div>
  );
}
