import Head from 'next/head';
import Link from 'next/link';

// next-auth
import { useSession, signIn } from 'next-auth/react';

// components
import Header from '../components/Header';

const LandingPage = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col min-h-screen p-4 bg-purple">
      <Head>
        <title>Peak</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {session ? (
        <Link href="/dashboard">
          <a>Access Dashboard</a>
        </Link>
      ) : (
        <button onClick={signIn}>Sign up</button>
      )}
    </div>
  );
};

export default LandingPage;
