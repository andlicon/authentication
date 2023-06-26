import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext.js'
import PostForm from '../component/PostForm.jsx';
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
    <div className='container container--post'>
      <div className='post-section'>
        {
          posts && posts.map(post => {
            return (
              <Post key={post.id} post={post} />
            )
          })
        }
      </div>
      <div className='postForm-section'>
        <PostForm />
      </div>
    </div>
  );
};
export default Private;