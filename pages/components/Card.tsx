type CardProps = {
  children: JSX.Element,
  className?: string,
};

const Card = ({ children, className = "" }: CardProps) => {

  return (
    <div className={`p-4 bg-white rounded-md shadow-md ${className}`}>
      {children}
    </div>
  )
};

export default Card;
