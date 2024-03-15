import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";
import { Button, Checkbox, CheckboxGroup, Divider } from "@nextui-org/react";
import { Plus } from "lucide-react";

const FormStep2 = () => {
  return (
    <div>
      <div className="flex items-center justify-between py-6">
        <h2>Part I. Reporting Company Information</h2>
        <CheckboxGroup
          defaultValue={["buenos-aires", "london"]}
          orientation="horizontal"
          color="warning"
          classNames={{
            wrapper: "gap-8",
          }}
        >
          <Checkbox
            value="buenos-aires"
            classNames={{
              icon: "text-white",
            }}
          >
            Request to receive FinCEN Identifier (FinCEN ID)
          </Checkbox>
          <Checkbox
            value="sydney"
            classNames={{
              icon: "text-white",
            }}
          >
            Foreign pooled investment vehicle
          </Checkbox>
        </CheckboxGroup>
      </div>
      <Divider className="bg-[#F5F5F5]" />
      <div className="space-y-6 py-6">
        <h2 className="font-semibold">Full legal name and alternate name(s)</h2>
        <div className="grid grid-cols-2 gap-6">
          <FormInput label="Reporting Company legal name" req />
          <div className="flex items-end gap-2">
            <FormInput label="Alternate name (e.g. trade name, DBA)" />
            <Button
              isIconOnly
              color="warning"
              aria-label="Like"
              size="lg"
              variant="flat"
              className="text-black"
            >
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      <Divider className="bg-[#F5F5F5]" />
      <div className="space-y-6 py-6">
        <h2 className="font-semibold">Form of identification:</h2>
        <div className="grid grid-cols-3 gap-6">
          <FormSelect
            listContent={[
              { label: "Securities reporting issuer", value: "sri" },
            ]}
            label="Type of identification"
            req
          />
          <FormInput label="Tax Identification Number" req />
          <FormInput label="Country/Jurisdiction (if foreign tax ID only)" />
        </div>
      </div>
      <Divider className="bg-[#F5F5F5]" />
      <div className="space-y-6 py-6">
        <h2 className="font-semibold">
          Jurisdiction of formation or first registration:
        </h2>
        <div className="grid grid-cols-1 gap-6">
          <FormSelect
            listContent={[]}
            label="Country/Jurisdiction of formation"
            req
          />
        </div>
      </div>
      <div className="space-y-6">
        <h2 className="font-semibold">Domestic Reporting Company:</h2>
        <div className="grid grid-cols-3 gap-6">
          <FormSelect listContent={[]} label="State of formation" />
          <FormInput label="Tribal jurisdiction of formation" />
          <FormInput label="Name of the other Tribe" />
        </div>
      </div>
      <div className="space-y-6 py-6">
        <h2 className="font-semibold">Foreign Reporting Company:</h2>
        <div className="grid grid-cols-3 gap-6">
          <FormSelect listContent={[]} label="State of first registration" />
          <FormInput label="Tribal jurisdiction of first registration" />
          <FormInput label="Name of the other Tribe" />
        </div>
      </div>
      <Divider className="bg-[#F5F5F5]" />
      <div className="space-y-6 py-6">
        <h2 className="font-semibold">Current U.S. Address:</h2>
        <div className="grid grid-cols-2 gap-6">
          <FormSelect listContent={[]} label="U.S. or U.S. Territory" req />
          <FormInput
            label="Address (number, street, and apt. or suite no.)"
            req
          />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <FormInput label="City" req />
          <FormSelect listContent={[]} label="State" req />
          <FormInput label="Zip Code" req />
        </div>
      </div>
    </div>
  );
};

export default FormStep2;
