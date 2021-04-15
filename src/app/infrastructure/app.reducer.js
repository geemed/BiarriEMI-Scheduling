import { Home, Schedule } from "app-component/reducer";

const createReducer = (reducerFn, reducerName) => {
  return (state, action) => {
    const { name } = action;
    const isInitiated = state === undefined;

    if (name !== reducerName && !isInitiated) return state;

    return reducerFn(state, action);
  };
};

const reducers = {
  /** reducerName: createReducer(ReducerName, "reducerName"), */
  home: createReducer(Home, "home"),
  schedule: createReducer(Schedule, "schedule"),
};

export default reducers;
