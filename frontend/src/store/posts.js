const LOAD = "pokemon/LOAD";

const load = (list) => ({
  type: LOAD,
  list,
});

export const getPosts = () => async (dispatch) => {
  const response = await fetch(`http://localhost:5000/api/posts`);

  console.log('hihihi', response)
  console.log('safiuhasdfhsdkjfahsd')

  if (response.ok) {
    console.log('REPONSE IS OKAY HERE')
    const list = await response.json();
    dispatch(load(list));
  }
};

const initialState = {
  list: []
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allPosts = {};
      console.log(action.list, 'action.list')
      action.list.forEach((post) => {
        allPosts[post.id] = post;
      });
      return {
        ...state,
        list: action.list,
      };

    default:
      return state;
  }
};

export default postReducer;
