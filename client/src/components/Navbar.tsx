import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav>
      <Link to='/'>Exercise Tracker</Link>
      <ul>
        <li>
          <Link to='/'>Exercises</Link>
        </li>
        <li>
          <Link to='/create-exercise'>Create Exercise Log</Link>
        </li>
        <li>
          <Link to='/create-user'>Create User</Link>
        </li>
      </ul>
    </nav>
  );
};
