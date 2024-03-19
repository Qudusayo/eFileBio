import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@nextui-org/react";

const FormSelect = ({
  label,
  setFieldValue,
  placeholder = "Select",
  listContent,
  ...props
}: Omit<AutocompleteProps, "children"> & {
  listContent: {
    label: string;
    value: string;
  }[];
  setFieldValue?: (field: string, value: typeof props.value) => void;
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
        onSelectionChange={(val) => {
          setFieldValue && props.name && setFieldValue(props.name, val);
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
