type InputProps = {
  label?: string,
  placeholder?: string,
  className?: string,
  name?: string,
  type?: string,
  value?: string,
  onChange?: any,
};

const Input = ({ label, placeholder, className, name, type = "text", value, onChange }: InputProps) => {

  return (
    <div
      className={`
        relative px-3 py-2 border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600
        ${className}
      `}
    >
      {label
        && (
          <label
            className="absolute inline-block px-1 -mt-px text-xs font-medium text-gray-500 bg-white -top-2 left-2"
            htmlFor={name}
          >
            {label}
          </label>
        )
      }

      {type === 'textarea' ? (
        <textarea
          className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 focus:ring-0 sm:text-sm"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 focus:ring-0 sm:text-sm"
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  )
};

export default Input;
