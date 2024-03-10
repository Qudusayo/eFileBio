"use client";

import Icons from "./icons";
import clsx from "clsx";
import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthButton = ({ type }: { type: "mininal" | "large" }) => {
  const { push } = useRouter();
  const { data: session } = useSession();

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
      className={clsx("text-black", type === "large" ? "min-w-52 mx-auto" : "")}
      onClick={handleSignIn}
    >
      <Icons.Google className="w-6 h-6" />
      {type === "large" ? (
        <span>Continue with Google</span>
      ) : (
        <span>Get Started</span>
      )}
    </Button>
  );
};

export default AuthButton;
