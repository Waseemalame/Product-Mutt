import { csrfFetch, restoreCSRF } from "./csrf";
import { ValidationError } from "../utils/validationError";

import { LOAD_COMMENTS, REMOVE_COMMENT, ADD_COMMENT } from './comments';
import { LOAD_LIKES, ADD_LIKE, REMOVE_LIKE } from "./likes";

const LOAD = "posts/LOAD";
const ADD = "posts/ADD"
const REMOVE_POST = "posts/:id/REMOVE"
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
const remove = (postId) => ({
  type: REMOVE_POST,
  postId
});


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
export const getComments = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/comments`);


  if (response.ok) {

    const list = await response.json();
    // Data from backend, into regular action
    dispatch(load(list));
  }
};
export const getLikes = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/likes`);


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
export const removePost = (postId) => async dispatch => {

  const response = await csrfFetch(`/api/posts/${postId}`, {
    method: 'delete',
  });

  if (response.ok) {
    // const { id: deletedItemId } = await response.json();
    const id = await response.json();
    dispatch(remove(id));
    return postId;
  }
};



const initialState = {}


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
        // list: action.list,
      };
    case ADD:

      if (!state[action.post.id]) {

        const newState = {
          ...state,
          [action.post.id]: action.post,
        };
        // const postList = newState.list.map((id) => newState[id]);
        // postList.push(action.post);
        // newState.list = postList;
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
        case LOAD_LIKES:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          likes: action.likes.map((comment) => comment.id)
        },
      };
      case ADD_LIKE:
      return {
        ...state,
        [action.like.postId]: {
          ...state[action.like.postId],
          likes: [...state[action.like.postId].likes, action.like.id],
        },
      };
      case REMOVE_POST:
      console.log(action.postId, 'action.post')
      const newState = { ...state };
      delete newState[action.postId];
      return newState;
      case ADD_COMMENT:
      return {
        ...state,
        [action.comment.postId]: {
          ...state[action.comment.postId],
          comments: [...state[action.comment.postId].comments, action.comment.id],
        },
      };
      case REMOVE_COMMENT:
        return {
          ...state,
          [action.postId]: {
            ...state[action.postId],
            comments: state[action.postId].comments.filter(
              (commentId) => commentId !== action.commentId
            ),
          },
        };
      case REMOVE_LIKE:
        console.log(state[action.postId].likes, 'state[action].postId')
        // console.log(state[action.postId].likes.filter((likeId) => likeId !== action.likeId))
        for (let i = 0; i < state[action.postId].likes.length; i++) {
          const likeId = state[action.postId].likes[i];
          // console.log(likeId, 'likeId')
          // console.log(action.likeId, 'action.likeId')
          if(likeId === action.likeId){
            state[action.postId].likes.splice(i, 1)
          }

        }
        console.log(state[action.postId].likes, 'state[action.postId].likes')
        return {
          ...state,
          [action.postId]: {
            ...state[action.postId],
            likes: state[action.postId].likes.filter((likeId) => likeId !== action.likeId),
          },
        };
        default:
      return state;
  }
};

export default postReducer;
