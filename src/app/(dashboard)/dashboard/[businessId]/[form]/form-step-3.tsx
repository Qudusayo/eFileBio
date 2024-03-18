import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";
import RadioCheckbox from "@/components/radio-checkbox";
import {
  identifyingDocumentTypes,
  sortedCountries,
  usStates,
} from "@/utils/constants";
import { tribalJurisdiction } from "@/utils/tribalJurisdiction";
import { Avatar, Button, Divider } from "@nextui-org/react";
import { Minus, Plus, Trash2 } from "lucide-react";

const FormStep3 = () => {
  return (
    <div>
      <div className="flex items-center justify-between py-6 pb-0">
        <h2 className="font-semibold">
          Part II. Company Applicant Information
        </h2>
        <div className="flex items-center justify-center gap-6">
          <span>1 of 1</span>
          <div className="flex items-center justify-center gap-3">
            <Button
              isIconOnly
              aria-label="Like"
              size="md"
              variant="flat"
              className="text-black"
            >
              <Plus />
            </Button>
            <Button
              isIconOnly
              aria-label="Like"
              size="md"
              variant="flat"
              className="text-black"
            >
              <Minus />
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-6 py-6">
        <h2 className="font-semibold">Company Applicant FinCEN ID:</h2>
        <div className="grid grid-cols-1 gap-6">
          <FormInput label="FinCEN ID" />
        </div>
      </div>
      <Divider className="bg-[#F5F5F5]" />
      <div className="space-y-6 py-6">
        <h2 className="font-semibold">Full legal name and date of birth:</h2>
        <div className="grid grid-cols-3 gap-6">
          <FormInput label="First name" isRequired />
          <FormInput label="Middle name" />
          <FormInput label="Individual's last name" isRequired />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <FormInput label="Suffix" />
          <FormInput label="Date of birth" isRequired />
        </div>
      </div>
      <Divider className="bg-[#F5F5F5]" />
      <div className="space-y-6 py-6">
        <h2 className="font-semibold">Current Address:</h2>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">
            Address type <span className="text-red-500">*</span>
          </h2>
          <RadioCheckbox
            name="addressType"
            values={[
              { label: "Business address", value: "BUSINESS" },
              { label: "Residential address", value: "RESIDENTIAL" },
            ]}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <FormSelect
            listContent={sortedCountries}
            label="Country/Jurisdiction"
            isRequired
          />
          <FormInput
            label="Address (number, street, and apt. or suite no.)"
            isRequired
          />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <FormInput label="City" isRequired />
          <FormSelect listContent={usStates} label="State" isRequired />
          <FormInput label="ZIP/Foreign postal code*" isRequired />
        </div>
      </div>
      <Divider className="bg-[#F5F5F5]" />
      <div className="space-y-6 py-6">
        <h2 className="font-semibold">
          Form of identification and issuing jurisdiction:
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <FormSelect
            listContent={identifyingDocumentTypes}
            label="Identifying document type"
            isRequired
          />
          <FormInput label="Identifying document number" isRequired />
        </div>{" "}
        <h2 className="font-semibold">
          Identifying document issuing jurisdiction{" "}
          <span className="text-red-500">*</span>
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <FormSelect
            listContent={sortedCountries}
            label="Country/Jurisdiction"
            isRequired
          />
          <FormSelect listContent={usStates} label="State" isRequired />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <FormSelect
            listContent={tribalJurisdiction}
            label="Local/Tribal"
            isRequired
          />
          <FormInput label="Other local/Tribal description" isRequired />
        </div>
      </div>
      <Divider className="bg-[#F5F5F5]" />
      <div className="space-y-6 py-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">
            Identifying document image <span className="text-red-500">*</span>
          </h2>
          <Button
            variant="bordered"
            color="warning"
            radius="full"
            startContent={<Plus />}
            className="text-black"
          >
            Add Attachment
          </Button>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-[#F5F5F5] bg-[#FAFAFA] p-3">
          <div className="flex w-fit gap-4">
            <Avatar
              src={"/pdf-logo.png"}
              className="mx-auto !block h-12 w-12 !rounded-md !bg-transparent text-large"
            />
            <div>
              <h2 className="text-xl font-semibold">
                New Business eFiling.pdf
              </h2>
              <p className="text-sm text-[#525252]">2.4mb</p>
            </div>
          </div>
          <Button
            isIconOnly
            size="lg"
            className="bg-white shadow-sm"
            // style={{
            //   boxShadow: "0px 0px 17px 0px #00000005",
            // }}
          >
            <Trash2 className="text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormStep3;
