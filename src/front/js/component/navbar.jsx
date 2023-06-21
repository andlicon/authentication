import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext.js'
import { Link } from 'react-router-dom';

import '../../styles/navbar.css';

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const { token } = store;
  const { logOut } = actions;

  const onClickHandler = () => {
    logOut()
  }

  return (
    <nav className='navbar navbar-light bg-light'>
      <div className='container'>
        {
          token == null ?
            <>
              <Link to='/'>
                <span className='navbar-brand mb-0 h1'>
                  MessagesApp
                </span>
              </Link>
              <div className='ml-auto'>
                <Link to='/signup' className='links'>
                  <button className='btn btn-primary'>
                    Sign Up
                  </button>
                </Link>
                <Link to='/signin' className='links'>
                  <button className='btn btn-primary'>
                    Sign In
                  </button>
                </Link>
              </div>
            </>
            :
            <>
              <Link to='/private'>
                <span className='navbar-brand mb-0 h1'>
                  MessagesApp
                </span>
              </Link>
              <div className='ml-auto'>
                <Link to='/' className='links'>
                  <button
                    className='btn btn-primary'
                    onClick={onClickHandler}>
                    Log Out
                  </button>
                </Link>
              </div>
            </>
        }
      </div>
    </nav>
  );
};
