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
    case 'UPVOTED_POST':
      return {
        ...state,
        items: [...state.items.map(e => e.pid === payload.pid ? { ...payload, ups: payload.ups + 1, voted: [...payload.voted, payload.user] } : e)]
      };
    case 'UPDATED_USER':
      return {
        ...state,
        items: [...payload.posts]
      };
    case 'ADDED_COMMENT':
      return {
        ...state,
        items: [...state.items.map(e => {
          if(e.pid === payload.pid) {
            return {
              ...e,
              commentCount: e.commentCount + 1,
              newComment: true,
              lastComment: Date.now()
            };
          }
          return e;
        })]
      };
    case 'DELETED_COMMENT':
      return {
        ...state,
        items: [...state.items.map(e => {
          if(e.pid === payload.pid) {
            return {
              ...e,
              commentCount: e.commentCount - 1
            };
          }
          return e;
        })]
      };
    case 'CHECKED_POST':
      return {
        ...state,
        items: [...state.items.map(e => {
          if(e.pid === payload) {
            return {
              ...e,
              newComment: false
            };
          }
          return e;
        })]
      };
  }
  return state;
}