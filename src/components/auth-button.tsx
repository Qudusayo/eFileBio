"use client";

import Icons from "./icons";
import clsx from "clsx";
import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthButton = ({ type }: { type: "mininal" | "large" }) => {
  const { push } = useRouter();
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    if (session) {
      push("/dashboard");
    } else {
      signIn("google", {
        callbackUrl: "/dashboard",
      });
    }
  };

  return (
    <Button
      radius="full"
      variant="bordered"
      color="warning"
      size={type === "mininal" ? "md" : "lg"}
      className={clsx("text-black", type === "large" ? "mx-auto min-w-52" : "")}
      onClick={handleSignIn}
      isLoading={status === "loading"}
      isDisabled={status === "loading"}
    >
      {!session && status !== "loading" && <Icons.Google className="h-6 w-6" />}
      {type === "large" ? (
        <span>{session ? "Go to Dashboard" : "Continue with Google"}</span>
      ) : (
        <span>{session ? "Dashboard" : "Get Started"}</span>
      )}
    </Button>
  );
};

export default AuthButton;
