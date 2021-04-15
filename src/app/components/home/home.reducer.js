import * as types from "./home.type";

const initialState = {
  config: null,
  hasError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case types.HAS_ERROR:
      return Object.assign({}, state, {
        hasError: action.result,
      });
    case types.GET_CONFIG:
      return Object.assign({}, state, {
        config: action.result,
      });
  }
};

export default reducer;
