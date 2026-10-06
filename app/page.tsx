"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    
    if (isLoggedIn === "true") {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  // Show nothing while redirecting
  return null;
}
