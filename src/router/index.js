import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home";
import Contact from "../components/Contact";
import Login from "../components/Login"
import Register from "../components/Register";
import Firma from "../components/Firma/Firma";
import store from "@/store"
import Ponuka from "../components/Firma/Firma_Ponuky";
import add_Ponuka from "../components/Ponuky/add_Ponuka";
import StudentHome from "../components/Student/StudentHome";
import Detail_Ponuka from "../components/Ponuky/Detail_Ponuka";
import Profil from "../components/Student/Profil";
import Ziadosti_Hodnotenia from "../components/Student/Ziadosti_Hodnotenia";
import Edit_Profil from "../components/Student/Edit_Profil";
import Edit_Firma_Profil from "../components/Firma/Edit_Firma_Profil";
import Edit_Ponuka from "../components/Ponuky/Edit_Ponuka";
import Admin_Profil from "../components/Admin/Admin_Profil";
import Edit_Admin_Profil from "../components/Admin/Edit_Admin_Profil";
import Admin_Spravy from "../components/Admin/Admin_Spravy";
import Sprava_Firiem from "../components/Admin/Sprava_Firiem";
import Sprava_UKF from "../components/Admin/Sprava_UKF";
import Sprava_Ponuk from "../components/Admin/Sprava_Ponuk";
import Sprava_Znalosti from "../components/Admin/Sprava_Znalosti";
import Sprava_Regionov from "../components/Admin/Sprava_Regionov";
import Caka_na_Schvalenie from "../components/Firma/Caka_na_Schvalenie";



import "chart.js";
import "hchs-vue-charts";
Vue.use(window.VueCharts);
Vue.use(Router)

const AllMiddleware= ()=>{
  return(to,from,next)=>{
    const myRole=store.getters.GET_ROLA;
    const auth=store.getters.GET_AUTH;
    if(auth== true){
      if(myRole >0 && myRole <5){
        if(myRole==4){
            return next()
        }else {
          return next()
        }
      }
    }else{
      return next('/login');
    }
  }
};

const STUDMiddleware= ()=>{
  return(to,from,next)=>{
    const myRole=store.getters.GET_ROLA;
    const auth=store.getters.GET_AUTH;
    if(auth== true){
      if(myRole==1){
        return next()
      }
    }else{
      return next('/login');
    }
  }
};

const AisMiddleware= ()=>{
  return(to,from,next)=>{
    const myRole=store.getters.GET_ROLA;
    const auth=store.getters.GET_AUTH;
    if(auth== true){
      if(myRole==1 || myRole==2){
        return next()
      }
    }else{
      return next('/login');
    }
  }
};

const FirmaMiddleware= ()=>{
  return(to,from,next)=>{
    const myRole=store.getters.GET_ROLA;
    const auth=store.getters.GET_AUTH;
    const firma=store.getters.GET_FIRMA;
    if(auth== true){
      if(myRole==4 && firma.je_schvalena){
        return next()
      }else{
        return next("/Caka_na_Schvalenie")
      }
    }else{
      return next('/login');
    }
  }
};

const AdminMiddleware= ()=>{
  return(to,from,next)=>{
    const myRole=store.getters.GET_ROLA;
    const auth=store.getters.GET_AUTH;
    if(auth== true){
      if(myRole==3){
        return next()
      }
    }else{
      return next('/login');
    }
  }
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/firma',
      name: 'Firma',
      component: Firma,
      meta:{
        requiredAuth:true,
        OrgRoles:[4],
      },
      beforeEnter: AllMiddleware()
    },
    {
      path: '/Caka_na_Schvalenie',
      name: 'Caka_na_Schvalenie',
      component: Caka_na_Schvalenie,
    },
    {
      path: '/ponuky',
      name: 'Ponuka',
      component: Ponuka,
      beforeEnter: FirmaMiddleware()
    },
    {
      path: '/add_ponuka',
      name: 'add_Ponuka',
      component: add_Ponuka,
      beforeEnter: FirmaMiddleware()
    },
    {
      path: '/Edit_Firma_Profil',
      name: 'Edit_Firma_Profil',
      component: Edit_Firma_Profil,
      beforeEnter: FirmaMiddleware()
    },
    {
      path: '/Edit_Ponuka',
      name: 'Edit_Ponuka',
      component: Edit_Ponuka,
      beforeEnter: FirmaMiddleware()
    },
    {
      path: '/StudentHome',
      name: 'StudentHome',
      component: StudentHome,
      beforeEnter: AisMiddleware()
    },
    {
      path: '/Detail_Ponuka',
      name: 'Detail_ponuka',
      component: Detail_Ponuka,
      beforeEnter: AllMiddleware()
    },
    {
      path: '/Profil',
      name: 'Profil',
      component: Profil,
      beforeEnter: AllMiddleware()
    },
    {
      path: '/Ziadosti_Hodnotenia',
      name: 'Ziadosti_Hodnotenia',
      component: Ziadosti_Hodnotenia,
      beforeEnter: STUDMiddleware()
    },
    {
      path: '/Edit_Profil',
      name: 'Edit_Profil',
      component: Edit_Profil,
      beforeEnter: STUDMiddleware()
    },
    {
      path: '/Admin_Profil',
      name: 'Admin_Profil',
      component: Admin_Profil,
      beforeEnter: AdminMiddleware()
    },
    {
      path: '/Edit_Admin_Profil',
      name: 'Edit_Admin_Profil',
      component: Edit_Admin_Profil,
      beforeEnter: AdminMiddleware()
    },
    {
      path: '/Admin_Spravy',
      name: 'Admin_Spravy',
      component: Admin_Spravy,
      beforeEnter: AdminMiddleware()
    },
    {
      path: '/Sprava_UKF',
      name: 'Sprava_UKF',
      component: Sprava_UKF,
      beforeEnter: AdminMiddleware()
    },
    {
      path: '/Sprava_Firiem',
      name: 'Sprava_Firiem',
      component: Sprava_Firiem,
      beforeEnter: AdminMiddleware()
    },
    {
      path: '/Sprava_Ponuk',
      name: 'Sprava_Ponuk',
      component: Sprava_Ponuk,
      beforeEnter: AdminMiddleware()
    },
    {
      path: '/Sprava_Znalosti',
      name: 'Sprava_Znalosti',
      component: Sprava_Znalosti,
      beforeEnter: AdminMiddleware()
    },
    {
      path: '/Sprava_Regionov',
      name: 'Sprava_Regionov',
      component: Sprava_Regionov,
      beforeEnter: AdminMiddleware()
    },
  ]
})
