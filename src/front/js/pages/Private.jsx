import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext.js'

const Private = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const { token } = store

  useEffect(() => {
    if (token == null) {
      navigate('/denied')
    }
  }, []);

  return (
    <>
      BIENVENIDO A LA PÁGINA
    </>
  );
};
export default Private;