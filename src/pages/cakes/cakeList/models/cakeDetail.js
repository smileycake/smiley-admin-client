import * as cakesService from "../services/cakes";

export default {
  namespace: "cakeDetail",
  state: {
    cakeDetailInfo: null,
    cakeType: [],
    editing: false,
    visible: false
  },
  reducers: {
    showCakeDetailInfo(
      state,
      {
        payload: { data }
      }
    ) {
      return { ...state, cakeDetailInfo: data };
    }
  },
  effects: {
    *fetchCakeDetail(
      {
        payload: { cakeId }
      },
      { call, put }
    ) {
      const { data, headers } = yield call(cakesService.fetchCakeDetail, {
        cakeId
      });
      yield put({
        type: "showCakeDetailInfo",
        payload: {
          cakeDetailInfo: data
        }
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/cakes/cakeList") {
          dispatch({ type: "fetch", payload: query });
        }
      });
    }
  }
};
