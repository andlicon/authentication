import React, { useEffect } from 'react';

const PostDetails = ({ post }) => {

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