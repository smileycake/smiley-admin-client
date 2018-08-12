import * as orderService from "../services/orders";

export default {
  namespace: "orderDetail",

  state: {
    order: {},
    visible: false
  },

  reducers: {
    editOrder(
      state,
      {
        payload: { order }
      }
    ) {
      return { ...state, order, visible: true };
    },
    closeOrderDetailPanel(state) {
      return { ...state, order: {}, visible: false };
    }
  },

  effects: {},

  subscriptions: {}
};
