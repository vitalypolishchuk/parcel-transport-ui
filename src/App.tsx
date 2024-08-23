import React, { useEffect, useState } from 'react';
import { Routes, Route }  from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Requests from './pages/Requests';
import Header from './components/Header';
import { UserInfo } from './types/User';
import { fetchInitialData } from './api/fetchInitData';
import { useDispatch } from 'react-redux';
import ErrorSnackbar from './components/SnackBar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchInitialData(dispatch);
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/requests' element={<Requests />} />
      </Routes>
      <ErrorSnackbar />
    </>
  );
}

export default App;
