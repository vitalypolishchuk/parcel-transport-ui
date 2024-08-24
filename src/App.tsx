import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation }  from 'react-router-dom';
import './App.css';
import Sign from './pages/Sign';
import Requests from './pages/Requests';
import Header from './components/Header';
import { fetchInitialData } from './api/fetchInitData';
import { useDispatch } from 'react-redux';
import ErrorSnackbar from './components/SnackBar';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    fetchInitialData(dispatch, navigate, location.pathname);
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/signup' element={<Sign />} />
        <Route path='/signin' element={<Sign />} />
        <Route path='/requests' element={<Requests />} />
      </Routes>
      <ErrorSnackbar />
    </>
  );
}

export default App;
