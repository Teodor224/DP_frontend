<template>
    <div class="Basic_Grey">
      <div class="table" v-if="pocet_Ziadosti>0">
        <h1>Moje žiadosti</h1>
        <table id="ziadosti">
          <tr>
            <th>Názov ponuky</th>
            <th>Firma</th>
            <th>Platná od</th>
            <th>Platná do</th>
            <th>Stav</th>
            <th  style="text-align: center">CRUD Operacie</th>
          </tr>
          <tr  v-for="z in ziadosti" :key="z.id" v-if="z.status=='V procese'">
            <td>{{ z.nazov }}</td>
            <td>{{ z.firma }}</td>
            <td>{{z.od}}</td>
            <td>{{z.do}}</td>
            <td>{{z.status}}</td>
            <td  style="text-align: center">
              <img src="../../assets/icons/view.png" class="crud" @click="view(z)">
              <img src="../../assets/icons/delete.png" class="crud" @click="remove(z)">
            </td>
          </tr>
        </table>
      </div>
      <div class="Half-Border" v-else>
        <h1>Žiadne žiadosti</h1>
      </div>
      <div class="table" v-if="pocet_prijatych_Ziadosti>0">
        <h1>Prijaté žiadosti</h1>
        <table id="ponuky">
          <tr>
            <th>Názov ponuky</th>
            <th>Firma</th>
            <th>Platná od</th>
            <th>Platná do</th>
            <th>Stav</th>
            <th  style="text-align: center">Komentár</th>
          </tr>
          <tr  v-for="z in ziadosti" :key="z.id" v-if="z.status=='Prijatý'">
            <td>{{ z.nazov }}</td>
            <td>{{ z.firma }}</td>
            <td>{{z.od}}</td>
            <td>{{z.do}}</td>
            <td>{{z.status}}</td>
            <td  style="text-align: center" v-if="z.hodnotenie>-1">
              <img src="../../assets/icons/view.png" class="crud" @click="view(z)">
              <img src="../../assets/icons/edit.png" class="crud" @click="editKomentar(z)">
              <img src="../../assets/icons/delete.png" class="crud" @click="Delete_Komentar(z)">
            </td>
            <td  style="text-align: center" v-else>
              <img src="../../assets/icons/view.png" class="crud" @click="view(z)">
              <img src="../../assets/icons/add.png" class="crud" @click="Add_Komentar(z)">
            </td>
          </tr>
        </table>
        <!--<Modal_Window v-model="modalOpen"></Modal_Window>-->
      </div>
      <div class="Half-Border" v-else>
        <h1>Žiadne prijaté žiadosti</h1>
      </div>
      <div class="table" v-if="pocet_zamietnutych_Ziadosti>0">
        <h1>Zamietnuté žiadosti</h1>
        <table id="zamietnute_ziadosti">
          <tr>
            <th>Názov ponuky</th>
            <th>Firma</th>
            <th>Platná od</th>
            <th>Platná do</th>
            <th>Stav</th>
            <th  style="text-align: center">Komentár</th>
          </tr>
          <tr  v-for="z in ziadosti" :key="z.id" v-if="z.status=='Zrušene Študentom' || z.status=='Zamietnuté'">
            <td>{{ z.nazov }}</td>
            <td>{{ z.firma }}</td>
            <td>{{z.od}}</td>
            <td>{{z.do}}</td>
            <td>{{z.status}}</td>
            <td  style="text-align: center">
              <img src="../../assets/icons/view.png" class="crud" @click="view(z)">
            </td>
          </tr>
        </table>
        <!--<Modal_Window v-model="modalOpen"></Modal_Window>-->
      </div>
      <div class="Half-Border" v-else>
        <h1>Žiadne zamietnuté žiadosti</h1>
      </div>
      <div v-if="showModal==true">
        <div v-if="Add_Operation==true">
          <Komentar_MODAL v-if="showModal" :showModal=showModal :Add_Operation="true"  :Komentar_K="Komentar_K" @clicked="onChildClick"></Komentar_MODAL>
        </div>
        <div v-else>
          <Komentar_MODAL v-if="showModal" :showModal=showModal :Add_Operation="false" :Komentar_K="Komentar_K" @clicked="onChildClick"></Komentar_MODAL>
        </div>
      </div>
  </div>
</template>


<script>
import ApiRequests from '@/ApiRequests';
import {mapGetters} from "vuex";
import Komentar_MODAL from "./Komentar_MODAL";

export default {
  name: 'Ziadosti_Hodnotenia',
  components: {Komentar_MODAL},
  computed: {
    ...mapGetters({
      stud: 'GET_STUDENT',
      ziadosti: 'GET_AIS_PONUKY',
    }),
  },
  data(){
    return{
      showModal:false,
      Add_Operation:false,
      Komentar_K:[],
      pocet_Ziadosti:0,
      pocet_prijatych_Ziadosti:0,
      pocet_zamietnutych_Ziadosti:0,
    }
  },
  methods: {
    add() {
      this.$router.push('add_Ponuka');
    },
    view(ponuka) {
      ApiRequests.Detail_Ponuka(ponuka);
    },
    remove(ponuka) {
      ApiRequests.Student_Remove(ponuka);
      ponuka.status="Zrušene Študentom";
      this.zamietnute_ziadosti=this.zamietnute_ziadosti+1;
    },
    editKomentar(komentar){
      this.Add_Operation=false;
      this.showModal=true;
      this.Komentar_K=komentar;
    },
    Delete_Komentar(komentar){
      ApiRequests.Student_Remove_Komentar(komentar);
      komentar.hodnotenie=-1;
      komentar.komentar="";
    },
    Add_Komentar(komentar){
      this.Komentar_K=komentar;
      this.Add_Operation=true;
      this.showModal=true;
    },
    onChildClick () {
      this.showModal = false;
    },
  },
  created() {
    ApiRequests.ShowStudent_Ziad_Hod(this.stud)

  },
  mounted() {
    this.pocet_Ziadosti=0;
    this.pocet_prijatych_Ziadosti=0;
    this.pocet_zamietnutych_Ziadosti=0;
    for(var i=0;i<this.ziadosti.length;i++){
      if(this.ziadosti[i].status=="V procese") {
        this.pocet_Ziadosti = this.pocet_Ziadosti + 1;
      }else if(this.ziadosti[i].status=="Prijatý") {
        this.pocet_prijatych_Ziadosti = this.pocet_prijatych_Ziadosti + 1;
      }else{
        this.pocet_zamietnutych_Ziadosti=this.pocet_zamietnutych_Ziadosti+1;
      }
    }
  },
  watch: {
    ziadosti: function () {
      this.pocet_Ziadosti=0;
      this.pocet_prijatych_Ziadosti=0;
      this.pocet_zamietnutych_Ziadosti=0;
      for(var i=0;i<this.ziadosti.length;i++){
        if(this.ziadosti[i].status=="V procese") {
          this.pocet_Ziadosti = this.pocet_Ziadosti + 1;
        }else if(this.ziadosti[i].status=="Prijatý") {
          this.pocet_prijatych_Ziadosti = this.pocet_prijatych_Ziadosti + 1;
        }else{
          this.pocet_zamietnutych_Ziadosti =this.pocet_zamietnutych_Ziadosti+1;
        }
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.Basic_Grey {
  border-top: #1DBECF solid;
  text-align: center;
  background-color: #F4F4F4;
  border-bottom: #1DBECF solid;
  padding-top: 5%;
}


.table {
  padding: 2%;
  text-align: left;
}

#ziadosti, #zamietnute_ziadosti {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#ziadosti td, #ziadosti th, #zamietnute_ziadosti td, #zamietnute_ziadosti th {
  border: 1px solid #ddd;
  padding: 8px;
}

#ziadosti tr:nth-child(even), #zamietnute_ziadosti tr:nth-child(even) {
  background-color: #f2f2f2;
}

#ziadosti tr:hover, #zamietnute_ziadosti tr:hover {
  background-color: #ddd;
}

#ziadosti th, #zamietnute_ziadosti th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #1DBECF;
  color: white;
}

#ponuky {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#ponuky td, #ponuky th {
  border: 1px solid #ddd;
  padding: 8px;
}

#ponuky tr:nth-child(even) {
  background-color: #f2f2f2;
}

#ponuky tr:hover {
  background-color: #ddd;
}

#ponuky th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #1DBECF;
  color: white;
}

.crud{
  height: 20px;
  width: 20px;
}

h1{
  padding-bottom: 2%;
}

.Half-Border{
  margin-left: 25% !important;
  width: 50%;
  border-bottom: #1DBECF solid;
  margin-bottom: 5% !important;
}

</style>
