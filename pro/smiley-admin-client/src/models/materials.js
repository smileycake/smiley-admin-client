import { queryMaterials } from '../services/material';

export default {
  namespace: 'materials',

  state: {
    materials: [],
  },

  effects: {
    *fetchMaterials({ payload }, { call, put }) {
      const response = yield call(queryMaterials, payload);
      yield put({
        type: 'queryMaterials',
        payload: response,
      });
    },
  },

  reducers: {
    queryMaterials(state, action) {
      return {
        ...state,
        materials: action.payload,
      };
    },
  },
};
