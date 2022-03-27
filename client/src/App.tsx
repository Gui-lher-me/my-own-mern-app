import { FC, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateOrUpdateExercise } from './components/CreateOrUpdateExercise';
import { CreateUser } from './components/CreateUser';
import { ExercisesList } from './components/ExercisesList';
import { Navbar } from './components/Navbar';
import { readAll, deleteOne, createOne } from './services/api';

export const App: FC = () => {
  const [exercises, setExercises] = useState([]);
  const [latestAddedOrUpdatedExercise, setLatestAddedOrUpdatedExercise] =
    useState({});

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
    <BrowserRouter>
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
              setLatestAddedOrUpdatedExercise={setLatestAddedOrUpdatedExercise}
            />
          }
        />
        <Route
          path='/create-or-update-exercise/:id'
          element={
            <CreateOrUpdateExercise
              setLatestAddedOrUpdatedExercise={setLatestAddedOrUpdatedExercise}
            />
          }
        />
        <Route
          path='/create-user'
          element={<CreateUser createUser={createUser} />}
        />
        <Route path='*' element={<p>No routes matched location.</p>} />
      </Routes>
    </BrowserRouter>
  );
};
