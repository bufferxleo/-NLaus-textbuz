import { FormEvent } from "react";
import { formatMobileNumber } from "~/functions/misc/FormatMobileNumber";
import { useNavigate } from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import { json } from "@remix-run/node";

export const useHandleVerifyOtp = (
  mobileNumber: string,
  firstName: string,
  lastName: string,
  email: string,
  profilePicture: string,
  imageFile: File | null,
  countryCode: string,
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
      setError({
        type: "phone-error",
        message: "Invalid mobile number format.",
      });
      return;
    }

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

      const identity_id=uuidv4();
      const formData = new FormData();
      formData.append("phoneNumber", formattedMobileNumber);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("profilePicture", profilePicture);
      formData.append("identity_id", identity_id);

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      // console.log(formData.get("imageFile"));
      console.log("userdata",formData);

      const insertUserResponse = await fetch(
        "http://localhost:5173/api/db-entry",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!insertUserResponse.ok) {
        throw new Error("Failed to insert user data");
      }

      setSuccessMessage("Form submitted successfully!");


      //supabase edge functions
      console.log("------------supabase edge functions----------------")
      const identityPayload = JSON.stringify({
        identityId: identity_id,
        phoneNumber: formattedMobileNumber,
        email: email,
      });
      console.log("identityPayload", identityPayload)

      try {
        const identiyInsertion = await fetch(
          'http://127.0.0.1:54321/functions/v1/insert-into-identity-table',
          {
            method: "POST",
            body: identityPayload,
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
        console.log(identiyInsertion)
        
        if (!identiyInsertion.ok) {
          throw new Error("Failed to insert identity data");
        } else {
          console.log("Identity data inserted successfully");
        }
      } catch (err:any) {
        console.error("Error inserting identity:", err);
        setError({ type: "general-error", message: err.message });
      }
      console.log("------------supabase edge functions----------------")

    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      setError({ type: "general-error", message: error.message });
    }

    navigate("/validation");

  };
};
