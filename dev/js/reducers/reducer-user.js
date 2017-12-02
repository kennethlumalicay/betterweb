const initialState = {
  uid: 'guest',
  username: 'Guest',
  usertag: 'User',
  guest: true
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch(type) {
    case 'UPDATED_USER':
      return {
        ...payload.user,
        fetching: false
      };
    case 'FAILED_USER_UPDATE':
      return {
        ...state,
        fetching: false
      };
    case 'UPDATE_GUEST':
      return {
        ...payload
      };
    case 'UPVOTED_POST':
      return {
        ...state,
        ups: state.uid === payload.uid ? state.ups + 1 : state.ups
      };
  }
  return state;
}