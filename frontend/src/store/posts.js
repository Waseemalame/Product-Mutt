import { csrfFetch, restoreCSRF } from "./csrf";
import { ValidationError } from "../utils/validationError";

import { LOAD_COMMENTS, REMOVE_COMMENT, ADD_COMMENT } from './comments';

const LOAD = "posts/LOAD";
const ADD = "posts/ADD"
const GET_ONE_POST = "posts/:id"


const load = (list) => ({
  type: LOAD,
  list,
});

const addOnePost = (post) => {
  // console.log('IN ADD_ONE_POST ACTION - POST -> ', post)
  return {
    type: ADD,
    post: post,
  };
}

export const getPostDetails = (id) => async dispatch => {

  const response = await fetch(`/api/posts/${id}`);

  if (response.ok) {
    const post = await response.json();
    dispatch(addOnePost(post));
  }
};

export const getPosts = () => async (dispatch) => {
  const response = await fetch(`/api/posts`);


  if (response.ok) {

    const list = await response.json();
    // Data from backend, into regular action
    dispatch(load(list));
  }
};
export const getComments = () => async (dispatch) => {
  const response = await fetch(`/api/posts`);


  if (response.ok) {

    const list = await response.json();
    // Data from backend, into regular action
    dispatch(load(list));
  }
};



export const createPost = (data) => async (dispatch) => {
try {

  const response = await csrfFetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify(data)
  });
    if(!response.ok){
      let error;
      if (response.status === 422) {
        error = await response.json();
        throw new ValidationError(error.errors, response.statusText);
      } else {

        let errorJSON;
        error = await response.text();
        try {
          // Check if the error is JSON, i.e., from the Posts server. If so,
          // don't throw error yet or it will be caught by the following catch
          errorJSON = JSON.parse(error);
        } catch {
          // Case if server could not be reached
          throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
      }
    }

    const newPost = await response.json()
    dispatch(addOnePost(newPost))
    return newPost
  } catch (error) {
    throw error;
  }

}
export const updatePost = (data) => async (dispatch) => {
  console.log(data)
  const response = await csrfFetch(`/api/posts/${data.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const post = await response.json();
    dispatch(addOnePost(post));
    return post;
  }

}


const initialState = {
  list: []
}


const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allPosts = {};
      action.list.forEach((post) => {
        allPosts[post.id] = post;
      });
      return {
        ...allPosts,
        ...state,
        list: action.list,
      };
    case ADD:
      console.log('IN REDUCER ADD ONE CASE - ACTION -> ', action);
      // console.log(state, 'state')
      // console.log(action.post.id, 'action.post.id')
      if (!state[action.post.id]) {
        console.log('NOT state[action.post.id]')
        const newState = {
          ...state,
          [action.post.id]: action.post,
        };
        const postList = newState.list.map((id) => newState[id]);
        postList.push(action.post);
        newState.list = postList;
        return newState;
      }
      return {
        ...state,
        [action.post.id]: {
            ...state[action.post.id],
        ...action.post,
          },
        };
        case LOAD_COMMENTS:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          comments: action.comments.map((comment) => comment.id),
        },
      };

        default:
      return state;
  }
};

export default postReducer;
