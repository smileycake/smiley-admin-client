import { parse } from 'url';

export function fakeRecipes() {
  const list = [
    {
      id: 1,
      name: '蛋糕胚',
    },
    {
      id: 2,
      name: '淋面',
    },
    {
      id: 3,
      name: '海盐乳酪流心',
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
