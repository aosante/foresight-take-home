import { useCallback, useReducer } from 'react';

const asyncReducer = (_, action) => {
  const { data, type, error } = action;
  switch (type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null };
    }
    case 'resolved': {
      return { status: 'resolved', data: data, error: null };
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: error };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

const defaultInitialState = {
  status: 'idle',
  data: null,
  error: null,
};

const useAsync = (initialState) => {
  const [state, dispatch] = useReducer(asyncReducer, {
    ...defaultInitialState,
    ...initialState,
  });

  const run = useCallback(
    (promise) => {
      dispatch({ type: 'pending' });
      promise.then(
        (data) => {
          dispatch({ type: 'resolved', data: data });
        },
        (error) => {
          dispatch({ type: 'rejected', error });
        }
      );
    },
    [dispatch]
  );

  return {
    ...state,
    run,
  };
};

export { useAsync };
