import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const index = async (req, res) => {
  // mocked response
  res.status(200).json({
    forms: [
      { id: 1, name: 'Basic React', questions: 15, color: '#FFB2B2' },
      { id: 2, name: 'Basic JS', questions: 9, color: '#D6FFEE' },
      { id: 3, name: 'Basic Rust', questions: 333, color: '#54A985' },
      { id: 4, name: 'Basic Ruby', questions: 43, color: '#54A985' },
      { id: 5, name: 'Basic C#', questions: 27, color: '#54A985' },
    ],
  });
};

export default index;
