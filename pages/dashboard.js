import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import prisma from '../prismaInstance';

import Header from '../components/Header';
import Card from '../components/Card';
import Container from '../components/Container';
import Input from '../components/Input';
import Button from '../components/Button';
import Link from '../components/Link';
import ColoredSquare from '../components/ColoredSquare';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({ initialForms }) => {
  const { data: session, status } = useSession();
  const [forms, setForms] = useState(initialForms);
  const router = useRouter();

  useEffect(() => {
    if (!session && status !== 'loading') router.push('/');
  }, [session, status]);

  const saveFormNameInLocalStorage = () => {
    const newFormName = document.querySelector('#newFormName').value;
    localStorage.setItem('newFormName', newFormName);
  };

  const handleDeleteForm = (e, formId) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanentelely delete this form and all its questions.',
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it.',
      cancelButtonText: "No, don't do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('/api/forms/delete', {
          method: 'DELETE',
          body: JSON.stringify({ formId }),
        }).then((res) => {
          if (res.ok) {
            const copyForms = [...forms];
            const index = copyForms.findIndex((form) => form.id === formId);
            copyForms.splice(index, 1);
            setForms(copyForms);
            Swal.fire('Deleted!', '', 'success');
          } else {
            Swal.fire('Oups!', 'Something went wrong. Reload and try again.', 'error');
          }
        });
      }
    });
  };

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Container>
        <Card>
          <p className="text-xl">Create a new form</p>
          <p className="mb-3 text-gray-500">To practice your skills</p>
          <div className="flex space-x-1">
            <Input name="newFormName" className="flex-1" label="Name" placeholder="Give your survey a name" />
            <Link onClick={saveFormNameInLocalStorage} href="/forms/new" className="flex items-center">
              Create
            </Link>
          </div>
        </Card>

        <h3 className="mt-6 mb-2 text-xl">Your forms</h3>

        {forms.map((form) => (
          <NextLink href={`/forms/${form.id}`} key={form.id}>
            <a>
              <Card className="flex items-center justify-between mb-4 space-x-4">
                <ColoredSquare color={form.color} />
                <div className="flex-1">
                  <p>{form.name}</p>
                  <small>{form.questions}</small>
                </div>
                <div className="flex flex-col space-y-2 md:space-x-2 md:flex-row md:space-y-0">
                  <Link color="yellow" href={`/forms/edit/${form.id}`}>
                    <FontAwesomeIcon icon={faPenAlt} size="sm" />
                  </Link>
                  <Button color="red" onClick={(e) => handleDeleteForm(e, form.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                  </Button>
                </div>
              </Card>
            </a>
          </NextLink>
        ))}
      </Container>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const initialForms = await prisma.form.findMany({
    where: {
      owner: {
        id: await (await getSession(ctx))?.user.id,
      },
    },
    select: {
      id: true,
      name: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return { props: { initialForms } };
};

Dashboard.auth = true;
export default Dashboard;
