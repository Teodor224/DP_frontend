const profil = ({
  state: {
    Studentprofil: {
      'id': '',
      'nazov': '',
      'stupen':'',
      'fakulta': '',
    },
    StudentFiles:{
      'image_URL': '',
      'image': '',
      'pdf_URL': '',
      'pdf': '',
    },
    j_znalosti:{
      'id': '',
      'jazykove_znalosti_id': '',
      'nazov':'',
      'uroven':''
    },
    pc_znalosti:{
      'id': '',
      'pc_znalosti_id': '',
      'nazov':'',
      'uroven':''
    },
    FirmaProfil:{
      'image_URL': '',
      'image': '',
      'pp_URL': '',
      'pp': '',
    },
    Cont_Osoba:{
      'id': '',
      'meno': '',
      'priezvisko': '',
      'tel': '',
      'email': '',
    },
    AdminImage:{
      'image_URL': '',
      'image': '',
    },
  },
  mutations: {
    SET_STUDENT_PROFIL: (state, data) => {
      state.Studentprofil = data;
    },
    SET_STUDENT_FILES: (state, data) => {
      state.StudentFiles = data;
    },
    SET_J_ZNALOSTI: (state, data) => {
      state.j_znalosti = data;
    },
    SET_PC_ZNALOSTI: (state, data) => {
      state.pc_znalosti = data;
    },
    SET_FIRMA_PROFIL: (state, data) => {
      state.FirmaProfil = data;
    },
    SET_CONT_OSOBA: (state, data) => {
      state.Cont_Osoba = data;
    },
    SET_ADMIN_IMAGE: (state, data) => {
      state.AdminImage = data;
    },
  },
  actions: {
    SET_STUDENT_PROFIL: ({commit}, data) => {
      commit('SET_STUDENT_PROFIL', data);
    },
    SET_STUDENT_FILES: ({commit}, data) => {
      commit('SET_STUDENT_FILES', data);
    },
    SET_J_ZNALOSTI: ({commit}, data) => {
      commit('SET_J_ZNALOSTI', data);
    },
    SET_PC_ZNALOSTI: ({commit}, data) => {
      commit('SET_PC_ZNALOSTI', data);
    },
    SET_FIRMA_PROFIL: ({commit}, data) => {
      commit('SET_FIRMA_PROFIL', data);
    },
    SET_CONT_OSOBA: ({commit}, data) => {
      commit('SET_CONT_OSOBA', data);
    },
    SET_ADMIN_IMAGE: ({commit}, data) => {
      commit('SET_ADMIN_IMAGE', data);
    }
  },
  getters: {
    GET_STUDENT_PROFIL: state => state.Studentprofil,
    GET_STUDENT_FILES: state => state.StudentFiles,
    GET_J_ZNALOSTI: state => state.j_znalosti,
    GET_PC_ZNALOSTI: state => state.pc_znalosti,
    GET_FIRMA_PROFIL: state => state.FirmaProfil,
    GET_CONT_OSOBA: state => state.Cont_Osoba,
    GET_ADMIN_IMAGE: state => state.AdminImage,
  }
})

export default profil;
