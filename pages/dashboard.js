import NextLink from 'next/link';
import { useSession } from 'next-auth/react';

import Header from './components/Header';
import Card from './components/Card';
import Container from './components/Container';
import Input from './components/Input';
import Button from './components/Button';
import Link from './components/Link';
import ColoredSquare from './components/ColoredSquare';

const Dashboard = ({ forms }) => {
  const { data: session } = useSession();

  const saveFormNameInLocalStorage = () => {
    const newFormName = document.querySelector('#newFormName').value;
    localStorage.setItem('newFormName', newFormName);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Container>
        <Card>
          <p className="text-xl">Create a new form</p>
          <p className="mb-3 text-gray-500">To practice your skills</p>
          <div className="flex space-x-1">
            <Input name="newFormName" className="flex-1" label="Name" placeholder="Give your survey a name" />
            <Link onClick={saveFormNameInLocalStorage} href="/form/new">
              Create
            </Link>
          </div>
        </Card>

        <h3 className="mt-6 mb-2 text-xl">Your forms</h3>

        {forms.map((form) => (
          <NextLink href={`/form/${form.id}`}>
            <a>
              <Card key={form.id} className="flex items-center justify-between mb-4 space-x-4">
                <ColoredSquare color={form.color} />
                <div className="flex-1">
                  <p>{form.name}</p>
                  <small>{form.questions}</small>
                </div>
                <div className="flex flex-col space-y-2 md:space-x-2 md:flex-row md:space-y-0">
                  <Button color="yellow">E</Button>
                  <Button color="red">D</Button>
                </div>
              </Card>
            </a>
          </NextLink>
        ))}
      </Container>
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/forms`);
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

export default Dashboard;
