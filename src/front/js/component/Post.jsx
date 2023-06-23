import React from 'react';
const Post = ({ post }) => {
  return (
    <div className='post'>
      <h2 className='post__title'>
        {
          post.title
        }
      </h2>
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