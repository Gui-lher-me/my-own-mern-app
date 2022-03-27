import { FC } from 'react';
import { Exercise } from './Exercise';

export const ExercisesList: FC<any> = ({ exercises, deleteExercise }) => {
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
