import React, { useState } from 'react';
import '../../styles/signupForm.css';

const initialValues = {
  'email': '',
  'password': ''
}

const SignUpForm = () => {
  const [credentials, setCredentials] = useState(initialValues)

  const onChangeHandler = ({ target }) => {
    const name = target.name;

    setCredentials({
      ...credentials,
      [name]: target.value
    })
  }

  const submitHandler = event => {
    event.preventDefault();
  }

  return (
    <form
      className='signupForm bg-light'
      onChange={onChangeHandler}
      onSubmit={submitHandler}>
      <h2 className='signupForm-title'>
        Sign Up
      </h2>
      <div className='group'>
        <label htmlFor='emailInput' className='group-label'>
          Email
        </label>
        <input
          type='text'
          id='emailInput'
          className='group-input'
          name='email' />
      </div>
      <div className='group'>
        <label htmlFor='passwordInput' className='group-label'>
          Password
        </label>
        <input
          type='password'
          id='passwordInput'
          className='group-input'
          name='password' />
      </div>
      <button>
        Sign Up
      </button>
    </form>
  );
};
export default SignUpForm;