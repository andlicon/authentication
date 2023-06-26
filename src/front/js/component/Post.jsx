import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/post.css';


const Post = ({ post }) => {
  return (
    <div className='post bg-light'>
      <div className='post__header'>
        <Link className='post__title' to={`/private/${post.id}`}>
          {
            post.title
          }
        </Link>
      </div>
      <div className="post__content">
        <p className='post__author'>
          {
            post.user_nickname
          }
        </p>
        <p className='post__description'>
          {
            post.description
          }
        </p>
      </div>
    </div>
  );
};
export default Post;