import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <img
      className={className}
      src="./images/textBuzLogo.png"
      alt="logo"
    />
  );
};

export default Logo;
