import { signOut } from 'next-auth/react';
import Dropdown from './Dropdown';

type MenuProps = {
  user: {},
};

const Menu = ({ user }: MenuProps) => {

  const avatarButton = (
    <div className='flex items-center justify-center w-8 h-8 bg-white rounded-full text-purple'>
      <span>
        {/* {user.initials} */}
        JD
      </span>
    </div>
  );

  const items = [
    { label: 'Dashboard', type: 'link', link: '/dashboard' },
    { label: 'Account', type: 'link', link: '/account' },
    { label: 'Sign out', type: 'button', onClick: signOut, divider: true },
  ];

  return (
    <Dropdown button={avatarButton} items={items} />
  )
};

export default Menu;
