import { useState, ChangeEvent, FormEvent, FC } from 'react';

export const CreateUser: FC<any> = ({ createUser }) => {
  const [username, setUsername] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(username, setUsername);
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
