import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducers/userLoginSlice';

const withUserCheck = (WrappedComponent, redirectTo = '/') => {
  return (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      const userLoggedInInfo = JSON.parse(
        localStorage.getItem('userLoggedInInfo')
      );

      if (userLoggedInInfo && userLoggedInInfo.email) {
        dispatch(login(userLoggedInInfo));
        navigate('/HomePage');
      } else {
        navigate(redirectTo);
      }
    }, [dispatch, navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withUserCheck;
