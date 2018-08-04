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
    visible: false
  },
  reducers: {
    addCakeSpec(
      state,
      {
        payload: { specs }
      }
    ) {
      const cakeDetailInfo = { ...cakeDetailInfo, specs };
      return { ...state, cakeDetailInfo };
    },
    createCake(state) {
      const cakeDetailInfo = {
        name: "",
        type: "",
        specs: [
          {
            key: "规格1",
            name: "新规格",
            price: "0.00",
            materials: [],
            isGroupPurchase: false
          }
        ]
      };
      return {
        ...state,
        cakeDetailInfo,
        editing: true,
        visible: true
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
        cakeDetailInfo
      };
    },
    showCakeDetailPanel(
      state,
      {
        payload: { editing, visible }
      }
    ) {
      return { ...state, editing, visible };
    },
    cacheCakeMaterials(
      state,
      {
        payload: { cakeMaterials }
      }
    ) {
      return { ...state, cakeMaterials };
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
      let index = 1;
      data.specs.forEach(spec => {
        spec.key = "规格" + index++;
        spec.materials.forEach(material => {
          material.key = material.id;
        });
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
