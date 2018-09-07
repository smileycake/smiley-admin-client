import { queryCakes, queryCakeDetail } from '../services/cake';

export default {
  namespace: 'cakes',

  state: {
    cakes: [],
    cakeDetail: null,
  },

  effects: {
    *fetchCakes({ payload }, { call, put }) {
      const response = yield call(queryCakes, payload);
      yield put({
        type: 'queryCakes',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *fetchCakeDetail({ payload }, { call, put }) {
      const response = yield call(queryCakeDetail, payload);
      yield put({
        type: 'queryCakeDetail',
        payload: response,
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
    queryCakeDetail(state, action) {
      return {
        ...state,
        cakeDetail: action.payload,
      };
    },
    resetCakeDetail(state) {
      return {
        ...state,
        cakeDetail: null,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/cake/list/cakeDetail') {
          dispatch({
            type: 'fetchCakeDetail',
          });
        }
      });
    },
  },
};
