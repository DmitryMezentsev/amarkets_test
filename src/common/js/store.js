import Vuex from 'vuex';

import api from 'Base/api';

const dataDefault = {
  performance: null,
  session: null,
  first_name: null,
  last_name: null,
  birthday: null,
  email: null,
  accept: false,
  payment: {
    type: 'card',
    card: {
      number: null,
      valid_thru: null,
      name: null,
    },
  },
};

export default () =>
  new Vuex.Store({
    state: {
      // Текущий шаг
      step: Number(localStorage.step) || 1,
      // Данные, введенные пользователем
      data: localStorage.data ? JSON.parse(localStorage.data) : dataDefault,
      // Данные спектаклей
      performances: null,
      // Расписание
      sessions: null,
      // Флаг ожидания ответа от сервера
      pending: false,
      // Отображаемая ошибка
      error: null,
      // Флаг успешного оформления заказа
      success: null,
    },
    mutations: {
      prevStep(state) {
        if (state.step > 1) --state.step;
        localStorage.step = state.step;
      },
      nextStep(state) {
        if (state.step < 3) ++state.step;
        localStorage.step = state.step;
      },
      clearStep(state) {
        state.step = 1;
        localStorage.step = state.step;
      },
      setData(state, payload) {
        state.data = payload;
        localStorage.data = JSON.stringify(state.data);
      },
      clearData(state) {
        state.data = dataDefault;
        localStorage.removeItem('data');
      },
      setPerformances(state, payload) {
        state.performances = payload;
      },
      setSessions(state, payload) {
        state.sessions = payload;
      },
      setPending(state, payload) {
        state.pending = payload;
      },
      setError(state, payload) {
        state.error = payload;
      },
      setSuccess(state, payload) {
        state.success = payload;
      },
    },
    actions: {
      loadPerformances({ commit }) {
        api
          .get('/api/performances')
          .then(({ data: { data } }) => {
            commit('setPerformances', data);
          })
          .catch(() => {
            commit('setError', 'Ошибка при загрузке списка спектаклей.');
          });
      },
      loadSessions({ commit }) {
        api
          .get('/api/sessions')
          .then(({ data: { data } }) => {
            commit('setSessions', data);
          })
          .catch(() => {
            commit('setError', 'Ошибка при загрузке расписания спектаклей.');
          });
      },
    },
  });
