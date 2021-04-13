<template>
  <div>
    <div class="Basic_Grey">
      <div class="left">
        <div>
          <img :src="getFile(image.image)" style="width: 50%;height: 50%">
        </div>
      </div>
      <div class="right">
        <div class="Basic">
          <h1>{{ admin.meno }} {{ admin.priezvisko }}</h1>
        </div>
        <div class="Basic">
          <div class="field">
            <h3 class="H3left">Dátum narodenia:</h3>
            <h4>{{ admin.datum_narodenia }}</h4>
          </div>
          <div class="field">
            <h3 class="H3left">Krajina:</h3>
            <h4>{{ krajina.nazov }}</h4>
          </div>
          <div class="field">
            <h3 class="H3left">Kraj:</h3>
            <h4>{{ kraj.nazov }}</h4>
          </div>
          <div class="field">
            <h3 class="H3left">Mesto:</h3>
            <h4>{{ admin.mesto }}</h4>
          </div>
          <div class="field">
            <h3 class="H3left">Ulica:</h3>
            <h4>{{ admin.ulica }}</h4>
          </div>
          <div class="field">
            <h3 class="H3left">Školský Email:</h3>
            <h4>{{ admin.skolsky_email }}</h4>
          </div>
          <div class="field"  v-if="admin.sukromny_email!=''">
            <h3 class="H3left">Súkromný Email:</h3>
            <h4>{{ admin.sukromny_email }}</h4>
          </div>
          <div class="field"  v-if="admin.tel_cislo!=''">
            <h3 class="H3left">Tel. Číslo:</h3>
            <h4 >{{ admin.tel_cislo }}</h4>
          </div>
        </div>
        <div class="Basic"  v-if="admin.informacie!=''">
          <div class="field">
            <h4>{{ admin.informacie }}</h4>
          </div>
        </div>
      </div>
      <img v-if="rola==3" src="../../assets/icons/edit.png" class="crud" @click="Edit_Profil()">
    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import router from "@/router";
import ApiRequests from '@/ApiRequests';


export default {
  name: 'Admin_Profil',
  computed: {
    ...mapGetters({
      isAuth: 'GET_AUTH',
      admin: 'GET_ADMIN',
      krajina: 'GET_KRAJINY',
      kraj: 'GET_KRAJ',
      image:'GET_ADMIN_IMAGE',
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
      ApiRequests.Edit_Admin_Profil();
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
  border-bottom: #1DBECF solid;
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


</style>
