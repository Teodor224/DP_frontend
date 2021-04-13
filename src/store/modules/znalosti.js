const stud_profil = ({
  state: {
    j_z: {
      'id': '',
      'nazov': '',
    },
    pc_z: {
      'id': '',
      'nazov': '',
    },
  },
  mutations: {
    SET_J_Z: (state, data) => {
      state.j_z = data;
    },
    SET_PC_Z: (state, data) => {
      state.pc_z = data;
    }
  },
  actions: {
    SET_J_Z: ({commit}, data) => {
      commit('SET_J_Z', data);
    },
    SET_PC_Z: ({commit}, data) => {
      commit('SET_PC_Z', data);
    }
  },
  getters: {
    GET_J_Z: state => state.j_z,
    GET_PC_Z: state => state.pc_z,
  }
})

export default stud_profil;
