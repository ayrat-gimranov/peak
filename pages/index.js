import Head from 'next/head';
import Image from 'next/image';

import Button from '../components/Button';
import Link from '../components/Link';
import landingPageImage from '../public/happy_news.svg';
import demoImage_1 from '../public/demoImage_1.svg';
import demoImage_2 from '../public/demoImage_2.svg';
import demoImage_3 from '../public/demoImage_3.svg';

// next-auth
import { useSession, signIn } from 'next-auth/react';

// components
import Header from '../components/Header';

const LandingPage = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-purple">
      <div className="flex flex-col p-4">
        <Head>
          <title>Peak</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div className="grid grid-cols-2 gap-4 px-20">
          <div className="flex flex-col items-baseline justify-center space-y-8">
            <h2 className="text-5xl text-white">
              <span style={{ color: '#ffc300' }}>Remember</span> anything.
              <span className="block mt-4">
                Super <span style={{ color: '#ffc300' }}>fast</span>. 🚀
              </span>
            </h2>
            {session ? (
              <Link href="/dashboard" color="white">
                Access Dashboard
              </Link>
            ) : (
              <Button
                className="py-1 text-xl"
                color="white"
                onClick={() => signIn(null, { callbackUrl: '/dashboard' })}
              >
                Sign in
              </Button>
            )}
          </div>
          <div className="m-20">
            <Image src={landingPageImage} />
          </div>
        </div>
      </div>

      <div class="relative">
        <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div class="max-w-xl px-4 mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              <div class="mt-6">
                <h2 class="text-3xl font-bold tracking-tight text-white">Decide what you want to learn</h2>
                <p class="mt-4 text-lg text-white">
                  Start learning mathematics, chemistry, blockchain and quantum mechanics, you can create as many forms
                  as you want!
                </p>
              </div>
            </div>
            <div class="h-32 pt-6 mt-8 border-t border-gray-200"></div>
          </div>
          <div class="mt-12 sm:mt-16 lg:mt-0">
            <div class="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <Image src={demoImage_1} />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-24">
        <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div class="max-w-xl px-4 mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
            <div>
              <div class="mt-6">
                <h2 class="text-3xl font-bold tracking-tight text-white">Training hard as never been so easy</h2>
                <p class="mt-4 text-lg text-white">
                  Start answering questions and do your best! Click on the submit button to reveal the correct answer.
                </p>
              </div>
            </div>
            <div class="h-32 pt-6 mt-8 border-t border-gray-200"></div>
          </div>
          <div class="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
            <div class="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <Image src={demoImage_2} />
            </div>
          </div>
        </div>
      </div>

      <div class="relative mt-24">
        <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div class="max-w-xl px-4 mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              <div class="mt-6">
                <h2 class="text-3xl font-extrabold tracking-tight text-white">Train smart!</h2>
                <p class="mt-4 text-lg text-white">
                  When you give an incorrect answer to a question, you will return two questions backwards to train
                  again. This learning technique has proven to be very effective!
                </p>
              </div>
            </div>
            <div class="h-32 pt-6 mt-8 border-t border-gray-200"></div>
          </div>
          <div class="mt-12 sm:mt-16 lg:mt-0">
            <div class="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <Image src={demoImage_3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
