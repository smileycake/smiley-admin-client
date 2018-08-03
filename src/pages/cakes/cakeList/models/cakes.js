import * as cakesService from "../services/cakes";

export default {
  namespace: "cakes",
  state: {
    list: [],
    total: null,
    page: null
  },
  reducers: {
    save(
      state,
      {
        payload: { data: list, total, page }
      }
    ) {
      return { ...state, list, total, page };
    }
  },
  effects: {
    *fetchCakeList(
      {
        payload: { page = 1 }
      },
      { call, put }
    ) {
      const { data, headers } = yield call(cakesService.fetch, { page });
      data.forEach(element => {
        if (element.children.length === 0) {
          delete element.children;
        }
      });
      yield put({
        type: "save",
        payload: {
          data,
          total: parseInt(headers["x-total-count"], 10),
          page: parseInt(page, 10)
        }
      });
    },
    *fetchCakeType({}, { call, put }) {
      const { data } = yield call(cakesService.fetchCakeType);
      yield put({
        type: "cakeDetail/cacheCakeType",
        payload: {
          cakeType: data
        }
      });
    },
    *fetchCakeMaterials({}, { call, put }) {
      const { data } = yield call(cakesService.fetchCakeMaterials);
      const cakeMaterials = data.map(material => {
        material.key = material.id;
        return material;
      });
      yield put({
        type: "cakeDetail/cacheCakeMaterials",
        payload: {
          cakeMaterials
        }
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/cakes/cakeList") {
          dispatch({ type: "fetchCakeList", payload: query });
          dispatch({ type: "fetchCakeType" });
          dispatch({ type: "fetchCakeMaterials" });
        }
      });
    }
  }
};
