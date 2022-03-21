import { useState } from 'react';

const initialState = {
  username: '',
  description: '',
  duration: 0,
  date: new Date(),
  users: [],
};

export const CreateExercise = () => {
  const [exercise, setExercise] = useState(initialState);

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setExercise((props) => ({ ...props, [name]: value }));
  };

  return <div>CreateExercise</div>;
};
