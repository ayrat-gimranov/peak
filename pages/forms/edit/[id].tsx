import { useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import prisma from '../../../prismaInstance';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

// components
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import Input from '../../../components/Input';
import Header from "../../../components/Header";
import Button from '../../../components/Button';
import Link from '../../../components/Link';

interface User {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const EditForm = ({ form }) => {
  const router = useRouter();

  const [name, setName] = useState(form.name);
  const [color, setColor] = useState(form.color);
  const [questions, setQuestions] = useState(form.questions);

  const handleAddQuestion = () => {
    const newQuestion = {title: '', answer: ''};
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (index) => {
    const question = questions[index];
    const copyQuestions = [...questions];

    const removeQuestionFromState = () => {
      copyQuestions.splice(index, 1);
      setQuestions([...copyQuestions]);
    }

    if (question.id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'This will permanentelely delete this question.',
        icon: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it.',
        cancelButtonText: "No, don't do it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch('/api/questions/delete', {
            method: 'DELETE',
            body: JSON.stringify({
              id: question.id,
            })
          }).then((res) => {
            if (!res.ok) throw new Error();
            removeQuestionFromState();
          })
          .catch((error) => console.log('error', error))
        }
      });
    } else {
      removeQuestionFromState();
    }
  };

  const handleSaveForm = async () => {
    fetch('/api/forms/patch', {
      method: 'PATCH',
      body: JSON.stringify({
        formId: form.id,
        name,
        color,
      })
    })
    .then((res) => {
      if (!res.ok) throw new Error('Something went wrong when updating the form name or color.');

      try {
        Promise.all(
          questions.map((question) => {
            fetch('/api/questions/patch', {
              method: 'PATCH',
              body: JSON.stringify({
                formId: form.id,
                question,
              })
            })
          })
        ).then(() => router.push('/dashboard'))
      } catch (error) {
        throw new Error('Something went wrong when updating the questions.')
      }
    })
    .catch((error) => console.log('error', error))

  };

  const handleChangeQuestion = (e) => {
    const { name, value } = e.target;
    const [attribute, index] = name.split('_');

    const copyQuestions = [...questions];
    const question = copyQuestions[index];
    question[attribute] = value;

    setQuestions([...copyQuestions]);
  };

  return (
    <div className="flex flex-col max-h-screen min-h-screen overflow-y-auto bg-gray-50">
      <Header />
      <Container>
        <Card className='space-y-4'>
          <p className='text-xl'>Your new form</p>
          <Input label='Name' value={name} onChange={(e) => {setName(e.target.value)}} />
          <Input label='Color' type='color' value={color} onChange={(e) => {setColor(e.target.value)}} />
        </Card>

        <div className='flex items-center justify-between mt-6 mb-2'>
          <p className='text-xl'>Your form's questions</p>
          <FontAwesomeIcon icon={faPlusSquare} className='text-xl text-purple' onClick={handleAddQuestion} />
        </div>

        <div className='mb-20 space-y-4'>
          {questions.map((question, index) => (
            <Card key={index} color={color} className='space-y-4'>
              <Input name={`title_${index}`} label='Title' value={question.title} onChange={handleChangeQuestion} />
              <Input name={`answer_${index}`} label='Answer' type='textarea' value={question.answer} onChange={handleChangeQuestion} />
              <Button onClick={() => handleDeleteQuestion(index)} variant='outlined' color='gray' className='block mx-auto text-sm'>
                Delete
              </Button>
            </Card>
          ))}
        </div>
        <div className='absolute bottom-0 left-0 right-0 flex justify-between p-4 space-x-2 bg-white border-t border-gray-200 md:relative md:border-none md:bg-transparent md:justify-end'>
          <Link href="/dashboard" className="w-full md:w-auto md:px-4" variant='outlined' color='gray'>
            Cancel
          </Link>
          <Button onClick={handleSaveForm} className='w-full py-1 md:w-auto'>
            Save
          </Button>
          </div>
      </Container>
    </div>
  )
};

export async function getServerSideProps(ctx) {
  const form = await prisma.form.findUnique({
    where: {
      id: Number(ctx.params.id),
    },
    select: {
      id: true,
      name: true,
      color: true,
      questions: true,
    }
  });

  if (!form) {
    return {
      notFound: true,
    };
  }

  return {
    props: { form }, // will be passed to the page component as props
  };
}

export default EditForm;
