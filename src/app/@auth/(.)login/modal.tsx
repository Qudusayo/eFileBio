"use client";

import { LoginInput } from "@/app/components/auth-inputs";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { useRouter as useNavigation } from "next/navigation";
import { useRouteContext } from "@/app/context/RouteContext";

export default function LoginModal() {
  const { previousRoute } = useRouteContext();
  const { refresh, replace, back } = useNavigation();

  return (
    <>
      <Modal
        size={"md"}
        isOpen={true}
        onClose={() => {
          if (previousRoute === "/sign-up") {
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
              Login
              <span className="font-normal text-sm text-balance">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
              </span>
            </ModalHeader>
            <ModalBody className="pb-6">
              <LoginInput />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
