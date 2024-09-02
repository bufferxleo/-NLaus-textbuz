import { ActionFunction } from "@remix-run/node";
import { supabase } from "../functions/supabase/CreateSupabaseClient";
// import { supabaseAdmin } from "../functions/supabase/CreateSupabaseAdmin";
import { uploadProfilePicture } from "~/functions/supabase/UploadProfilePictureSupabaseBucket";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  // console.log("--------------------------------------------------");
  // console.log(formData);
  const phoneNumber = formData.get("phoneNumber");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const profilePicture = formData.get("profilePicture");
  const identity_id = formData.get("identity_id");
  const imageFile = formData.get("imageFile") as File | null;

  let profilePictureUrl = "";

  try {
    if (imageFile) {
      console.log(imageFile);
      profilePictureUrl = (await uploadProfilePicture(imageFile)) || "";
      if (profilePictureUrl) {
        console.log(
          "Profile picture uploaded successfully:",
          profilePictureUrl
        );
      } else {
        console.error("Failed to upload profile picture");
      }
    }
  } catch (error) {
    console.error("Error uploading profile picture:", error);
  }

  if (!phoneNumber || !firstName || !lastName || !email) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Phone number, first name, last name, and email are required.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  // console.log(profilePictureUrl);


  try {
    const { data, error } = await supabase.from("TB").insert([
      {
        first_name: firstName as string,
        last_name: lastName as string,
        phone_number: phoneNumber as string,
        email: email as string,
        profile_picture: profilePicture as string,
        profile_picture_url: profilePictureUrl as string,
        identity_id: identity_id as string,
      },
    ]);

    if (error) {
      console.error("Error inserting record:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Record inserted successfully:");
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
