import * as cakesService from "../services/cakes";

export default {
  namespace: "cakeDetail",
  state: {
    cakeId: null,
    cakeDetailInfo: null,
    cakeType: [],
    editing: false,
    visible: false
  },
  reducers: {
    showCakeDetail(
      state,
      {
        payload: { cakeId, cakeDetailInfo, cakeType, editing, visible }
      }
    ) {
      return { ...state, cakeId, cakeDetailInfo, cakeType, editing, visible };
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
