import prisma from '../../../prismaInstance';

const handler = async (req, res) => {
  console.log('req', req.body);
  const payload = JSON.parse(req.body);
  console.log('payload', payload);
  const data = await prisma.question.upsert({
    where: {
      id: payload.question.id || 0,
    },
    update: {
      title: payload.question.title,
      answer: payload.question.answer,
    },
    create: {
      title: payload.question.title,
      answer: payload.question.answer,
      form: {
        connect: {
          id: payload.formId,
        },
      },
    },
  });

  res.status(200).json(data);
};

export default handler;
