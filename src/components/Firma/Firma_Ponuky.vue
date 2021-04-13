<template>
    <div class="Basic_Grey">
      <h1>Aktuálne ponuky</h1>
      <div class="table">
        <img src="../../assets/icons/add.png" class="add" @click="add">
        <table id="aktualne_ponuky">
          <tr>
            <th>Názov ponuky</th>
            <th>Platná od</th>
            <th>Platná do</th>
            <th>Mesto</th>
            <th style="text-align: center">CRUD Operacie</th>
          </tr>
          <tr v-for="p in ponuky" :key="p.id" v-if="p.je_aktualna==true">
            <td>{{p.nazov}}</td>
            <td>{{p.datum_od}}</td>
            <td>{{p.datum_do}}</td>
            <td>{{p.mesto}}</td>
            <td style="text-align: center">
                <img src="../../assets/icons/view.png" class="crud" @click="detail(p)">
                <img src="../../assets/icons/edit.png" class="crud" @click="edit(p)">
                <img src="../../assets/icons/delete.png" class="crud" @click="remove(p.id,org.id)">
            </td>
          </tr>
        </table>
      </div>
      <h1>História</h1>
      <div class="table">
        <table id="historia">
          <tr>
            <th>Názov ponuky</th>
            <th>Platná od</th>
            <th>Platná do</th>
            <th>Mesto</th>
            <th style="text-align: center">CRUD Operacie</th>
          </tr>
          <tr v-for="p in ponuky" :key="p.id" v-if="p.je_aktualna==false">
            <td>{{p.nazov}}</td>
            <td>{{p.datum_od}}</td>
            <td>{{p.datum_do}}</td>
            <td>{{p.mesto}}</td>
            <td style="text-align: center">
              <img src="../../assets/icons/view.png" class="crud" @click="detail(p)">
            </td>
          </tr>
        </table>
      </div>
    </div>
</template>


<script>
import {mapGetters} from "vuex";
import ApiRequests from '@/ApiRequests';

export default {
  name: 'Ponuka',
  computed: {
    ...mapGetters({
      org: 'GET_FIRMA',
      ponuky:'GET_PONUKA'
    })
  },
  methods: {
    add() {
      ApiRequests.Add_Ponuka_Screen();
    },
    remove(id,firma_id) {
      ApiRequests.Remove_Ponuka(id,firma_id);
    },
    edit(ponuka){
      ApiRequests.Edit_Ponuka(ponuka);
    },
    detail(ponuka){
      ApiRequests.Detail_Ponuka(ponuka);
    }
  },
  created(){
    ApiRequests.Firma_Ponuky(this.org)
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
  padding-bottom: 5%;
}


h1 {
  padding-top: 2%;
}

.add {
  height: 50px;
  width: 50px;
}

.table {
  padding: 2%;
  text-align: left;
}

#aktualne_ponuky, #historia {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#aktualne_ponuky td, #aktualne_ponuky th, #historia td, #historia th {
  border: 1px solid #ddd;
  padding: 8px;
}

#aktualne_ponuky tr:nth-child(even), #historia tr:nth-child(even){
  background-color: #f2f2f2;
}

#aktualne_ponuky tr:hover, #historia tr:hover {
  background-color: #ddd;
}

#aktualne_ponuky th, #historia th {
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


</style>
