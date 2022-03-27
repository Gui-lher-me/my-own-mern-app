import { useState, useEffect, ChangeEvent, FormEvent, FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { readAll, updateOne } from '../services/api';

const initialState = {
  username: '',
  description: '',
  duration: 0,
  date: new Date(),
};

export const EditExercise: FC = () => {
  const [exercise, setExercise] = useState<any>(initialState);
  const [users, setUsers] = useState(['']);

  const { state }: any = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    readAll(
      '/users/',
      (users: any) => {
        setUsers(users.map((user: any) => user.username));
      },
      (errorMessage: any) => console.log(errorMessage),
      () => {
        setExercise({
          username: state.username,
          description: state.description,
          duration: state.duration,
          date: new Date(state.date),
        });
      }
    );
  }, []);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === 'duration') {
      setExercise((props: any) => ({ ...props, [name]: Number(value) }));
      return;
    }
    setExercise((props: any) => ({ ...props, [name]: value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, description, duration, date } = exercise;
    updateOne(
      '/exercises/',
      state._id,
      {
        username,
        description,
        duration,
        date,
      },
      (successMessage: any) => toast.success(successMessage),
      (errorMessage: any) => toast.error(errorMessage),
      () => navigate('/')
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
          {users.map((user: any) => (
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
          name='description'
          value={exercise.description}
          onChange={onChange}
        />
      </div>

      <div>
        <label>Duration (in minutes): </label>
        <input
          type='text'
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
            setExercise((props: any) => ({ ...props, date: date }))
          }
        />
      </div>

      <button style={{ fontFamily: 'inherit', cursor: 'pointer' }}>
        Submit
      </button>
    </form>
  );
};
