import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/posts';
import CreatePostForm from '../CreatePostForm/index';
import EditPostForm from '../EditPostForm';
import { NavLink, Route, useParams } from 'react-router-dom';

import PostList from '../PostList';


const PostBrowser = () => {

  // const dispatch = useDispatch();

  // useEffect(() => {

  //   dispatch(getPosts())

  // }, [dispatch]);

  return(
    <div className='main'>
      <ul>
        <CreatePostForm />
        <EditPostForm />
      </ul>
      <Route path="/">
          <PostList />
      </Route>
    </div>
  )
}
export default PostBrowser;
