import { useState, ChangeEvent, FormEvent, FC } from 'react';
import axios from 'axios';

export const CreateUser: FC = () => {
  const [username, setUsername] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/users/', { username })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error))
      .finally(() => setUsername(''));
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
