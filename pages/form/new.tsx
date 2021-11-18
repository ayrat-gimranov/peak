import { useEffect, useState } from 'react';

import Container from '../components/Container';
import Card from '../components/Card';
import Input from '../components/Input';
import Header from "../components/Header";

const NewForm = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  useState(() => {
    const newFormName = localStorage.getItem('newFormName');
    setName(newFormName);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Container>
        <Card className='space-y-4'>
          <p className='text-xl'>New form</p>
          <Input label='Name' value={name} onChange={(e) => setName(e.target.value)} />
          {/* FIXME: need a color picker */}
          <Input label='Color' value={color} onChange={(e) => setColor(e.target.value)} />
        </Card>
      </Container>
    </div>
  )
};

export default NewForm;
