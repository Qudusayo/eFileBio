"use client";

import { Avatar, Button, Progress } from "@nextui-org/react";
import { useState } from "react";
import FormTab from "../../components/form-tab";
import FormSteps from "./form-steps";
import { FormikProps, useFormik } from "formik";
import { fiFormInterface, rcFormInterface, caFormInterface } from "@/types";
import { formValidation } from "@/utils/validations";
import { caFormShape } from "./form-shape";
import { MoveRight } from "lucide-react";

export type iFormType = {
  fi: fiFormInterface;
  rc: rcFormInterface;
  ca: caFormInterface[];
};

const Form = () => {
  const [activeTab, setActiveTab] = useState(0);

  const formData = useFormik<iFormType>({
    initialValues: {
      fi: {
        filingType: "",
        legalName: "",
        taxType: "",
        taxId: "",
        taxJurisdiction: "",
      },
      rc: {
        isForeignPooledInvestmentVehicle: false,
        isRequestingId: false,
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
      ca: [caFormShape],
    },
    // validationSchema: formValidation,
    onSubmit: (values) => {
      console.log(JSON.stringify(values.ca, null, 2));
      handleNext();
    },
  });

  const handleNext = () => {
    if (activeTab === 3) return;
    setActiveTab((currentIndex) => currentIndex + 1);
  };
  const handleBack = () => setActiveTab((currentIndex) => currentIndex - 1);

  return (
    <div className="flex h-full flex-col">
      <FormTab activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 rounded-b-2xl bg-white p-4">
        <div className="space-y-4">
          <Progress
            color="warning"
            aria-label="Loading..."
            value={(activeTab + 1) * 25}
          />
          <div className="flex items-center justify-between rounded-xl border border-[#F5F5F5] bg-[#FAFAFA] p-3">
            <div className="flex w-fit gap-4">
              <Avatar
                src={""}
                className="mx-auto !block h-12 w-12 !rounded-md !bg-transparent text-large"
              />
              <div>
                <h2 className="text-xl font-semibold">New Business eFiling</h2>
                <p className="text-sm">
                  Create a New Business to manage eFiling
                </p>
              </div>
            </div>
          </div>
        </div>
        {activeTab === 0 && (
          <FormSteps.FormStep1 formData={formData as FormikProps<iFormType>} />
        )}
        {activeTab === 1 && (
          <FormSteps.FormStep2 formData={formData as FormikProps<iFormType>} />
        )}
        {activeTab === 2 && (
          <FormSteps.FormStep3 formData={formData as FormikProps<iFormType>} />
        )}
        {activeTab === 3 && <FormSteps.FormStep4 />}
        <div className="mt-4 flex items-center justify-end gap-4">
          <Button
            radius="full"
            onClick={handleBack}
            isDisabled={activeTab === 0}
          >
            Back
          </Button>
          <Button
            radius="full"
            color="warning"
            endContent={<MoveRight />}
            className="text-white"
            onClick={formData.submitForm}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
