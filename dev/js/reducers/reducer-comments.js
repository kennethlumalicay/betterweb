function postComment (state = null, action) {
  const { payload, type } = action;
  switch(type) {
    case 'FETCHING_COMMENTS':
      return {
        items: [...state],
        fetching: true,
        failedFetch: false
      };
    case 'FETCHED_COMMENTS':
      return {
        items: [...payload],
        fetching: false,
        failedFetch: false
      };
    case 'FAILED_FETCH_COMMENTS':
      return {
        items: [...state],
        fetching: false,
        failedFetch: true
      };
    case 'ADDED_COMMENT':
      return {
        ...state,
        items: [
          ...state.items,
          payload
        ]
      };
    case 'UPDATED_USER':
      return {
        ...state,
        items: [...payload.comments]
      };
  }
  return state;
}

const initialState = {
  items: []
};

export default function (state = initialState, action) {
  const { payload, type, pid } = action;
  switch(type) {
    case 'FETCHING_COMMENTS':
      return {
        items: [...state],
        fetching: true,
        failedFetch: false
      };
    case 'FETCHED_COMMENTS':
      return {
        items: [...payload],
        fetching: false,
        failedFetch: false
      };
    case 'FAILED_FETCH_COMMENTS':
      return {
        items: [...state],
        fetching: false,
        failedFetch: true
      };
    case 'ADDED_COMMENT':
      return {
        ...state,
        items: [
          ...state.items,
          payload
        ]
      };
    case 'DELETED_COMMENT':
      return {
        ...state,
        items: [
          ...state.items.filter(e => e.cid !== payload)
        ]
      };
    case 'UPDATED_USER':
      return {
        ...state,
        items: [...payload.comments]
      };
  }
  return state;
}