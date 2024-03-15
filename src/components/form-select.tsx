import { Select, SelectItem } from "@nextui-org/react";

const FormSelect = ({
  label,
  placeholder = "Select",
  startIcon,
  req,
  listContent,
  isInvalid,
  errorMsg,
}: {
  label?: string;
  placeholder?: string;
  startIcon?: React.ReactNode;
  req?: boolean;
  listContent: { label: string; value: string }[];
  isInvalid?: boolean;
  errorMsg?: string;
}) => {
  return (
    <div>
      <Select
        label={
          <span className="text-sm text-[#404040]">
            {label}
            {req && <span className="text-red-500">*</span>}
          </span>
        }
        placeholder={placeholder}
        labelPlacement="outside"
        size="lg"
        startContent={startIcon}
        radius="sm"
        classNames={{
          value: "text-sm",
          label: "bottom-0",
        }}
        isInvalid={isInvalid}
        errorMessage={errorMsg}
      >
        {listContent.map((list) => (
          <SelectItem key={list.value} value={list.value}>
            {list.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default FormSelect;
