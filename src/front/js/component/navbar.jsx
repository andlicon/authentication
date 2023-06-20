import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/navbar.css';

export const Navbar = () => {
  return (
    <nav className='navbar navbar-light bg-light'>
      <div className='container'>
        <Link to='/'>
          <span className='navbar-brand mb-0 h1'>
            MessagesApp
          </span>
        </Link>
        <div className='ml-auto'>
          <Link to='/signin' className='links'>
            <button className='btn btn-primary'>
              Sign in
            </button>
          </Link>
          <Link to='/login' className='links'>
            <button className='btn btn-primary'>
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
