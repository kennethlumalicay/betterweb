const initialState = {
  items: []
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch(type) {
    case 'USERS_FETCHING':
      return {
        ...state,
        items: [...state.items],
        fetching: true,
        failedFetch: false
      };
    case 'USERS_FETCHED':
      return {
        ...state,
        items: [...payload],
        fetching: false,
        failedFetch: false
      };
    case 'FAILED_USERS_FETCH':
      return {
        ...state,
        fetching: false,
        failedFetch: true
      };
    case 'UPDATED_USER':
      return {
        ...state,
        items: [...state.items.map(e => e.uid !== payload.user.uid ? e : payload.user)]
      };
  }
  return state;
}