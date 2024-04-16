import { useDispatch, useSelector } from 'react-redux';
import './Navbar.css';

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.UserReducer.name);

  const logoutHandler = async () => {
    try {
      await fetch('http://localhost:3003/logout', {
        credentials: 'include',
      });
      dispatch({ type: 'LOGOUT_USER', payload: '' });
    } catch (error) {
      console.log('Не смогли выйти', error);
    }
  };

  return (
    <div className="nav-bar">
      {user ? (
        <>
          <div>Здравствуйте, {user}!</div>
          <button onClick={logoutHandler}>Logout</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
