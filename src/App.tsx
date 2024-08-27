import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate }  from 'react-router-dom';
import './App.css';
import Sign from './pages/Sign';
import Requests from './pages/Requests';
import Header from './components/Header';
import { fetchInitialData } from './api/fetchInitData';
import { useDispatch, useSelector } from 'react-redux';
import ErrorSnackbar from './components/SnackBar';
import { RootState } from './store/store';
import SelectRequest from './pages/SelectRequest';
import CreateRequest from './pages/CreateRequest';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userInfo = useSelector((state: RootState) => state.userInfo);

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
        <Route path='/create' element={<SelectRequest />} />
        <Route path='/create/order' element={<CreateRequest requestType='order' />} />
        <Route path='/create/delivery' element={<CreateRequest requestType='delivery' />} />
        <Route
          path='*'
          element={
            userInfo?.email ? <Navigate to='/requests' /> : <Navigate to='/signup' />
          }
        />
    </Routes>
      <ErrorSnackbar />
    </>
  );
}

export default App;
