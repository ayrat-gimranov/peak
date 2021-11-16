import Head from 'next/head';

// components
import Header from './components/Header';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen p-4 bg-purple">
      <Head>
        <title>Peak</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header user={{ initials: 'LB' }} />
    </div>
  );
};

export default LandingPage;
