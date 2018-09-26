import { queryRecipes } from '../services/recipe';

export default {
  namespace: 'recipes',

  state: {
    recipes: [],
  },

  effects: {
    *fetchRecipes({ payload }, { call, put }) {
      const response = yield call(queryRecipes, payload);
      yield put({
        type: 'queryRecipes',
        payload: response,
      });
    },
  },

  reducers: {
    queryRecipes(state, action) {
      return {
        ...state,
        recipes: action.payload,
      };
    },
  },
};
