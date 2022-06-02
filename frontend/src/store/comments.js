export const LOAD_COMMENTS = "comments/LOAD_COMMENTS";
export const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
export const REMOVE_COMMENT = "comments/REMOVE_COMMENT";
export const ADD_COMMENT = "comments/ADD_COMMENT";


const load = (comments, postId) => ({
  type: LOAD_COMMENTS,
  comments,
  postId
});

const update = (comment) => ({
  type: UPDATE_COMMENT,
  comment
});

const add = (comment) => ({
  type: ADD_COMMENT,
  comment
});

const remove = (commentId, postId) => ({
  type: REMOVE_COMMENT,
  commentId,
  postId
});


export const getComments = (postId) => async (dispatch) => {

  const response = await fetch(`/api/posts/${postId}/comments`);

  if (response.ok) {
    const comments = await response.json();
    dispatch(load(comments, postId));
  }
};


const initialState = {};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_COMMENTS:
      // console.log(action.comments, 'action.comments')
      const newComments = {};
      action.comments.forEach(comment => {
        // console.log(comment.id, 'comment!!!')
        newComments[comment.id] = comment;
        // console.log(newComments, 'newComments')
      })
      return {
        ...state,
        ...newComments
      }
    case REMOVE_COMMENT:
      const newState = { ...state };
      delete newState[action.commentId];
      return newState;
    case ADD_COMMENT:
    case UPDATE_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      };
    default:
      return state;
  }
};

export default commentsReducer;
