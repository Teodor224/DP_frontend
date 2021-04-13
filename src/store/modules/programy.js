const programy = ({
  state: {
    programy: {
      'id': '',
      'nazov': '',
      'fakulta_id':''
    },
    zamerania: {
      'id': '',
      'nazov': '',
      'program_id':''
    },
  },
  mutations: {
    SET_PROGRAMY: (state, data) => {
      state.programy = data;
    },
    SET_ZAMERANIA: (state, data) => {
      state.zamerania = data;
    }
  },
  actions: {
    SET_PROGRAMY: ({commit}, data) => {
      commit('SET_PROGRAMY', data);
    },
    SET_ZAMERANIA: ({commit}, data) => {
      commit('SET_ZAMERANIA', data);
    }
  },
  getters: {
    GET_PROGRAMY: state => state.programy,
    GET_ZAMERANIA: state => state.zamerania,
  }
})

export default programy;
