import * as stocksService from "../services/stocks";

export default {
  namespace: "stocks",

  state: {
    stocks: [],
    total: 0,
    page: 1,
    editingPanelVisible: false,
    currentEditingStock: {}
  },

  reducers: {
    showStockList(
      state,
      {
        payload: { stocks, total, page }
      }
    ) {
      return { ...state, stocks, total, page };
    },
    openEditingPanel(state) {
      return { ...state, editingPanelVisible: true };
    },
    closeEditingPanel(state) {
      return { ...state, editingPanelVisible: false };
    },
    setCurrentEditingStock(
      state,
      {
        payload: { currentEditingStock }
      }
    ) {
      return { ...state, currentEditingStock };
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
