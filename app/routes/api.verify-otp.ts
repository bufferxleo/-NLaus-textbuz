import { ActionFunction } from "@remix-run/node";
import { supabase } from "../functions/supabase/CreateSupabaseClient";
import { commitSession, sessionStorage } from "~/functions/session/session";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  // console.log("break--point------------------------------------------------")
  // console.log(formData);
  const phoneNumber = formData.get("phoneNumber");
  const otp = formData.get("otp");

  if (!phoneNumber || !otp) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Phone number and OTP are required.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phoneNumber as string,
      token: otp as string,
      type: "sms",
    });
    if (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const session = await sessionStorage.getSession();
    session.set("phoneNumber", phoneNumber);
    session.set("access_token", data.session?.access_token);
    // console.log("break point ----------------------------------------------");
    // console.log(session);
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        "Set-Cookie": await commitSession(session),
        "Content-Type": "application/json",
      },
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
