import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { Exercise } from './Exercise';

const url = 'http://localhost:5000/exercises/';

export const ExercisesList: FC = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setExercises(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteExercise = (id: string) => {
    axios
      .delete(url + id)
      .then((res) => {
        console.log(res.data);
        setExercises(exercises.filter((exercise: any) => exercise._id !== id));
      })
      .catch((error) => console.log(error));
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
