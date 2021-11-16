import Link from 'next/link';
import Menu from './Menu';

type HeaderProps = {
  user?: {
    initials: string,
  }
};

const Header = ({ user }: HeaderProps) => {

  return (
    <nav className='flex items-center justify-between'>
      <Link href="/">
        <a className='text-white'>
          <h1 className='text-2xl'>Peak</h1>
          <h2 className='text-md'>Deliberate Practice</h2>
        </a>
      </Link>

      <div>
        {user ? (
          <Menu user={user} />
        ) : (
          <span>Login</span>
        )}
      </div>
    </nav>
  )
};

export default Header;
