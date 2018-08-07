export default {
  namespace: "orderList",
  state: {
    list: [],
    total: null,
    page: null
  },
  reducers: {
    orderList(
      state,
      {
        payload: { list, total, page }
      }
    ) {
      return { ...state, list, total, page };
    }
  },
  effects: {
    *fetchOrderList(
      {
        payload: { page = 1 }
      },
      { call, put }
    ) {
      const list = [];
      const total = 2;
      yield put({
        type: "orderList",
        payload: {
          list,
          page,
          total
        }
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/orders/orderList") {
          dispatch({ type: "fetchOrderList", payload: query });
        }
      });
    }
  }
};
