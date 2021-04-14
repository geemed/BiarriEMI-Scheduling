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
};

export default reducers;
