interface ButtonProps {
  className?: string;
  disabled?: boolean;
  hidden?: boolean;
  onClick?: (e: any) => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  disabled = false,
  onClick,
  hidden = false,
  children,
}) => {
  return (
    <button
      disabled={disabled}
      className={`h-10 w-auto rounded-md shadow justify-center items-center text-white text-sm px-2 ${
        disabled ? "bg-gray-400" : "bg-primaryColor"
      } ${className}`}
      onClick={onClick}
      hidden={hidden}
    >
      {children}
    </button>
  );
};

export default Button;