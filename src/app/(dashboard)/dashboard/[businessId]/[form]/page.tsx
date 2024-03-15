"use client";

import { useState } from "react";
import { Avatar, Button, Progress } from "@nextui-org/react";
import FormTab from "../../components/form-tab";
import FormSteps from "./form-steps";
import { MoveRight } from "lucide-react";

const Form = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col h-full">
      <FormTab activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="bg-white p-4 flex-1 rounded-b-2xl">
        <div className="space-y-4">
          <Progress
            color="warning"
            aria-label="Loading..."
            value={(activeTab + 1) * 25}
          />
          <div className="bg-[#FAFAFA] border border-[#F5F5F5] rounded-xl flex items-center justify-between p-3">
            <div className="flex gap-4 w-fit">
              <Avatar
                src={""}
                className="h-12 w-12 text-large !rounded-md !block mx-auto !bg-transparent"
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
        <div className="flex items-center justify-end gap-4 mt-4">
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
