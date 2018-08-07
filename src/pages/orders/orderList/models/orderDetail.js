export default {
  namespace: "orderDetail",
  state: {
    orderDetailInfo: {},
    editing: false,
    visible: false
  },
  reducers: {
    createOrder(state) {
      return {
        ...state,
        editing: true,
        visible: true
      };
    },
    showOrderDetailPanel(
      state,
      {
        payload: { editing, visible }
      }
    ) {
      return { ...state, editing, visible };
    }
  },
  effects: {
    *fetchOrderDetail(
      {
        payload: { editing }
      },
      { call, put }
    ) {
      yield put({
        type: "showShowDetailPanel",
        payload: {
          visible: true,
          editing
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
