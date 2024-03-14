import React, { useState } from "react";

export type Option = {
  value: string;
  label: string;
};
const EditableSelect = ({ options }: { options: Option[] }) => {
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setValue(event.target.value);
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isEditing && (
        <select
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default EditableSelect;
