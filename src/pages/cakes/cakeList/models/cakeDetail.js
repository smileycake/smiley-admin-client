import * as cakesService from "../services/cakes";
import { stat } from "fs";

export default {
  namespace: "cakeDetail",
  state: {
    cakeId: null,
    cakeDetailInfo: {},
    cakeType: [],
    cakeMaterials: [],
    editing: false,
    visible: false,
    activeSpecTab: null
  },
  reducers: {
    changeCakeSpecTab(
      state,
      {
        payload: { activeSpecTab }
      }
    ) {
      return { ...state, activeSpecTab };
    },
    createCake(
      state,
      {
        payload: { cakeType, cakeMaterials }
      }
    ) {
      const cakeDetailInfo = {
        name: "",
        type: "",
        specs: [
          {
            name: "新规格",
            price: "0.00",
            materials: [],
            isGroupPurchase: false
          }
        ]
      };
      return {
        ...state,
        cakeType,
        cakeDetailInfo,
        cakeMaterials,
        editing: true,
        visible: true,
        activeSpecTab: "新规格"
      };
    },
    showCakeDetail(
      state,
      {
        payload: { cakeDetailInfo }
      }
    ) {
      return {
        ...state,
        cakeDetailInfo,
        activeSpecTab: cakeDetailInfo.specs[0].name
      };
    },
    showCakeDetailPanel(
      state,
      {
        payload: { editing, visible }
      }
    ) {
      return { ...state, editing, visible };
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
        type: "showCakeDetailPanel",
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
  subscriptions: {}
};
