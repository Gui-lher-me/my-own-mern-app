import { FC, useState, useEffect, Fragment } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateOrUpdateExercise } from './components/CreateOrUpdateExercise';
import { CreateUser } from './components/CreateUser';
import { ExercisesList } from './components/ExercisesList';
import { Navbar } from './components/Navbar';
import { readAll, deleteOne, createOne, updateOne } from './services/api';

export const App: FC = () => {
  const [exercises, setExercises] = useState([]);
  const [latestAddedOrUpdatedExercise, setLatestAddedOrUpdatedExercise] =
    useState({});

  const navigate = useNavigate();

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
  }, [latestAddedOrUpdatedExercise]);

  const createExercise = (exercise: any) => {
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

  const updateExercise = (exercise: any, id: any) => {
    updateOne(
      '/exercises/',
      id,
      exercise,
      (successMessage: any) => toast.success(successMessage),
      (errorMessage: any) => toast.error(errorMessage),
      () => {
        setLatestAddedOrUpdatedExercise(exercise);
        navigate('/');
      }
    );
  };

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

  const createUser = (username: any, setUsername: any) => {
    createOne(
      '/users/',
      { username },
      (successMessage: any) => toast.success(successMessage),
      (errorMessage: any) => toast.error(errorMessage),
      () => setUsername('')
    );
  };

  return (
    <Fragment>
      <ToastContainer />
      <Navbar />
      <br />
      <Routes>
        <Route
          index
          element={
            <ExercisesList
              deleteExercise={deleteExercise}
              exercises={exercises}
            />
          }
        />
        <Route
          path='/create-or-update-exercise'
          element={
            <CreateOrUpdateExercise
              updateExercise={updateExercise}
              createExercise={createExercise}
            />
          }
        />
        <Route
          path='/create-or-update-exercise/:id'
          element={
            <CreateOrUpdateExercise
              updateExercise={updateExercise}
              createExercise={createExercise}
            />
          }
        />
        <Route
          path='/create-user'
          element={<CreateUser createUser={createUser} />}
        />
        <Route path='*' element={<p>No routes matched location.</p>} />
      </Routes>
    </Fragment>
  );
};
