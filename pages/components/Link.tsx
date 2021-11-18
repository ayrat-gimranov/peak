import NextLink from 'next/link';

type LinkProps = {
  href: string,
  children: JSX.Element | JSX.Element[] | string,
  className?: string,
  variant?: "filled" | "outlined",
  color?: "purple" | "gray" | "red" | "yellow",
};

const Link = ({ href, children, className = '', color = 'purple', variant = 'filled' }: LinkProps) => {

  const definedStyle = {
    filled: 'text-white',
    outlined: 'border bg-transparent',
    purple: 'bg-purple',
    red: 'bg-red-600',
    yellow: 'bg-yellow-500',
    gray: 'text-gray-500 border-gray-500'
  };

  return (
    <NextLink href={href}>
      <a
        className={`
          ${className}
          ${definedStyle[variant]}
          ${definedStyle[color]}
          px-2 py-1 text-center rounded-md flex items-center
        `}
      >{children}</a>
    </NextLink>
  )
};

export default Link;
