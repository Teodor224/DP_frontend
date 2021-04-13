const krajiny = ({
  state: {
    krajiny: {
      'id': '',
      'nazov': '',
      'kontinent':'',
    },
    kraj: {
      'id': '',
      'nazov': '',
      'stat_id':'',
    },
  },
  mutations: {
    SET_KRAJINY: (state, data) => {
      state.krajiny = data;
    },
    SET_KRAJ: (state, data) => {
      state.kraj = data;
    }
  },
  actions: {
    SET_KRAJINY: ({commit}, data) => {
      commit('SET_KRAJINY', data);
    },
    SET_KRAJ: ({commit}, data) => {
      commit('SET_KRAJ', data);
    }
  },
  getters: {
    GET_KRAJINY: state => state.krajiny,
    GET_KRAJ: state => state.kraj,

  }
})

export default krajiny;
