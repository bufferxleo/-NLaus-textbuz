import React from "react";

interface FormInputProps {
  method?: string;
  className?: string;
  children: React.ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({
  method,
  className,
  children,
}) => {
  return (
    <form
      method={method}
      className={`w-[350px] flex flex-col gap-y-2 rounded bg-white p-6 shadow mt-2 ${className}`}
    >
      {children}
    </form>
  );
};

export default FormInput;
