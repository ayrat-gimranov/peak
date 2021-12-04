import { signOut } from 'next-auth/react';
import Dropdown from './Dropdown';

type MenuProps = {
  name: String,
};

const Menu = ({ name }: MenuProps) => {
  const [firstName, lastName] = name.split(' ');
  const initials = firstName.split('')[0] + lastName.split('')[0]

  const avatarButton = (
    <div className='flex items-center justify-center w-8 h-8 bg-white rounded-full text-purple'>
      <span>
        {initials.toUpperCase()}
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
