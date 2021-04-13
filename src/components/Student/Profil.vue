<template>
  <div>
    <div class="Basic_Grey">
      <div class="left">
        <div>
          <img :src="getFile(files.image)" style="width: 50%;height: 50%">
        </div>
        <div style="padding-top: 30%" v-if="files.pdf!='NO_PDF'">
          <a :href="getFile(files.pdf)" target="_blank"><img src="../../assets/icons/PDFicon.png" style="width: 20%;height: 20%"></a>
          <h3 style="color:#1DBECF">Životopis</h3>
        </div>
        <div style="padding-top: 30%" v-else>
          <h3 style="color:#1DBECF">Životopis nie je k dispozícii.</h3>
        </div>
      </div>
      <div class="right">
        <div class="Basic">
          <h1>{{ stud.meno }} {{ stud.priezvisko }}</h1>
        </div>
        <div class="Basic">
          <div class="field" v-for="p in profil" :key="profil.id">
            <div class="field">
              <h3 class="H3left">Fakulta:</h3>
              <h4>{{ p.fakulty_id }}</h4>
            </div>
            <div class="field">
              <h3 class="H3left">Študijny program:</h3>
              <h4>{{ p.nazov }}</h4>
            </div>
            <div class="field">
              <h3 class="H3left">Stupeň:</h3>
              <h4>{{ p.stupen }}</h4>
            </div>
            <br/>
          </div>
          <div class="field">
            <h4 class="H3left">Najvyšie dosiahnuté vzdelanie:</h4>
            <h5>{{ stud.vzdelanie }}</h5>
          </div>
        </div>
        <div class="Basic">
          <div class="field">
            <h3 class="H3left">Dátum narodenia:</h3>
            <h4>{{ stud.datum_narodenia }}</h4>
          </div>
          <div class="field">
            <h3 class="H3left">Krajina:</h3>
            <h4>{{ stud.krajina_id }}</h4>
          </div>
          <div class="field">
            <h3 class="H3left">Kraj:</h3>
            <h4>{{ stud.kraj_id }}</h4>
          </div>
          <div class="field">
            <h3 class="H3left">Mesto:</h3>
            <h4>{{ stud.mesto }}</h4>
          </div>
          <div class="field">
            <h3 class="H3left">Ulica:</h3>
            <h4>{{ stud.ulica }}</h4>
          </div>
          <div class="field">
            <h3 class="H3left">Školský Email:</h3>
            <h4>{{ stud.skolsky_email }}</h4>
          </div>
          <div class="field"  v-if="stud.sukromny_email!=''">
            <h3 class="H3left">Súkromný Email:</h3>
            <h4>{{ stud.sukromny_email }}</h4>
          </div>
          <div class="field"  v-if="stud.tel_cislo!=''">
            <h3 class="H3left">Tel. Číslo:</h3>
            <h4 >{{ stud.tel_cislo }}</h4>
          </div>
        </div>
        <div class="Basic"  v-if="j_znalosti.length>0">
          <div class="field">
            <h3 class="middle">Jazykové Znalosti</h3>
            <div v-for="j in j_znalosti" :key="j_znalosti.id">
              <h4 style="float: left">{{ j.nazov }}:</h4>
              <h4>{{j.uroven}}</h4>
            </div>
          </div>
        </div>
        <div class="Basic"  v-if="pc_znalosti.length>0">
          <div class="field">
            <h3 class="middle">Počitačové Znalosti</h3>
            <div v-for="p in pc_znalosti" :key="pc_znalosti.id">
              <h4 style="float: left">{{ p.nazov }}:</h4>
              <h4>{{p.uroven}}</h4>
            </div>
          </div>
        </div>
        <div class="Basic"  v-if="stud.informacie!=''">
          <div class="field">
            <h4>{{ stud.informacie }}</h4>
          </div>
        </div>
      </div>
      <img v-if="rola==1" src="../../assets/icons/edit.png" class="crud" @click="Edit_Profil()">
    </div>
    <div class="tlacidlo">
      <button type="submit" @click="Back">Späť</button>
    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import ApiRequests from '@/ApiRequests';


export default {
  name: 'Profil',
  computed: {
    ...mapGetters({
      isAuth: 'GET_AUTH',
      stud: 'GET_STUDENT',
      profil: 'GET_STUDENT_PROFIL',
      files:'GET_STUDENT_FILES',
      j_znalosti: 'GET_J_ZNALOSTI',
      pc_znalosti: 'GET_PC_ZNALOSTI',
      rola:'GET_ROLA',
    })
  },
  methods: {
    getFile(file) {
      if(file != "user.png") {
        if(file == "NO_PDF"){
          return;
        }else {
          try {
            return require("../../../../backend/storage/ais/" + file);
          }catch (e){
            return require("../../assets/user.png");
          }
        }
      }else{
        return require("../../assets/user.png");
      }
    },
    Edit_Profil(){
      ApiRequests.EditProfil()
    },
    Back() {
      this.$router.go(-1);
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.Basic_Grey {
  border-top: #1DBECF solid;
  text-align: center;
  display: flex;
  background-color: #F4F4F4;
}


h1 {
  color: black;
}

h3 {
  color: black;
}

img {
  width: 50%;
  height: 50%;
}

.left {
  padding-top: 2%;
  flex: 1;
}

.right {
  flex: 1;
  padding-top: 5%;
}

.Basic {
  padding-bottom: 5%;
  padding-top: 2%;
  border-bottom: #1DBECF solid;
  margin-right: 5% !important;
  margin-left: 5% !important;
}

.field {
  margin-top: 5px !important;
  text-align: right;

}

.H3left {
  color: #1DBECF;
  float: left;
}

.middle {
  text-align: center;
  color: #1DBECF;
  padding-bottom: 2%;
}


.crud{
  height: 30px;
  width: 30px;
}

.tlacidlo{
  text-align: center;
  padding-bottom: 3%;
  background-color: #F4F4F4;
  border-bottom: #1DBECF solid;
}


</style>
