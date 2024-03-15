import { Input, InputProps } from "@nextui-org/react";

const FormInput = ({
  req,
  label,
  type = "text",
  placeholder = "Type here",
  ...props
}: InputProps & {
  req?: boolean;
}) => {
  return (
    <div className="flex-1">
      <Input
        type={type}
        label={
          <span className="text-sm text-[#404040]">
            {label}
            {req && <span className="text-red-500">*</span>}
          </span>
        }
        placeholder={placeholder}
        labelPlacement="outside"
        size="lg"
        radius="sm"
        classNames={{
          input: "text-sm",
        }}
        {...props}
      />
    </div>
  );
};

export default FormInput;
