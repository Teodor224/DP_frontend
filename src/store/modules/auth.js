const auth = ({
  state: {
    firma: {
      'id': '',
      'nazov': '',
      'ico': '',
      'info': '',
      'email': '',
      'tel': '',
      'krajina_id': '',
      'kraj_id': '',
      'mesto': '',
      'psc': '',
      'web': '',
      'ulica': '',
      'api_token': '',
      'je_schvalena':'',
    },
    student: {
      'id': '',
      'meno': '',
      'priezvisko': '',
      'datum_narodenia': '',
      'tel_cislo': '',
      'skolsky_email': '',
      'sukromny_email': '',
      'stupen': '',
      'krajina_id': '',
      'kraj_id': '',
      'mesto': '',
      'ulica': '',
      'vzdelanie': '',
      'informacie':'',
      'program':'',
      'api_token': ''
    },
    admin: {
      'id': '',
      'meno': '',
      'priezvisko': '',
      'datum_narodenia': '',
      'tel_cislo': '',
      'skolsky_email': '',
      'sukromny_email': '',
      'stupen': '',
      'krajina_id': '',
      'kraj_id': '',
      'mesto': '',
      'ulica': '',
      'vzdelanie': '',
      'informacie':'',
      'program':'',
      'api_token': ''
    },
    authenticated: false,
    rola_id:0,
  },
  mutations: {
    SET_FIRMA: (state, data) => {
      state.firma = data;
    },
    SET_AUTH: (state, auth) => {
      state.authenticated = auth;
    },
    SET_STUDENT: (state, data) => {
      state.student = data;
    },
    SET_ADMIN: (state, data) => {
      state.admin = data;
    },
    SET_ROLA: (state, data) => {
      state.rola_id = data;
    },
  },
  actions: {
    SET_FIRMA: ({commit}, data) => {
      commit('SET_FIRMA', data);
    },
    SET_AUTH: ({commit}, auth) => {
      commit('SET_AUTH', auth);
    },
    SET_ADMIN: ({commit}, data) => {
      commit('SET_ADMIN', data);
    },
    SET_STUDENT: ({commit}, data) => {
      commit('SET_STUDENT', data);
    },
    SET_ROLA: ({commit}, data) => {
      commit('SET_ROLA', data);
    }
  },
  getters: {
    GET_FIRMA: state => state.firma,
    GET_AUTH: state => state.authenticated,
    GET_STUDENT: state => state.student,
    GET_ADMIN: state => state.admin,
    GET_ROLA: state => state.rola_id
  }
})

export default auth;
