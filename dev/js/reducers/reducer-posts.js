const initialState = {
  items: []
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  const removeOne = (pid) => state.items.filter(e => e.pid !== pid);
  switch(type) {
    case 'FETCHING_POSTS':
      return {
        items: [...state],
        fetching: true,
        failedFetch: false
      };
    case 'FETCHED_POSTS':
      return {
        items: [...payload],
        fetching: false,
        failedFetch: false,
        onepage: false
      };
    case 'FAILED_FETCH_POSTS':
      return {
        items: [...state],
        fetching: false,
        failedFetch: true
      };
    case 'FETCHING_ONE_POST':
      return {
        items: [...state],
        fetching: true,
        failedFetch: false
      };
    case 'FETCHED_ONE_POST':
      return {
        ...state,
        items: [...state.items, ...payload],
        fetching: false,
        failedFetch: false,
        onepage: true
      };
    case 'FAILED_FETCH_ONE_POST':
      return {
        items: [...state],
        fetching: false,
        failedFetch: true
      };
    case 'ADDED_POST':
      return {
        ...state,
        items: [...state.items, payload]
      };
    case 'UPDATED_POST':
      return {
        ...state,
        items: [...removeOne(payload.pid), payload]
      };
    case 'DELETED_POST':
      return {
        ...state,
        items: [...removeOne(payload)]
      };
    case 'UPDATED_USER':
      return {
        ...state,
        items: [...payload.posts]
      };
  }
  return state;
}