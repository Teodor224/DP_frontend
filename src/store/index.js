import vue from 'vue'
import vuex from 'vuex'
import auth from './modules/auth.js'
import profil from './modules/profil.js'
import znalosti from "./modules/znalosti";
import krajiny from "./modules/krajiny";
import ponuky from "./modules/ponuky";
import programy from "./modules/programy";
import ais_ponuky from "./modules/Ais_Ponuky";
import komentare from "./modules/komentare";
import statistiky from "./modules/statistiky";
import napiste_nam from "./modules/napiste_nam";
import Admin from "./modules/Admin";
import connection from "./modules/Connection";

vue.use(vuex);

export default new vuex.Store({
  modules:{
    auth,
    profil,
    znalosti,
    krajiny,
    ponuky,
    programy,
    ais_ponuky,
    komentare,
    statistiky,
    napiste_nam,
    Admin,
    connection
  }
})
