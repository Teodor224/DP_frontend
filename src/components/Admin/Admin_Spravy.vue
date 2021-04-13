<template>
  <div>
    <div class="Basic_Grey" v-if="spravy.length>0">
      <div class="table">
        <h1>Nové Spravy</h1>
        <table id="nove_spravy" v-if="Nove_Spravy>0">
          <tr>
            <th>Meno</th>
            <th>Priezvisko</th>
            <th>Email</th>
            <th>Správa</th>
            <th style="width: 100px">Dátum Vytvorenia</th>
            <th>CRUD Operacie</th>
          </tr>
          <tr  v-for="s in spravy" :key="s.id" v-if="s.nova_sprava">
            <td>{{ s.meno }}</td>
            <td>{{ s.priezvisko }}</td>
            <td>{{s.email}}</td>
            <td>{{s.sprava}}</td>
            <td>{{s.created_at.substr(0,10)}} {{s.created_at.substr(11,8)}}</td>
            <td>
              <img src="../../assets/icons/accept.png" class="crud"  @click="Precitane(s)">
            </td>
          </tr>
        </table>
        <div v-else>
          <h2>Žiadne nové správy</h2>
        </div>
      </div>
      <div class="table" v-if="Historia>0">
        <h1>Historia</h1>
        <table id="historia">
          <tr>
            <th>Meno</th>
            <th>Priezvisko</th>
            <th>Email</th>
            <th>Správa</th>
            <th style="width: 100px">Dátum Vytvorenia</th>
            <th style="width: 100px">Dátum Odpovede</th>
          </tr>
          <tr  v-for="s in spravy" :key="s.id" v-if="s.nova_sprava==false">
            <td>{{ s.meno }}</td>
            <td>{{ s.priezvisko }}</td>
            <td>{{s.email}}</td>
            <td>{{s.sprava}}</td>
            <td>{{s.created_at.substr(0,10)}} {{s.created_at.substr(11,8)}}</td>
            <td>{{s.updated_at.substr(0,10)}} {{s.updated_at.substr(11,8)}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="Basic_Grey" v-else>
      <h1 style="text-align: center">Žiadne Záznamy</h1>
    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import ApiRequests from '@/ApiRequests';

export default {
  name: 'Admin_Spravy',
  computed: {
    ...mapGetters({
      spravy:'GET_SPRAVY',
    }),
  },
  data(){
    return{
      Historia:0,
      Nove_Spravy:0,
    }
  },
  methods:{
    Precitane(Sprava){
      ApiRequests.Admin_Odpoved(Sprava);
      this.Historia = this.Historia + 1;
      this.Nove_Spravy=this.Nove_Spravy-1;
    }
  },
  watch: {
    spravy: function () {
      this.Historia=0;
      this.Nove_Spravy=0;
      for(var i=0;i<this.spravy.length;i++){
        if(this.spravy[i].nova_sprava==false) {
          this.Historia = this.Historia + 1;
        }else{
          this.Nove_Spravy=this.Nove_Spravy+1;
        }
      }
    },
  },
  created() {
    ApiRequests.Admin_Get_Spravy();
  },
  mounted() {
    this.Historia=0;
    this.Nove_Spravy=0;
    for(var i=0;i<this.spravy.length;i++){
      if(this.spravy[i].nova_sprava==false) {
        this.Historia = this.Historia + 1;
      }else{
        this.Nove_Spravy=this.Nove_Spravy+1;
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.Basic {
  border-top: #1DBECF solid;
  text-align: center;
}

.Basic_Grey {
  border-top: #1DBECF solid;
  text-align: center;
  background-color: #F4F4F4;
}


h1 {
  padding-bottom: 2%;
  padding-top: 2%;
  text-align: left;
}

.table {
  padding: 2%;
}

#nove_spravy,#historia {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#nove_spravy td, #nove_spravy th, #historia td, #historia th {
  border: 1px solid #ddd;
  padding: 8px;
}

#nove_spravy tr:nth-child(even), #historia tr:nth-child(even){
  background-color: #f2f2f2;
}

#nove_spravy tr:hover, #historia tr:hover {
  background-color: #ddd;
}

#nove_spravy th, #historia th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #1DBECF;
  color: white;
}

.crud{
  height: 20px;
  width: 20px;
}


</style>
