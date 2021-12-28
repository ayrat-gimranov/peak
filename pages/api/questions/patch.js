import prisma from '../../../prismaInstance';

const handler = async (req, res) => {
  console.log('req', req.body);
  const payload = JSON.parse(req.body);
  console.log('payload', payload);
  const data = await prisma.question.update({
    where: {
      id: payload.question.id,
    },
    data: {
      title: payload.question.title,
      answer: payload.question.answer,
    },
  });

  res.status(200).json(data);
};

export default handler;
