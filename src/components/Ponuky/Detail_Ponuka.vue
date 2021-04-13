<template>
  <div>
    <div class="Basic_Grey" v-if="ponuka.nazov!=null">
      <div class="Basic">
        <div class="field" style="text-align: center;" @click="Firma_Profil(org)">
          <img :src="getFile(Firma_Image.image)" style="width: 50%;height: 50%">
          <h2>{{ org.nazov }}</h2>
        </div>
      </div>
      <div class="Basic">
        <div class="field" style="text-align: center;">
          <h1>{{ ponuka.nazov }}</h1>
          <h4>{{ ponuka.program_id }} - {{ ponuka.zameranie_id }}</h4>
        </div>
      </div>
      <div class="Basic">
        <div class="field">
          <h3 class="H3left">Informácie:</h3>
          <h4>{{ ponuka.informacie }}</h4>
        </div>
        <div class="field">
          <h3 class="H3left">Termín Nástupu:</h3>
          <h4>{{ ponuka.datum_od }}</h4>
        </div>
        <div class="field">
          <h3 class="H3left">Termín Ukončenia:</h3>
          <h4>{{ ponuka.datum_do }}</h4>
        </div>
        <div class="field">
          <h3 class="H3left">Krajina:</h3>
          <h4>{{ ponuka.krajina_id }}</h4>
        </div>
        <div class="field">
          <h3 class="H3left">Kraj:</h3>
          <h4>{{ ponuka.kraj_id }}</h4>
        </div>
        <div class="field">
          <h3 class="H3left">Mesto:</h3>
          <h4>{{ ponuka.mesto }}</h4>
        </div>
        <div class="field">
          <h3 class="H3left">Mzda:</h3>
          <h4>{{ ponuka.mzda }}€/hodinu</h4>
        </div>
      </div>
      <div class="tlacidlo" v-if="rola=='1'">
        <button type="submit" v-if="je_ziadost!=true" @click="Add_Ziadost(stud,ponuka)">Uchádzať sa o ponuku</button>
      </div>
      <div class="table" v-if="rola=='4' && this.Pocet_Ziadosti>0">
        <h2>Zoznam žiadostí</h2>
        <table id="ais_ponuky">
          <tr>
            <th>Študent</th>
            <th>Status</th>
            <th style="text-align: center">CRUD Operacie</th>
          </tr>
          <tr v-for="p in ais_ponuky" :key="p.id" v-if="p.status=='V procese'">
            <td>{{ p.stud_meno }} {{ p.stud_priezvisko }}</td>
            <td>{{ p.status }}</td>
            <td style="text-align: center">
              <img src="../../assets/icons/view.png" class="crud" @click="view(p)">
              <img src="../../assets/icons/accept.png" class="crud" @click="accept(p)" v-if="p.status!='Zrušene Študentom'">
              <img src="../../assets/icons/delete.png" class="crud" @click="decline(p)" v-if="p.status!='Zrušene Študentom'">
            </td>
          </tr>
        </table>
      </div>
      <h1 v-else-if="rola=='4' && ponuka.je_aktualna==true"  class="H1Bottom">Žiadne žiadosti</h1>
      <div class="table" v-if="rola=='4' && this.Pocet_Prijatych>0">
        <h2>Zoznam prijatých študentov</h2>
        <table id="ais_ponuky_accepted">
          <tr>
            <th>Študent</th>
            <th>Status</th>
            <th style="text-align: center">CRUD Operacie</th>
          </tr>
          <tr v-for="p in ais_ponuky" :key="p.id" v-if="p.status=='Prijatý'">
            <td>{{ p.stud_meno }} {{ p.stud_priezvisko }}</td>
            <td>{{ p.status }}</td>
            <td style="text-align: center">
              <img src="../../assets/icons/view.png" class="crud" @click="view(p)">
            </td>
          </tr>
        </table>
      </div>
      <h1  v-else-if="rola=='4'" class="H1Bottom">Žiadny prijatý študenti.</h1>
      <div class="table" v-if="rola=='4' && this.Pocet_Zamietnutych>0">
        <h2>Zoznam zamietnutých žiadostí</h2>
        <table id="ais_ponuky_declined">
          <tr>
            <th>Študent</th>
            <th>Status</th>
            <th style="text-align: center">CRUD Operacie</th>
          </tr>
          <tr v-for="p in ais_ponuky" :key="p.id" v-if="p.status=='Zamietnuté' || p.status=='Zrušene Študentom'">
            <td>{{ p.stud_meno }} {{ p.stud_priezvisko }}</td>
            <td>{{ p.status }}</td>
            <td style="text-align: center">
              <img src="../../assets/icons/view.png" class="crud" @click="view(p)">
            </td>
          </tr>
        </table>
      </div>
      <h1  v-else-if="rola=='4'" class="H1Bottom">Žiadne zamietnuté žiadostí.</h1>
      <div class="tlacidlo">
        <button type="submit" @click="Back">Späť</button>
      </div>
    </div>
    <div class="Basic_Grey" v-else>
      <h1 style="color: #1DBECF">ERROR 400</h1>
      <h1 style="color: #1DBECF">BAD REQUEST</h1>
    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import ApiRequests from '@/ApiRequests';

export default {
  name: 'Detail_ponuka',
  data() {
    return {
      Pocet_Ziadosti: 0,
      Pocet_Prijatych:0,
      Pocet_Zamietnutych:0,
    }
  },
  computed: {
    ...mapGetters({
      Firma_Image: 'GET_FIRMA_PROFIL',
      ponuka: 'GET_PONUKA',
      org: 'GET_FIRMA',
      ais_ponuky: 'GET_AIS_PONUKY',
      rola: 'GET_ROLA',
      stud:'GET_STUDENT',
      je_ziadost:'GET_JE_ZIADOST',
    })
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    view(stud_ID) {
      ApiRequests.Profil(stud_ID)
    },
    decline(stud_ID) {
      this.Pocet_Ziadosti = this.Pocet_Ziadosti - 1;
      this.Pocet_Zamietnutych=this.Pocet_Zamietnutych+1;
      ApiRequests.Decline_Student(stud_ID)
    },
    accept(stud_ID) {
      this.Pocet_Prijatych = this.Pocet_Prijatych + 1;
      this.Pocet_Ziadosti = this.Pocet_Ziadosti - 1;
      ApiRequests.Accept_Student(stud_ID)
    },
    Add_Ziadost(stud,ponuka) {
      ApiRequests.Add_Ziadost(stud,ponuka)
    },
    getFile(file) {
      if (file != "user.png") {
        return require("../../../../backend/storage/firma/" + file);
      } else {
        return require("../../assets/user.png");
      }
    },
    Firma_Profil(cred) {
      ApiRequests.Firma_Profil(cred);
    },

  },
  created() {
    if(this.rola==4) {
      for (let i = 0; i < this.ais_ponuky.length; i++) {
        if (this.ais_ponuky[i].status == "Zamietnuté" || this.ais_ponuky[i].status == "Zrušene Študentom") {
          this.Pocet_Zamietnutych = this.Pocet_Zamietnutych + 1;
        }else if (this.ais_ponuky[i].status == "Prijatý") {
          this.Pocet_Prijatych = this.Pocet_Prijatych + 1;
        }else{
          this.Pocet_Ziadosti = this.Pocet_Ziadosti + 1;
        }

      }
    }else if(this.rola==1){
      ApiRequests.Je_Ziadost(this.stud,this.ponuka);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.Basic_Grey {
  border-top: #1DBECF solid;
  text-align: center;
  background-color: #F4F4F4;
  border-bottom: #1DBECF solid;
}

img {
  width: 300px;
  height: 300px;
}

h1 {
  color: black;
}

h2{
  color: #1DBECF;
  padding-bottom: 2%;
}

.Basic {
  padding-top: 2%;
  padding-bottom: 2%;
}

.tlacidlo {
  padding-bottom: 2%;
  padding-top: 2%;
}

.H3left {
  color: #1DBECF;
  float: left;

}

.field {
  margin-top: 5px !important;
  text-align: right;
  margin-right: 35% !important;
  margin-left: 35% !important;
}

.crud {
  height: 20px;
  width: 20px;
}

.table {
  padding-bottom: 5%;
  text-align: center;
}

#ais_ponuky, #ais_ponuky_accepted, #ais_ponuky_declined {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#ais_ponuky td, #ais_ponuky th, #ais_ponuky_accepted td, #ais_ponuky_accepted th, #ais_ponuky_declined td, #ais_ponuky_declined th {
  border: 1px solid #ddd;
  padding: 8px;
}

#ais_ponuky tr:nth-child(even), #ais_ponuky_accepted tr:nth-child(even), #ais_ponuky_declined tr:nth-child(even) {
  background-color: #f2f2f2;
}

#ais_ponuky tr:hover, #ais_ponuky_accepted tr:hover, #ais_ponuky_declined tr:hover {
  background-color: #ddd;
}

#ais_ponuky th, #ais_ponuky_accepted th, #ais_ponuky_declined th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #1DBECF;
  color: white;
}

.table {
  margin-right: 20% !important;
  margin-left: 20% !important;
}

.H1Bottom{
  color: #1DBECF;
  padding-bottom: 2%;
  padding-top: 2%;
}

</style>
