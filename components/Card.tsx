type CardProps = {
  children: JSX.Element | JSX.Element[],
  className?: string,
  color?: string,
};

const Card = ({ children, className = "", color = "" }: CardProps) => {

  const topColoredBar = (
    <div className='absolute top-0 left-0 right-0 h-2 rounded-t-md' style={{ backgroundColor: color}}></div>
  );

  return (
    <div className={`p-4 bg-white rounded-md shadow-md relative ${className}`}>
      {color && topColoredBar}
      {children}
    </div>
  )
};

export default Card;
