import Head from 'next/head';
import Image from 'next/image';

import Button from '../components/Button';
import Link from '../components/Link';
import studying from '../public/studying_white.svg';

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
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-baseline justify-center space-y-6">
          <h2 className="text-5xl text-white">Train your memory like a champion.</h2>
          <h3 className="text-xl text-gray-200">Inspired from a technique used to hit the memory world record.</h3>
          {session ? (
            <Link href="/dashboard" color="white">
              Access Dashboard
            </Link>
          ) : (
            <Button className="py-1 text-xl" color="white" onClick={() => signIn(null, { callbackUrl: '/dashboard' })}>
              Sign up
            </Button>
          )}
        </div>
        <div className="m-20">
          <Image src={studying} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
