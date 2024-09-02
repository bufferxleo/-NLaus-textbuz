import React, { useState } from "react";

interface EditableImageInputProps {
  className?: string;
  value?: string;
  onChange: (value: string) => void;
  setImageFile?: (file: File | null) => void; 
  placeholder?: string;
  label?: string;
  name?: string;
  hidden?: boolean;
}

export const EditableImageInput: React.FC<EditableImageInputProps> = ({
  className,
  value,
  onChange,
  setImageFile,
  name,
  placeholder,
  label,
  hidden = false,
}) => {
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target?.result as string);
        setIsImageSelected(true);
      };
      reader.readAsDataURL(file);
      if (setImageFile) {
        setImageFile(file);
      }
    }
  };

  return (
    <>
      <label hidden={hidden} className="text-primaryColor font-semibold text-sm">
        {label}
      </label>
      <div hidden={hidden} className={`flex items-center justify-center gap-2 ${className}`}>
        {isImageSelected && (
          <img
            src={value}
            alt="Selected image"
            className="w-16 h-16 rounded-md"
          />
        )}
        <input
          name={name}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="fileInput"
        />
      </div>
    </>
  );
};

export default EditableImageInput;
