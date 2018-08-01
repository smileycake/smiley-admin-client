import * as cakesService from "../services/cakes";

export default {
  namespace: "cakes",
  state: {
    list: [],
    total: null,
    page: null,
    cakeDetailVisible: false,
    cakeType: []
  },
  reducers: {
    save(
      state,
      {
        payload: { data: list, total, page }
      }
    ) {
      return { ...state, list, total, page };
    },
    create(
      state,
      {
        payload: { cakeDetailVisible }
      }
    ) {
      return { ...state, cakeDetailVisible };
    },
    cacheCakeType(
      state,
      {
        payload: { cakeType }
      }
    ) {
      return { ...state, cakeType };
    }
  },
  effects: {
    *fetch(
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
          page: parseInt(page, 10),
          cakeDetailVisible: false
        }
      });
    },
    *fetchCakeType({}, { call, put }) {
      const { data } = yield call(cakesService.fetchCakeType);
      yield put({
        type: "cacheCakeType",
        payload: {
          cakeType: data
        }
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/cakes/cakeList") {
          dispatch({ type: "fetch", payload: query });
          dispatch({ type: "fetchCakeType" });
        }
      });
    }
  }
};
