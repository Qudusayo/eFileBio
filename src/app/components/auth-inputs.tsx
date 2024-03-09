"use client";

import { Fragment, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import Link from "next/link";
import Icons from "./icons";
import { useRouter } from "next/navigation";
import { useRouteContext } from "../context/RouteContext";

export const LoginInput = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { back, push } = useRouter();
  const { previousRoute } = useRouteContext();

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Fragment>
      <div className="space-y-12 pb-3">
        <Input
          type="email"
          label="Email"
          placeholder="Enter email address"
          labelPlacement="outside"
          startContent={<Mail />}
          variant="flat"
          size="lg"
          radius="sm"
        />
        <Input
          label="Password"
          placeholder="Enter password"
          labelPlacement="outside"
          variant="flat"
          size="lg"
          startContent={<LockKeyhole />}
          type={isVisible ? "text" : "password"}
          radius="sm"
          endContent={
            isVisible ? (
              <EyeOff onClick={toggleVisibility} />
            ) : (
              <Eye onClick={toggleVisibility} />
            )
          }
        />
        <p className="text-right !mt-4">
          <span className="font-semibold underline">Forgot Password?</span>
        </p>
      </div>
      <div className="flex flex-col gap-4 text-center">
        <Button radius="sm" size="lg" color="warning" className="text-white">
          Login
        </Button>
        <Button radius="sm" size="lg" variant="flat">
          <Icons.Google className="w-6 h-6" />
          <span>Continue with Google</span>
        </Button>
        <p className="text-sm mt-2">
          New member?{" "}
          <span
            onClick={() => {
              if (previousRoute === "/sign-up") {
                back();
              } else {
                push("/sign-up");
              }
            }}
            className="font-semibold underline cursor-pointer"
          >
            Sign Up
          </span>{" "}
          first
        </p>
      </div>
    </Fragment>
  );
};

export const RegisterInput = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { back, push } = useRouter();
  const { previousRoute } = useRouteContext();

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Fragment>
      <div className="space-y-12 pb-5">
        <Input
          type="text"
          label="FullName"
          placeholder="Enter full name"
          labelPlacement="outside"
          startContent={<User />}
          variant="flat"
          size="lg"
          radius="sm"
        />
        <Input
          type="email"
          label="Email"
          placeholder="Enter email address"
          labelPlacement="outside"
          startContent={<Mail />}
          variant="flat"
          size="lg"
          radius="sm"
        />
        <Input
          label="Password"
          placeholder="Enter password"
          labelPlacement="outside"
          variant="flat"
          size="lg"
          startContent={<LockKeyhole />}
          type={isVisible ? "text" : "password"}
          radius="sm"
          endContent={
            isVisible ? (
              <EyeOff onClick={toggleVisibility} />
            ) : (
              <Eye onClick={toggleVisibility} />
            )
          }
        />
        <Input
          label="Confirm Password"
          placeholder="Enter password"
          labelPlacement="outside"
          variant="flat"
          size="lg"
          startContent={<LockKeyhole />}
          type={isVisible ? "text" : "password"}
          radius="sm"
          endContent={
            isVisible ? (
              <EyeOff onClick={toggleVisibility} />
            ) : (
              <Eye onClick={toggleVisibility} />
            )
          }
        />
      </div>
      <div className="flex flex-col gap-4 text-center">
        <Button radius="sm" size="lg" color="warning" className="text-white">
          Signup
        </Button>
        <Button radius="sm" size="lg" variant="flat">
          <Icons.Google className="w-6 h-6" />
          <span>Continue with Google</span>
        </Button>
        <p className="text-sm mt-2">
          Already a member?{" "}
          <span
            onClick={() => {
              if (previousRoute === "/login") {
                back();
              } else {
                push("/login");
              }
            }}
            className="font-semibold underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </Fragment>
  );
};
