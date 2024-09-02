import { FormEvent } from "react";
import { formatMobileNumber } from "~/functions/misc/FormatMobileNumber";
import { useNavigate } from "react-router-dom";

export const useHandleVerifyOtpForLogin = (
  countryCode: string,
  mobileNumber: string,
  otp: string,
  setError: React.Dispatch<
    React.SetStateAction<{ type: string; message: string }>
  >,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  const navigate = useNavigate();

  return async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ type: "", message: "" });
    const formattedMobileNumber = formatMobileNumber(countryCode, mobileNumber);

    if (!/^\+\d{10,15}$/.test(formattedMobileNumber)) {
      console.log("Invalid mobile number format.");
      return;
    }

    // Get user
    let getUserResult;
    try {
      const getUserPayload = new URLSearchParams({
        phoneNumber: formattedMobileNumber,
      });

      const getUserResponse = await fetch(
        "http://localhost:5173/api/get-user",
        {
          method: "POST",
          body: getUserPayload,
        }
      );
      if (!getUserResponse.ok) {
        throw new Error("Failed to get user data");
      }
      getUserResult = await getUserResponse.json();
      // console.log("User data:", getUserResult);
    } catch (err: any) {
      console.error("Error fetching user data:", err);
      setError({
        type: "user-error",
        message: "Failed to retrieve user details.",
      });
      return; // Stop the function if fetching user data fails
    }
    // console.log("User data:", getUserResult);

    // Verify OTP
    try {
      const verifyOtpPayload = new URLSearchParams({
        phoneNumber: formattedMobileNumber,
        otp: otp,
      });

      const verifyOtpResponse = await fetch(
        "http://localhost:5173/api/verify-otp",
        {
          method: "POST",
          body: verifyOtpPayload,
        }
      );

      if (!verifyOtpResponse.ok) {
        setError({ type: "otp-error", message: "OTP verification failed." });
        return;
      }

      const verifyOtpResult = await verifyOtpResponse.json();

      if (!verifyOtpResult.success) {
        setError({ type: "otp-error", message: "Incorrect OTP." });
        return;
      }

      setSuccessMessage("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      setError({ type: "general-error", message: error.message });
    }
  };
};
