import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext.js'
import presentationImage from '../../img/talkingPeople2.png'
import '../../styles/signin.css';

const initialValues = {
  'email': '',
  'password': ''
}

const SignIn = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(initialValues)
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const { token } = store

    if (token != null) {
      navigate('/private')
    }
  }, []);

  const onChangeHandler = ({ target }) => {
    const name = target.name;

    setCredentials({
      ...credentials,
      [name]: target.value
    })
  }

  const submitHandler = async event => {
    const { login } = actions;

    event.preventDefault();
    const successful = await login(credentials);

    if (successful) {
      setCredentials(initialValues)
      navigate('/private');
    }

  }

  return (
    <div className='container container--centrado'>
      <div className='login bg-light'>
        <form
          className='signinForm'
          onSubmit={submitHandler}>
          <h2 className='signin-title'>
            Sign In
          </h2>
          <div className='form-group group'>
            <label htmlFor='email' className='group-label'>
              Email
            </label>
            <input
              type='text'
              id='email'
              className='group-input form-control'
              name='email'
              value={credentials.email}
              placeholder='doe@hotmail.com'
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
              placeholder='********'
              value={credentials.password}
              onChange={onChangeHandler} />
          </div>
          <button className='login-button'>
            Sign In
          </button>
        </form>
        <div className='login-presentation'>
          <img
            src={presentationImage}
            className='login-presentation-image'
            alt='presentation image' />
          <h2 className='login-presentation__title'>
            WELCOME
          </h2>
        </div>
      </div>
    </div>
  );
};
export default SignIn;