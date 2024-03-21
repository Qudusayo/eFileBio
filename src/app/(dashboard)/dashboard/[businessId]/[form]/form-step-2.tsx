"use client";

import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";
import {
  domesticStates,
  foreignCountries,
  foreignStates,
  priorityCountries,
  sortedCountries,
  taxIdentificationTypes,
} from "@/utils/constants";
import { tribalJurisdiction } from "@/utils/tribalJurisdiction";
import { formStep2Validation } from "@/utils/validations";
import { Button, Checkbox, CheckboxGroup, Divider } from "@nextui-org/react";
import { useFormik } from "formik";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const FormStep2 = () => {
  const [isUnitedStates, setIsUnitedStates] = useState(false);
  const [isPriorityCountry, setIsPriorityCountry] = useState(false);
  const [rcAlternateNameCount, setRcAlternateNameCount] = useState(1);

  const location = isPriorityCountry ? "domestic" : "foreign";

  const rc = useFormik({
    initialValues: {
      legalName: "",
      alternateNames: [],
      taxType: "",
      taxId: "",
      taxJurisdiction: "",
      jurisdiction: "",
      domesticState: "",
      domesticTribalJurisdiction: "",
      domesticOtherTribe: "",
      foreignFirstState: "",
      foreignTribalJurisdiction: "",
      foreignOtherTribe: "",
      country: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    },
    validationSchema: formStep2Validation,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const resetValueOnDiff = (field: keyof typeof rc.values) => {
    rc.setFieldValue(field, "");
  };

  useEffect(() => {
    if (rc.values.taxType !== "foreign") {
      resetValueOnDiff("taxJurisdiction");
      rc.setFieldError("taxJurisdiction", "");
      rc.setFieldTouched("taxJurisdiction", false);
    }
  }, [rc.values.taxType]);

  useEffect(() => {
    setIsUnitedStates(rc.values.jurisdiction === "US");
    const isProperCountry = priorityCountries.some(
      (country) => country.value === rc.values.jurisdiction,
    );
    setIsPriorityCountry(isProperCountry);

    if (isPriorityCountry) {
      rc.setFieldValue("domesticState", rc.values.jurisdiction);
    }
  }, [rc.values.jurisdiction]);

  useEffect(() => {
    [
      "domesticState",
      "domesticTribalJurisdiction",
      "domesticOtherTribe",
      "foreignFirstState",
      "foreignTribalJurisdiction",
      "foreignOtherTribe",
    ].forEach((field) => {
      resetValueOnDiff(field as keyof typeof rc.values);
      rc.setFieldTouched(field, false);
      rc.setFieldError(field, "");
    });
  }, [location, isUnitedStates]);

  useEffect(() => {
    rc.setFieldValue("foreignOtherTribe", "");
    rc.setFieldValue("domesticOtherTribe", "");
  }, [
    rc.values.domesticTribalJurisdiction,
    rc.values.foreignTribalJurisdiction,
  ]);

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
            isRequired
            {...rc.getFieldProps("legalName")}
            isInvalid={rc.touched.legalName && !!rc.errors.legalName}
            errorMessage={rc.touched.legalName && rc.errors.legalName}
          />
          {Array(rcAlternateNameCount)
            .fill("_")
            .map((_, index) => (
              <div className="flex items-start" key={index}>
                <div className="flex flex-grow items-end gap-2">
                  <FormInput
                    label="Alternate name (e.g. trade name, DBA)"
                    {...rc.getFieldProps(`alternateNames[${index}]`)}
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
            label="Tax Identification type"
            name="taxType"
            placeholder="Select an ID type"
            selectedKey={rc.values.taxType}
            setFieldValue={rc.setFieldValue}
            onBlur={rc.handleBlur}
            isInvalid={rc.touched.taxType && !!rc.errors.taxType}
            errorMessage={rc.touched.taxType && rc.errors.taxType}
            isRequired
          />
          <FormInput
            label="Tax Identification Number"
            {...rc.getFieldProps("taxId")}
            isInvalid={rc.touched.taxId && !!rc.errors.taxId}
            errorMessage={rc.touched.taxId && rc.errors.taxId}
            isRequired
          />
          <FormSelect
            listContent={foreignCountries}
            label="Country/Jurisdiction (if foreign tax ID only)"
            name="taxJurisdiction"
            placeholder="Select a country"
            selectedKey={rc.values.taxJurisdiction}
            setFieldValue={rc.setFieldValue}
            onBlur={rc.handleBlur}
            isInvalid={
              rc.touched.taxJurisdiction && !!rc.errors.taxJurisdiction
            }
            errorMessage={
              rc.touched.taxJurisdiction && rc.errors.taxJurisdiction
            }
            isDisabled={rc.values.taxType !== "foreign"}
            isRequired={rc.values.taxType === "foreign"}
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
            placeholder="Select a country"
            selectedKey={rc.values.jurisdiction}
            setFieldValue={rc.setFieldValue}
            onBlur={rc.handleBlur}
            isInvalid={rc.touched.jurisdiction && !!rc.errors.jurisdiction}
            errorMessage={rc.touched.jurisdiction && rc.errors.jurisdiction}
          />
        </div>
      </div>
      {location === "domestic" && rc.values.jurisdiction && (
        <div className="space-y-6 pb-6">
          <h2 className="font-semibold">Domestic Reporting Company:</h2>
          <div className="grid grid-cols-3 gap-6">
            <FormSelect
              name="domesticState"
              label="State of formation"
              listContent={
                isUnitedStates
                  ? domesticStates
                  : ([
                      priorityCountries.find(
                        (country) => country.value === rc.values.jurisdiction,
                      ),
                    ] as { label: string; value: string }[])
              }
              selectedKey={rc.values.domesticState}
              isDisabled={
                (!isUnitedStates && isPriorityCountry && false) ||
                (!!rc.values.domesticTribalJurisdiction && isUnitedStates)
              }
              setFieldValue={rc.setFieldValue}
              isInvalid={rc.touched.domesticState && !!rc.errors.domesticState}
              errorMessage={rc.touched.domesticState && rc.errors.domesticState}
            />
            {isUnitedStates && (
              <>
                <FormSelect
                  listContent={tribalJurisdiction}
                  label="Tribal jurisdiction of formation"
                  name="domesticTribalJurisdiction"
                  selectedKey={rc.values.domesticTribalJurisdiction}
                  setFieldValue={rc.setFieldValue}
                  onBlur={rc.handleBlur}
                  isDisabled={!!rc.values.domesticState}
                  isInvalid={
                    rc.touched.domesticTribalJurisdiction &&
                    !!rc.errors.domesticTribalJurisdiction
                  }
                  errorMessage={
                    rc.touched.domesticTribalJurisdiction &&
                    rc.errors.domesticTribalJurisdiction
                  }
                />
                <FormInput
                  label="Name of the other Tribe"
                  {...rc.getFieldProps("domesticOtherTribe")}
                  isRequired={rc.values.domesticTribalJurisdiction === "Other"}
                  isDisabled={rc.values.domesticTribalJurisdiction !== "Other"}
                  isInvalid={
                    rc.touched.domesticOtherTribe &&
                    !!rc.errors.domesticOtherTribe
                  }
                  errorMessage={
                    rc.touched.domesticOtherTribe &&
                    rc.errors.domesticOtherTribe
                  }
                />
              </>
            )}
          </div>
        </div>
      )}
      {location === "foreign" && rc.values.jurisdiction && (
        <div className="space-y-6 pb-6">
          <h2 className="font-semibold">Foreign Reporting Company:</h2>
          <div className="grid grid-cols-3 gap-6">
            <FormSelect
              listContent={foreignStates}
              label="State of first registration"
              name="foreignFirstState"
              selectedKey={rc.values.foreignFirstState}
              setFieldValue={rc.setFieldValue}
              // isRequired={}
              isDisabled={!!rc.values.foreignTribalJurisdiction}
              isInvalid={
                rc.touched.foreignFirstState && !!rc.errors.foreignFirstState
              }
              errorMessage={
                rc.touched.foreignFirstState && rc.errors.foreignFirstState
              }
            />
            <FormSelect
              listContent={tribalJurisdiction}
              label="Tribal jurisdiction of first registration"
              name="foreignTribalJurisdiction"
              selectedKey={rc.values.foreignTribalJurisdiction}
              setFieldValue={rc.setFieldValue}
              // isRequired={}
              isDisabled={!!rc.values.foreignFirstState}
              isInvalid={
                rc.touched.foreignTribalJurisdiction &&
                !!rc.errors.foreignTribalJurisdiction
              }
              errorMessage={
                rc.touched.foreignTribalJurisdiction &&
                rc.errors.foreignTribalJurisdiction
              }
            />
            <FormInput
              label="Name of the other Tribe"
              {...rc.getFieldProps("foreignOtherTribe")}
              isRequired={rc.values.foreignTribalJurisdiction === "Other"}
              isDisabled={rc.values.foreignTribalJurisdiction !== "Other"}
              isInvalid={
                rc.touched.foreignOtherTribe && !!rc.errors.foreignOtherTribe
              }
              errorMessage={
                rc.touched.foreignOtherTribe && rc.errors.foreignOtherTribe
              }
            />
          </div>
        </div>
      )}
      <Divider className="bg-[#F5F5F5]" />
      <div className="space-y-6 py-6">
        <h2 className="font-semibold">Current U.S. Address:</h2>
        <div className="grid grid-cols-2 gap-6">
          <FormSelect
            listContent={priorityCountries}
            label="U.S. or U.S. Territory"
            name="country"
            selectedKey={rc.values.country}
            setFieldValue={rc.setFieldValue}
            isRequired
            onBlur={rc.handleBlur}
            isInvalid={rc.touched.country && !!rc.errors.country}
            errorMessage={rc.touched.country && rc.errors.country}
          />
          <FormInput
            label="Address (number, street, and apt. or suite no.)"
            {...rc.getFieldProps("address")}
            isRequired
            isInvalid={rc.touched.address && !!rc.errors.address}
            errorMessage={rc.touched.address && rc.errors.address}
          />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <FormInput
            label="City"
            {...rc.getFieldProps("city")}
            isRequired
            isInvalid={rc.touched.city && !!rc.errors.city}
            errorMessage={rc.touched.city && rc.errors.city}
          />
          <FormSelect
            listContent={domesticStates}
            label="State"
            name="state"
            selectedKey={rc.values.state}
            setFieldValue={rc.setFieldValue}
            isRequired
            onBlur={rc.handleBlur}
            isInvalid={rc.touched.state && !!rc.errors.state}
            errorMessage={rc.touched.state && rc.errors.state}
          />
          <FormInput
            label="Zip Code"
            {...rc.getFieldProps("zip")}
            isRequired
            isInvalid={rc.touched.zip && !!rc.errors.zip}
            errorMessage={rc.touched.zip && rc.errors.zip}
          />
        </div>
      </div>
      <Button type="submit" onClick={() => rc.handleSubmit()}>
        Submit
      </Button>
    </div>
  );
};

export default FormStep2;
