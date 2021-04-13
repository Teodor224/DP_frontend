const ponuky = ({
  state: {
    ponuka: {
      'id': '',
      'nazov': '',
      'informacie':'',
      'datum_od':'',
      'datum_do':'',
      'mzda':'',
      'krajina':'',
      'kraj':'',
      'mesto':'',
      'program_id':'',
      'zameranie_id':'',
    }
  },
  mutations: {
    SET_PONUKA: (state, data) => {
      state.ponuka = data;
    }
  },
  actions: {
    SET_PONUKA: ({commit}, data) => {
      commit('SET_PONUKA', data);
    }
  },
  getters: {
    GET_PONUKA: state => state.ponuka

  }
})

export default ponuky;
