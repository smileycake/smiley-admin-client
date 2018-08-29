import { parse } from 'url';

function fakeOrders() {
  const list = [];
  for (let i = 0; i < 4; ++i) {
    list.push({
      pickUpTime: 11 + i + ':' + (i % 2 === 0 ? '00' : '30'),
      orders: [],
    });
    for (let j = i + 1; j < i / 2 + 3; ++j) {
      list[i].orders.push({
        cakes: [],
        orderId: (i + 1) * (j + 1),
        status: (j % 3) + 1,
        consignee: '张',
        isSelfPickUp: j % 2 === 0 ? true : false,
        phone: 12345678901,
        deliveryAddress: j % 2 === 0 ? '' : '天津市南开区天津大学',
        deliveryFee: j % 2 === 0 ? 0 : 12,
        remark: j % 2 === 0 ? '备注' : '',
        totalPrice: 189,
        realPay: 201,
      });
      for (let k = 0; k < j + 1; ++k) {
        list[i].orders[j - i - 1].cakes.push({
          cakeId: k % 2 === 0 ? 1 : 2,
          tasteId: k % 2 === 0 ? 2 : 1,
          specId: k % 2 === 0 ? 2 : 1,
          name: k % 2 === 0 ? '爆浆海盐奶盖' : '蓝朋友的心',
          taste: k % 2 === 0 ? '抹茶' : '巧克力',
          spec: k % 2 === 0 ? '6寸 + 装饰' : '常规',
          quantity: k + 1,
        });
      }
    }
  }
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
