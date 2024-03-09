"use client";

import { RegisterInput } from "@/app/components/auth-inputs";
import { useRouteContext } from "@/app/context/RouteContext";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function RegisterModal() {
  const { previousRoute } = useRouteContext();
  const { replace, refresh, back } = useRouter();

  return (
    <>
      <Modal
        size={"md"}
        isOpen={true}
        onClose={() => {
          if (previousRoute === "/login") {
            back();
          } else {
            replace(previousRoute);
            refresh();
          }
        }}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Sign up
              <span className="font-normal text-sm text-balance">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
              </span>
            </ModalHeader>
            <ModalBody className="pb-6">
              <RegisterInput />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
