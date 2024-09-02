import { useState } from "react";
import Button from "~/ui/Button";
import EditableContentContextText from "~/ui/EditableContentContextText";
import EditableMobileNumberInput from "~/ui/EditableMobileNumberInput";
import FormInput from "~/ui/FormInput";
import Logo from "~/ui/Logo";
import NavLink from "~/ui/NavLink";
import OtpSubmissionForm from "~/ui/OtpSubmissionComponent";
import { LoaderFunction, useNavigate } from "react-router-dom";
import { useHandleVerifyOtpForLogin } from "~/functions/login_auth/HandleLoginVerifyOtp";
import { useHandleSendOtpForLogin } from "~/functions/login_auth/HandleLoginSendOtp";
import { commitSession, getSession } from "~/functions/session/session";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("phoneNumber", null);
  return new Response(null, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

const LoginForm = () => {
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({ type: "", message: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = useHandleSendOtpForLogin(
    countryCode,
    mobileNumber,
    setOtpEnabled,
    setError
  );
  const handleVerifyOtp = useHandleVerifyOtpForLogin(
    countryCode,
    mobileNumber,
    otp,
    setError,
    setSuccessMessage
  );

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col font-primaryFont">
      <Logo className="w-[150px] h-[30px]" />
      <EditableContentContextText className="text-2xl text-center font-bold mt-3 text-primaryColor">
        Welcome back
      </EditableContentContextText>
      <FormInput>
        <EditableMobileNumberInput
          label="Mobile number"
          countryCode={countryCode}
          value={mobileNumber}
          placeholder="4523 861236"
          onCountryCodeChange={setCountryCode}
          onInputChange={setMobileNumber}
          error={
            error?.type === "user-error" ? error : { type: "", message: "" }
          }
        />
        <Button
          onClick={handleSendOtp}
          disabled={otpEnabled || mobileNumber === ""}
          hidden={otpEnabled}
        >
          Request OTP
        </Button>
        <OtpSubmissionForm
          hidden={!otpEnabled}
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
            onClick={handleVerifyOtp}
            disabled={!otpEnabled}
            className="mt-[-100px] h-8 w-[100px]"
            hidden={!otpEnabled}
          >
            Submit
          </Button>
        </div>
        <div className="w-full flex justify-center items-center align-center gap-3">
          <EditableContentContextText className="w-[150px] text-sm text-center font-bold text-primaryColor text-nowrap">
            Donot have an account?
          </EditableContentContextText>
          <NavLink
            to="/signup"
            className=" text-sm text-center font-bold text-secondaryColor"
          >
            signup
          </NavLink>
        </div>
      </FormInput>
    </div>
  );
};

export default LoginForm;
