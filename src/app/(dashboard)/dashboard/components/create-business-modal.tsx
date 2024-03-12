"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Avatar,
} from "@nextui-org/react";
import { Add } from "iconsax-react";
import { UploadButton } from "@/utils/uploadthing";
import { useState, useRef, useEffect } from "react";
import { createBusiness } from "@/lib/actions";
import { ClientUploadedFileData } from "uploadthing/types";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  created: false,
  business: null,
  errors: {},
};

export function CreateBusinessModal() {
  const logoUrlRef = useRef<HTMLInputElement>(null);
  const [businessLogo, setBusinessLogo] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, formAction] = useFormState(createBusiness, initialState);

  useEffect(() => {
    if (state.created) {
      onOpenChange();
      setBusinessLogo("");
    }
  }, [state.created, state.business?.id]);

  const handleClientUploadComplete = (res: ClientUploadedFileData<null>[]) => {
    const logoURL = res[0].url;

    if (logoUrlRef && logoUrlRef.current) {
      setBusinessLogo(logoURL);
      logoUrlRef.current.value = logoURL;
    }
  };

  return (
    <>
      <div onClick={onOpen}>
        <div className="bg-[#f59f0b30] rounded-xl border border-dashed hover:border-solid transition-all duration-1000 border-[#F59E0B] py-8 px-5 cursor-pointer h-full">
          <Add
            size="100"
            color="#F59E0B"
            className="block mx-auto mb-4 h-24 w-24"
          />
          <div className="text-center space-y-2">
            <h2 className="font-semibold text-xl">Create a Business</h2>
            <p className="text-sm text-balance">
              Create a Business to manage eFiling with our help
            </p>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="lg"
      >
        <ModalContent>
          {(onClose) => (
            <form action={formAction}>
              <ModalHeader className="flex flex-col gap-1">
                Create a Business
              </ModalHeader>
              <ModalBody className="space-y-10">
                <span>Business Logo</span>
                <input type="hidden" name="logoUrl" ref={logoUrlRef} />
                <div className="flex items-center gap-5 !mt-0">
                  <Avatar
                    src={businessLogo}
                    className="w-20 h-20 text-large !rounded-md !bg-transparent"
                  />
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={handleClientUploadComplete}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                    className="items-center w-fit"
                  />
                </div>

                <Input
                  type="text"
                  label="Business Name"
                  placeholder="Enter business name"
                  labelPlacement="outside"
                  variant="flat"
                  size="lg"
                  radius="sm"
                  name="businessName"
                />
                <Input
                  type="text"
                  label="Business description"
                  placeholder="Enter business info"
                  labelPlacement="outside"
                  variant="flat"
                  size="lg"
                  radius="sm"
                  name="businessDescription"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Submit />
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button color="primary" type="submit" isLoading={pending}>
      Create Business
    </Button>
  );
}
