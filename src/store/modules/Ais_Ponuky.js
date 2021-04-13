const ais_ponuky = ({
  state: {
    ais_ponuky: {
      'id': '',
      'stud_meno':'',
      'stud_priezvisko':'',
      'status': '',
      'komentar': '',
      'hodnotenie': '',
      'ais_id': '',
      'ponuka_id': '',
    },
    Je_Ziadost:false,
  },
  mutations: {
    SET_AIS_PONUKY: (state, data) => {
      state.ais_ponuky = data;
    },
    SET_JE_ZIADOST: (state, data) => {
      state.Je_Ziadost = data;
    }
  },
  actions: {
    SET_AIS_PONUKY: ({commit}, data) => {
      commit('SET_AIS_PONUKY', data);
    },
    SET_JE_ZIADOST: ({commit}, data) => {
      commit('SET_JE_ZIADOST', data);
    }
  },
  getters: {
    GET_AIS_PONUKY: state => state.ais_ponuky,
    GET_JE_ZIADOST: state => state.Je_Ziadost,
  }
})

export default ais_ponuky;
