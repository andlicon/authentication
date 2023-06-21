import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext.js'
import SignInForm from '../component/SignInForm.jsx'
import '../../styles/signin.css';

const SignIn = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const { token } = store

  useEffect(() => {
    if (token != null) {
      navigate('/private')
    }
  }, []);

  return (
    <div className='container container--centrado'>
      <SignInForm />
    </div>
  );
};
export default SignIn;