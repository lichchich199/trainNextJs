const userReducer = (state = { statusConfirm : false, user: {}}, action) => {
    switch (action.type) {
      case "START":
        return {
            ...state, 
            statusConfirm: true, 
            user: action.payload.user
        };
      case "END":
        return {
            ...state, 
            statusConfirm: false, 
            user: action.payload.user
        };
      default:
        return state;
    }
  };
  
export default userReducer;