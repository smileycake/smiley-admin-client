import { queryCakes } from '../services/cake';

export default {
  namespace: 'cakes',

  state: {
    cakes: [],
  },

  effects: {
    *fetchCakes({ payload }, { call, put }) {
      const response = yield call(queryCakes, payload);
      yield put({
        type: 'queryCakes',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    queryCakes(state, action) {
      return {
        ...state,
        cakes: action.payload,
      };
    },
  },
};
