const Admin = ({
  state: {
    Studenti: {
      'id': '',
      'meno': '',
      'priezvisko':'',
      'datum_narodenia':'',
      'skolsky_email':'',
      'program':'',
    },
    Programy: {
      'id': '',
      'nazov': '',
      'fakulta':'',
      'mesto':'',
      'ulica':'',
      'is_visible':''
    },
    Fakulty:{
      'id': '',
      'nazov': '',
      'mesto': '',
      'ulica': '',
    },
    Zamestnanci:{
      'id': '',
      'meno': '',
      'priezvisko':'',
      'datum_narodenia':'',
      'skolsky_email':'',
      'rola_id':''
    },
    Firmy:{
      'id': '',
      'nazov': '',
      'email':'',
      'krajina':'',
      'mesto':'',
      'je_schvalena':'',
      'is_visible':''
    },
    Aktualne_Ponuky:{
      'id': '',
      'nazov': '',
      'firma':'',
      'od':'',
      'do':'',
      'mesto':'',
      'is_visible':''
    },
    Absolvovane_Ponuky:{
      'id': '',
      'nazov': '',
      'firma':'',
      'od':'',
      'do':'',
      'mesto':'',
      'is_visible':''
    },
    komentare:{
      'id': '',
      'meno': '',
      'priezvisko':'',
      'firma':'',
      'ponuka':'',
      'ponuka_id':'',
      'hodnotenie':'',
      'komentar':'',
      'is_visible':''
    },
    nove_komentare:{
      'id': '',
      'meno': '',
      'priezvisko':'',
      'firma':'',
      'ponuka':'',
      'ponuka_id':'',
      'hodnotenie':'',
      'komentar':'',
      'is_visible':''
    },
    zamerania:{
      'id': '',
      'nazov': '',
      'program':'',
      'program_id':'',
      'is_visible':''
    }
  },
  mutations: {
    SET_ZOZNAM_STUDENTOV: (state, data) => {
      state.Studenti = data;
    },
    SET_ZOZNAM_PROGRAMOV: (state, data) => {
      state.Programy = data;
    },
    SET_ZOZNAM_FAKULT: (state, data) => {
      state.Fakulty = data;
    },
    SET_ZOZNAM_ZAMESTNANCOV: (state, data) => {
      state.Zamestnanci = data;
    },
    SET_ZOZNAM_FIRIEM: (state, data) => {
      state.Firmy = data;
    },
    SET_ZOZNAM_AKT_PONUK: (state, data) => {
      state.Aktualne_Ponuky = data;
    },
    SET_ZOZNAM_ABS_PONUK: (state, data) => {
      state.Absolvovane_Ponuky = data;
    },
    SET_ZOZNAM_KOMENTAROV: (state, data) => {
      state.komentare = data;
    },
    SET_ZOZNAM_NOVYCH_KOMENTAROV: (state, data) => {
      state.nove_komentare = data;
    },
    SET_ZOZNAM_ZAMERANI: (state, data) => {
      state.zamerania = data;
    },
  },
  actions: {
    SET_ZOZNAM_STUDENTOV: ({commit}, data) => {
      commit('SET_ZOZNAM_STUDENTOV', data);
    },
    SET_ZOZNAM_PROGRAMOV: ({commit}, data) => {
      commit('SET_ZOZNAM_PROGRAMOV', data);
    },
    SET_ZOZNAM_FAKULT: ({commit}, data) => {
      commit('SET_ZOZNAM_FAKULT', data);
    },
    SET_ZOZNAM_ZAMESTNANCOV: ({commit}, data) => {
      commit('SET_ZOZNAM_ZAMESTNANCOV', data);
    },
    SET_ZOZNAM_FIRIEM: ({commit}, data) => {
      commit('SET_ZOZNAM_FIRIEM', data);
    },
    SET_ZOZNAM_AKT_PONUK: ({commit}, data) => {
      commit('SET_ZOZNAM_AKT_PONUK', data);
    },
    SET_ZOZNAM_ABS_PONUK: ({commit}, data) => {
      commit('SET_ZOZNAM_ABS_PONUK', data);
    },
    SET_ZOZNAM_KOMENTAROV: ({commit}, data) => {
      commit('SET_ZOZNAM_KOMENTAROV', data);
    },
    SET_ZOZNAM_NOVYCH_KOMENTAROV: ({commit}, data) => {
      commit('SET_ZOZNAM_NOVYCH_KOMENTAROV', data);
    },
    SET_ZOZNAM_ZAMERANI: ({commit}, data) => {
      commit('SET_ZOZNAM_ZAMERANI', data);
    },

  },
  getters: {
    GET_ZOZNAM_STUDENTOV: state => state.Studenti,
    GET_ZOZNAM_PROGRAMOV: state => state.Programy,
    GET_ZOZNAM_FAKULT: state => state.Fakulty,
    GET_ZOZNAM_ZAMESTNANCOV: state => state.Zamestnanci,
    GET_ZOZNAM_FIRIEM: state => state.Firmy,
    GET_ZOZNAM_AKT_PONUK: state => state.Aktualne_Ponuky,
    GET_ZOZNAM_ABS_PONUK: state => state.Absolvovane_Ponuky,
    GET_ZOZNAM_KOMENTAROV: state => state.komentare,
    GET_ZOZNAM_NOVYCH_KOMENTAROV: state => state.nove_komentare,
    GET_ZOZNAM_ZAMERANI: state => state.zamerania,
  }
})

export default Admin;
