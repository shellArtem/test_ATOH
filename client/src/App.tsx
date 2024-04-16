import { useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const response = await fetch('http://localhost:3003/user', {
        credentials: 'include',
      });
      const result = await response.json();
      if (result.name) {
        dispatch({ type: 'SAVE_USER', payload: result.name });
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
