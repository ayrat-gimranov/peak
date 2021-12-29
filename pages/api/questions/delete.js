import prisma from '../../../prismaInstance';

const handler = async (req, res) => {
  console.log('req', req.body);
  const payload = JSON.parse(req.body);
  console.log('payload', payload);
  const data = await prisma.question.delete({
    where: {
      id: payload.id,
    },
  });

  res.status(200).json(data);
};

export default handler;
