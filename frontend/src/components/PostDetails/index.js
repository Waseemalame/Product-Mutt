import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getPostDetails } from '../../store/posts';
import EditPostForm from '../EditPostForm';

const PostDetails = () => {
  return (
    <>
      <div>Hello from PostDetails</div>

    </>
  )
}

export default PostDetails
