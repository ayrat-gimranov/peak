import NextLink from 'next/link';

type LinkProps = {
  href: string,
  children: JSX.Element | JSX.Element[] | string,
  className?: string,
  variant?: "filled" | "outlined",
  color?: "purple" | "gray" | "red" | "yellow",
  onClick?: () => void,
};

const Link = ({
  href, children, className = '', color = 'purple', variant = 'filled', onClick,
}: LinkProps) => {

  const styles = {
    filled: {
      purple: 'bg-purple text-white hover:bg-purple-dark',
      red: 'bg-red-600 text-white',
      yellow: 'bg-yellow-500 text-white hover:bg-yellow-600',
      gray: 'text-gray-500 border-gray-500',
      white: 'bg-white text-gray-500',
    },
    outlined: {
      purple: 'border border-purple text-purple hover:border-purple-dark',
      red: 'border border-red-600 text-red-600',
      yellow: 'border border-yellow-500 text-yellow-500 hover:border-yellow-600 hover:text-yellow-600',
      gray: 'border text-gray-500 border-gray-500',
      white: 'border border-white text-gray-500',
    }
  }

  return (
    <NextLink href={href}>
      <a
        onClick={onClick}
        className={`
          ${className}
          ${styles[variant][color]}
          px-2 py-1 text-center rounded-md
        `}
      >{children}</a>
    </NextLink>
  )
};

export default Link;
