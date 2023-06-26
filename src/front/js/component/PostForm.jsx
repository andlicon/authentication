import React, { useState } from 'react';
import '../../styles/postForm.css';

const initialValues = {
  'title': '',
  'description': ''
}

const PostForm = () => {
  const [postInfo, setPostInfo] = useState(initialValues);

  const changeHandler = ({ target }) => {
    setPostInfo({
      ...postInfo,
      [target.name]: target.value
    })
  }

  return (
    <form className='postForm'>
      <h2 className='postForm__title text-primary'>
        New post
      </h2>
      <div className='form-group group'>
        <label htmlFor='title' className='group-label'>
          Title
        </label>
        <input
          type='text'
          id='title'
          name='title'
          placeholder='Title example'
          value={postInfo['title']}
          onChange={changeHandler}
          className='group-input form-control' />
      </div>
      <div className='form-group group'>
        <label htmlFor='description' className='group-label'>
          Description
        </label>
        <textarea
          name='description'
          id='description'
          placeholder='Description example'
          value={postInfo['description']}
          onChange={changeHandler}
          className='group-input form-control'></textarea>
      </div>
      <button
        type='button'
        className='btn btn-primary group-input form-control w-50 postform__submit'>
        Post it!
      </button>
    </form>
  );
};
export default PostForm;