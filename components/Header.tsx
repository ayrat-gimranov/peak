import Link from 'next/link';
import Menu from './Menu';

import { useSession, signIn } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();
  const style = { "boxShadow": '0 40px 0 0 #8b7fb6' };

  return (
    <nav style={style} className='flex items-center justify-between p-4 bg-purple'>
      <Link href="/dashboard">
        <a className='text-white'>
          <h1 className='text-4xl'>Peak</h1>
          <h2 className='text-md'>Deliberate Practice</h2>
        </a>
      </Link>

      <div>
        {session ? (
          <Menu name={session.user.name} />
        ) : (
          <button onClick={() => signIn(null, { callbackUrl: '/dashboard' })} className='text-white'>Sign in</button>
        )}
      </div>
    </nav>
  )
};

export default Header;
