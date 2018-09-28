import { parse } from 'url';

function fakeOrders() {
  const list = [
    {
      pickUpTime: '11:30',
      orders: [
        {
          orderId: 1,
          cakes: [
            {
              cakeId: 1,
              tasteId: 1,
              specId: 1,
              name: '爆浆海盐奶盖',
              taste: '巧克力',
              spec: '6寸',
              quantity: 1,
            },
            {
              cakeId: 2,
              tasteId: 1,
              specId: 1,
              name: '蓝朋友的心',
              taste: '巧克力',
              spec: '常规',
              quantity: 2,
            },
          ],
          status: 1,
          consignee: '张',
          isSelfPickUp: false,
          phone: 12345678901,
          deliveryAddress: '天津市南开区天津大学',
          deliveryFee: 12,
          remark: '加两个草莓',
          totalPrice: 189,
          realPay: 201,
        },
      ],
    },
    {
      pickUpTime: '13:30',
      orders: [
        {
          orderId: 2,
          cakes: [
            {
              cakeId: 1,
              tasteId: 1,
              specId: 2,
              name: '爆浆海盐奶盖',
              taste: '巧克力',
              spec: '6寸 + 装饰',
              quantity: 1,
            },
          ],
          status: 1,
          consignee: '张',
          isSelfPickUp: false,
          phone: 12345678901,
          deliveryAddress: '天津市南开区天津大学',
          deliveryFee: 12,
          remark: '加两个草莓',
          totalPrice: 189,
          realPay: 201,
        },
        {
          orderId: 3,
          cakes: [
            {
              cakeId: 1,
              tasteId: 1,
              specId: 2,
              name: '爆浆海盐奶盖',
              taste: '巧克力',
              spec: '6寸 + 装饰',
              quantity: 1,
            },
          ],
          status: 1,
          consignee: '张',
          isSelfPickUp: true,
          phone: 12345678901,
          deliveryAddress: '',
          deliveryFee: 0,
          remark: '',
          totalPrice: 148,
          realPay: 148,
        },
      ],
    },
  ];
  return list;
}
export function getOrders(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  const count = params.count * 1 || 20;

  const result = fakeOrders(count);

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getOrders,
};
