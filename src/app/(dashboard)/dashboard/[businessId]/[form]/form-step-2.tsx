"use client";

import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";
import {
  priorityCountries,
  sortedCountries,
  taxIdentificationTypes,
  usStates,
} from "@/utils/constants";
import { tribalJurisdiction } from "@/utils/tribalJurisdiction";
import { Button, Checkbox, CheckboxGroup, Divider } from "@nextui-org/react";
import { useFormik } from "formik";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const FormStep2 = () => {
  const [rcAlternateNameCount, setRcAlternateNameCount] = useState(1);

  const rc = useFormik({
    initialValues: {
      legalName: "",
      alternateNames: [],
      datePrepared: new Date()
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .join(" / "),
      taxType: "",
      taxId: "",
      taxJurisdiction: "",
      jurisdiction: "",
      country: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    },

    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

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
          <FormInput
            label="Reporting Company legal name"
            name="legalName"
            value={rc.values.legalName}
            onChange={rc.handleChange}
            isRequired
          />
          {Array(rcAlternateNameCount)
            .fill("_")
            .map((_, index) => (
              <div className="flex items-end gap-2" key={index}>
                <FormInput
                  label="Alternate name (e.g. trade name, DBA)"
                  name={`alternateNames[${index}]`}
                  value={rc.values.alternateNames[index]}
                  onChange={rc.handleChange}
                />
                <Button
                  isIconOnly
                  color={
                    index === rcAlternateNameCount - 1 ? "warning" : "danger"
                  }
                  aria-label="Like"
                  size="lg"
                  variant="flat"
                  className="text-black"
                  onClick={() =>
                    setRcAlternateNameCount((prev) => {
                      if (index === rcAlternateNameCount - 1) return prev + 1;
                      rc.setValues({
                        ...rc.values,
                        alternateNames: rc.values.alternateNames.filter(
                          (_, i) => i !== index,
                        ),
                      });
                      return prev - 1;
                    })
                  }
                >
                  {(rcAlternateNameCount > 1 &&
                    index === rcAlternateNameCount - 1) ||
                  rcAlternateNameCount === 1 ? (
                    <Plus />
                  ) : (
                    <Minus />
                  )}
                </Button>
              </div>
            ))}
        </div>
      </div>
      <Divider className="bg-[#F5F5F5]" />
      <div className="space-y-6 py-6">
        <h2 className="font-semibold">Form of identification:</h2>
        <div className="grid grid-cols-3 gap-6">
          <FormSelect
            listContent={taxIdentificationTypes}
            label="Type of identification"
            name="taxType"
            value={rc.values.taxType}
            onChange={rc.handleChange}
            isRequired
          />
          <FormInput
            label="Tax Identification Number"
            name="taxId"
            value={rc.values.taxId}
            onChange={rc.handleChange}
            isRequired
          />
          <FormInput
            label="Country/Jurisdiction (if foreign tax ID only)"
            name="taxJurisdiction"
            value={rc.values.taxJurisdiction}
            onChange={rc.handleChange}
          />
        </div>
      </div>
      <Divider className="bg-[#F5F5F5]" />
      <div className="space-y-6 py-6">
        <h2 className="font-semibold">
          Jurisdiction of formation or first registration:
        </h2>
        <div className="grid grid-cols-1 gap-6">
          <FormSelect
            listContent={sortedCountries}
            label="Country/Jurisdiction of formation"
            isRequired
            name="jurisdiction"
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
          <FormSelect
            listContent={usStates}
            label="State of first registration"
          />
          <FormSelect
            listContent={tribalJurisdiction}
            label="Tribal jurisdiction of first registration"
          />
          <FormInput label="Name of the other Tribe" />
        </div>
      </div>
      <Divider className="bg-[#F5F5F5]" />
      <div className="space-y-6 py-6">
        <h2 className="font-semibold">Current U.S. Address:</h2>
        <div className="grid grid-cols-2 gap-6">
          <FormSelect
            listContent={priorityCountries}
            label="U.S. or U.S. Territory"
            name="country"
            value={rc.values.country}
            onChange={rc.handleChange}
            isRequired
          />
          <FormInput
            label="Address (number, street, and apt. or suite no.)"
            name="address"
            value={rc.values.address}
            onChange={rc.handleChange}
            isRequired
          />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <FormInput
            label="City"
            name="city"
            value={rc.values.city}
            onChange={rc.handleChange}
            isRequired
          />
          <FormSelect
            listContent={usStates}
            label="State"
            name="state"
            value={rc.values.state}
            onChange={rc.handleChange}
            isRequired
          />
          <FormInput
            label="Zip Code"
            name="zip"
            value={rc.values.zip}
            onChange={rc.handleChange}
            isRequired
          />
        </div>
      </div>
      <Button
        onPress={() => rc.handleSubmit()}
        color="warning"
        className="text-white"
      >
        Submit
      </Button>
    </div>
  );
};

export default FormStep2;
