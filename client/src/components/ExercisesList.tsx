import { FC, useState, useEffect } from 'react';
import { Exercise } from './Exercise';
import { toast } from 'react-toastify';
import { readAll, deleteOne } from '../services/api';

export const ExercisesList: FC = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    readAll(
      '/exercises/',
      (exercises: any) => {
        if (exercises.length > 0) {
          setExercises(exercises);
        }
      },
      (errorMessage: any) => console.log(errorMessage),
      () => {}
    );
  }, []);

  const deleteExercise = (id: string) => {
    deleteOne(
      '/exercises/',
      id,
      (successMessage: any) => toast.success(successMessage),
      (errorMessage: any) => toast.error(errorMessage),
      () =>
        setExercises(exercises.filter((exercise: any) => exercise._id !== id))
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <td>Username</td>
          <td>Description</td>
          <td>Duration</td>
          <td>Date</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise: any) => (
          <Exercise
            key={exercise._id}
            exercise={exercise}
            deleteExercise={deleteExercise.bind(null, exercise._id)}
          />
        ))}
      </tbody>
    </table>
  );
};
