import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext.js'

const Private = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);

  useEffect(() => {
    const { token } = store

    if (token == null) {
      navigate('/denied')
    }
  }, []);

  return (
    <div className='container'>
      BIENVENIDO A LA PÁGINA
    </div>
  );
};
export default Private;