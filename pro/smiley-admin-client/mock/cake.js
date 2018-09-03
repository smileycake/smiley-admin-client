import { parse } from 'url';

export function fakeCakes() {
  const list = [];
  list.push({
    cakeId: 1,
    name: '爆浆海盐奶盖',
    cover:
      'http://qcloud.dpfile.com/pc/P9hJ81LgvlUB8tynC8-nNh5RjTKNZLgBTIE6NSjUsrRouI64PLnDNyiI08ZHM8ZfjoJrvItByyS4HHaWdXyO_DrXIaWutJls2xCVbatkhjUNNiIYVnHvzugZCuBITtvjski7YaLlHpkrQUr5euoQrg.jpg',
    prices: [
      {
        taste: '巧克力',
        spec: '6寸',
        price: 98,
      },
      {
        taste: '巧克力',
        spec: '6寸 + 装饰',
        price: 113,
      },
      {
        taste: '抹茶',
        spec: '6寸',
        price: 98,
      },
      {
        taste: '抹茶',
        spec: '6寸 + 装饰',
        price: 115,
      },
    ],
  });
  list.push({
    cakeId: 2,
    name: '蓝朋友的心',
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
    ],
  };
  return detail;
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

export default {
  getCakes,
  getCakeDetail,
};
