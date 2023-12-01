// pages/callback.js
import { useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Callback() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the session exists, redirect to the home page
    if (session) {
      router.push('/');
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
export async function getServerSideProps(context: any) {
  // Check if the user is authenticated on the server
  const session = await getSession(context);

  if (!session) {
    // If not authenticated, redirect to the login page
    return {
      redirect: {
        destination: '/', // Replace '/login' with your login route
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
