import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext.js'
// component
import SignUpForm from '../component/SignUpForm.jsx'

const SignUp = () => {
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
      <SignUpForm />
    </div>
  )
}
export default SignUp;