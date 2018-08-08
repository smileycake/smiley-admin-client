/*
    isSelfPickUp: true: 自提 false: 配送
    status: 1 已下单 2 已付款 3 已完成 4 已退款
 */
export default {
  "GET /api/orders": (req, res) => {
    res.set("x-total-count", 4);
    if (req.query._page === "1") {
      res.json([
        {
          orderId: 1,
          cakes: "爆浆海盐奶盖 - 巧克力 x 1、爆浆海盐奶盖 - 抹茶 x 1",
          status: 1,
          isSelfPickUp: false,
          pickUpTime: "2018-08-08 12:30"
        },
        {
          orderId: 2,
          cakes:
            "爆浆海盐奶盖 - 巧克力 x 1、爆浆海盐奶盖 - 抹茶 x 1、蓝朋友的心 - 巧克力 x 2",
          status: 1,
          isSelfPickUp: false,
          pickUpTime: "2018-08-08 12:30"
        }
      ]);
    } else {
    }
  },
  "GET /api/orderDetail": (req, res) => {
    if (req.query._orderId === "1") {
      res.json({
        orderId: 1,
        cakes: [
          {
            cakeId: 2,
            cakeName: "爆浆海盐奶盖",
            specId: "2-1",
            specName: "巧克力",
            quantity: 1,
            price: 98,
            customize: [
              {
                materialId: 4,
                name: "草莓",
                price: 40,
                quantity: 2,
                totalPrice: 80
              },
              {
                materialId: 2,
                name: "糖",
                price: 20,
                quantity: 2,
                totalPrice: 40
              }
            ],
            totalPrice: 218
          }
        ],
        deliveryInfo: {
          receiverName: "aaa",
          phone: 17722222222,
          date: "2018.08.07",
          time: "12:08",
          isSelfPickUp: false,
          address: "地址地址地址地址地址地址",
          deliverFee: 20
        },
        pay: {
          amountPayable: 238,
          actuallyPayed: 238
        }
      });
    }
  }
};
