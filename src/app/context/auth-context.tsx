"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { createContext, useContext } from "react";

interface AuthContextType {
  name: string;
  email: string;
  profileImage: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <div></div>;
  }

  if (status === "unauthenticated") {
    redirect("/");
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        name: session!.user!.name as string,
        email: session!.user!.email as string,
        profileImage: session!.user!.image as string,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
