import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/post.css';


const Post = ({ post }) => {
  return (
    <div className='post'>
      <Link className='post__title' to={`/private/${post.id}`}>
        {
          post.title
        }
      </Link>
      <p className='post__author'>
        {
          post.user_id
        }
      </p>
      <p className='post__description'>
        {
          post.description
        }
      </p>
    </div>
  );
};
export default Post;