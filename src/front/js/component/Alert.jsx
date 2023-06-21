import React, { useState, useEffect, useContext } from 'react';
import '../../styles/alert.css';
import { Context } from '../store/appContext';

const ERROR = false;
const EXITO = true;

const Alert = () => {
  const [visible, setVisible] = useState(true);
  const { store, actions } = useContext(Context);
  const { throwAlert } = actions;
  const { alert } = store;
  const { message, type } = alert;

  const handlerOnClick = () => {
    setVisible(false);
    throwAlert(null, null);
  }

  useEffect(() => {
    if (alert != null) {
      setTimeout(() => {
        setVisible(false);
        throwAlert(null, null);
      }, 2500);
    }
  }, [alert]);

  return (
    <>
      {
        visible &&
        <div
          className='alert'
          onClick={handlerOnClick}
        >
          <p className={`alert__message ${type == ERROR
            ? 'alert--error'
            : 'alert--exito'}`}>
            {message}
          </p>
        </div >
      }
    </>
  );
}
export default Alert;