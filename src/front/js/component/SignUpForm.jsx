import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext.js'
import { isValidPassword, isValidEmail } from '../util.js'
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
    // Validar hotmail y validar clave
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

  return (
    <form
      className='signupForm bg-light needs-validation'
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

      <div className='col-md-4 position-relative'>
        <label htmlFor='validationTooltip01' className='form-label'>First name</label>
        <input type='text' className='form-control' id='validationTooltip01' required />
        <div className='valid-tooltip'>
          Looks good!
        </div>
      </div>

      <button>
        Sign Up
      </button>
    </form>
  );
};
export default SignUpForm;