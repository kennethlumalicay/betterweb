export default function (state = null, action) {
  const { payload, type } = action;
  switch(type) {
    case 'USER_SELECTED':
      return {
        ...state,
        payload
      };
  }
  return state;
}