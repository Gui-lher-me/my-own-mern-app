import { useState, useEffect, ChangeEvent, FormEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { readAll, createOne } from '../services/api';

const initialState = {
  username: '',
  description: '',
  duration: 0,
  date: new Date(),
};

export const CreateExercise: FC<any> = ({
  setLatestAddedOrUpdatedExercise,
}) => {
  const [exercise, setExercise] = useState(initialState);
  const [users, setUsers] = useState(['']);

  const navigate = useNavigate();

  useEffect(() => {
    readAll(
      '/users/',
      (users: any) => {
        if (users.length > 0) {
          setUsers(users.map((user: any) => user.username));
          setExercise((previousState) => ({
            ...previousState,
            username: users[0].username,
          }));
        }
      },
      (errorMessage: any) => console.log(errorMessage),
      () => {}
    );
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
    createOne(
      '/exercises/',
      exercise,
      (successMessage: any) => toast.success(successMessage),
      (errorMessage: any) => toast.error(errorMessage),
      () => {
        setLatestAddedOrUpdatedExercise(exercise);
        navigate('/');
      }
    );
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
