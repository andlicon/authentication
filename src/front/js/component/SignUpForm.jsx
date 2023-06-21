import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext.js'
import '../../styles/signupForm.css';

const initialValues = {
  'email': '',
  'password': ''
}

const SignUpForm = () => {
  const [credentials, setCredentials] = useState(initialValues)
  const { actions } = useContext(Context);
  const { signUp } = actions;

  const onChangeHandler = ({ target }) => {
    const name = target.name;

    setCredentials({
      ...credentials,
      [name]: target.value
    })
  }

  const submitHandler = async event => {
    event.preventDefault();
    await signUp(credentials);
  }

  return (
    <form
      className='signupForm bg-light'
      onSubmit={submitHandler}>
      <h2 className='signupForm-title'>
        Sign Up
      </h2>
      <div className='group'>
        <label htmlFor='email' className='group-label'>
          Email
        </label>
        <input
          type='text'
          id='email'
          className='group-input'
          name='email'
          value={credentials.email}
          onChange={onChangeHandler} />
      </div>
      <div className='group'>
        <label htmlFor='password' className='group-label'>
          Password
        </label>
        <input
          type='password'
          id='password'
          className='group-input'
          name='password'
          value={credentials.password}
          onChange={onChangeHandler} />
      </div>
      <button>
        Sign Up
      </button>
    </form>
  );
};
export default SignUpForm;