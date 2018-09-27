import { parse } from 'url';

export function fakeRecipes() {
  const list = [
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
      name: '淋面',
      materials: [
        {
          id: 1,
          name: '糖',
          price: 10,
          quantity: 500,
          unit: '克',
        },
        {
          id: 5,
          name: '肯迪亚奶油',
          price: 20,
          quantity: 600,
          unit: '克',
        },
      ],
    },
    {
      id: 3,
      name: '海盐乳酪流心',
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
        {
          id: 5,
          name: '肯迪亚奶油',
          price: 5,
          quantity: 600,
          unit: '克',
        },
      ],
    },
  ];
  return list;
}

export function getRecipes(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  const count = params.count * 1 || 20;

  const result = fakeRecipes();

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getRecipes,
};
