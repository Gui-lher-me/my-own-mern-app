import { useState, ChangeEvent, FormEvent, FC } from 'react';
import { toast } from 'react-toastify';
import { createOne } from '../services/api';

export const CreateUser: FC = () => {
  const [username, setUsername] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createOne(
      '/users/',
      { username },
      (successMessage: any) => toast.success(successMessage),
      (errorMessage: any) => toast.error(errorMessage),
      () => setUsername('')
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Username: </label>
        <input type='text' required value={username} onChange={onChange} />
      </div>

      <button style={{ fontFamily: 'inherit', cursor: 'pointer' }}>
        Submit
      </button>
    </form>
  );
};
