// send-otp.ts
import { ActionFunction } from "@remix-run/node";
import { supabase } from "../functions/supabase/CreateSupabaseClient";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  // console.log(formData)
  const phoneNumber = formData.get("phoneNumber");
  console.log("ph to verify ", phoneNumber);

  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber as string,
    });

    if (error) {
      console.error("Supabase OTP Error:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("General Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
