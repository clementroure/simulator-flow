// pages/callback.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession, GetSessionParams, useSession } from "next-auth/react";

export default function Callback() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the session exists, redirect to the home page
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  // Display a loading message or spinner while waiting
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

// This function runs on every request to this page
export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  // Check if the user is authenticated on the server
  const session = await getSession(context);

  if (!session) {
    // If not authenticated, redirect to the login page
    return {
      redirect: {
        destination: "/", // Replace '/login' with your login route
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
