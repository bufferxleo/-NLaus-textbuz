import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

interface OtpSubmissionFormProps {
  label: string;
  otpEnabled: boolean;
  otp: string;
  name: string;
  setOtp: (value: string) => void;
  error?: { type: string; message: string };
  handleResendOtp?: (e: any) => void;
  hidden?: boolean;
}

const OtpSubmissionForm: React.FC<OtpSubmissionFormProps> = ({
  label,
  otpEnabled,
  otp,
  setOtp,
  name,
  error,
  handleResendOtp,
  hidden = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isOtpResent, setIsOtpResent] = useState<boolean>(otpEnabled);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  const startTimer = () => {
    const countdown = isNaN(
      parseInt(import.meta.env.VITE_OTP_RESEND_TIMEOUT || "60", 10)
    )
      ? 60
      : parseInt(import.meta.env.VITE_OTP_RESEND_TIMEOUT || "60", 10);
    setTimeLeft(countdown);
    setIsOtpResent(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const countdownFunction = (time: number) => {
      if (time > 0) {
        setTimeLeft(time - 1);
        timerRef.current = setTimeout(() => countdownFunction(time - 1), 1000);
      } else {
        setIsOtpResent(false);
        setTimeLeft(-1);
      }
    };

    timerRef.current = setTimeout(() => countdownFunction(countdown), 1000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    if (otpEnabled) {
      startTimer();
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [otpEnabled]);

  const handleOtpChange = (value: string, index: number) => {
    const otpArray = otp.split("");
    otpArray[index] = value;
    setOtp(otpArray.join(""));
  };

  return (
    <div className="mt-6" hidden={hidden}>
      <label
        className={`font-semibold text-sm ${
          otpEnabled ? "text-primaryColor" : "text-gray-400"
        }`}
        htmlFor="otp"
      >
        <b>{label}</b>
      </label>
      <div className="w-full flex gap-x-1 mt-2">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <input
              key={index}
              disabled={!otpEnabled}
              type="text"
              maxLength={1}
              value={otp[index] || ""}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              className={`w-1/6 h-12 border ${
                error?.type === "otp-error"
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded text-center focus:outline-none focus:border-primaryColor`}
            />
          ))}
      </div>
      {error?.type === "otp-error" && (
        <p className="text-red-500 text-xs mt-2">{error.message}</p>
      )}
      <input type="hidden" name={name} value={otp} />
      <button
        onClick={(e) => {
          e.preventDefault();
          if (!isOtpResent) {
            setOtp("");
            handleResendOtp?.(e);
            setIsOtpResent(true);
            startTimer();
          }
        }}
        disabled={!otpEnabled || timeLeft >= 0}
        className={`font-semibold text-sm mt-10 ${
          !(!otpEnabled || timeLeft >= 0)
            ? "text-primaryColor"
            : "text-gray-400"
        }`}
      >
        {!isOtpResent
          ? "Click to resend code"
          : `Click to resend code (${formatTime(timeLeft)})`}
      </button>
    </div>
  );
};

export default OtpSubmissionForm;
