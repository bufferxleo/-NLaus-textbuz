import { FormEvent } from "react";
import { formatMobileNumber } from "~/functions/misc/FormatMobileNumber";

export const useHandleSendOtp = (
  countryCode: string,
  mobileNumber: string,
  setOtpEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<
    React.SetStateAction<{ type: string; message: string }>
  >
) => {
  return async (e: FormEvent<HTMLFormElement>) => {
    setError({ type: "", message: "" });
    e.preventDefault();
    const formattedMobileNumber = formatMobileNumber(countryCode, mobileNumber);

    if (!/^\+\d{10,15}$/.test(formattedMobileNumber)) {
      console.log("Invalid mobile number format.");
      return;
    }
    try {
      const userExistsPayload = new FormData();
      userExistsPayload.append("phoneNumber", formattedMobileNumber);

      const userExistsResponse = await fetch(
        "http://localhost:5173/api/user-exists",
        {
          method: "POST",
          body: userExistsPayload,
        }
      );

      if (!userExistsResponse.ok) {
        throw new Error("Failed to check if user exists");
      }

      const userExistsResult = await userExistsResponse.json();
      if (userExistsResult.exists) {
        setError({ type: "user-error", message: "User already exists." });
        return;
      }

      const formData = new FormData();
      formData.append("phoneNumber", formattedMobileNumber);

      const response = await fetch("/api/send-otp", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("OTP sent successfully:", result);

      setOtpEnabled(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };
};
