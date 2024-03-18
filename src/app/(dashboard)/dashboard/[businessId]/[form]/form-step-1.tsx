"use client";

import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";
import RadioCheckbox from "@/components/radio-checkbox";
import { foreignCountries, taxIdentificationTypes } from "@/utils/constants";
import { Divider, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import {
  BookAudio,
  BriefcaseBusiness,
  CalendarDays,
  Earth,
} from "lucide-react";

const FormStep1 = () => {
  const rc = useFormik({
    initialValues: {
      legalName: "",
      alternateNames: "",
      datePrepared: new Date()
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .join(" / "),
    },

    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

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
          startContent={<Earth />}
        />
        <FormSelect
          listContent={[]}
          label="Entity Type"
          placeholder="Securities reporting issuer"
          startContent={<BookAudio />}
        />
      </div>

      <div className="space-y-6 py-6 pt-0">
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
            value={rc.values.datePrepared}
            disabled
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
          <FormInput label="Legal Name" isRequired />
          <FormSelect
            listContent={taxIdentificationTypes}
            label="Tax Identification type"
            isRequired
          />
          <FormInput label="Tax Identification Number" isRequired />
          <FormSelect
            listContent={foreignCountries}
            label="Country/Jurisdiction (if foreign tax ID only)"
          />
        </div>
      </div>
    </div>
  );
};

export default FormStep1;
