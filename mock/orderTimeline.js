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
          cakes: "爆浆海盐奶盖 - 巧克力 x 1、爆浆海盐奶盖 - 抹茶 x 1",
          status: 1,
          isSelfPickUp: false,
          consignee: "张",
          phone: 12345678901,
          deliveryAddress: "天津市南开区天津大学",
          pickUpDate: "2018-08-10",
          pickUpTime: "11:30",
          remark: ""
        },
        {
          orderId: 2,
          cakes: "蓝朋友的心 x 1",
          status: 2,
          isSelfPickUp: false,
          consignee: "张",
          phone: 12345678901,
          deliveryAddress: "天津市南开区天大宿舍",
          pickUpDate: "2018-08-10",
          pickUpTime: "12:00",
          remark: ""
        },
        {
          orderId: 3,
          cakes:
            "爆浆海盐奶盖 - 巧克力 x 1、爆浆海盐奶盖 - 抹茶 x 1、蓝朋友的心 - 巧克力 x 2",
          status: 3,
          isSelfPickUp: false,
          consignee: "张",
          phone: 12345678901,
          deliveryAddress: "天津市南开区大悦城",
          pickUpDate: "2018-08-10",
          pickUpTime: "12:30",
          remark: "双份巧克力"
        }
      ]);
    } else {
      res.json([]);
    }
  }
};
