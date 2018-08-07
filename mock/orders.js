/*
    isSelfPickUp: true: 自提 false: 配送
 */
export default {
  "GET /api/orders": (req, res) => {
    res.set("x-total-count", 4);
    if (req.query._page === "1") {
      res.json([
        {
          orderId: 1,
          cakes: [
            {
              cakeId: 2,
              specs: [
                {
                  specId: "2-1",
                  name: "巧克力",
                  quantity: 1
                }
              ]
            }
          ],

          name: "蓝朋友的心",
          type: "慕斯",
          cost: "15.00",
          price: "45.00",
          isGroupPurchase: false,
          children: []
        },
        {
          id: 2,
          name: "爆浆海盐奶盖",
          type: "奶油蛋糕",
          cost: "30.00 - 35.00",
          price: "98.00 - 98.00",
          children: [
            {
              id: "2-1",
              name: "巧克力",
              cost: "30.00",
              price: "98.00",
              isGroupPurchase: true
            },
            {
              id: "2-2",
              name: "抹茶",
              cost: "30.00",
              price: "98.00",
              isGroupPurchase: true
            },
            {
              id: "2-3",
              name: "酸奶奶油",
              cost: "35.00",
              price: "98.00",
              isGroupPurchase: false
            }
          ]
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
