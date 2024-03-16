import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from './components/Login';
import Register from './components/registration';
import Company from './components/dashboards';
import { loginSuccess } from './redux/actions/authActions';

export default function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user=localStorage.getItem('user');
      dispatch(loginSuccess(user));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? (
            <Company />
          ) : (
            <LoginForm />
          )}
        />
        <Route
          path="/register"
          element={isLoggedIn ? (
            <Navigate to="/" />
          ) : (
            <Register />
          )}
        />
       <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
