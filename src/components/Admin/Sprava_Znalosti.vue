<template>
  <div>
    <div class="Basic_Grey">
      <div class="table">
        <h1>Zoznam Jazykových znalostí</h1>
        <div class="search">
          <div class="add">
            <img src="../../assets/icons/add.png" class="add" @click="add_JZ">
          </div>
          <input type="text" name="search" placeholder="Hladať" v-model="JZ_Search" v-on:input="Search_JZ(JZ_Search)">
        </div>
        <table id="JZ">
          <tr>
            <th @click="JZ_sort('id')" :style="this.JZ_ID_Clicked" v-on:mouseenter="JZ_Change_Header_Color('id')" v-on:mouseleave="JZ_Leave_Header">ID</th>
            <th @click="JZ_sort('nazov')" :style="this.JZ_Nazov_Clicked" v-on:mouseenter="JZ_Change_Header_Color('nazov')" v-on:mouseleave="JZ_Leave_Header">Názov</th>
            <th>CRUD Operacie</th>
          </tr>
          <tbody v-if="JZ_Search==''">
          <tr  v-for="jz in Jazykove_Znalosti_sorted" :key="jz.id">
            <td>{{jz.id}}</td>
            <td>{{ jz.nazov }}</td>
            <td>
              <img src="../../assets/icons/edit.png" class="crud" @click="Edit_JZ(jz)">
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr  v-for="jz in jazykove_znalosti" :key="jz.id" v-if="jz.is_visible">
            <td>{{jz.id}}</td>
            <td>{{ jz.nazov }}</td>
            <td>
              <img src="../../assets/icons/edit.png" class="crud" @click="Edit_JZ(jz)">
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="this.JZ_Search==''">
          <button @click="JZ_prevPage" v-if="this.JZ_currentPage>1">Predchádzajúce</button>
          <button @click="JZ_selectPage(JZ_SelectPage1)" :class="JZ_SelectPage1_Style" v-if="this.jazykove_znalosti.length>10">{{JZ_SelectPage1}}</button>
          <button @click="JZ_selectPage(JZ_SelectPage2)" :class="JZ_SelectPage2_Style" v-if="this.jazykove_znalosti.length>10">{{JZ_SelectPage2}}</button>
          <button @click="JZ_selectPage(JZ_SelectPage3)" :class="JZ_SelectPage3_Style" v-if="this.jazykove_znalosti.length>20">{{JZ_SelectPage3}}</button>
          <button @click="JZ_selectPage(JZ_SelectPage4)" :class="JZ_SelectPage4_Style" v-if="this.jazykove_znalosti.length>30">{{JZ_SelectPage4}}</button>
          <button @click="JZ_selectPage(JZ_SelectPage5)" :class="JZ_SelectPage5_Style" v-if="this.jazykove_znalosti.length>40">{{JZ_SelectPage5}}</button>
          <button @click="JZ_nextPage"v-if="(this.JZ_currentPage*this.pageSize) < this.jazykove_znalosti.length">Ďalšie</button>
        </div>
      </div>
      <div class="table">
        <h1>Zoznam Počitačových znalostí</h1>
        <div class="search">
          <div class="add">
            <img src="../../assets/icons/add.png" class="add" @click="add_PCZ">
          </div>
          <input type="text" name="search" placeholder="Hladať" v-model="PCZ_Search" v-on:input="Search_PCZ(PCZ_Search)">
        </div>
        <table id="PCZ">
          <tr>
            <th @click="PCZ_sort('id')" :style="this.PCZ_ID_Clicked" v-on:mouseenter="PCZ_Change_Header_Color('id')" v-on:mouseleave="PCZ_Leave_Header">ID</th>
            <th @click="PCZ_sort('nazov')" :style="this.PCZ_Nazov_Clicked" v-on:mouseenter="PCZ_Change_Header_Color('nazov')" v-on:mouseleave="PCZ_Leave_Header">Názov</th>
            <th>CRUD Operacie</th>
          </tr>
          <tbody v-if="PCZ_Search==''">
          <tr  v-for="pcz in Pocitacove_Znalosti_sorted" :key="pcz.id">
            <td>{{pcz.id}}</td>
            <td>{{ pcz.nazov }}</td>
            <td>
              <img src="../../assets/icons/edit.png" class="crud" @click="Edit_PCZ(pcz)">
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr  v-for="pcz in pocitacove_znalosti" :key="pcz.id" v-if="pcz.is_visible">
            <td>{{pcz.id}}</td>
            <td>{{ pcz.nazov }}</td>
            <td>
              <img src="../../assets/icons/edit.png" class="crud" @click="Edit_PCZ(pcz)">
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="this.PCZ_Search==''">
          <button @click="PCZ_prevPage" v-if="this.PCZ_currentPage>1">Predchádzajúce</button>
          <button @click="PCZ_selectPage(PCZ_SelectPage1)" :class="PCZ_SelectPage1_Style" v-if="this.pocitacove_znalosti.length>10">{{PCZ_SelectPage1}}</button>
          <button @click="PCZ_selectPage(PCZ_SelectPage2)" :class="PCZ_SelectPage2_Style" v-if="this.pocitacove_znalosti.length>10">{{PCZ_SelectPage2}}</button>
          <button @click="PCZ_selectPage(PCZ_SelectPage3)" :class="PCZ_SelectPage3_Style" v-if="this.pocitacove_znalosti.length>20">{{PCZ_SelectPage3}}</button>
          <button @click="PCZ_selectPage(PCZ_SelectPage4)" :class="PCZ_SelectPage4_Style" v-if="this.pocitacove_znalosti.length>30">{{PCZ_SelectPage4}}</button>
          <button @click="PCZ_selectPage(PCZ_SelectPage5)" :class="PCZ_SelectPage5_Style" v-if="this.pocitacove_znalosti.length>40">{{PCZ_SelectPage5}}</button>
          <button @click="PCZ_nextPage"v-if="(this.PCZ_currentPage*this.pageSize) < this.pocitacove_znalosti.length">Ďalšie</button>
        </div>
      </div>
    </div>
    <div v-if="JZ_showModal==true">
      <div v-if="JZ_Add_Operation==true">
        <JZ_MODAL v-if="JZ_showModal" :showModal=JZ_showModal :Add_Operation="true" @clicked="onChildClick"></JZ_MODAL>
      </div>
      <div v-else>
        <JZ_MODAL v-if="JZ_showModal" :showModal=JZ_showModal :Add_Operation="false" :Edit_JZ="Edit_JZ" @clicked="onChildClick"></JZ_MODAL>
      </div>
    </div>
    <div v-if="PCZ_showModal==true">
      <div v-if="PCZ_Add_Operation==true">
        <PCZ_MODAL v-if="PCZ_showModal" :showModal=PCZ_showModal :Add_Operation="true" @clicked="onChildClick"></PCZ_MODAL>
      </div>
      <div v-else>
        <PCZ_MODAL v-if="PCZ_showModal" :showModal=PCZ_showModal :Add_Operation="false" :Edit_PCZ="PCZ_Edit_PCZ" @clicked="onChildClick"></PCZ_MODAL>
      </div>
    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import ApiRequests from '@/ApiRequests';
import JZ_MODAL from "./JZ_MODAL";
import PCZ_MODAL from "./PCZ_MODAL";

export default {
  name: 'Sprava_Znalosti',
  components: {JZ_MODAL,PCZ_MODAL},
  data(){
    return {
      pageSize:10,

      //Jazykove Znalosti
      JZ_currentSort: 'id',
      JZ_currentSortDir: 'asc',
      JZ_ID_Clicked:'color: white',
      JZ_Nazov_Clicked:'color: white',
      JZ_ID_IsClicked:false,
      JZ_Nazov_IsClicked:false,
      JZ_currentPage:1,
      JZ_SelectPage1:1,
      JZ_SelectPage2:2,
      JZ_SelectPage3:3,
      JZ_SelectPage4:4,
      JZ_SelectPage5:5,
      JZ_SelectPage1_Style:'selected_button',
      JZ_SelectPage2_Style:'',
      JZ_SelectPage3_Style:'',
      JZ_SelectPage4_Style:'',
      JZ_SelectPage5_Style:'',
      JZ_Search:'',
      JZ_showModal:false,
      JZ_Add_Operation:false,
      JZ_Edit_JZ:[],

      //Jazykove Znalosti
      PCZ_currentSort: 'id',
      PCZ_currentSortDir: 'asc',
      PCZ_ID_Clicked:'color: white',
      PCZ_Nazov_Clicked:'color: white',
      PCZ_ID_IsClicked:false,
      PCZ_Nazov_IsClicked:false,
      PCZ_currentPage:1,
      PCZ_SelectPage1:1,
      PCZ_SelectPage2:2,
      PCZ_SelectPage3:3,
      PCZ_SelectPage4:4,
      PCZ_SelectPage5:5,
      PCZ_SelectPage1_Style:'selected_button',
      PCZ_SelectPage2_Style:'',
      PCZ_SelectPage3_Style:'',
      PCZ_SelectPage4_Style:'',
      PCZ_SelectPage5_Style:'',
      PCZ_Search:'',
      PCZ_showModal:false,
      PCZ_Add_Operation:false,
      PCZ_Edit_PCZ:[],

    }
  },
  computed: {
    ...mapGetters({
      jazykove_znalosti:'GET_J_Z',
      pocitacove_znalosti: 'GET_PC_Z',
    }),
    Jazykove_Znalosti_sorted:function() {
      if(this.jazykove_znalosti.length>0) {
        return this.jazykove_znalosti.sort((a,b) => {
          let modifier = 1;
          if(this.JZ_currentSortDir === 'desc') modifier = -1;
          if(a[this.JZ_currentSort] < b[this.JZ_currentSort]) return -1 * modifier;
          if(a[this.JZ_currentSort] > b[this.JZ_currentSort]) return 1 * modifier;
          return 0;
        }).filter((row, index) => {
          let start = (this.JZ_currentPage-1)*this.pageSize;
          let end = this.JZ_currentPage*this.pageSize;
          if(index >= start && index < end) return true;
        });
      }
    },
    Pocitacove_Znalosti_sorted:function() {
      if(this.pocitacove_znalosti.length>0) {
        return this.pocitacove_znalosti.sort((a,b) => {
          let modifier = 1;
          if(this.PCZ_currentSortDir === 'desc') modifier = -1;
          if(a[this.PCZ_currentSort] < b[this.PCZ_currentSort]) return -1 * modifier;
          if(a[this.PCZ_currentSort] > b[this.PCZ_currentSort]) return 1 * modifier;
          return 0;
        }).filter((row, index) => {
          let start = (this.PCZ_currentPage-1)*this.pageSize;
          let end = this.PCZ_currentPage*this.pageSize;
          if(index >= start && index < end) return true;
        });
      }
    },
  },
  methods:{
    onChildClick () {
      this.JZ_showModal = false;
      this.PCZ_showModal = false;
    },
    //Jazykove Znalosti
    JZ_sort:function(s) {
      if(this.JZ_Search=='') {
        //Reset NavBar
        this.JZ_currentPage = 1;
        this.JZ_SelectPage1_Style = 'selected_button';
        this.JZ_SelectPage2_Style = '';
        this.JZ_SelectPage3_Style = '';
        this.JZ_SelectPage4_Style = '';
        this.JZ_SelectPage5_Style = '';
        this.JZ_SelectPage1 = 1;
        this.JZ_SelectPage2 = 2;
        this.JZ_SelectPage3 = 3;
        this.JZ_SelectPage4 = 4;
        this.JZ_SelectPage5 = 5;

        switch (s) {
          case "id":
            this.JZ_ID_Clicked = "color: black";
            this.JZ_ID_IsClicked = true;
            this.JZ_Nazov_Clicked = 'color: white';
            this.JZ_Nazov_IsClicked = false;
            break;
          case "nazov":
            this.JZ_ID_Clicked = "color: white";
            this.JZ_ID_IsClicked = false;
            this.JZ_Nazov_Clicked = 'color: black';
            this.JZ_Nazov_IsClicked = true;
            break;
        }


        //if s == current sort, reverse
        if (s === this.JZ_currentSort) {
          this.JZ_currentSortDir = this.JZ_currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.JZ_currentSort = s;
      }
    },
    JZ_Change_Header_Color(s){
      if(this.JZ_Search=='') {
        switch (s) {
          case "id":
            this.JZ_ID_Clicked = "background-color: black";
            break;
          case "nazov":
            this.JZ_Nazov_Clicked = "background-color: black";
            break;
        }
      }
    },
    JZ_Leave_Header(){
      if(this.JZ_ID_IsClicked){
        this.JZ_ID_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.JZ_ID_Clicked="background-color: #1DBECF";
      }
      if(this.JZ_Nazov_IsClicked){
        this.JZ_Nazov_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.JZ_Nazov_Clicked="background-color: #1DBECF";
      }
    },
    JZ_nextPage:function() {
      if((this.JZ_currentPage*this.pageSize) < this.jazykove_znalosti.length)this.JZ_currentPage++;
     if(this.JZ_currentPage==2){
       this.JZ_SelectPage1_Style='';
       this.JZ_SelectPage2_Style='selected_button';
     }
     if(this.JZ_currentPage==3){
       this.JZ_SelectPage2_Style='';
       this.JZ_SelectPage3_Style='selected_button';
     }
     if(this.JZ_currentPage>3){
       if((this.JZ_SelectPage5*this.pageSize) < this.jazykove_znalosti.length) {
         this.JZ_SelectPage1++;
         this.JZ_SelectPage2++;
         this.JZ_SelectPage3++;
         this.JZ_SelectPage4++;
         this.JZ_SelectPage5++;
       }else{
         if((this.JZ_currentPage*this.pageSize) < this.jazykove_znalosti.length){
           this.JZ_SelectPage3_Style='';
           this.JZ_SelectPage4_Style='selected_button';
         }else{
           this.JZ_SelectPage4_Style='';
           this.JZ_SelectPage5_Style='selected_button';
         }
       }
     }

    },
    JZ_prevPage:function() {
      if(this.JZ_currentPage > 1) {
      if(this.JZ_SelectPage5_Style=='selected_button'){
        this.JZ_SelectPage5_Style='';
        this.JZ_SelectPage4_Style='selected_button';
      }else {
        if (this.JZ_SelectPage4_Style=='selected_button') {
          this.JZ_SelectPage4_Style = '';
          this.JZ_SelectPage3_Style = 'selected_button';
        }else{
          if(this.JZ_currentPage>3) {
            this.JZ_SelectPage1--;
            this.JZ_SelectPage2--;
            this.JZ_SelectPage3--;
            this.JZ_SelectPage4--;
            this.JZ_SelectPage5--;
          }else{
            if(this.JZ_currentPage==3){
              this.JZ_SelectPage3_Style='';
              this.JZ_SelectPage2_Style='selected_button';
            }else{
              this.JZ_SelectPage2_Style='';
              this.JZ_SelectPage1_Style='selected_button';
            }
          }
        }
      }
        this.JZ_currentPage--;
      }
    },
    JZ_selectPage(page){
      if(page>this.JZ_currentPage){
        for(var i=this.JZ_currentPage;i<page;i++){
           this.JZ_nextPage();
        }
      }else{
        var rozdiel=this.JZ_currentPage-page;
        for(var i=0;i<rozdiel;i++){
          this.JZ_prevPage();
        }
      }
    },
    Search_JZ(search){
     for(var i=0;i<this.jazykove_znalosti.length;i++){
       if(this.jazykove_znalosti[i].nazov.includes(search)){
         this.jazykove_znalosti[i].is_visible=true;
       }else
         this.jazykove_znalosti[i].is_visible=false;
     }
    },
    add_JZ(){
      this.JZ_Add_Operation=true;
      this.JZ_showModal=true;
    },
    Edit_JZ(JZ){
      this.JZ_Add_Operation=false;
      this.JZ_showModal=true;
      this.Edit_JZ=JZ;
    },

    //Pocitacove Znalosti
    PCZ_sort:function(s) {
      if(this.PCZ_Search=='') {
        //Reset NavBar
        this.PCZ_currentPage = 1;
        this.PCZ_SelectPage1_Style = 'selected_button';
        this.PCZ_SelectPage2_Style = '';
        this.PCZ_SelectPage3_Style = '';
        this.PCZ_SelectPage4_Style = '';
        this.PCZ_SelectPage5_Style = '';
        this.PCZ_SelectPage1 = 1;
        this.PCZ_SelectPage2 = 2;
        this.PCZ_SelectPage3 = 3;
        this.PCZ_SelectPage4 = 4;
        this.PCZ_SelectPage5 = 5;

        switch (s) {
          case "id":
            this.PCZ_ID_Clicked = "color: black";
            this.PCZ_ID_IsClicked = true;
            this.PCZ_Nazov_Clicked = 'color: white';
            this.PCZ_Nazov_IsClicked = false;
            break;
          case "nazov":
            this.PCZ_ID_Clicked = "color: white";
            this.PCZ_ID_IsClicked = false;
            this.PCZ_Nazov_Clicked = 'color: black';
            this.PCZ_Nazov_IsClicked = true;
            break;
        }


        //if s == current sort, reverse
        if (s === this.PCZ_currentSort) {
          this.PCZ_currentSortDir = this.PCZ_currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.PCZ_currentSort = s;
      }
    },
    PCZ_Change_Header_Color(s){
      if(this.PCZ_Search=='') {
        switch (s) {
          case "id":
            this.PCZ_ID_Clicked = "background-color: black";
            break;
          case "nazov":
            this.PCZ_Nazov_Clicked = "background-color: black";
            break;
        }
      }
    },
    PCZ_Leave_Header(){
      if(this.PCZ_ID_IsClicked){
        this.PCZ_ID_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.PCZ_ID_Clicked="background-color: #1DBECF";
      }
      if(this.PCZ_Nazov_IsClicked){
        this.PCZ_Nazov_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.PCZ_Nazov_Clicked="background-color: #1DBECF";
      }
    },
    PCZ_nextPage:function() {
      if((this.PCZ_currentPage*this.pageSize) < this.pocitacove_znalosti.length)this.PCZ_currentPage++;
      if(this.PCZ_currentPage==2){
        this.PCZ_SelectPage1_Style='';
        this.PCZ_SelectPage2_Style='selected_button';
      }
      if(this.PCZ_currentPage==3){
        this.PCZ_SelectPage2_Style='';
        this.PCZ_SelectPage3_Style='selected_button';
      }
      if(this.PCZ_currentPage>3){
        if((this.PCZ_SelectPage5*this.pageSize) < this.pocitacove_znalosti.length) {
          this.PCZ_SelectPage1++;
          this.PCZ_SelectPage2++;
          this.PCZ_SelectPage3++;
          this.PCZ_SelectPage4++;
          this.PCZ_SelectPage5++;
        }else{
          if((this.PCZ_currentPage*this.pageSize) < this.pocitacove_znalosti.length){
            this.PCZ_SelectPage3_Style='';
            this.PCZ_SelectPage4_Style='selected_button';
          }else{
            this.PCZ_SelectPage4_Style='';
            this.PCZ_SelectPage5_Style='selected_button';
          }
        }
      }

    },
    PCZ_prevPage:function() {
      if(this.PCZ_currentPage > 1) {
        if(this.PCZ_SelectPage5_Style=='selected_button'){
          this.PCZ_SelectPage5_Style='';
          this.PCZ_SelectPage4_Style='selected_button';
        }else {
          if (this.PCZ_SelectPage4_Style=='selected_button') {
            this.PCZ_SelectPage4_Style = '';
            this.PCZ_SelectPage3_Style = 'selected_button';
          }else{
            if(this.PCZ_currentPage>3) {
              this.PCZ_SelectPage1--;
              this.PCZ_SelectPage2--;
              this.PCZ_SelectPage3--;
              this.PCZ_SelectPage4--;
              this.PCZ_SelectPage5--;
            }else{
              if(this.PCZ_currentPage==3){
                this.PCZ_SelectPage3_Style='';
                this.PCZ_SelectPage2_Style='selected_button';
              }else{
                this.PCZ_SelectPage2_Style='';
                this.PCZ_SelectPage1_Style='selected_button';
              }
            }
          }
        }
        this.PCZ_currentPage--;
      }
    },
    PCZ_selectPage(page){
      if(page>this.PCZ_currentPage){
        for(var i=this.PCZ_currentPage;i<page;i++){
          this.PCZ_nextPage();
        }
      }else{
        var rozdiel=this.PCZ_currentPage-page;
        for(var i=0;i<rozdiel;i++){
          this.PCZ_prevPage();
        }
      }
    },
    Search_PCZ(search){
      for(var i=0;i<this.pocitacove_znalosti.length;i++){
        if(this.pocitacove_znalosti[i].nazov.includes(search)){
          this.pocitacove_znalosti[i].is_visible=true;
        }else
          this.pocitacove_znalosti[i].is_visible=false;
      }
    },
    add_PCZ(){
      this.PCZ_Add_Operation=true;
      this.PCZ_showModal=true;
    },
    Edit_PCZ(PCZ){
      this.PCZ_Add_Operation=false;
      this.PCZ_showModal=true;
      this.PCZ_Edit_PCZ=PCZ;
    },


  },
  created() {
    ApiRequests.Admin_Get_Zoznam_Znalosti();
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

#JZ, #PCZ {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#JZ td, #JZ th, #PCZ td, #PCZ th {
  border: 1px solid #ddd;
  padding: 8px;
}

#JZ tr:nth-child(even), #PCZ tr:nth-child(even){
  background-color: #f2f2f2;
}

#JZ tr:hover, #PCZ tr:hover{
  background-color: #ddd;
}


#JZ th, #PCZ th {
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
