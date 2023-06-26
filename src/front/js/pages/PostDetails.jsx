import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext.js';

const PostDetails = ({ post }) => {
  const { store } = useContext(Context);

  useEffect(() => {
    const { token } = store

    if (token == null) {
      navigate('/denied')
    }
  }, []);

  return (
    <>
      DETALLE
    </>
  );
};
export default PostDetails;