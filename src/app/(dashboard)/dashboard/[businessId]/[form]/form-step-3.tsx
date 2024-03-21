import FormDate from "@/components/form-date";
import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";
import RadioCheckbox from "@/components/radio-checkbox";
import {
  identifyingDocumentTypes,
  sortedCountries,
  usStates,
} from "@/utils/constants";
import { tribalJurisdiction } from "@/utils/tribalJurisdiction";
import { formStep3Validation } from "@/utils/validations";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Divider,
} from "@nextui-org/react";
import clsx from "clsx";
import { FormikProps, useFormik } from "formik";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface iFormValues {
  lastName: string;
  firstName: string;
  dob: string;
  country: string;
  state: string;
  address: string;
  city: string;
  zip: string;
  identification: {
    type: string;
    id: string;
    jurisdiction: string;
    state: string;
    localTribal: string;
    otherTribe: string;
  };
}

const formShape = {
  lastName: "",
  firstName: "",
  dob: "",
  country: "",
  state: "",
  address: "",
  city: "",
  zip: "",
  identification: {
    type: "",
    id: "",
    jurisdiction: "",
    state: "",
    localTribal: "",
    otherTribe: "",
  },
};

const FormStep3 = () => {
  const [section, setSection] = useState([{}]);

  const ca = useFormik<iFormValues[]>({
    initialValues: [formShape],
    validationSchema: formStep3Validation,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const handleAddSection = () => {
    setSection([...section, {}]);
    ca.setValues([...ca.values, formShape]);
    console.log("Add new section");
  };

  const removeSection = (index: number) => {
    if (section.length === 1) return;
    setSection(section.filter((_, i) => i !== index));
    ca.setValues(ca.values.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={ca.handleSubmit}>
      {section.map((_, index) => (
        <SectionForm
          key={index}
          ca={ca as FormikProps<iFormValues[]>}
          level={index}
          total={section.length}
          removeSection={removeSection}
          handleAddSection={handleAddSection}
        />
      ))}
      <Button onClick={() => ca.handleSubmit()}>Submit</Button>
    </form>
  );
};

const SectionForm = ({
  level,
  removeSection,
  total,
  handleAddSection,
  ca,
}: {
  level: number;
  total: number;
  removeSection: (index: number) => void;
  handleAddSection: () => void;
  ca: FormikProps<iFormValues[]>;
}) => (
  <Accordion defaultExpandedKeys={["1"]} isCompact hideIndicator>
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
              <Button
                isIconOnly
                aria-label="Like"
                size="md"
                variant="flat"
                className="text-black"
                onClick={handleAddSection}
              >
                <Plus />
              </Button>
              <Button
                isIconOnly
                aria-label="Like"
                size="md"
                variant="flat"
                className="text-black"
                onClick={() => removeSection(level)}
              >
                <Minus />
              </Button>
            </div>
          </div>
        </div>
      }
    >
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
          <FormInput
            label="First name"
            isRequired
            {...ca.getFieldProps(`${level}.firstName`)}
            isInvalid={
              ca.touched[level]?.firstName && !!ca.errors[level]?.firstName
            }
            errorMessage={
              ca.touched[level]?.firstName && ca.errors[level]?.firstName
            }
          />
          <FormInput label="Middle name" />
          <FormInput
            label="Individual's last name"
            isRequired
            {...ca.getFieldProps(`${level}.lastName`)}
            isInvalid={
              ca.touched[level]?.lastName && !!ca.errors[level]?.lastName
            }
            errorMessage={
              ca.touched[level]?.lastName && ca.errors[level]?.lastName
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <FormInput label="Suffix" />
          <FormDate
            label="Date of birth"
            placeholder="01/01/2024"
            isRequired
            {...ca.getFieldProps(`${level}.dob`)}
            setFieldValue={ca.setFieldValue}
            isInvalid={ca.touched[level]?.dob && !!ca.errors[level]?.dob}
            errorMessage={ca.touched[level]?.dob && ca.errors[level]?.dob}
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
            name="addressType"
            values={[
              { label: "Business address", value: "BUSINESS" },
              { label: "Residential address", value: "RESIDENTIAL" },
            ]}
            selectedValue=""
            setFieldValue={() => {}}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <FormSelect
            listContent={sortedCountries}
            label="Country/Jurisdiction"
            isRequired
            name={`${level}.country`}
            selectedKey={ca.values[level].country}
            setFieldValue={ca.setFieldValue}
            onBlur={ca.handleBlur}
            isInvalid={
              ca.touched[level]?.country && !!ca.errors[level]?.country
            }
            errorMessage={
              ca.touched[level]?.country && ca.errors[level]?.country
            }
          />
          <FormInput
            label="Address (number, street, and apt. or suite no.)"
            isRequired
            {...ca.getFieldProps(`${level}.address`)}
            isInvalid={
              ca.touched[level]?.address && !!ca.errors[level]?.address
            }
            errorMessage={
              ca.touched[level]?.address && ca.errors[level]?.address
            }
          />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <FormInput
            label="City"
            isRequired
            {...ca.getFieldProps(`${level}.city`)}
            isInvalid={ca.touched[level]?.city && !!ca.errors[level]?.city}
            errorMessage={ca.touched[level]?.city && ca.errors[level]?.city}
          />
          <FormSelect
            listContent={usStates}
            label="State"
            isRequired
            name={`${level}.state`}
            selectedKey={ca.values[level].state}
            setFieldValue={ca.setFieldValue}
            onBlur={ca.handleBlur}
            isInvalid={ca.touched[level]?.state && !!ca.errors[level]?.state}
            errorMessage={ca.touched[level]?.state && ca.errors[level]?.state}
          />
          <FormInput
            label="ZIP/Foreign postal code*"
            isRequired
            {...ca.getFieldProps(`${level}.zip`)}
            isInvalid={ca.touched[level]?.zip && !!ca.errors[level]?.zip}
            errorMessage={ca.touched[level]?.zip && ca.errors[level]?.zip}
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
            name={`${level}.identification.type`}
            isRequired
            selectedKey={ca.values[level].identification.type}
            setFieldValue={ca.setFieldValue}
            onBlur={ca.handleBlur}
            isInvalid={
              ca.touched[level]?.identification?.type &&
              !!ca.errors[level]?.identification?.type
            }
            errorMessage={
              ca.touched[level]?.identification?.type &&
              ca.errors[level]?.identification?.type
            }
          />
          <FormInput
            label="Identifying document number"
            isRequired
            {...ca.getFieldProps(`${level}.identification.id`)}
            isInvalid={
              ca.touched[level]?.identification?.id &&
              !!ca.errors[level]?.identification?.id
            }
            errorMessage={
              ca.touched[level]?.identification?.id &&
              ca.errors[level]?.identification?.id
            }
          />
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
    </AccordionItem>
  </Accordion>
);

export default FormStep3;
