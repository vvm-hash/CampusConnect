"use client"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return user;
}
