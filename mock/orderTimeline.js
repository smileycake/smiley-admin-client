/*
    isSelfPickUp: true: 自提 false: 配送
    status: 1 未付款 2 已付款 3 已完成 4 已退款
 */
export default {
  "GET /api/orders/timeline": (req, res) => {
    if (req.query._date === "2018-08-10") {
      res.json([
        {
          orderId: 1,
          cakes: [
            {
              cakeId: 1,
              specId: "1-1",
              name: "爆浆海盐奶盖",
              spec: "巧克力",
              quantity: 1,
              price: 98
            },
            {
              cakeId: 1,
              specId: "1-2",
              name: "爆浆海盐奶盖",
              spec: "抹茶",
              quantity: 2,
              price: 98
            }
          ],
          status: 1,
          consignee: "张",
          isSelfPickUp: false,
          phone: 12345678901,
          pickUpDate: "2018-08-10",
          pickUpTime: "11:30",
          deliveryAddress: "天津市南开区天津大学",
          deliveryFee: 0,
          remark: "",
          shouldPay: 240,
          realPay: 0
        },
        {
          orderId: 2,
          cakes: [
            {
              cakeId: 2,
              specId: "2-1",
              name: "蓝朋友的心",
              spec: "巧克力",
              quantity: 1,
              price: 39
            }
          ],
          status: 2,
          consignee: "张",
          isSelfPickUp: false,
          phone: 12345678901,
          pickUpDate: "2018-08-10",
          pickUpTime: "12:00",
          deliveryAddress: "天津市南开区天大宿舍",
          deliveryFee: 0,
          remark: "",
          shouldPay: 240,
          realPay: 0
        },
        {
          orderId: 3,
          cakes: [
            {
              cakeId: 1,
              specId: "1-1",
              name: "爆浆海盐奶盖",
              spec: "巧克力",
              quantity: 1,
              price: 98
            },
            {
              cakeId: 1,
              specId: "1-2",
              name: "爆浆海盐奶盖",
              spec: "抹茶",
              quantity: 1,
              price: 98
            },
            {
              cakeId: 2,
              specId: "2-1",
              name: "蓝朋友的心",
              spec: "巧克力",
              quantity: 2,
              price: 39
            }
          ],
          status: 3,
          consignee: "张",
          isSelfPickUp: false,
          phone: 12345678901,
          pickUpDate: "2018-08-10",
          pickUpTime: "12:30",
          deliveryAddress: "天津市南开区大悦城",
          deliveryFee: 0,
          remark: "双份巧克力",
          shouldPay: 240,
          realPay: 240
        },
        {
          orderId: 4,
          cakes: [
            {
              cakeId: 1,
              specId: "1-1",
              name: "爆浆海盐奶盖",
              spec: "巧克力",
              quantity: 1,
              price: 98
            },
            {
              cakeId: 1,
              specId: "1-2",
              name: "爆浆海盐奶盖",
              spec: "抹茶",
              quantity: 1,
              price: 98
            }
          ],
          status: 1,
          consignee: "张",
          isSelfPickUp: false,
          phone: 12345678901,
          pickUpDate: "2018-08-10",
          pickUpTime: "14:30",
          deliveryAddress: "天津市南开区天津大学",
          deliveryFee: 0,
          remark: "",
          shouldPay: 240,
          realPay: 0
        },
        {
          orderId: 5,
          cakes: [
            {
              cakeId: 2,
              specId: "2-1",
              name: "蓝朋友的心",
              spec: "巧克力",
              quantity: 1,
              price: 39
            }
          ],
          status: 2,
          consignee: "张",
          isSelfPickUp: false,
          phone: 12345678901,
          pickUpDate: "2018-08-10",
          pickUpTime: "16:00",
          deliveryAddress: "天津市南开区天大宿舍",
          deliveryFee: 0,
          remark: "",
          shouldPay: 240,
          realPay: 0
        }
      ]);
    } else {
      res.json([]);
    }
  }
};
