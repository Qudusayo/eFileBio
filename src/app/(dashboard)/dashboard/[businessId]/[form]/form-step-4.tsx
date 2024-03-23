import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";
import {
  identifyingDocumentTypes,
  sortedCountries,
  usStates,
} from "@/utils/constants";
import { tribalJurisdiction } from "@/utils/tribalJurisdiction";
import { Button, Checkbox, Divider } from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";

const FormStep4 = ({}: {}) => {
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
      <div className="py-6">
        <Checkbox
          defaultSelected
          color="warning"
          className="items-start"
          classNames={{
            icon: "text-white",
            wrapper: "top-1",
          }}
        >
          <h2 className="font-semibold">
            Parent/Guardian information instead of minor child
          </h2>
          <span className="text-[#404040]">
            (check if the Beneficial Owner is a minor child and the
            parent/guardian information is provided instead)
          </span>
        </Checkbox>
      </div>
      <Divider className="bg-[#F5F5F5]" />
      <div className="space-y-6 py-6">
        <h2 className="font-semibold">Beneficial Owner FinCEN ID:</h2>
        <div className="grid grid-cols-1 gap-6">
          <FormInput label="FinCEN ID" />
        </div>
      </div>
      <Divider className="bg-[#F5F5F5]" />
      <div className="flex items-center justify-between py-6">
        <h2 className="font-semibold">Exempt entity</h2>
        <Checkbox
          defaultSelected
          color="warning"
          classNames={{
            icon: "text-white",
          }}
        >
          Is this an Exempt entity
        </Checkbox>
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
        <h2 className="font-semibold">Residential address:</h2>
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
          <FormInput label="ZIP/Foreign postal code" isRequired />
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
      </div>
    </div>
  );
};

export default FormStep4;
