import React, { useState } from "react";
import { countryCodes } from "~/utilites/CountryCodes"; 

interface Country {
  code: string;
  flag: string;
  name: string;
}

interface EditableMobileNumberInputProps {
  className?: string;
  value?: string;
  placeholder?: string;
  label?: string;
  countryCode?: string;
  onCountryCodeChange?: (value: string) => void;
  onInputChange?: (value: string) => void;
  error?: { type: string; message: string };
  hidden?: boolean;
}

export const EditableMobileNumberInput: React.FC<
  EditableMobileNumberInputProps
> = ({
  className,
  value,
  placeholder,
  label,
  countryCode,
  onCountryCodeChange,
  onInputChange,
  error,
  hidden = false,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleCountryCodeClick = (code: string) => {
    onCountryCodeChange?.(code);
    setDropdownOpen(false);
  };

  if (hidden) return null;

  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-primaryColor font-semibold text-sm">
          {label}
        </label>
      )}
      <div className={`relative ${className} flex items-center border border-gray-200 rounded-lg`}>
        <div
          className="w-2/5 flex items-center cursor-pointer p-2"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex items-center">
            {countryCodes.find((country: Country) => country.code === countryCode)
              ?.flag && (
              <img
                src={
                  countryCodes.find((country: Country) => country.code === countryCode)
                    ?.flag
                }
                alt="Selected country flag"
                className="w-5 h-3 mr-2"
              />
            )}
            {countryCode}
          </div>
          {isDropdownOpen && (
            <div
              style={{
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
              className="absolute top-full left-0 w-2/6 bg-white border border-gray-200 mt-1 z-10 max-h-60 overflow-y-auto rounded-lg"
            >
              {countryCodes.map((country: Country) => (
                <div
                  key={country.code}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCountryCodeClick(country.code)}
                >
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="w-5 h-3 mr-2"
                  />
                  {country.code}
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          className="w-full p-2 rounded-lg"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onInputChange?.(e.target.value)}
        />
      </div>
      {error?.type === "user-error" && (
        <p className="text-red-500 text-xs mt-2">{error.message}</p>
      )}
    </div>
  );
};

export default EditableMobileNumberInput;
