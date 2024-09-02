export const getUser = async (phoneNumber: string) => {
  const response = await fetch("http://localhost:5173/api/get-user", {
    method: "POST",
    body: new URLSearchParams({
      phoneNumber: phoneNumber,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const data = await response.json();
  // console.log(data);
  return data;
};
