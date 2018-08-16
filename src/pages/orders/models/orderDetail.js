import * as orderService from "../services/orders";

export default {
  namespace: "orderDetail",

  state: {
    order: {},
    cakes: [],
    visible: false
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
      return { ...state, order: {}, cakes: [], visible: false };
    }
  },

  effects: {},

  subscriptions: {}
};
