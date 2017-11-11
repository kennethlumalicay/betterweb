export default function (state = null, action) {
  const { payload, type } = action;
  switch(type) {
    case 'FETCHED_ADMINS':
      return {
        ...state,
        accounts: [...payload],
        logs: state.logs + '\nSUCCESS: fetched admins'
      };
    case 'ADDED_ADMIN':
      return {
        ...state,
        accounts: [...state.accounts, payload],
        logs: state.logs + '\nSUCCESS: added admin ' + payload.username
      };
    case 'REMOVED_ADMIN':
      return {
        ...state,
        accounts: state.accounts.filter(e => e._id !== payload.id),
        logs: state.logs + '\nSUCCESS: removed admin ' + payload.username
      };
    case 'UPDATE_LOGS':
      return {
        ...state,
        logs: state.logs + '\n' + payload,
      };
  }
  return state;
}