import { fetchData, formSubmit } from '../services'

export default {

  namespace: 'indexRecord',

  state: {
    data: null
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({ type: 'fetch' });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      console.log(fetchData)
      const data = yield call(fetchData);
      yield put({ type: 'save', payload: data })
    },
    *submit({ payload }, { call, put }) {
      const data = yield call(formSubmit, payload);
      return data;
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
