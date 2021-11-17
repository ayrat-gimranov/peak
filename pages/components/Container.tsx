type ContainerProps = {
  children: JSX.Element,
};

const Container = ({ children }: ContainerProps ) => {

  return (
    <div className="w-full px-6 mx-auto md:w-10/12 lg:w-8/12">
      {children}
    </div>
  )
};

export default Container;
