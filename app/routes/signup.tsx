import React, { FormEvent, useState } from "react";
import Button from "~/ui/Button";
import EditableContentContextText from "~/ui/EditableContentContextText";
import EditableFormInput from "~/ui/EditableFormInput";
import EditableMobileNumberInput from "~/ui/EditableMobileNumberInput";
import FormInput from "~/ui/FormInput";
import Logo from "~/ui/Logo";
import NavLink from "~/ui/NavLink";
import OtpSubmissionForm from "~/ui/OtpSubmissionComponent";
import TnCandPrivacy from "~/ui/TnCandPrivacy";
import { useHandleSendOtp } from "~/functions/signup_auth/HandleSendOtp";
import { useHandleVerifyOtp } from "~/functions/signup_auth/HandleVerifyOtp";
import EditableImageInput from "~/ui/EditableImageInput";
import { LoaderFunction } from "react-router-dom";
import { commitSession, getSession } from "~/functions/session/session";
import { TiTick } from "react-icons/ti";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("phoneNumber", null);
  return new Response(null, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

const SignupForm = () => {
  const [otpEnabled, setOtpEnabled] = useState(false);

  const [mobileNumber, setMobileNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [countryCode, setCountryCode] = useState("+1");
  const [otp, setOtp] = useState("");

  const [error, setError] = useState({ type: "", message: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(true);

  const [radioChecked, setRadioChecked] = useState(false);

  const handleSendOtp = useHandleSendOtp(
    countryCode,
    mobileNumber,
    setOtpEnabled,
    setError
  );

  const handleVerifyOtp = useHandleVerifyOtp(
    mobileNumber,
    firstName,
    lastName,
    email,
    profilePicture,
    imageFile,
    countryCode,
    otp,
    setError,
    setSuccessMessage
  );

  const handleBackButtonClick = () => {
    setShowForm(true);
    setOtp("");
    setOtpEnabled(false);
    setError({ type: "", message: "" });
    setSuccessMessage("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setMobileNumber("");
    setCountryCode("+1");
  };

  const toggleTCP = () => {
    setRadioChecked(!radioChecked);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col font-primaryFont">
      <Logo className="w-[150px] h-[30px]" />
      <EditableContentContextText className="text-xl text-center font-bold mt-3 text-primaryColor">
        Create your account
      </EditableContentContextText>
      <NavLink
        to="/login"
        className="mt-2 text-xs text-center font-bold text-secondaryColor"
      >
        or click here to log in
      </NavLink>

      <FormInput className="p-2">
        <Button
          hidden={showForm}
          className="w-20 text-gray-800 bg-transparent shadow-none"
          onClick={handleBackButtonClick}
        >
          {"<- Back"}
        </Button>
        <EditableFormInput
          hidden={showForm}
          value={firstName}
          onChange={setFirstName}
          name="firstName"
          className="text-gray-600 p-1 font-semibold border-2 border-gray-200 rounded-lg"
          placeholder="John"
          label="First Name"
        />
        <EditableFormInput
          hidden={showForm}
          value={lastName}
          onChange={setLastName}
          name="lastName"
          className="text-gray-600 p-1 font-semibold border-2 border-gray-200 rounded-lg"
          placeholder="Smith"
          label="Last Name"
        />
        <EditableFormInput
          hidden={showForm}
          value={email}
          onChange={setEmail}
          name="email"
          className="text-gray-600 p-1 font-semibold border-2 border-gray-200 rounded-lg"
          placeholder="email@example.com"
          label="Email"
        />
        <EditableImageInput
          hidden={false}
          value={profilePicture}
          onChange={(value: string) => {
            setProfilePicture(value);
          }}
          setImageFile={setImageFile}
          name="profilePicture"
          label="Profile Picture"
        />
        <EditableMobileNumberInput
          hidden={!showForm}
          label="Mobile number"
          countryCode={countryCode}
          value={mobileNumber}
          placeholder="4523 861236"
          onCountryCodeChange={setCountryCode}
          onInputChange={setMobileNumber}
          className={`${
            error?.type === "user-error"
              ? "flex items-center border-red-500 border rounded-lg"
              : ""
          }`}
          error={
            error?.type === "user-error" ? error : { type: "", message: "" }
          }
        />
        <Button
          onClick={handleSendOtp}
          hidden={otpEnabled}
          disabled={otpEnabled || mobileNumber === "" || radioChecked === false}
        >
          Request OTP
        </Button>

        <OtpSubmissionForm
          hidden={!otpEnabled || !showForm}
          name="otp"
          otp={otp}
          setOtp={setOtp}
          otpEnabled={otpEnabled}
          label="Enter verification code"
          error={error}
          handleResendOtp={handleSendOtp}
        />
        <div className="w-full flex justify-end items-end align-center">
          <Button
            onClick={(e) => {
              e.preventDefault();
              setShowForm(false);
            }}
            disabled={!otpEnabled}
            hidden={!otpEnabled || !showForm}
            className="mt-[-100px] h-8 w-[100px]"
          >
            Submit
          </Button>
        </div>
        <div className="w-full flex justify-end items-end align-center">
          <Button
            onClick={handleVerifyOtp}
            disabled={!otpEnabled}
            hidden={showForm}
            className="h-8 w-full"
          >
            Submit
          </Button>
        </div>
        <input type="hidden" name="mobileNumber" value={mobileNumber} />
        <input type="hidden" name="countryCode" value={countryCode} />
        <hr />
        <div className="flex items-center gap-4 justify-center align-center">
          <div className="relative inline-block">
            <input
              type="checkbox"
              id="singleOption"
              onChange={toggleTCP}
              checked={radioChecked}
              name="singleOption"
              className="appearance-none w-10 h-10 border-2 border-gray-300 rounded-md cursor-pointer checked:bg-green-500 checked:border-green-500"
            />
            <TiTick
              onClick={toggleTCP}
              size={20}
              className="absolute top-0 left-0 right-0 bottom-0 m-auto text-white cursor-pointer"
            />
          </div>
          {showForm && <TnCandPrivacy />}
        </div>
      </FormInput>
    </div>
  );
};

export default SignupForm;
