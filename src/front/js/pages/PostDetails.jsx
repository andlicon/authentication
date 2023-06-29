import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import Post from '../component/Post.jsx';

const PostDetails = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
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
      <div className='container--comments'>
        {
          comments && comments.map(element => {
            return (
              <Post key={element.id} post={element} />
            );
          })
        }
      </div>
    </div>
  );
};
export default PostDetails;