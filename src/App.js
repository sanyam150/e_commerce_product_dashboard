import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import ErrorPage from './Pages/ErrorPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/HomePage' element={<HomePage />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='/' element={<LoginPage />} />
        <Route path='/SignUp' element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
