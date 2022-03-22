import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const initialState = {
  username: '',
  description: '',
  duration: 0,
  date: new Date(),
  users: [''],
};

export const CreateExercise = () => {
  const [exercise, setExercise] = useState(initialState);
  const navigate = useNavigate();

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
    console.log({ username, description, duration, date });
    navigate('/');
  };

  useEffect(() => {
    setExercise((initialState) => ({
      ...initialState,
      users: ['test user'],
      username: 'test user',
    }));
  }, []);

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
          {exercise.users.map((user) => (
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

      <div>
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
