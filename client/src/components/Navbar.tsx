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
          <Link to='/create'>Create Exercise Log</Link>
        </li>
        <li>
          <Link to='/user'>Create User</Link>
        </li>
      </ul>
    </nav>
  );
};
