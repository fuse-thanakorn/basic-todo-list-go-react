import { Select } from "@mantine/core";
function SelectComponent({ stateChanger, value }) {
  return (
    <Select
      data={[
        { value: "done", label: "✅ Done" },
        { value: "todo", label: "🗒️ Todo" },
      ]}
      value={value ? value.value : null}
      onChange={(_value) => stateChanger(_value)}
    />
  );
}
export default SelectComponent;
