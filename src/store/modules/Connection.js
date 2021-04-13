const connection = ({
  state: {
    status: '',
  },
  mutations: {
    SET_STATUS: (state, data) => {
      state.status = data;
    },
  },
  actions: {
    SET_STATUS: ({commit}, data) => {
      commit('SET_STATUS', data);
    },
  },
  getters: {
    GET_STATUS: state => state.status,

  }
})

export default connection;
