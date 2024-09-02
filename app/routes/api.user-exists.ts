import { ActionFunction } from "@remix-run/node";
import { supabase } from "../functions/supabase/CreateSupabaseClient";
// import { syncSupabaseToLocal } from "~/functions/sync-supabase-to-local";

export const action: ActionFunction = async ({ request }) => {
  // try {
  //   syncSupabaseToLocal();
  // } catch (error) {
  //   console.log(error);
  // }

  const formData = await request.formData();
  const phoneNumber = formData.get("phoneNumber");
  // console.log("ph to verify if user exists ", phoneNumber);

  if (!phoneNumber) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Phone number is required.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const { data, error } = await supabase
      .from("TB")
      .select()
      .eq("phone_number", phoneNumber as string)
      .single();

    // console.log("data ", data);
    if (error) {
      if (error.code === "PGRST116") {
        // User does not exist
        return new Response(JSON.stringify({ success: true, exists: false }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      console.error("Error checking user existence:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ success: true, exists: data }), {
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
