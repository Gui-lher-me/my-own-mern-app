import { FC } from 'react';
import { Link } from 'react-router-dom';

export interface Props {
  exercise: any;
  deleteExercise: any;
}

export const Exercise: FC<Props> = ({ exercise, deleteExercise }) => {
  return (
    <tr>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration} min</td>
      <td>{exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={'/edit/' + exercise._id} state={exercise}>
          edit
        </Link>{' '}
        |{' '}
        <button
          style={{ fontFamily: 'inherit', cursor: 'pointer' }}
          onClick={deleteExercise.bind(exercise._id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};
