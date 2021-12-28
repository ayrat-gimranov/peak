import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

import Container from '../../components/Container';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Header from "../../components/Header";
import Button from '../../components/Button';
import Link from '../../components/Link';

interface User {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const NewForm = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState('');
  const [color, setColor] = useState('#' + Math.floor(Math.random() * (256 * 256 * 256)).toString(16).padStart(6, '0'));
  const [questions, setQuestions] = useState([{ref: 1, title: '', answer: ''}]);


  useEffect(() => {
    const newFormName = localStorage.getItem('newFormName');
    setName(newFormName);
  }, []);

  const handleAddQuestion = () => {
    const lastRef = questions[questions.length - 1].ref;
    const newQuestion = {ref: lastRef + 1, title: '', answer: ''};
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (ref: Number) => {
    const copyQuestions = [...questions];
    const index = copyQuestions.findIndex((_question) => _question.ref === ref);
    copyQuestions.splice(index, 1);
    setQuestions([...copyQuestions]);
  };

  const handleSaveForm = async () => {
    const user: User = session.user;
    fetch('/api/forms/post', {
      method: 'POST',
      body: JSON.stringify({
        name,
        color,
        questions: questions.map((question) => ({title: question.title, answer: question.answer})),
        userId: user.id,
      })
    })
    .then((res) => {
      if (res.ok) router.push('/dashboard');
    })
    .catch((error) => console.log('error', error))

  };

  const handleChangeQuestion = (e) => {
    const { name, value } = e.target;
    const [attribute, ref] = name.split('_');

    const copyQuestions = [...questions];
    const question = copyQuestions.find((_question) => _question.ref == Number(ref))
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
          {questions.map((question) => (
            <Card key={question.ref} color={color} className='space-y-4'>
              <Input name={`title_${question.ref}`} label='Title' value={question.title} onChange={handleChangeQuestion} />
              <Input name={`answer_${question.ref}`} label='Answer' type='textarea' value={question.answer} onChange={handleChangeQuestion} />
              <Button onClick={() => handleDeleteQuestion(question.ref)} variant='outlined' color='gray' className='block mx-auto text-sm'>
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

export default NewForm;
