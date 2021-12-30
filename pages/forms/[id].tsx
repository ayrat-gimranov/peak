import { useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';
import prisma from '../../prismaInstance';

// components
import Header from "../../components/Header";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "../../components/Link";

const Form = ({ form }) => {
  // state
  const [currentQuestion, setCurrentQuestion] = useState(form.questions[0]);
  const [answer, setAnswer] = useState('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  // vars
  const currentIndex = form.questions.findIndex((question) => question.id === currentQuestion.id);
  const numberOfQuestions = form.questions.length;

  // funcs
  const submitAnswer = () => setIsAnswerSubmitted(true);

  const goTwoQuestionsBack = () => {
    setAnswer('');
    setIsAnswerSubmitted(false);
    const previousIndex = currentIndex - 2 < 0 ? 0 : currentIndex - 2;
    setCurrentQuestion(form.questions[previousIndex]);
  };

  const goToDashboard = () => { window.location.href = '/dashboard' };

  const goToNextQuestion = () => {
    setAnswer('');
    const isLastQuestion = form.questions.length === currentIndex + 1;
    if (isLastQuestion) return goToDashboard();  // FIXME with proper redirect

    setIsAnswerSubmitted(false);

    setCurrentQuestion(form.questions[currentIndex + 1]);
    return;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Container>
        <Card color={form.color}>
          <p className='text-xl'>{form.name}</p>
          <p className="text-gray-500">{`Question ${currentIndex + 1}/${numberOfQuestions}`}</p>
        </Card>
        <Card className='mt-6'>
          <p className='mb-4 text-lg'>{currentQuestion.title}</p>
          <Input label="Your answer" type="textarea" value={answer} onChange={(e) => setAnswer(e.target.value)} />
          {isAnswerSubmitted && (
            <div className='mt-2'>
              <p>The correct answer is:</p>
              <p className='py-1 pl-4 mt-2 italic border-l border-gray-300'>{currentQuestion.answer}</p>
            </div>
          )}
        </Card>

        <div className='absolute bottom-0 left-0 right-0 flex justify-between p-4 space-x-2 bg-white border-t border-gray-200 md:relative md:border-none md:bg-transparent md:justify-end'>
          {isAnswerSubmitted ? (
            <>
              <Button onClick={goTwoQuestionsBack} className='w-full py-1 md:w-auto' variant='outlined' color='gray'>
                My answer is incorrect
              </Button>
              <Button onClick={goToNextQuestion} className='w-full py-1 md:w-auto'>
                My answer is correct
              </Button>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="w-full md:w-auto md:px-4" variant='outlined' color='gray'>
                Exit
              </Link>
              <Button onClick={submitAnswer} className='w-full py-1 md:w-auto'>
                Submit
              </Button>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const data = await prisma.form.findUnique({
    where: {
      id: Number(ctx.params.id),
    },
    include: {
      questions: {
        orderBy: {
          id: 'asc'
        }
      },
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

export default Form;
