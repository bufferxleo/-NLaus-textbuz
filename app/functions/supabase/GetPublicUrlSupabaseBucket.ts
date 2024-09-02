import { supabase } from "./CreateSupabaseClient";

export const getPublicUrlSupabaseBucket = (filePath: string) => {
  try {
    const { data } = supabase.storage.from("textbuz").getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.error("Error getting public URL:", error);
    return null;
  }
};
