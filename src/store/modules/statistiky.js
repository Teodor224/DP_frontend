const statistiky = ({
  state: {
    pocet_firiem:"",
    pocet_studentov:"",
    pocet_Akt_ponuk:"",
    pocet_Abs_ponuk:"",
    vsetky_firmy:{
      "image":"",
      "image_url":""
    },

  },
  mutations: {
    SET_POCET_F: (state, data) => {
      state.pocet_firiem = data;
    },
    SET_POCET_S: (state, data) => {
      state.pocet_studentov = data;
    },
    SET_POCET_AKT_P: (state, data) => {
      state.pocet_Akt_ponuk = data;
    },
    SET_POCET_ABS_P: (state, data) => {
      state.pocet_Abs_ponuk = data;
    },
    SET_VSETKY_F: (state, data) => {
      state.vsetky_firmy = data;
    }
  },
  actions: {
    SET_POCET_F: ({commit}, data) => {
      commit('SET_POCET_F', data);
    },
    SET_POCET_AKT_P: ({commit}, data) => {
      commit('SET_POCET_AKT_P', data);
    },
    SET_POCET_ABS_P: ({commit}, data) => {
      commit('SET_POCET_ABS_P', data);
    },
    SET_POCET_S: ({commit}, data) => {
      commit('SET_POCET_S', data);
    },
    SET_VSETKY_F: ({commit}, data) => {
      commit('SET_VSETKY_F', data);
    },
  },
  getters: {
    GET_POCET_F: state => state.pocet_firiem,
    GET_POCET_S: state => state.pocet_studentov,
    GET_POCET_AKT_P: state => state.pocet_Akt_ponuk,
    GET_POCET_ABS_P: state => state.pocet_Abs_ponuk,
    GET_VSETKY_F: state => state.vsetky_firmy
  }
})

export default statistiky;
