import { queryOrders } from '../services/order';

export default {
  namespace: 'orders',

  state: {
    orders: [],
  },

  effects: {
    *fetchOrders({ payload }, { call, put }) {
      const response = yield call(queryOrders, payload);
      yield put({
        type: 'queryOrders',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    queryOrders(state, action) {
      return {
        ...state,
        orders: action.payload,
      };
    },
  },
};
