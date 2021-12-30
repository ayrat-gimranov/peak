import prisma from '../../../prismaInstance';

const handler = async (req, res) => {
  const payload = JSON.parse(req.body);

  const deleteForm = prisma.form.delete({
    where: {
      id: payload.formId,
    },
  });

  const deleteQuestions = prisma.question.deleteMany({
    where: {
      formId: payload.formId,
    },
  });

  const transaction = await prisma.$transaction([deleteQuestions, deleteForm]);

  res.status(200).json(transaction);
};

export default handler;
