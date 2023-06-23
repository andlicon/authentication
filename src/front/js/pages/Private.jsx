import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext.js'
import Post from '../component/Post.jsx';

const Private = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const { token } = store

    if (token == null) {
      navigate('/denied')
    }
  }, []);

  useEffect(() => {
    setPosts(store.posts);
  }, [store.posts]);

  return (
    <div className='container'>
      {
        posts && posts.map(post => {
          return (
            <Post key={post.id} post={post} />
          )
        })
      }
    </div>
  );
};
export default Private;