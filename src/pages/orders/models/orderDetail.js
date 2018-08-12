import * as orderService from "../services/orders";

export default {
  namespace: "orderDetail",

  state: {
    order: {},
    visible: false
  },

  reducers: {
    createOrder(state) {
      const order = {
        orderId: null,
        cakes: [],
        consignee: null,
        phone: null,
        isSelfPickUp: true,
        pickUpDate: new Date().toJSON().substring(0, 10),
        pickUpTime: new Date().toJSON().substring(11, 16),
        deliveryAddress: null,
        deliveryFee: 0,
        remark: null,
        shouldPay: 0,
        actualPay: 0
      };
      return { ...state, order, visible: true };
    },
    closeOrderDetailPanel(state) {
      return { ...state, order: {}, visible: false };
    }
  },

  effects: {},

  subscriptions: {}
};
