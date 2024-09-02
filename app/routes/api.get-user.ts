import { ActionFunction } from "@remix-run/node";
import { supabase } from "../functions/supabase/CreateSupabaseClient";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const phoneNumber = formData.get("phoneNumber");
  // console.log("ph to get user ", phoneNumber);

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

    if (error) {
      console.error("Error fetching user data:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    // console.log(data)
    return new Response(JSON.stringify({ success: true, data }), {
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
