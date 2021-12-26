import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handler = async (req, res) => {
  console.log('req', req.body);
  const payload = JSON.parse(req.body);
  console.log('payload', payload);
  const data = await prisma.form.create({
    data: {
      name: 'name',
      color: 'color',
      userId: 1,
    },
  });

  res.status(200).json(data);
};

export default handler;
