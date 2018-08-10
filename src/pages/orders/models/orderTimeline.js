import * as orderService from "../services/orders";

export default {
  namespace: "orderTimeline",
  state: {
    orders: [],
    date: null
  },
  reducers: {
    showOrderTimeline(
      state,
      {
        payload: { orders, date }
      }
    ) {
      return { ...state, orders, date };
    }
  },
  effects: {
    *fetchOrderTimeline(
      {
        payload: { date }
      },
      { call, put }
    ) {
      const { data } = yield call(orderService.fetchOrderTimeline, {
        date
      });
      yield put({
        type: "showOrderTimeline",
        payload: {
          orders: data,
          date
        }
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/orders/orderTimeline") {
          const date = query.date || new Date().toJSON().slice(0, 10);
          dispatch({ type: "fetchOrderTimeline", payload: { date } });
        }
      });
    }
  }
};
