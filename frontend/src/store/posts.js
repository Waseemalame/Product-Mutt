import { csrfFetch, restoreCSRF } from "./csrf";

const LOAD = "posts/LOAD";
const ADD = "posts/ADD"
const load = (list) => ({
  type: LOAD,
  list,
});

const addOnePost = (post) => {
  console.log('IN ADD_ONE_POST ACTION - POST -> ', post)
  return {
    type: ADD,
    post: post,
  };
}

export const getPosts = () => async (dispatch) => {
  const response = await fetch(`/api/posts`);


  if (response.ok) {

    const list = await response.json();
    dispatch(load(list));
  }
};

export const createPost = (data) => async (dispatch) => {

  const response = await csrfFetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  const newPost = await response.json()
  return newPost
  }

    // .then(res => res.json()).then(data => console.log(data, 'data'))
  // console.log('response', response)

const initialState = {
  list: []
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      console.log(action.list)
      const allPosts = {};
      action.list.forEach((post) => {
        allPosts[post.id] = post;
      });
      return {
        ...state,
        ...allPosts
      };
    case ADD:
      console.log('WE IN THE REDUCER NOW')
      console.log(action, 'action here in reducer')
      return {
        ...state,

      }

    default:
      return state;
  }
};

export default postReducer;
