import { useState } from 'react';
import { useRouter } from 'next/router';
import safeJsonStringify from 'safe-json-stringify';
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

// utils
import fireSwal from '../../../utils/fireSwal';
import { observeAndScrollTo } from '../../../utils/DOM';

const EditForm = ({ form }) => {
  const router = useRouter();

  // state
  const [name, setName] = useState(form.name);
  const [color, setColor] = useState(form.color);
  const [questions, setQuestions] = useState(form.questions);

  // funcs
  const handleAddQuestion = () => {
    const newQuestion = {title: '', answer: ''};
    setQuestions([...questions, newQuestion]);
    const lastIndex = questions.length;
    const wrapper = "[data-id='form-questions-wrapper']"
    observeAndScrollTo(wrapper, `#title_${lastIndex}`, { focus: true })
  };

  const handleDeleteQuestion = (index: number) => {
    const question = questions[index];
    const copyQuestions = [...questions];

    const removeQuestionFromState = () => {
      copyQuestions.splice(index, 1);
      setQuestions([...copyQuestions]);
    }

    if (question.id) {
      fireSwal.delete('This will permanently delete this question.')
        .then((result) => {
          if (result.isConfirmed) {

            fetch('/api/questions/delete', {
              method: 'DELETE',
              body: JSON.stringify({
                id: question.id,
              })
            }).then((res) => {
              if (!res.ok) throw new Error();
              removeQuestionFromState();
              fireSwal.successfullyDeleted('Question deleted!')
            })
            .catch(() => fireSwal.error())
          }
        });
    } else {
      removeQuestionFromState();
    }
  };

  const handleSaveForm = async () => {
    fireSwal.loading();
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
        ).then(() => {
          const closingCallback = () => router.push('/dashboard')
          fireSwal.success({ message: 'Form saved!', closingCallback });
        })
      } catch (error) {
        throw new Error('Something went wrong when updating the questions.')
      }
    })
    .catch(() => fireSwal.error())

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
          <p className='text-xl'>Edit your new form</p>
          <Input label='Name' value={name} onChange={(e) => {setName(e.target.value)}} />
          <Input label='Color' type='color' value={color} onChange={(e) => {setColor(e.target.value)}} />
        </Card>

        <div className='flex items-center justify-between mt-6 mb-2'>
          <p className='space-x-2'>
            <span className='text-xl'>Your form's questions</span>
            <span>({form.questions.length})</span>
          </p>
          <button onClick={handleAddQuestion}>
            <FontAwesomeIcon icon={faPlusSquare} className='text-xl text-purple hover:text-purple-dark' />
          </button>
        </div>

        <div className='mb-20 space-y-4' data-id='form-questions-wrapper'>
          {questions.map((question, index: number) => {
            return (
              <Card key={index} color={color} className='space-y-4'>
                <Input name={`title_${index}`} label='Title' value={question.title} onChange={handleChangeQuestion} />
                <Input name={`answer_${index}`} label='Answer' type='textarea' value={question.answer} onChange={handleChangeQuestion} />
                <Button onClick={() => handleDeleteQuestion(index)} variant='outlined' color='gray' className='block mx-auto text-sm'>
                  Delete
                </Button>
              </Card>
          )})}
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
  const data = await prisma.form.findUnique({
    where: {
      id: Number(ctx.params.id),
    },
    include: {
      questions: {
        orderBy: {
          id: 'asc',
        },
      }
    }
  });

  const form = JSON.parse(safeJsonStringify(data));

  if (!form) {
    return {
      notFound: true,
    };
  }

  return {
    props: { form },
  };
}

export default EditForm;
