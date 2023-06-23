import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import { isValidPassword, isValidEmail } from '../util.js';
import '../../styles/signup.css';

const initialValues = {
  'email': '',
  'password': ''
}

const SignUp = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [credentials, setCredentials] = useState(initialValues)

  const onChangeHandler = ({ target }) => {
    const name = target.name;

    setCredentials({
      ...credentials,
      [name]: target.value
    })
  }

  const submitHandler = async event => {
    const { signUp } = actions;
    event.preventDefault();

    const { passwordValid, passwordMessage } = isValidPassword(credentials.password);
    const { emailValidate, emailMessage } = isValidEmail(credentials.email);

    if (!emailValidate) {
      console.log(emailMessage)
      return null;
    }
    if (!passwordValid) {
      console.log(passwordMessage)
      return null;
    }

    await signUp(credentials);
  }

  useEffect(() => {
    const { token } = store

    if (token != null) {
      navigate('/private')
    }
  }, []);

  return (
    <div className='container container--centrado'>
      <div className="signup bg-light">
        <form
          className='signupForm needs-validation'
          onSubmit={submitHandler}>
          <h2 className='signup__title'>
            Sign Up
          </h2>
          <div className='group form-group'>
            <label htmlFor='email' className='group-label'>
              Email
            </label>
            <input
              type='text'
              id='email'
              className='group-input form-control'
              name='email'
              placeholder='doe@hotmail.com'
              value={credentials.email}
              onChange={onChangeHandler} />
          </div>
          <div className='group form-group'>
            <label htmlFor='password' className='group-label'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='group-input form-control'
              name='password'
              value={credentials.password}
              placeholder='********'
              onChange={onChangeHandler} />
          </div>
          <button>
            Sign Up
          </button>
        </form>

        <div className="signup__instructions">
          <h2 className='signup__title'>
            Password instructions
          </h2>
          <ul>
            <li>It must be bigger than 8 characters long.</li>
            <li>It must be less than 20 characters long.</li>
            <li>It must contain at least 1 lowercase character.</li>
            <li>It must contain at least 1 uppercase character.</li>
            <li>It must contain at least 1 special character as <span className='bold'>@ _ -</span></li>
            <li>It must contain at least 1 number.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default SignUp;