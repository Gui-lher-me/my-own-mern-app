import {} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CreateExercise } from './components/CreateExercise';
import { CreateUser } from './components/CreateUser';
import { EditExercise } from './components/EditExercise';
import { ExercisesList } from './components/ExercisesList';
import { Navbar } from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <br />
      <Routes>
        <Route index element={<ExercisesList />} />
        <Route path='/edit/:id' element={<EditExercise />} />
        <Route path='/create' element={<CreateExercise />} />
        <Route path='/user' element={<CreateUser />} />
        <Route path='*' element={<p>No routes matched location.</p>} />
      </Routes>
    </Router>
  );
};

export default App;
