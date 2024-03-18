"use client";

import { Avatar, Button, Progress } from "@nextui-org/react";
import { MoveRight } from "lucide-react";
import { useState } from "react";
import FormTab from "../../components/form-tab";
import FormSteps from "./form-steps";

const Form = () => {
  const [activeTab, setActiveTab] = useState(0);

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
        {activeTab === 0 && <FormSteps.FormStep1 />}
        {activeTab === 1 && <FormSteps.FormStep2 />}
        {activeTab === 2 && <FormSteps.FormStep3 />}
        {activeTab === 3 && <FormSteps.FormStep4 />}
        <div className="mt-4 flex items-center justify-end gap-4">
          <Button radius="full">Back</Button>
          <Button
            radius="full"
            color="warning"
            endContent={<MoveRight />}
            className="text-white"
            onClick={() => setActiveTab((currentIndex) => currentIndex + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
