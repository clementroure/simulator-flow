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
// Function to find user by email only
export async function findUserByEmail(email: string): Promise<any> {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return null;
  }

  return user;
}

// Function to verify user password
export async function verifyPassword(user: any, password: string): Promise<boolean> {
  return await bcrypt.compare(password, user.password_hash);
}


export async function createUser(email: string, password: string): Promise<any> {
  const password_hash = await bcrypt.hash(password, 10)

  console.log(email);

  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password_hash }])
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  if (data) {
    // Assuming 'id' is the name of your UUID field
    return data;
  } else {
    // Handle the case where data is null
    throw new Error("User creation failed, no data returned");
  }
}
