import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handler = async (req, res) => {
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
