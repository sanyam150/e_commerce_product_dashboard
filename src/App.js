import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import ErrorPage from './Pages/ErrorPage';
import withUserCheck from './Components/withUserCheck';

const ProtectedUserLogin = withUserCheck(LoginPage, '/');
const ProtectedHomePage = withUserCheck(HomePage);
const ProtectedSignUpPage = withUserCheck(SignUpPage, '/SignUp');
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/HomePage' element={<ProtectedHomePage />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='/' element={<ProtectedUserLogin />} />
        <Route path='/SignUp' element={<ProtectedSignUpPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
