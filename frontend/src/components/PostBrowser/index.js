import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/posts';
import CreatePostForm from '../CreatePostForm/index';
import { NavLink, Route, useParams } from 'react-router-dom';

import PostList from '../PostList';


const PostBrowser = () => {

  const dispatch = useDispatch();

  // const posts = useSelector(state => {
  //   console.log(state.posts, 'typeof state.posts')
  // });
  // const posts = useSelector(state => {
  //   return state.posts.list.map(postId => postId)
  // });

  useEffect(() => {

    dispatch(getPosts())

  }, [dispatch]);

  return(
    <div className='main'>
      <ul>
        <CreatePostForm />
      </ul>
      <Route path="/">
          <PostList />
      </Route>
    </div>
  )
}
export default PostBrowser;
