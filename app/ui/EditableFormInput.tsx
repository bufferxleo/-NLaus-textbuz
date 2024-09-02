import React from "react";

interface EditableFormInputProps {
  className?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  name?: string;
  hidden?: boolean;
}

export const EditableFormInput: React.FC<EditableFormInputProps> = ({
  className,
  value,
  onChange,
  name,
  placeholder,
  label,
  hidden = false,
}) => {
  return (
    <>
      <label
        hidden={hidden}
        className="text-primaryColor font-semibold text-sm"
      >
        {label}
      </label>
      <input
        hidden={hidden}
        style={{ color: "black" }}
        className={
          className ||
          "text-gray-600 p-2 font-semibold border-2 border-gray-200 rounded-lg"
        }
        type="text"
        value={value}
        name={name}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
      />
    </>
  );
};

export default EditableFormInput;
