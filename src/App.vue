<template>
  <div id="app">
    <div>
    <ul v-if="isAuth && rola==4">
      <li><a @click="Kontakt">Kontakt</a></li>
      <li><router-link to="/">Domov</router-link></li>
      <li><router-link to="/ponuky">Moje ponuky</router-link></li>
      <li><a @click="Firma_Profil(org)">{{org.nazov}}</a></li>
      <li><a @click="logout">Odhlásenie</a></li>
    </ul>
      <ul v-else-if="isAuth && rola==1">
        <li><a @click="Kontakt">Kontakt</a></li>
        <li><router-link to="/">Domov</router-link></li>
        <li><router-link to="/StudentHome">Ponuky</router-link></li>
        <li><router-link to="/Ziadosti_Hodnotenia">Žiadosti a Hodnotenia</router-link></li>
        <li><a  @click="Student_Profil(stud)">{{stud.meno}} {{stud.priezvisko}}</a></li>
        <li><a  @click="logout">Odhlásenie</a></li>
      </ul>
      <ul v-else-if="isAuth && rola==2">
        <li><a @click="Kontakt">Kontakt</a></li>
        <li><router-link to="/">Domov</router-link></li>
        <li><router-link to="/StudentHome">Ponuky</router-link></li>
        <li><a  @click="logout">Odhlásenie</a></li>
      </ul>
      <ul v-else-if="isAuth && rola==3">
        <li><router-link to="/">Domov</router-link></li>
        <li><router-link to="/Admin_Spravy">Správy</router-link></li>
        <li><router-link to="/Sprava_UKF">Správa UKF</router-link></li>
        <li><router-link to="/Sprava_Firiem">Správa Firiem</router-link></li>
        <li><router-link to="/Sprava_Ponuk">Správa Ponúk</router-link></li>
        <li><router-link to="/Sprava_Znalosti">Správa Znalostí</router-link></li>
        <li><router-link to="/Sprava_Regionov">Správa Regiónov</router-link></li>
        <li><a  @click="Admin_Profil(admin)">{{admin.meno}} {{admin.priezvisko}}</a></li>
        <li><a  @click="logout">Odhlásenie</a></li>
      </ul>
      <ul v-else>
        <li><a @click="Kontakt">Kontakt</a></li>
        <li><router-link to="/">Domov</router-link></li>
        <li><router-link to="/login">Prihlásenie</router-link></li>
        <li><router-link to="/register">Registrácia</router-link></li>
      </ul>
    <img src="./assets/logo.png">
    </div>
    <router-view/>
  <footer class="footer">
    <div class="left">
      <p>Kontaktné informácie</p>
      <p>Univerzita Konštantína Filozofa v Nitre</p>
      <p>Tr. A. Hlinku 1, 949 01 Nitra</p>
      <p>tel: +421 37 6408 111</p>
      <p>e-mail: <a href="mailto:ukf@ukf.sk">ukf@ukf.sk</a></p>
      <p>IČO: 00157716</p>
      <p>DIČ: 2021246590</p>
      <p>IČ DPH: SK 2021246590</p>
      <br>
      <p>GRID: grid.411883.7</p>
      <p>ISNI: 0000000106737167</p>
    </div>
    <div class="right">
      <div>
        <a href="https://www.ukf.sk/ochrana-osobnych-udajov" target="_blank" ><h3>Ochana osobných údajov</h3></a>
      </div>
      <div class="siete">
      <a href="https://www.facebook.com/UKFvNitre/" target="_blank" ><img :src="facebook" style="width: 30px;height: 30px"></a>
      <a href="https://www.instagram.com/ukfvnitre/?hl=sk" target="_blank"><img :src="instagram" style="width: 30px;height: 30px"></a>
      </div>
    </div>
  </footer>
    <div class="end">
      <p>© 2021 Ľuboš Krajčír</p>
    </div>
  </div>
</template>


<script>
import { mapGetters} from 'vuex';
import auth from '@/auth';
import router from "@/router";
import store from "@/store";
import ApiRequests from '@/ApiRequests';
export default {
  name: 'App',
  computed:{
    ...mapGetters({
      isAuth:'GET_AUTH',
      org:'GET_FIRMA',
      stud:'GET_STUDENT',
      rola:'GET_ROLA',
      admin:'GET_ADMIN'
    })
  },
  methods:{
   logout(){
    auth.LogOut()
   },
    Firma_Profil(cred) {
      if(cred.je_schvalena) {
      ApiRequests.Firma_Profil(cred);
      }else{
        router.push("/Caka_na_Schvalenie").catch(err => {});
      }
     },
    Student_Profil(cred) {
      ApiRequests.Profil(cred);
    },
    Admin_Profil(cred) {
       ApiRequests.Admin_Profil(cred);
    },
    Kontakt(){
     store.dispatch('SET_SO',false);
     router.push("/contact").catch(err => {});
    },

  },
  data (){
    return {
      facebook: require("./assets/icons/facebook.png"),
      instagram: require("./assets/icons/instagram.png"),
    }
  }
}
</script>

<style>
* { margin: 0 !important; }


#app {
  font-family: sans-serif;
  padding-left: 15%;
  padding-right: 15%;
}

ul {
  font-weight: bold;
  font-size: small;
  float: right;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  border-bottom: #1DBECF solid;
}

li {
  float: left;
}

li a {
  display: block;
  color: black;
  margin: 0 0 1% 1% !important;;
  background-color: #C8C8C8;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #1DBECF;
  color: white;

}

button{
  background-color: #1DBECF ;
  font-family: sans-serif;
  font-size: medium;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  padding: 10px 24px;;
}

button:hover{
  background-color: black ;
  color: #1DBECF;
}

h1{
  color: #1DBECF;
}

h3{
  color: #1DBECF;
}

.footer{
  background-color: #666666;
  color: white;
  display: flex;
}

.left{
  padding: 3%;
  flex: 1;
}

.right{
  float:right;
  padding: 3%;
}

a{
  color: #1DBECF;
}
.siete{
  padding-top: 5%;
  float: right;
}

.end{
  background-color: #C8C8C8;
  text-align: center;
}

.error{
  color: red;
  padding-top: 1%;
  padding-bottom: 1%;
}

</style>
