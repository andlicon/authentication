import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';

const PostDetails = ({ post }) => {
  const { store, actions } = useContext(Context);
  const { postId } = useParams();

  useEffect(() => {
    const { token } = store
    const { getOnePost } = actions;

    if (token == null) {
      navigate('/denied')
    }
    else {
      console.log(getOnePost(postId));
    }
  }, []);

  return (
    <>
      DETALLE
    </>
  );
};
export default PostDetails;