import { parse } from 'url';

export function fakeMaterials() {
  const list = [
    {
      id: 1,
      name: '糖',
      price: 10,
      unit: '克',
    },
    {
      id: 2,
      name: '面粉',
      price: 5,
      unit: '克',
    },
    {
      id: 3,
      name: '牛奶',
      price: 5,
      unit: '克',
    },
    {
      id: 4,
      name: '乳酪',
      price: 5,
      unit: '克',
    },
    {
      id: 5,
      name: '肯迪亚奶油',
      price: 20,
      unit: '克',
    },
  ];
  return list;
}

export function getMaterials(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  const count = params.count * 1 || 20;

  const result = fakeMaterials();

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getMaterials,
};
