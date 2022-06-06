import { csrfFetch } from "./csrf";

export const LOAD_LIKES = "likes/LOAD_LIKES";
export const ADD_LIKE = "likes/ADD_LIKE";
export const REMOVE_LIKE = "likes/REMOVE_LIKE";
export const GET_LIKES = '/like/get'
export const CREATE_LIKE = '/like/create'
const DELETE_LIKE ='/like/delete'


const load = (likes, postId) => ({
  type: LOAD_LIKES,
  likes
});

// const add = (like) => ({
//   type: ADD_LIKE,
//   like
// });
const createLike = like => {
  return {
      type: CREATE_LIKE,
      like
  }
}

const remove = (likeId, postId) => ({
  type: REMOVE_LIKE,
  likeId,
  postId
});
const deleteLike = likeId => {
  return {
      type: DELETE_LIKE,
      likeId
  }
}
const getLikes = likes => {
  return {
      type: GET_LIKES,
      likes
  }
}

export const getLikeThunk = postId => async dispatch =>  {
  const response = await csrfFetch(`/api/likes/${postId}`)
  const likes = await response.json()
  dispatch(getLikes(likes))
  return likes
}
export const addLikeThunk = like => async dispatch =>  {
  const response = await csrfFetch('/api/likes', {
      method: "POST",
      body: JSON.stringify(like)
  })
  const newLike = await response.json()
  dispatch(createLike(newLike))
}

export const deleteLikeThunk = like => async dispatch =>  {
  const response = await csrfFetch('/api/likes', {
      method: "DELETE",
      boody: JSON.stringify(like)
  })
  const deleteResultId = await response.json()
  dispatch(deleteLike(deleteResultId))
}

const initialState = {};

const likesReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_LIKES:
      const newLikes = {};
      action.likes.forEach(like => {
        newLikes[like.id] = like;
      })
      return {
        ...state,
        ...newLikes
      }
    case ADD_LIKE:
      return {
        ...state,
        [action.like.id]: action.like
      };
    case REMOVE_LIKE:
      const newState = { ...state };
      delete newState[action.likeId];
      return newState;
    // case UPDATE_COMMENT:
    //   return {
    //     ...state,
    //     [action.comment.id]: action.comment
    //   };
    default:
      return state;
  }
};

export default likesReducer;
