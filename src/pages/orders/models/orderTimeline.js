import * as orderService from "../services/orders";
import * as cakeService from "../../cakes/services/cakes";

export default {
  namespace: "orderTimeline",

  state: {
    orders: [],
    date: null,
    cakes: []
  },

  reducers: {
    showOrderTimeline(
      state,
      {
        payload: { orders, date }
      }
    ) {
      return { ...state, orders, date };
    },
    cacheCakeList(
      state,
      {
        payload: { cakes }
      }
    ) {
      return { ...state, cakes };
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
    },
    *fetchCakes({}, { call, put }) {
      const { data } = yield call(cakeService.fetchCakeList);
      yield put({
        type: "cacheCakeList",
        payload: {
          cakes: data
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
          dispatch({ type: "fetchCakes" });
        }
      });
    }
  }
};
