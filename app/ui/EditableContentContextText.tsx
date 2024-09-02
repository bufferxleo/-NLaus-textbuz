import React from "react";

interface EditableContentContextTextProps {
  className?: string;
  children: React.ReactNode;
}

export const EditableContentContextText: React.FC<
  EditableContentContextTextProps
> = ({ className, children }) => {
  return (
    <p
      className={`text-center text-primaryColor text-[40px] font-bold + ${className}`}
    >
      {children}
    </p>
  );
};

export default EditableContentContextText;
