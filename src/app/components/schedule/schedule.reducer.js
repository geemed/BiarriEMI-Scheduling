import * as types from "./schedule.type";

const initialState = {
  employees: null,
  shifts: null,
  roles: null,
  data: null,
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
    case types.GET:
      return Object.assign({}, state, {
        employees: action.result.employees,
        shifts: action.result.shifts,
        roles: action.result.roles,
        data: action.result.data
      });
    case types.GET_EMPLOYEES:
      return Object.assign({}, state, {
        employees: action.result,
      });
    case types.GET_SHIFTS:
      return Object.assign({}, state, {
        shifts: action.result,
      });
    case types.GET_ROLES:
      return Object.assign({}, state, {
        roles: action.result,
      });
  }
};

export default reducer;
