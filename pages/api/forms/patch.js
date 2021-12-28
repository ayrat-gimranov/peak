import prisma from '../../../prismaInstance';

const handler = async (req, res) => {
  console.log('req', req.body);
  const payload = JSON.parse(req.body);
  console.log('payload', payload);
  const data = await prisma.form.update({
    where: {
      id: payload.formId,
    },
    data: {
      name: payload.name,
      color: payload.color,
    },
  });

  res.status(200).json(data);
};

export default handler;
