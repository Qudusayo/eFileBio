"use client";

import FormDate from "@/components/form-date";
import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";
import RadioCheckbox from "@/components/radio-checkbox";
import { foreignCountries, taxIdentificationTypes } from "@/utils/constants";
import { formStep1Validation } from "@/utils/validations";
import { Button, Divider, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import {
  BookAudio,
  BriefcaseBusiness,
  CalendarDays,
  Earth,
} from "lucide-react";
import { useEffect } from "react";

const FormStep1 = () => {
  const rc = useFormik({
    initialValues: {
      filingType: "",
      legalName: "",
      taxType: "",
      taxId: "",
      taxJurisdiction: "",
      datePrepared: new Date()
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .join(" / "),
    },
    validationSchema: formStep1Validation,
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
    if (["INITIAL", "NEW_EXEMPT"].includes(rc.values.filingType)) {
      ["legalName", "taxType", "taxId", "taxJurisdiction"].forEach((field) => {
        resetValueOnDiff(field as keyof typeof rc.values);
        rc.setFieldTouched(field, false);
        rc.setFieldError(field, "");
      });
    }
    if (rc.values.filingType === "NEW_EXEMPT") {
      rc.resetForm();
      rc.setFieldValue("filingType", "NEW_EXEMPT");
    }
  }, [rc.values.filingType]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 py-6">
        <FormInput
          label="Business Name"
          placeholder="Golden Gate Capital LLC"
          startContent={<BriefcaseBusiness />}
        />
        <FormDate
          label={<span className="text-sm">Business Creation Date</span>}
          placeholder={`01/01/${new Date().getFullYear()}`}
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
            selectedValue={rc.values.filingType}
            setFieldValue={rc.setFieldValue}
            onBlur={rc.handleBlur}
            isInvalid={rc.touched.filingType && !!rc.errors.filingType}
            errorMessage={rc.touched.filingType && rc.errors.filingType}
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
      {rc.values.filingType !== "INITIAL" && rc.values.filingType && (
        <div className="space-y-6 py-6">
          <h2 className="font-semibold">
            Reporting Company information associated with most recent report, if
            any:
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <FormInput
              label="Legal Name"
              isRequired
              {...rc.getFieldProps("legalName")}
              isInvalid={rc.touched.legalName && !!rc.errors.legalName}
              errorMessage={rc.touched.legalName && rc.errors.legalName}
            />
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
      )}
    </div>
  );
};

export default FormStep1;
