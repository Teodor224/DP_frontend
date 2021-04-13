const komentare = ({
  state: {
    komentare: {
      'id': '',
      'Student_Meno': '',
      'Student_Priezvisko':'',
      'Komentar':'',
      'Hodnotenie':''
    }
  },
  mutations: {
    SET_KOMENTARE: (state, data) => {
      state.komentare = data;
    }
  },
  actions: {
    SET_KOMENTARE: ({commit}, data) => {
      commit('SET_KOMENTARE', data);
    }
  },
  getters: {
    GET_KOMENTARE: state => state.komentare

  }
})

export default komentare;
