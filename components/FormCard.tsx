import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import ColoredSquare from './ColoredSquare';
import Button from './Button';
import Card from './Card';
import Link from './Link';

type FormCard = {
  form: {
    id: number,
    name: string,
    color: string,
    questions: []
  },
  handleDeleteForm: (e: React.ChangeEvent<HTMLInputElement>, formId: number) => void,
}

const FormCard = ({ form, handleDeleteForm }: FormCard) => (
  <Card className="flex items-center justify-between p-0 mb-4">
    <NextLink href={`/forms/${form.id}`} key={form.id}>
      <a className='flex items-center flex-1 p-4 space-x-4'>
        <ColoredSquare color={form.color} />
        <div className="flex-1">
          <p>{form.name}</p>
          <small>{form.questions}</small>
        </div>
      </a>
    </NextLink>
    <div className="flex flex-col p-4 space-y-2 border-l">
      <Link href={`/forms/edit/${form.id}`} color="yellow" variant='outlined' className='py-0 space-x-2'>
        <span>Edit</span>
      </Link>
      <Button onClick={(e) => handleDeleteForm(e, form.id)} color="red" variant='outlined' className='space-x-2'>
        <span>Delete</span>
      </Button>
    </div>
  </Card>
);

export default FormCard;
