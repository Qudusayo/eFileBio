import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";
import RadioCheckbox from "@/components/radio-checkbox";
import { Divider, Input } from "@nextui-org/react";
import {
  BookAudio,
  BriefcaseBusiness,
  CalendarDays,
  Earth,
} from "lucide-react";

const FormStep1 = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-6 py-6">
        <FormInput
          label="Business Name"
          placeholder="Golden Gate Capital LLC"
          startContent={<BriefcaseBusiness />}
        />
        <Input
          type="email"
          label={<span className="text-sm">Business Creation Date</span>}
          placeholder="you@example.com"
          labelPlacement="outside"
          size="lg"
          startContent={<CalendarDays />}
          radius="sm"
        />
        <FormSelect
          listContent={[]}
          label="Domestic or Foreign Entity"
          placeholder="Domestic"
          startIcon={<Earth />}
        />
        <FormSelect
          listContent={[]}
          label="Entity Type"
          placeholder="Securities reporting issuer"
          startIcon={<BookAudio />}
        />
      </div>

      <div className="py-6 space-y-6 pt-0">
        <div>
          <h2 className="text-xl font-semibold">Filing Information</h2>
          <p className="text-sm">
            Excepteur sint occaecat cupidatat non proident.
          </p>
        </div>
        <Divider className="bg-[#F5F5F5]" />
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">
            Type of filing:
            <span className="text-red-500">*</span>
          </h2>
          <RadioCheckbox
            name="filingType"
            values={[
              { label: "a. Initial report", value: "INITIAL" },
              { label: "b. Correct prior report", value: "CORRECT" },
              { label: "c. Update prior report", value: "UPDATE" },
              { label: "d. Newly exempt entity", value: "NEW_EXEMPT" },
            ]}
          />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <FormInput
            name="datePrepared"
            label="Date prepared (auto filled)"
            placeholder="01/01/2024"
          />
        </div>
      </div>

      <Divider className="bg-[#F5F5F5]" />
      <div className="space-y-6 py-6">
        <h2 className="font-semibold">
          Reporting Company information associated with most recent report, if
          any:
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <FormInput label="Legal Name" req />
          <FormSelect
            listContent={[
              { label: "EIN", value: "ein" },
              { label: "SSN/ITIN", value: "ssn" },
              { label: "Foreign", value: "foreign" },
            ]}
            label="Tax Identification type"
            req
          />
          <FormInput label="Tax Identification Number" req />
          <FormInput label="Country/Jurisdiction (if foreign tax ID only)" />
        </div>
      </div>
    </div>
  );
};

export default FormStep1;
