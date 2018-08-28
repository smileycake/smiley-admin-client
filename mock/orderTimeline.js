/*
    isSelfPickUp: true: 自提 false: 配送
    status: 1 未付款 2 已付款 3 已完成 4 已退款
 */
export default {
  "GET /api/orders/timeline": (req, res) => {
    if (req.query._date === "2018-08-23") {
      res.json([
        {
          pickUpTime: "11:30",
          orders: [
            {
              orderId: 1,
              cakes: [
                {
                  cakeId: 1,
                  name: "爆浆海盐奶盖",
                  taste: "巧克力",
                  spec: "6寸 + 装饰",
                  quantity: 1
                },
                {
                  cakeId: 2,
                  name: "蓝朋友的心",
                  taste: "巧克力",
                  spec: "30g",
                  quantity: 1
                }
              ],
              status: 1,
              consignee: "张",
              isSelfPickUp: false,
              phone: 12345678901,
              deliveryAddress: "天津市南开区天津大学",
              deliveryFee: 12,
              remark: "",
              totalPrice: 189,
              realPay: 201
            },
            {
              orderId: 2,
              cakes: [
                {
                  cakeId: 1,
                  name: "爆浆海盐奶盖",
                  taste: "巧克力",
                  spec: "6寸",
                  quantity: 1
                }
              ],
              status: 2,
              consignee: "张",
              isSelfPickUp: true,
              phone: 12345678901,
              deliveryAddress: "",
              deliveryFee: 0,
              remark: "",
              totalPrice: 98,
              realPay: 98
            }
          ]
        },
        {
          pickUpTime: "12:30",
          orders: [
            {
              orderId: 3,
              cakes: [
                {
                  cakeId: 2,
                  name: "蓝朋友的心",
                  taste: "巧克力",
                  spec: "30g",
                  quantity: 2
                }
              ],
              status: 1,
              consignee: "张",
              isSelfPickUp: false,
              phone: 12345678901,
              deliveryAddress: "天津市南开区天津大学",
              deliveryFee: 12,
              remark: "",
              totalPrice: 76,
              realPay: 88
            },
            {
              orderId: 4,
              cakes: [
                {
                  cakeId: 1,
                  name: "爆浆海盐奶盖",
                  taste: "巧克力",
                  spec: "6寸 + 装饰",
                  quantity: 1
                }
              ],
              status: 2,
              consignee: "张",
              isSelfPickUp: true,
              phone: 12345678901,
              deliveryAddress: "",
              deliveryFee: 0,
              remark: "多加两个草莓",
              totalPrice: 130,
              realPay: 130
            }
          ]
        },
        {
          pickUpTime: "15:30",
          orders: [
            {
              orderId: 5,
              cakes: [
                {
                  cakeId: 2,
                  name: "蓝朋友的心",
                  taste: "巧克力",
                  spec: "30g",
                  quantity: 2
                }
              ],
              status: 1,
              consignee: "张",
              isSelfPickUp: false,
              phone: 12345678901,
              deliveryAddress: "天津市南开区天津大学",
              deliveryFee: 12,
              remark: "",
              totalPrice: 76,
              realPay: 88
            },
            {
              orderId: 6,
              cakes: [
                {
                  cakeId: 1,
                  name: "爆浆海盐奶盖",
                  taste: "巧克力",
                  spec: "6寸 + 装饰",
                  quantity: 1
                }
              ],
              status: 2,
              consignee: "张",
              isSelfPickUp: true,
              phone: 12345678901,
              deliveryAddress: "",
              deliveryFee: 0,
              remark: "多加两个草莓",
              totalPrice: 130,
              realPay: 130
            }
          ]
        }
      ]);
    } else {
      res.json([]);
    }
  }
};
