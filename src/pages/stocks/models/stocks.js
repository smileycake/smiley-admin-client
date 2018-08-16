import * as stocksService from "../services/stocks";

export default {
  namespace: "stocks",

  state: {},

  reducers: {
    showStockList(
      state,
      {
        payload: { stocks, total, page }
      }
    ) {
      return { ...state, stocks, total, page };
    }
  },

  effects: {
    *fetchStockList(
      {
        payload: { page = 1 }
      },
      { call, put }
    ) {
      const { data, headers } = yield call(stocksService.fetchStockList, {
        page
      });
      yield put({
        type: "showStockList",
        payload: {
          stocks: data,
          total: parseInt(headers["x-total-count"], 10),
          page: parseInt(page, 10)
        }
      });
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/stocks") {
          dispatch({ type: "fetchStockList", payload: query });
        }
      });
    }
  }
};
