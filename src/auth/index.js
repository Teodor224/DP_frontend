import BaseApi from "@/BaseApi"
import router from "@/router"
import store from "@/store"
const LOGIN_URL="/login";
const LOGIN_AIS_URL="/loginAis";
const REG_URL="/register";
const LOGOUT_URL="/logout";

export default ({
  userDefault:{
    firma_email: '',
    firma_heslo: '',
    student_heslo: '',
    student_ID: ''
  },
  LogIn(cred){
    BaseApi().post(LOGIN_URL,cred).then((response)=>{
      if(response.data.success != false){
        if(response.data.message.je_schvalena) {
          store.dispatch('SET_FIRMA', response.data.message);
          store.dispatch('SET_ROLA', response.data.rola);
          store.dispatch('SET_AUTH', true);
          router.push("/")
        }else{
          router.push("Caka_na_Schvalenie")
        }

      }else{
        store.dispatch('SET_STATUS', "F_ERROR");
      }
      });
  },

  LoginAis(cred){
    BaseApi().post(LOGIN_AIS_URL,cred).then((response)=>{
      if(response.data.success != false){
        if(response.data.rola==1) {
          store.dispatch('SET_STUDENT', response.data.message);
          store.dispatch('SET_AUTH', true);
          store.dispatch('SET_ROLA', response.data.rola);
          router.push("/StudentHome")
        }else{
          store.dispatch('SET_ADMIN', response.data.message);
          store.dispatch('SET_AUTH', true);
          store.dispatch('SET_ROLA', response.data.rola);
          router.push("/")
        }
      }else{
        store.dispatch('SET_STATUS', "A_ERROR");
      }
    });
  },

  Register(cred){
    BaseApi().post(REG_URL,cred).then((response)=>{
      console.log(response.data);
      router.push("/Caka_na_Schvalenie")
    });
  },

  LogOut(cred,redirect){
    BaseApi().post(LOGOUT_URL,cred).then((response)=>{
      if(!response.data.error){
        this.clear();
        router.push('/').catch(err => {});
      }
    });
  },

  clear(){
    store.dispatch('SET_FIRMA',this.userDefault);
    store.dispatch('SET_STUDENT',this.userDefault);
    store.dispatch('SET_AUTH',false);
  }
});
