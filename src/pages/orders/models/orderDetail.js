import * as orderService from "../services/orders";

export default {
  namespace: "orderDetail",

  state: {
    order: {},
    visible: false,
    cakes: []
  },

  reducers: {
    editOrder(
      state,
      {
        payload: { order, cakes }
      }
    ) {
      return { ...state, order, cakes, visible: true };
    },
    closeOrderDetailPanel(state) {
      return { ...state, order: {}, visible: false };
    }
  },

  effects: {},

  subscriptions: {}
};
