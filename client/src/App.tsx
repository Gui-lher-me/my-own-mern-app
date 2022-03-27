import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateExercise } from './components/CreateExercise';
import { CreateUser } from './components/CreateUser';
import { EditExercise } from './components/EditExercise';
import { ExercisesList } from './components/ExercisesList';
import { Navbar } from './components/Navbar';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <br />
      <Routes>
        <Route index element={<ExercisesList />} />
        <Route path='/edit-exercise/:id' element={<EditExercise />} />
        <Route path='/create-exercise' element={<CreateExercise />} />
        <Route path='/create-user' element={<CreateUser />} />
        <Route path='*' element={<p>No routes matched location.</p>} />
      </Routes>
    </BrowserRouter>
  );
};
