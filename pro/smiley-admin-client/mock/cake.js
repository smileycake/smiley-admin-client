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

export default {
  getCakes,
};
