const initialState = {
  items: []
};

export default function (state = initialState, action) {
  const { type } = action;
  switch(type) {
    case 'REMOVE_NOTIF':
      const arrShift = [...state.items.slice(1)];
      return {
        items: arrShift,
        remove: false
      };
    case 'UPDATED_USER':
      return {
        items: [...state.items, {
          msg: 'Updated user',
          msgClass: 'n-success',
          timestamp: Date.now()
        }],
        remove: true
      };
    case 'FAILED_USER_UPDATE':
      return {
        items: [...state.items, {
          msg: 'Failed to update user',
          msgClass: 'n-failed',
          timestamp: Date.now()
        }],
        remove: true
      };
    case 'UPDATE_GUEST':
      return {
        items: [...state.items, {
          msg: 'Updated guest',
          msgClass: 'n-success',
          timestamp: Date.now()
        }],
        remove: true
      };
    /*
    case 'FETCHING_POSTS':
      return {
        items: [...state.items, {
          msg: 'Fetching posts',
          msgClass: '',
          timestamp: Date.now()
        }],
        remove: true
      };
    case 'FETCHED_POSTS':
      return {
        items: [...state.items, {
          msg: 'Fetched posts',
          msgClass: 'n-success',
          timestamp: Date.now()
        }],
        remove: true
      };
    case 'FAILED_FETCH_POSTS':
      return {
        items: [...state.items, {
          msg: 'Failed to fetch posts',
          msgClass: 'n-failed',
          timestamp: Date.now()
        }],
        remove: true
      };
    */
    case 'ADDED_POST_NOTIF':
      return {
        items: [...state.items, {
          msg: 'Added post',
          msgClass: 'n-success',
          timestamp: Date.now()
        }],
        remove: true
      };
    case 'FAILED_ADD_POST':
      return {
        items: [...state.items, {
          msg: 'Failed to add post',
          msgClass: 'n-failed',
          timestamp: Date.now()
        }],
        remove: true
      };
      
    // form checks
    case 'INVALID_FILE_TYPE':
      return {
        items: [...state.items, {
          msg: 'Use .jpg or .png image',
          msgClass: 'n-failed',
          timestamp: Date.now()
        }],
        remove: true
      };
    case 'FILE_TOO_BIG':
      return {
        items: [...state.items, {
          msg: 'File size limit is 1.5mb',
          msgClass: 'n-failed',
          timestamp: Date.now()
        }],
        remove: true
      };
    case 'INVALID_PROTOCOL':
      return {
        items: [...state.items, {
          msg: 'https:// or http:// protocol required',
          msgClass: 'n-failed',
          timestamp: Date.now()
        }],
        remove: true
      };
    case 'INVALID_GITHUB_LINK':
      return {
        items: [...state.items, {
          msg: 'Invalid github repo',
          msgClass: 'n-failed',
          timestamp: Date.now()
        }],
        remove: true
      };
    case 'SPAM':
      return {
        items: [...state.items, {
          msg: 'Please avoid spamming',
          msgClass: 'n-failed',
          timestamp: Date.now()
        }],
        remove: true
      };
  }
  return state;
}