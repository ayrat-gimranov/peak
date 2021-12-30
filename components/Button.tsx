type ButtonProps = {
  children: JSX.Element | JSX.Element[] | string,
  onClick: any,
  disabled?: boolean,
  isLoading?: boolean,
  variant?: "filled" | "outlined",
  color?: "purple" | "gray" | "red" | "yellow",
  className?: string,
};

const Button = ({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  variant = "filled",
  color = "purple",
  className = ""
}: ButtonProps) => {

  const styles = {
    filled: {
      purple: 'bg-purple text-white',
      red: 'bg-red-600 text-white hover:bg-red-700',
      yellow: 'bg-yellow-500 text-white hover:bg-yellow-600',
      gray: 'text-gray-500 border-gray-500',
      white: 'text-gray-500 bg-white'
    },
    outlined: {
      purple: 'border border-purple text-purple',
      red: 'border border-red-600 text-red-600 hover:border-red-700 hover:text-red-700',
      yellow: 'border border-yellow-500 text-yellow-500 hover:border-yellow-600 hover:text-yellow-600',
      gray: 'border text-gray-500 border-gray-500',
      white: 'border text-gray-500 border-white'
    }
  }

  return (
    <button
      className={`
        rounded-md px-2 md:px-4
        ${styles[variant][color]}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
};

export default Button;
