import { useState, useEffect, ChangeEvent, FormEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const initialState = {
  username: '',
  description: '',
  duration: 0,
  date: new Date(),
};

export const CreateExercise: FC = () => {
  const [exercise, setExercise] = useState(initialState);
  const [users, setUsers] = useState(['']);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/users/')
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((user: any) => user.username));
          setExercise((previousState) => ({
            ...previousState,
            username: res.data[0].username,
          }));
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === 'duration') {
      setExercise((props) => ({ ...props, [name]: Number(value) }));
      return;
    }
    setExercise((props) => ({ ...props, [name]: value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, description, duration, date } = exercise;
    axios
      .post('http://localhost:5000/exercises/', {
        username,
        description,
        duration,
        date,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error))
      .finally(() => navigate('/'));
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Username: </label>
        <select
          required
          name='username'
          value={exercise.username}
          onChange={onChange}
        >
          {users.map((user: string) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Description: </label>
        <input
          type='text'
          required
          name='description'
          value={exercise.description}
          onChange={onChange}
        />
      </div>

      <div>
        <label>Duration (in minutes): </label>
        <input
          type='text'
          required
          name='duration'
          value={exercise.duration}
          onChange={onChange}
        />
      </div>

      <div style={{ display: 'flex', gap: '4px' }}>
        <label>Date: </label>
        <DatePicker
          selected={exercise.date}
          onChange={(date: Date) =>
            setExercise((props) => ({ ...props, date: date }))
          }
        />
      </div>

      <button style={{ fontFamily: 'inherit', cursor: 'pointer' }}>
        Submit
      </button>
    </form>
  );
};
