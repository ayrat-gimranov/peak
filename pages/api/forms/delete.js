import prisma from '../../../prismaInstance';

const handler = async (req, res) => {
  const payload = JSON.parse(req.body);

  const deletePosts = prisma.question.delete({
    where: {
      formId: payload.formId,
    },
  });

  const deleteUser = prisma.form.delete({
    where: {
      id: payload.formId,
    },
  });

  const transaction = await prisma.$transaction([deletePosts, deleteUser]);

  res.status(200).json(transaction);
};

export default handler;
