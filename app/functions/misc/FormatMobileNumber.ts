export const formatMobileNumber = (countryCode: string, mobileNumber: string): string => {
  return `${countryCode}${mobileNumber.replace(/\D/g, "")}`;
};