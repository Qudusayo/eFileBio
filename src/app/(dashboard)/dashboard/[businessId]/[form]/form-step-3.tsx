import FormDate from "@/components/form-date";
import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";
import RadioCheckbox from "@/components/radio-checkbox";
import {
  foreignCountries,
  identifyingDocumentTypes,
  priorityCountries,
  sortedCountries,
  usStates,
  tribalJurisdiction,
} from "@/utils/constants";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Divider,
} from "@nextui-org/react";
import clsx from "clsx";
import { FormikErrors, FormikProps } from "formik";
import { Minus, MoveRight, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { caFormShape } from "./form-shape";
import { iFormType } from "./page";
import { caFormInterface } from "@/types";

const FormStep3 = ({ formData }: { formData: FormikProps<iFormType> }) => {
  const [section, setSection] = useState([{}]);
  const { values, setValues, setFieldValue, handleSubmit, submitForm } =
    formData;
  const { ca } = values;

  const handleAddSection = () => {
    setSection([...section, {}]);
    setFieldValue("ca", [...ca, caFormShape]);
    console.log("Add new section");
  };

  const removeSection = (index: number) => {
    if (section.length === 1) return;
    setSection(section.filter((_, i) => i !== index));
    setFieldValue(
      "ca",
      ca.filter((_, i) => i !== index),
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {section.map((_, index) => (
        <SectionForm
          key={index}
          formData={formData as FormikProps<iFormType>}
          level={index}
          total={section.length}
          removeSection={removeSection}
          handleAddSection={handleAddSection}
        />
      ))}
      <div className="mt-4 flex items-center justify-end gap-4">
        {/* <Button radius="full" onClick={handleBack}>
          Back
        </Button>
        <Button
          radius="full"
          color="warning"
          endContent={<MoveRight />}
          className="text-white"
          onClick={submitForm}
        >
          Next
        </Button> */}
      </div>
    </form>
  );
};

const SectionForm = ({
  level,
  removeSection,
  total,
  handleAddSection,
  formData,
}: {
  level: number;
  total: number;
  removeSection: (index: number) => void;
  handleAddSection: () => void;
  formData: FormikProps<iFormType>;
}) => {
  const [isUnitedStates, setIsUnitedStates] = useState(false);
  const [isPriorityCountry, setIsPriorityCountry] = useState(false);

  const {
    values,
    touched,
    errors,
    getFieldProps,
    setFieldValue,
    handleBlur,
    setFieldError,
    setFieldTouched,
  } = formData;
  const { ca: caValue } = values;
  const { ca: caTouched } = touched;
  const { ca: error } = errors;

  const caError = (error?.[level] || {}) as FormikErrors<caFormInterface>;

  useEffect(() => {
    setIsUnitedStates(caValue[level].identification.jurisdiction === "US");
    const isPriorityCty = priorityCountries.some(
      (country) => country.value === caValue[level].identification.jurisdiction,
    );
    setIsPriorityCountry(isPriorityCty);
    if (!isPriorityCty) {
      setFieldValue(`ca.${level}.state`, "");
    }
  }, [caValue[level].identification.jurisdiction]);

  return (
    <Accordion defaultExpandedKeys={["0"]} isCompact hideIndicator>
      <AccordionItem
        key={`${level}`}
        aria-label="Accordion 1"
        subtitle="Press to expand"
        title={
          <div
            className={clsx(
              "flex items-center justify-between pb-0",
              level === 0 && "pt-4",
            )}
          >
            <h2 className="font-semibold">
              Part II. Company Applicant Information
            </h2>
            <div className="flex items-center justify-center gap-6 text-[#0D0D0D99]">
              <span>
                {level + 1} of {total}
              </span>
              <div className="flex items-center justify-center gap-3">
                <span
                  className="rounded-lg bg-[#F5F5F5] p-2 text-black"
                  onClick={handleAddSection}
                >
                  <Plus />
                </span>
                <span
                  className="rounded-lg bg-[#F5F5F5] p-2 text-black"
                  onClick={() => removeSection(level)}
                >
                  <Minus />
                </span>
              </div>
            </div>
          </div>
        }
      >
        <div className="space-y-6 py-6">
          <h2 className="font-semibold">Company Applicant FinCEN ID:</h2>
          <div className="grid grid-cols-1 gap-6">
            <FormInput
              label="FinCEN ID"
              {...getFieldProps(`ca.${level}.fincenId`)}
            />
          </div>
        </div>
        <Divider className="bg-[#F5F5F5]" />
        <div className="space-y-6 py-6">
          <h2 className="font-semibold">Full legal name and date of birth:</h2>
          <div className="grid grid-cols-3 gap-6">
            <FormInput
              label="First name"
              isRequired
              {...getFieldProps(`ca.${level}.firstName`)}
              isInvalid={caTouched?.[level]?.firstName && !!caError?.firstName}
              errorMessage={caTouched?.[level]?.firstName && caError?.firstName}
            />
            <FormInput
              label="Middle name"
              {...getFieldProps(`ca.${level}.middleName`)}
            />
            <FormInput
              label="Individual's last name"
              isRequired
              {...getFieldProps(`ca.${level}.lastName`)}
              isInvalid={caTouched?.[level]?.lastName && !!caError?.lastName}
              errorMessage={caTouched?.[level]?.lastName && caError?.lastName}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FormInput label="Suffix" />
            <FormDate
              label="Date of birth"
              placeholder="01/01/2024"
              isRequired
              setFieldValue={setFieldValue}
              {...getFieldProps(`ca.${level}.dob`)}
              isInvalid={caTouched?.[level]?.dob && !!caError?.dob}
              errorMessage={caTouched?.[level]?.dob && caError?.dob}
            />
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
              name={`ca.${level}.addressType`}
              values={[
                { label: "Business address", value: "BUSINESS" },
                { label: "Residential address", value: "RESIDENTIAL" },
              ]}
              selectedValue={caValue[level].addressType}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
              isInvalid={
                caTouched?.[level]?.addressType && !!caError?.addressType
              }
              errorMessage={
                caTouched?.[level]?.addressType && caError?.addressType
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FormSelect
              listContent={sortedCountries}
              label="Country/Jurisdiction"
              isRequired
              name={`ca.${level}.country`}
              selectedKey={caValue[level].country}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
              isInvalid={caTouched?.[level]?.country && !!caError?.country}
              errorMessage={caTouched?.[level]?.country && caError?.country}
            />
            <FormInput
              label="Address (number, street, and apt. or suite no.)"
              isRequired
              {...getFieldProps(`ca.${level}.address`)}
              isInvalid={caTouched?.[level]?.address && !!caError?.address}
              errorMessage={caTouched?.[level]?.address && caError?.address}
            />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <FormInput
              label="City"
              isRequired
              {...getFieldProps(`ca.${level}.city`)}
              isInvalid={caTouched?.[level]?.city && !!caError?.city}
              errorMessage={caTouched?.[level]?.city && caError?.city}
            />
            <FormSelect
              listContent={usStates}
              label="State"
              isRequired
              name={`ca.${level}.state`}
              selectedKey={caValue[level].state}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
              isInvalid={caTouched?.[level]?.state && !!caError?.state}
              errorMessage={caTouched?.[level]?.state && caError?.state}
              isDisabled={!isPriorityCountry}
            />
            <FormInput
              label="ZIP/Foreign postal code*"
              isRequired
              {...getFieldProps(`ca.${level}.zip`)}
              isInvalid={caTouched?.[level]?.zip && !!caError?.zip}
              errorMessage={caTouched?.[level]?.zip && caError?.zip}
            />
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
              name={`ca.${level}.identification.type`}
              isRequired
              selectedKey={caValue[level].identification.type}
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
              isInvalid={
                caTouched?.[level]?.identification?.type &&
                !!caError?.identification?.type
              }
              errorMessage={
                caTouched?.[level]?.identification?.type &&
                caError?.identification?.type
              }
            />
            <FormInput
              label="Identifying document number"
              isRequired
              {...getFieldProps(`ca.${level}.identification.id`)}
              isInvalid={
                caTouched?.[level]?.identification?.id &&
                !!caError?.identification?.id
              }
              errorMessage={
                caTouched?.[level]?.identification?.id &&
                caError?.identification?.id
              }
            />
          </div>{" "}
          <h2 className="font-semibold">
            Identifying document issuing jurisdiction{" "}
            <span className="text-red-500">*</span>
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <FormSelect
              listContent={
                ["37", "38"].includes(caValue[level].identification.type)
                  ? priorityCountries
                  : caValue[level].identification.type === "39"
                    ? [{ value: "US", label: "United States of America" }]
                    : foreignCountries
              }
              label="Country/Jurisdiction"
              isRequired
              name={`ca.${level}.identification.jurisdiction`}
              selectedKey={caValue[level].identification.jurisdiction}
              setFieldValue={setFieldValue}
            />
            <FormSelect
              listContent={usStates}
              label="State"
              isRequired
              name={`ca.${level}.identification.state`}
              selectedKey={caValue[level].identification.state}
              setFieldValue={setFieldValue}
              isDisabled={
                !["37", "38"].includes(caValue[level].identification.type) ||
                !!caValue[level].identification.localTribal
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FormSelect
              listContent={tribalJurisdiction}
              label="Local/Tribal"
              isRequired
              name={`ca.${level}.identification.localTribal`}
              isDisabled={
                caValue[level].identification.type !== "38" ||
                !!caValue[level].identification.state
              }
              selectedKey={caValue[level].identification.localTribal}
              setFieldValue={setFieldValue}
            />
            <FormInput
              label="Other local/Tribal description"
              isRequired
              {...getFieldProps(`ca.${level}.identification.otherTribe`)}
              isDisabled={caValue[level].identification.localTribal !== "Other"}
            />
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
            <Button isIconOnly size="lg" className="bg-white shadow-sm">
              <Trash2 className="text-red-500" />
            </Button>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default FormStep3;
