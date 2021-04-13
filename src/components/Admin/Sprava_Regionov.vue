<template>
  <div>
    <div class="Basic_Grey">
      <div class="table">
        <h1>Zoznam Krajín</h1>
        <div class="search">
          <div class="add">
            <img src="../../assets/icons/add.png" class="add" @click="add_Krajina">
          </div>
          <input type="text" name="search" placeholder="Hladať" v-model="Krajina_Search" v-on:input="Search_Krajina(Krajina_Search)">
        </div>
        <table id="Krajiny">
          <tr>
            <th @click="Krajina_sort('id')" :style="this.Krajina_ID_Clicked" v-on:mouseenter="Krajina_Change_Header_Color('id')" v-on:mouseleave="Krajina_Leave_Header">ID</th>
            <th @click="Krajina_sort('nazov')" :style="this.Krajina_Nazov_Clicked" v-on:mouseenter="Krajina_Change_Header_Color('nazov')" v-on:mouseleave="Krajina_Leave_Header">Názov</th>
            <th @click="Krajina_sort('kontinent')" :style="this.Krajina_Kontinent_Clicked" v-on:mouseenter="Krajina_Change_Header_Color('kontinent')" v-on:mouseleave="Krajina_Leave_Header">Kontinent</th>
            <th>CRUD Operacie</th>
          </tr>
          <tbody v-if="Krajina_Search==''">
          <tr  v-for="k in Krajiny_sorted" :key="k.id">
            <td>{{k.id}}</td>
            <td>{{k.nazov }}</td>
            <td>{{k.kontinent }}</td>
            <td>
              <img src="../../assets/icons/edit.png" class="crud" @click="Edit_Krajina(k)">
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr  v-for="k in Krajiny" :key="k.id" v-if="k.is_visible">
            <td>{{k.id}}</td>
            <td>{{k.nazov }}</td>
            <td>{{k.kontinent }}</td>
            <td>
              <img src="../../assets/icons/edit.png" class="crud" @click="Edit_Krajina(k)">
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="this.Krajina_Search==''">
          <button @click="Krajina_prevPage" v-if="this.Krajina_currentPage>1">Predchádzajúce</button>
          <button @click="Krajina_selectPage(Krajina_SelectPage1)" :class="Krajina_SelectPage1_Style" v-if="this.Krajiny.length>10">{{Krajina_SelectPage1}}</button>
          <button @click="Krajina_selectPage(Krajina_SelectPage2)" :class="Krajina_SelectPage2_Style" v-if="this.Krajiny.length>10">{{Krajina_SelectPage2}}</button>
          <button @click="Krajina_selectPage(Krajina_SelectPage3)" :class="Krajina_SelectPage3_Style" v-if="this.Krajiny.length>20">{{Krajina_SelectPage3}}</button>
          <button @click="Krajina_selectPage(Krajina_SelectPage4)" :class="Krajina_SelectPage4_Style" v-if="this.Krajiny.length>30">{{Krajina_SelectPage4}}</button>
          <button @click="Krajina_selectPage(Krajina_SelectPage5)" :class="Krajina_SelectPage5_Style" v-if="this.Krajiny.length>40">{{Krajina_SelectPage5}}</button>
          <button @click="Krajina_nextPage"v-if="(this.Krajina_currentPage*this.pageSize) < this.Krajiny.length">Ďalšie</button>
        </div>
      </div>
      <div class="table">
        <h1>Zoznam Krajov</h1>
        <div class="search">
          <div class="add">
            <img src="../../assets/icons/add.png" class="add" @click="add_Kraj">
          </div>
          <input type="text" name="search" placeholder="Hladať" v-model="Kraj_Search" v-on:input="Search_Kraj(Kraj_Search)">
        </div>
        <table id="Kraje">
          <tr>
            <th @click="Kraj_sort('id')" :style="this.Kraj_ID_Clicked" v-on:mouseenter="Kraj_Change_Header_Color('id')" v-on:mouseleave="Kraj_Leave_Header">ID</th>
            <th @click="Kraj_sort('nazov')" :style="this.Kraj_Nazov_Clicked" v-on:mouseenter="Kraj_Change_Header_Color('nazov')" v-on:mouseleave="Kraj_Leave_Header">Názov</th>
            <th @click="Kraj_sort('stat')" :style="this.Kraj_Stat_Clicked" v-on:mouseenter="Kraj_Change_Header_Color('stat')" v-on:mouseleave="Kraj_Leave_Header">Štát</th>
            <th>CRUD Operacie</th>
          </tr>
          <tbody v-if="Kraj_Search==''">
          <tr  v-for="k in Kraje_sorted" :key="k.id">
            <td>{{k.id}}</td>
            <td>{{k.nazov }}</td>
            <td>{{k.stat }}</td>
            <td>
              <img src="../../assets/icons/edit.png" class="crud" @click="Edit_Kraj(k)">
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr  v-for="k in Kraje" :key="k.id" v-if="k.is_visible">
            <td>{{k.id}}</td>
            <td>{{k.nazov }}</td>
            <td>{{k.stat }}</td>
            <td>
              <img src="../../assets/icons/edit.png" class="crud" @click="Edit_Kraj(k)">
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="this.Kraj_Search==''">
          <button @click="Kraj_prevPage" v-if="this.Kraj_currentPage>1">Predchádzajúce</button>
          <button @click="Kraj_selectPage(Kraj_SelectPage1)" :class="Kraj_SelectPage1_Style" v-if="this.Kraje.length>10">{{Kraj_SelectPage1}}</button>
          <button @click="Kraj_selectPage(Kraj_SelectPage2)" :class="Kraj_SelectPage2_Style" v-if="this.Kraje.length>10">{{Kraj_SelectPage2}}</button>
          <button @click="Kraj_selectPage(Kraj_SelectPage3)" :class="Kraj_SelectPage3_Style" v-if="this.Kraje.length>20">{{Kraj_SelectPage3}}</button>
          <button @click="Kraj_selectPage(Kraj_SelectPage4)" :class="Kraj_SelectPage4_Style" v-if="this.Kraje.length>30">{{Kraj_SelectPage4}}</button>
          <button @click="Kraj_selectPage(Kraj_SelectPage5)" :class="Kraj_SelectPage5_Style" v-if="this.Kraje.length>40">{{Kraj_SelectPage5}}</button>
          <button @click="Kraj_nextPage"v-if="(this.Kraj_currentPage*this.pageSize) < this.Kraje.length">Ďalšie</button>
        </div>
      </div>
    </div>
    <div v-if="Kraj_showModal==true">
      <div v-if="Kraj_Add_Operation==true">
        <Kraj_MODAL v-if="Kraj_showModal" :showModal=Kraj_showModal :Krajiny="Krajiny" :Add_Operation="true" @clicked="onChildClick"></Kraj_MODAL>
      </div>
      <div v-else>
        <Kraj_MODAL v-if="Kraj_showModal" :showModal=Kraj_showModal :Krajiny="Krajiny" :Add_Operation="false" :Edit_Kraj="Kraj_Edit_Kraj" @clicked="onChildClick"></Kraj_MODAL>
      </div>
    </div>
    <div v-if="Krajina_showModal==true">
      <div v-if="Krajina_Add_Operation==true">
        <Krajina_MODAL v-if="Krajina_showModal" :showModal=Krajina_showModal :Add_Operation="true" @clicked="onChildClick"></Krajina_MODAL>
      </div>
      <div v-else>
        <Krajina_MODAL v-if="Krajina_showModal" :showModal=Krajina_showModal :Add_Operation="false" :Edit_Krajina="Krajina_Edit_Krajina" @clicked="onChildClick"></Krajina_MODAL>
      </div>
    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import ApiRequests from '@/ApiRequests';
import Krajina_MODAL from "./Krajina_MODAL";
import Kraj_MODAL from "./Kraj_MODAL";

export default {
  name: 'Sprava_Regionov',
  components: {Krajina_MODAL,Kraj_MODAL},
  data(){
    return {
      pageSize:10,

      //Krajiny
      Krajina_currentSort: 'id',
      Krajina_currentSortDir: 'asc',
      Krajina_ID_Clicked:'color: white',
      Krajina_Nazov_Clicked:'color: white',
      Krajina_Kontinent_Clicked:'color: white',
      Krajina_ID_IsClicked:false,
      Krajina_Nazov_IsClicked:false,
      Krajina_Kontinent_IsClicked:false,
      Krajina_currentPage:1,
      Krajina_SelectPage1:1,
      Krajina_SelectPage2:2,
      Krajina_SelectPage3:3,
      Krajina_SelectPage4:4,
      Krajina_SelectPage5:5,
      Krajina_SelectPage1_Style:'selected_button',
      Krajina_SelectPage2_Style:'',
      Krajina_SelectPage3_Style:'',
      Krajina_SelectPage4_Style:'',
      Krajina_SelectPage5_Style:'',
      Krajina_Search:'',
      Krajina_showModal:false,
      Krajina_Add_Operation:false,
      Krajina_Edit_Krajina:[],

      //Kraje
      Kraj_currentSort: 'id',
      Kraj_currentSortDir: 'asc',
      Kraj_ID_Clicked:'color: white',
      Kraj_Nazov_Clicked:'color: white',
      Kraj_Stat_Clicked:'color: white',
      Kraj_ID_IsClicked:false,
      Kraj_Nazov_IsClicked:false,
      Kraj_Stat_IsClicked:false,
      Kraj_currentPage:1,
      Kraj_SelectPage1:1,
      Kraj_SelectPage2:2,
      Kraj_SelectPage3:3,
      Kraj_SelectPage4:4,
      Kraj_SelectPage5:5,
      Kraj_SelectPage1_Style:'selected_button',
      Kraj_SelectPage2_Style:'',
      Kraj_SelectPage3_Style:'',
      Kraj_SelectPage4_Style:'',
      Kraj_SelectPage5_Style:'',
      Kraj_Search:'',
      Kraj_showModal:false,
      Kraj_Add_Operation:false,
      Kraj_Edit_Kraj:[],

    }
  },
  computed: {
    ...mapGetters({
      Krajiny:'GET_KRAJINY',
      Kraje: 'GET_KRAJ',
    }),
    Krajiny_sorted:function() {
      if(this.Krajiny.length>0) {
        return this.Krajiny.sort((a,b) => {
          let modifier = 1;
          if(this.Krajina_currentSortDir === 'desc') modifier = -1;
          if(a[this.Krajina_currentSort] < b[this.Krajina_currentSort]) return -1 * modifier;
          if(a[this.Krajina_currentSort] > b[this.Krajina_currentSort]) return 1 * modifier;
          return 0;
        }).filter((row, index) => {
          let start = (this.Krajina_currentPage-1)*this.pageSize;
          let end = this.Krajina_currentPage*this.pageSize;
          if(index >= start && index < end) return true;
        });
      }
    },
    Kraje_sorted:function() {
      if(this.Kraje.length>0) {
        return this.Kraje.sort((a,b) => {
          let modifier = 1;
          if(this.Kraj_currentSortDir === 'desc') modifier = -1;
          if(a[this.Kraj_currentSort] < b[this.Kraj_currentSort]) return -1 * modifier;
          if(a[this.Kraj_currentSort] > b[this.Kraj_currentSort]) return 1 * modifier;
          return 0;
        }).filter((row, index) => {
          let start = (this.Kraj_currentPage-1)*this.pageSize;
          let end = this.Kraj_currentPage*this.pageSize;
          if(index >= start && index < end) return true;
        });
      }
    },
  },
  methods:{
    onChildClick () {
      this.Krajina_showModal = false;
      this.Kraj_showModal = false;
    },

    //Krajiny
    Krajina_sort:function(s) {
      if(this.Krajina_Search=='') {
        //Reset NavBar
        this.Krajina_currentPage = 1;
        this.Krajina_SelectPage1_Style = 'selected_button';
        this.Krajina_SelectPage2_Style = '';
        this.Krajina_SelectPage3_Style = '';
        this.Krajina_SelectPage4_Style = '';
        this.Krajina_SelectPage5_Style = '';
        this.Krajina_SelectPage1 = 1;
        this.Krajina_SelectPage2 = 2;
        this.Krajina_SelectPage3 = 3;
        this.Krajina_SelectPage4 = 4;
        this.Krajina_SelectPage5 = 5;

        switch (s) {
          case "id":
            this.Krajina_ID_Clicked = "color: black";
            this.Krajina_ID_IsClicked = true;
            this.Krajina_Nazov_Clicked = 'color: white';
            this.Krajina_Nazov_IsClicked = false;
            this.Krajina_Kontinent_Clicked = 'color: white';
            this.Krajina_Kontinent_IsClicked = false;
            break;
          case "nazov":
            this.Krajina_ID_Clicked = 'color: white';
            this.Krajina_ID_IsClicked = false;
            this.Krajina_Nazov_Clicked = 'color: white';
            this.Krajina_Nazov_IsClicked = true;
            this.Krajina_Kontinent_Clicked = 'color: black';
            this.Krajina_Kontinent_IsClicked = false;
            break;
          case "kontinent":
            this.Krajina_ID_Clicked = 'color: white';
            this.Krajina_ID_IsClicked = false;
            this.Krajina_Nazov_Clicked = 'color: white';
            this.Krajina_Nazov_IsClicked = false;
            this.Krajina_Kontinent_Clicked = 'color: black';
            this.Krajina_Kontinent_IsClicked = true;
            break;
        }


        //if s == current sort, reverse
        if (s === this.Krajina_currentSort) {
          this.Krajina_currentSortDir = this.Krajina_currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.Krajina_currentSort = s;
      }
    },
    Krajina_Change_Header_Color(s){
      if(this.Krajina_Search=='') {
        switch (s) {
          case "id":
            this.Krajina_ID_Clicked = "background-color: black";
            break;
          case "nazov":
            this.Krajina_Nazov_Clicked = "background-color: black";
            break;
          case "kontinent":
            this.Krajina_Kontinent_Clicked = "background-color: black";
            break;
        }
      }
    },
    Krajina_Leave_Header(){
      if(this.Krajina_ID_IsClicked){
        this.Krajina_ID_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Krajina_ID_Clicked="background-color: #1DBECF";
      }
      if(this.Krajina_Nazov_IsClicked){
        this.Krajina_Nazov_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Krajina_Nazov_Clicked="background-color: #1DBECF";
      }
      if(this.Krajina_Kontinent_IsClicked){
        this.Krajina_Kontinent_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Krajina_Kontinent_Clicked="background-color: #1DBECF";
      }
    },
    Krajina_nextPage:function() {
      if((this.Krajina_currentPage*this.pageSize) < this.Krajiny.length)this.Krajina_currentPage++;
     if(this.Krajina_currentPage==2){
       this.Krajina_SelectPage1_Style='';
       this.Krajina_SelectPage2_Style='selected_button';
     }
     if(this.Krajina_currentPage==3){
       this.Krajina_SelectPage2_Style='';
       this.Krajina_SelectPage3_Style='selected_button';
     }
     if(this.Krajina_currentPage>3){
       if((this.Krajina_SelectPage5*this.pageSize) < this.Krajiny.length) {
         this.Krajina_SelectPage1++;
         this.Krajina_SelectPage2++;
         this.Krajina_SelectPage3++;
         this.Krajina_SelectPage4++;
         this.Krajina_SelectPage5++;
       }else{
         if((this.Krajina_currentPage*this.pageSize) < this.Krajiny.length){
           this.Krajina_SelectPage3_Style='';
           this.Krajina_SelectPage4_Style='selected_button';
         }else{
           this.Krajina_SelectPage4_Style='';
           this.Krajina_SelectPage5_Style='selected_button';
         }
       }
     }

    },
    Krajina_prevPage:function() {
      if(this.Krajina_currentPage > 1) {
      if(this.Krajina_SelectPage5_Style=='selected_button'){
        this.Krajina_SelectPage5_Style='';
        this.Krajina_SelectPage4_Style='selected_button';
      }else {
        if (this.Krajina_SelectPage4_Style=='selected_button') {
          this.Krajina_SelectPage4_Style = '';
          this.Krajina_SelectPage3_Style = 'selected_button';
        }else{
          if(this.Krajina_currentPage>3) {
            this.Krajina_SelectPage1--;
            this.Krajina_SelectPage2--;
            this.Krajina_SelectPage3--;
            this.Krajina_SelectPage4--;
            this.Krajina_SelectPage5--;
          }else{
            if(this.Krajina_currentPage==3){
              this.Krajina_SelectPage3_Style='';
              this.Krajina_SelectPage2_Style='selected_button';
            }else{
              this.Krajina_SelectPage2_Style='';
              this.Krajina_SelectPage1_Style='selected_button';
            }
          }
        }
      }
        this.Krajina_currentPage--;
      }
    },
    Krajina_selectPage(page){
      if(page>this.Krajina_currentPage){
        for(var i=this.Krajina_currentPage;i<page;i++){
           this.Krajina_nextPage();
        }
      }else{
        var rozdiel=this.Krajina_currentPage-page;
        for(var i=0;i<rozdiel;i++){
          this.Krajina_prevPage();
        }
      }
    },
    Search_Krajina(search){
     for(var i=0;i<this.Krajiny.length;i++){
       if(this.Krajiny[i].nazov.includes(search) || this.Krajiny[i].kontinent.includes(search)){
         this.Krajiny[i].is_visible=true;
       }else
         this.Krajiny[i].is_visible=false;
     }
    },
    add_Krajina(){
      this.Krajina_Add_Operation=true;
      this.Krajina_showModal=true;
    },
    Edit_Krajina(Krajina){
      this.Krajina_Add_Operation=false;
      this.Krajina_showModal=true;
      this.Krajina_Edit_Krajina=Krajina;
    },

    //Kraje
    Kraj_sort:function(s) {
      if(this.Kraj_Search=='') {
        //Reset NavBar
        this.Kraj_currentPage = 1;
        this.Kraj_SelectPage1_Style = 'selected_button';
        this.Kraj_SelectPage2_Style = '';
        this.Kraj_SelectPage3_Style = '';
        this.Kraj_SelectPage4_Style = '';
        this.Kraj_SelectPage5_Style = '';
        this.Kraj_SelectPage1 = 1;
        this.Kraj_SelectPage2 = 2;
        this.Kraj_SelectPage3 = 3;
        this.Kraj_SelectPage4 = 4;
        this.Kraj_SelectPage5 = 5;

        switch (s) {
          case "id":
            this.Kraj_ID_Clicked = "color: black";
            this.Kraj_ID_IsClicked = true;
            this.Kraj_Nazov_Clicked = 'color: white';
            this.Kraj_Nazov_IsClicked = false;
            this.Kraj_Stat_Clicked = 'color: white';
            this.Kraj_Stat_IsClicked = false;
            break;
          case "nazov":
            this.Kraj_ID_Clicked = 'color: white';
            this.Kraj_ID_IsClicked = false;
            this.Kraj_Nazov_Clicked = "color: black";
            this.Kraj_Nazov_IsClicked = true;
            this.Kraj_Stat_Clicked = 'color: white';
            this.Kraj_Stat_IsClicked = false;
            break;
          case "stat":
            this.Kraj_ID_Clicked = 'color: white';
            this.Kraj_ID_IsClicked = false;
            this.Kraj_Nazov_Clicked = 'color: white';
            this.Kraj_Nazov_IsClicked = false;
            this.Kraj_Stat_Clicked = "color: black";
            this.Kraj_Stat_IsClicked = true;
            break;
        }


        //if s == current sort, reverse
        if (s === this.Kraj_currentSort) {
          this.Kraj_currentSortDir = this.Kraj_currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.Kraj_currentSort = s;
      }
    },
    Kraj_Change_Header_Color(s){
      if(this.Kraj_Search=='') {
        switch (s) {
          case "id":
            this.Kraj_ID_Clicked = "background-color: black";
            break;
          case "nazov":
            this.Kraj_Nazov_Clicked = "background-color: black";
            break;
          case "stat":
            this.Kraj_Stat_Clicked = "background-color: black";
            break;
        }
      }
    },
    Kraj_Leave_Header(){
      if(this.Kraj_ID_IsClicked){
        this.Kraj_ID_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Kraj_ID_Clicked="background-color: #1DBECF";
      }
      if(this.Kraj_Nazov_IsClicked){
        this.Kraj_Nazov_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Kraj_Nazov_Clicked="background-color: #1DBECF";
      }
      if(this.Kraj_Stat_IsClicked){
        this.Kraj_Stat_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Kraj_Stat_Clicked="background-color: #1DBECF";
      }
    },
    Kraj_nextPage:function() {
      if((this.Kraj_currentPage*this.pageSize) < this.Kraje.length)this.Kraj_currentPage++;
      if(this.Kraj_currentPage==2){
        this.Kraj_SelectPage1_Style='';
        this.Kraj_SelectPage2_Style='selected_button';
      }
      if(this.Kraj_currentPage==3){
        this.Kraj_SelectPage2_Style='';
        this.Kraj_SelectPage3_Style='selected_button';
      }
      if(this.Kraj_currentPage>3){
        if((this.Kraj_SelectPage5*this.pageSize) < this.Kraje.length) {
          this.Kraj_SelectPage1++;
          this.Kraj_SelectPage2++;
          this.Kraj_SelectPage3++;
          this.Kraj_SelectPage4++;
          this.Kraj_SelectPage5++;
        }else{
          if((this.Kraj_currentPage*this.pageSize) < this.Kraje.length){
            this.Kraj_SelectPage3_Style='';
            this.Kraj_SelectPage4_Style='selected_button';
          }else{
            this.Kraj_SelectPage4_Style='';
            this.Kraj_SelectPage5_Style='selected_button';
          }
        }
      }

    },
    Kraj_prevPage:function() {
      if(this.Kraj_currentPage > 1) {
        if(this.Kraj_SelectPage5_Style=='selected_button'){
          this.Kraj_SelectPage5_Style='';
          this.Kraj_SelectPage4_Style='selected_button';
        }else {
          if (this.Kraj_SelectPage4_Style=='selected_button') {
            this.Kraj_SelectPage4_Style = '';
            this.Kraj_SelectPage3_Style = 'selected_button';
          }else{
            if(this.Kraj_currentPage>3) {
              this.Kraj_SelectPage1--;
              this.Kraj_SelectPage2--;
              this.Kraj_SelectPage3--;
              this.Kraj_SelectPage4--;
              this.Kraj_SelectPage5--;
            }else{
              if(this.Kraj_currentPage==3){
                this.Kraj_SelectPage3_Style='';
                this.Kraj_SelectPage2_Style='selected_button';
              }else{
                this.Kraj_SelectPage2_Style='';
                this.Kraj_SelectPage1_Style='selected_button';
              }
            }
          }
        }
        this.Kraj_currentPage--;
      }
    },
    Kraj_selectPage(page){
      if(page>this.Kraj_currentPage){
        for(var i=this.Kraj_currentPage;i<page;i++){
          this.Kraj_nextPage();
        }
      }else{
        var rozdiel=this.Kraj_currentPage-page;
        for(var i=0;i<rozdiel;i++){
          this.Kraj_prevPage();
        }
      }
    },
    Search_Kraj(search){
      for(var i=0;i<this.Kraje.length;i++){
        if(this.Kraje[i].nazov.includes(search) || this.Kraje[i].stat.includes(search)){
          this.Kraje[i].is_visible=true;
        }else
          this.Kraje[i].is_visible=false;
      }
    },
    add_Kraj(){
      this.Kraj_Add_Operation=true;
      this.Kraj_showModal=true;
    },
    Edit_Kraj(Kraj){
      this.Kraj_Add_Operation=false;
      this.Kraj_showModal=true;
      this.Kraj_Edit_Kraj=Kraj;
    },


  },
  created() {
    ApiRequests.Admin_Get_Zoznam_Regionov();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.Basic_Grey {
  border-top: #1DBECF solid;
  text-align: center;
  background-color: #F4F4F4;
}


h1 {
  text-align: left;
  padding-bottom: 2%;
}


.table {
  padding: 2%;
  padding-bottom: 5%;
}

#Krajiny, #Kraje {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#Krajiny td, #Krajiny th, #Kraje td, #Kraje th {
  border: 1px solid #ddd;
  padding: 8px;
}

#Krajiny tr:nth-child(even), #Kraje tr:nth-child(even){
  background-color: #f2f2f2;
}

#Krajiny tr:hover, #Kraje tr:hover{
  background-color: #ddd;
}


#Krajiny th, #Kraje th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #1DBECF;
  color: white;
}

.crud{
  height: 20px;
  width: 20px;
}

button{
  color: white;
}

button:hover{
  background-color: black;
  color:white;
}

.selected_button{
  color: black;
}

.search{
  text-align: right;
  padding-bottom: 2%;
}

input{
  margin-top: 15px !important;
  background-color:  #1DBECF;
  padding: 5px;
  border-radius: 25px;
  border: none;
  text-align: center;
  width: 200px;
}

.add{
  float: left;
}


</style>
