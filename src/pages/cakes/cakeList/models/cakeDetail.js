import * as cakesService from "../services/cakes";
import { stat } from "fs";

export default {
  namespace: "cakeDetail",
  state: {
    cakeId: null,
    cakeDetailInfo: {
      id: null,
      name: null,
      type: null,
      specs: []
    },
    cakeType: [],
    editing: false,
    visible: false
  },
  reducers: {
    showCakeDetail(
      state,
      {
        payload: { cakeDetailInfo, editing, visible }
      }
    ) {
      cakeDetailInfo = cakeDetailInfo ? cakeDetailInfo : state.cakeDetailInfo;
      editing = editing === undefined ? state.editing : editing;
      visible = visible === undefined ? state.visible : visible;
      return { ...state, cakeDetailInfo, editing, visible };
    }
  },
  effects: {
    *fetchCakeDetail(
      {
        payload: { cakeId }
      },
      { call, put }
    ) {
      yield put({
        type: "showCakeDetail",
        payload: {
          visible: true,
          editing: false
        }
      });
      const { data } = yield call(cakesService.fetchCakeDetail, {
        cakeId
      });
      yield put({
        type: "showCakeDetail",
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
