type ButtonProps = {
  children: JSX.Element | string,
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

  const definedStyle = {
    filled: 'border-none text-white',
    outlined: 'border bg-transparent',
    purple: 'bg-purple',
    red: 'bg-red-600',
    yellow: 'bg-yellow-500',
    gray: 'text-gray-500 border-gray-500'
  };

  return (
    <button
      className={`
        rounded-md px-2 md:px-4
        ${definedStyle[variant]}
        ${definedStyle[color]}
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
