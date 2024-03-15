"use client";

import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { useState } from "react";

const RadioCheckbox = ({
  name,
  values,
}: {
  name: string;
  values: {
    label: string;
    value: string;
  }[];
}) => {
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  return (
    <CheckboxGroup
      orientation="horizontal"
      color="warning"
      classNames={{
        wrapper: "gap-8",
      }}
      name={name}
      value={selectedValue}
      onChange={(val) => {
        if (!(val as string[]).length) return;
        let selectedValues = val as string[];
        setSelectedValue([selectedValues[selectedValues.length - 1]]);
      }}
    >
      {values.map((value, index) => (
        <Checkbox
          key={index}
          value={value.value}
          classNames={{
            icon: "text-white",
          }}
        >
          {value.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};

export default RadioCheckbox;
