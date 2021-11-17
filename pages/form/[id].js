const Form = () => {
  return <div></div>;
};

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/forms/${}`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: data, // will be passed to the page component as props
  };
}

export default Form;
