import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";
import RadioCheckbox from "@/components/radio-checkbox";
import { Button, Divider } from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";

const FormStep3 = () => {
  return (
    <div>
      <div className="py-6 flex items-center justify-between pb-0">
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
          <FormInput label="First name" req />
          <FormInput label="Middle name" />
          <FormInput label="Individual's last name" req />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <FormInput label="Suffix" />
          <FormInput label="Date of birth" req />
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
          <FormSelect listContent={[]} label="Country/Jurisdiction" req />
          <FormInput
            label="Address (number, street, and apt. or suite no.)"
            req
          />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <FormInput label="City" req />
          <FormInput label="State" req />
          <FormInput label="ZIP/Foreign postal code*" req />
        </div>
      </div>
      <Divider className="bg-[#F5F5F5]" />
      <div className="space-y-6 py-6">
        <h2 className="font-semibold">
          Form of identification and issuing jurisdiction:
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <FormSelect listContent={[]} label="Identifying document type" req />
          <FormInput label="Identifying document number" req />
        </div>{" "}
        <h2 className="font-semibold">
          Identifying document issuing jurisdiction{" "}
          <span className="text-red-500">*</span>
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <FormSelect listContent={[]} label="Country/Jurisdiction" req />
          <FormSelect listContent={[]} label="State" req />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <FormInput label="Local/Tribal" req />
          <FormInput label="Other local/Tribal description" req />
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
      </div>
    </div>
  );
};

export default FormStep3;
