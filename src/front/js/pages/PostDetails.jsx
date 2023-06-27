import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import Post from '../component/Post.jsx';

const PostDetails = () => {
  const { store, actions } = useContext(Context);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([])
  const { postId } = useParams();

  useEffect(() => {
    const { token } = store;
    const { getOnePost } = actions;

    if (token == null) {
      navigate('/denied')
    }
    else {
      setPost(getOnePost(postId));
    }
  }, []);

  return (
    <div className='container'>
      {
        post && <Post post={post} />
      }
    </div>
  );
};
export default PostDetails;