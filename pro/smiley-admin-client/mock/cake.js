import { parse } from 'url';

export function fakeCakes() {
  const list = [];
  list.push({
    cakeId: 1,
    name: '爆浆海盐奶盖',
    type: '奶油蛋糕',
    tastes: [
      {
        id: 1,
        name: '巧克力',
      },
      {
        id: 2,
        name: '抹茶',
      },
    ],
    specs: [
      {
        id: 1,
        name: '6寸',
      },
      {
        id: 2,
        name: '6寸 + 装饰',
      },
    ],
    prices: [
      {
        tasteId: 1,
        specId: 1,
        price: 98,
      },
      {
        tasteId: 1,
        specId: 2,
        price: 113,
      },
      {
        tasteId: 2,
        specId: 1,
        price: 118,
      },
      {
        tasteId: 2,
        specId: 2,
        price: 133,
      },
    ],
  });
  list.push({
    cakeId: 2,
    name: '蓝朋友的心',
    type: '慕斯',
    tastes: [
      {
        id: 1,
        name: '巧克力',
      },
    ],
    specs: [
      {
        id: 1,
        name: '常规',
      },
    ],
    prices: [
      {
        taste: '巧克力',
        spec: '常规',
        price: 38,
      },
    ],
  });
  return list;
}

export function fakeCakeDetail() {
  const detail = {
    id: 1,
    name: '爆浆海盐奶盖',
    type: {
      id: 1,
      name: '奶油蛋糕',
    },
    tastes: [
      {
        id: 1,
        name: '巧克力',
      },
      {
        id: 2,
        name: '抹茶',
      },
    ],
    specs: [
      {
        id: 1,
        name: '6寸',
      },
      {
        id: 2,
        name: '6寸 + 装饰',
      },
    ],
    recipes: [
      {
        tasteId: 1,
        specId: 1,
        price: 98,
        detail: [
          {
            id: 1,
            name: '蛋糕胚',
            materials: [
              {
                id: 1,
                name: '糖',
                price: 10,
                quantity: 500,
                unit: '克',
              },
              {
                id: 2,
                name: '面粉',
                price: 5,
                quantity: 600,
                unit: '克',
              },
            ],
          },
          {
            id: 2,
            name: '流心',
            materials: [
              {
                id: 1,
                name: '糖',
                price: 10,
                quantity: 500,
                unit: '克',
              },
              {
                id: 3,
                name: '牛奶',
                price: 5,
                quantity: 600,
                unit: '克',
              },
              {
                id: 4,
                name: '乳酪',
                price: 5,
                quantity: 600,
                unit: '克',
              },
            ],
          },
          {
            id: 3,
            name: '奶盖',
            materials: [
              {
                id: 1,
                name: '糖',
                price: 10,
                quantity: 500,
                unit: '克',
              },
              {
                id: 4,
                name: '乳酪',
                price: 5,
                quantity: 600,
                unit: '克',
              },
            ],
          },
        ],
      },
      {
        tasteId: 1,
        specId: 2,
        price: 113,
        detail: [],
      },
      {
        tasteId: 2,
        specId: 1,
        price: 118,
        detail: [],
      },
      {
        tasteId: 2,
        specId: 2,
        price: 133,
        detail: [],
      },
    ],
  };
  return detail;
}

export function fakeCakeType() {
  return [
    {
      id: 1,
      name: '奶油蛋糕',
    },
    {
      id: 2,
      name: '慕斯',
    },
  ];
}

export function getCakes(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  const count = params.count * 1 || 20;

  const result = fakeCakes(count);

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function getCakeDetail(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  const count = params.count * 1 || 20;

  const result = fakeCakeDetail();

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function getCakeType(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  const count = params.count * 1 || 20;

  const result = fakeCakeType();

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getCakes,
  getCakeDetail,
  getCakeType,
};
