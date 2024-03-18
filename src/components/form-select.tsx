import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@nextui-org/react";

const FormSelect = ({
  label,
  placeholder = "Select",
  listContent,
  ...props
}: Omit<AutocompleteProps, "children"> & {
  listContent: {
    label: string;
    value: string;
  }[];
}) => {
  return (
    <div className="relative">
      <Autocomplete
        label={<span className="text-sm text-[#404040]">{label}</span>}
        placeholder={placeholder}
        labelPlacement="outside"
        size="lg"
        radius="sm"
        inputProps={{
          classNames: {
            input: "text-sm",
          },
        }}
        {...props}
      >
        {listContent.map((list, i) => (
          <AutocompleteItem key={list.value} value={list.value}>
            {list.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};

export default FormSelect;
