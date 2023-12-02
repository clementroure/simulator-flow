import {
  createClient,
  PostgrestError,
  SupabaseClient,
} from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  {
    db: {
      schema: "next_auth",
    }
  }
);

export async function findUser(
  email: string,
  password: string
): Promise<any> {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  console.log(user)

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  if (!user) {
    console.error("User not found");
    return null;
  }

  // Check if the passwords match
  const match = await bcrypt.compare(password, user.password_hash);
  if (match) {
    // Remove sensitive data before returning the user object
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } else {
    console.error("Password does not match");
    return null;
  }
}
