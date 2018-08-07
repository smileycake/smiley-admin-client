import * as ordersService from "../services/orders";

export default {
  namespace: "orderDetail",
  state: {
    orderDetailInfo: {},
    editing: false,
    visible: false
  },
  reducers: {
    showOrderDetail(
      state,
      {
        payload: { cakeDetailInfo }
      }
    ) {
      return { ...state, cakeDetailInfo };
    },
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
        payload: { orderId, editing }
      },
      { call, put }
    ) {
      yield put({
        type: "showOrderDetailPanel",
        payload: {
          visible: true,
          editing
        }
      });
      const { data } = yield call(ordersService.fetchOrderDetail, {
        orderId
      });
      yield put({
        type: "showOrderDetail",
        payload: {
          orderDetailInfo: data
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
