import { supabase } from "./CreateSupabaseClient";
import { getPublicUrlSupabaseBucket } from "./GetPublicUrlSupabaseBucket";

export async function uploadProfilePicture(file: File): Promise<string | null> {
  // console.log(file as File);
  const bucketName = "textbuz";
  const filePath = `profile_pictures/${file.name}`;
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);

    console.log(data);
    if (error) {
      console.error("Error uploading file:", error.message);
      return null;
    } else {
      console.log("File uploaded successfully");
      return getPublicUrlSupabaseBucket(filePath);
    }
  } catch (e) {
    console.error("Unexpected error:", e);
    return null;
  }
}
