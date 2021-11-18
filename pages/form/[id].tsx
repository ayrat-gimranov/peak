import { useState } from 'react';
import Link from 'next/link';

// components
import Header from "../components/Header";
import Container from "../components/Container";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

const Form = ({ form }) => {
  // state
  const [currentQuestion, setCurrentQuestion] = useState(form.questions[0]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  // vars
  const currentIndex = form.questions.findIndex((question) => question.id === currentQuestion.id) + 1;
  const numberOfQuestions = form.questions.length;

  // funcs
  const submitAnswer = () => setIsAnswerSubmitted(true);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Container>
        <Card color={form.color}>
          <p className='text-xl'>{form.name}</p>
          <p className="text-gray-500">{`Question ${currentIndex}/${numberOfQuestions}`}</p>
        </Card>
        <Card className='mt-6'>
          <p className='mb-4 text-lg'>{currentQuestion.title}</p>
          <Input label="Your answer" type="textarea">
          </Input>
        </Card>

        <div className='absolute bottom-0 left-0 right-0 flex justify-between p-4 space-x-2 bg-white border-t border-gray-200 md:relative md:border-none md:bg-transparent md:justify-end'>
          <Link href="/dashboard">
            <a className='w-full px-2 py-1 text-center text-gray-500 border border-gray-500 rounded-md md:w-auto md:px-4'>
              Exit
            </a>
          </Link>
          <Button
            onClick={submitAnswer}
            className='w-full py-1 md:w-auto'
          >
            Submit
          </Button>
        </div>
      </Container>
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/forms/${context.params.id}`);
  const form = await res.json();

  if (!form) {
    return {
      notFound: true,
    };
  }

  return {
    props: form, // will be passed to the page component as props
  };
}

export default Form;
