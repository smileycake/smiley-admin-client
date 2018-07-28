import * as cakesService from '../services/cakes';

export default {
    namespace: 'cakes',
    state: {
        list: [],
        total: null,
        page: null,
        cakeInfoVisible: false,
    },
    reducers: {
        save(state, { payload: { data: list, total, page, cakeInfoVisible }}) {
            return { ...state, list, total, page, cakeInfoVisible };
        },
    },
    effects: {
        *fetch({ payload: { page = 1 } }, { call, put }) {
            const { data, headers } = yield call(cakesService.fetch, { page });
            data.forEach(element => {
                if (element.children.length === 0) {
                    delete element.children;
                }
            });
            yield put({
                type: 'save',
                payload: {
                    data,
                    total: parseInt(headers['x-total-count'], 10),
                    page: parseInt(page, 10),
                    cakeInfoVisible: false
                }
            });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/cakes/cakeList') {
                    dispatch({ type: 'fetch', payload: query});
                }
            })
        }
    }
}