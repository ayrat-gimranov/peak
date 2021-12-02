import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

type DropdownProps = {
  button: JSX.Element,
  items: {
    label: string,
    type: string,
    link?: string,
    onClick?: () => {},
    divider?: boolean,
  }[],
};

const LinkItem = ({active, item}) => (
  <Link href={item.link}>
    <a
      className={`
        ${ active ? 'bg-violet-500 text-white' : 'text-gray-900' }
        ${ item.divider ? 'border-t border-gray-100' : '' }
        group flex rounded-md items-center w-full px-2 py-2 text-sm
      `}
    >
        {item.label}
    </a>
  </Link>
)

const ButtonItem = ({active, item}) => (
  <button
    onClick={item.onClick}
    className={`
      ${ active ? 'bg-violet-500 text-white' : 'text-gray-900' }
      ${ item.divider ? 'border-t border-gray-100' : '' }
      group flex rounded-md items-center w-full px-2 py-2 text-sm
    `}
  >
    {item.label}
  </button>
)

const Dropdown = ({ button, items }: DropdownProps ) => {
  console.log('items', items);

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            {button}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <>
                    {item.type === 'link' && <LinkItem active={active} item={item} />}
                    {item.type === 'button' && <ButtonItem active={active} item={item} />}
                  </>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Dropdown;
