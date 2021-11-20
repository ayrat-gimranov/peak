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
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Account', link: '/account' },
    { label: 'Sign out', link: '/signout', divider: true },
  ];

  return (
    <Dropdown button={avatarButton} items={items} />
  )
};

export default Menu;
