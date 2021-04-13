const napiste_nam = ({
  state: {
    Sprava_Odoslana:false,
    Spravy:{
      id:'',
      meno:'',
      priezvisko:'',
      email:'',
      sprava:'',
      nova_sprava:'',
      created:''
    }
  },
  mutations: {
    SET_SO: (state, data) => {
      state.Sprava_Odoslana = data;
    },
    SET_SPRAVY : (state, data) => {
      state.Spravy = data;
    },
  },
  actions: {
    SET_SO: ({commit}, data) => {
      commit('SET_SO', data);
    },
    SET_SPRAVY: ({commit}, data) => {
      commit('SET_SPRAVY', data);
    },
  },
  getters: {
    GET_SO: state => state.Sprava_Odoslana,
    GET_SPRAVY: state => state.Spravy,
  }
})

export default napiste_nam;
