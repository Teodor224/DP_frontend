<template>
  <div>
    <div class="Basic_Grey">
      <div class="table">
        <div class="search">
          <h1 style="float: left">Zoznam Študentov</h1>
          <input type="text" name="search" placeholder="Hladať" v-model="Studenti_Search" v-on:input="Search_Studenti(Studenti_Search)">
        </div>
        <table id="studenti">
          <tr>
            <th  @click="Stud_sort('id')" :style="this.Stud_ID_Clicked" v-on:mouseenter="Stud_Change_Header_Color('id')" v-on:mouseleave="Stud_Leave_Header">ID</th>
            <th @click="Stud_sort('meno')" :style="this.Stud_Meno_Clicked" v-on:mouseenter="Stud_Change_Header_Color('meno')" v-on:mouseleave="Stud_Leave_Header">Meno</th>
            <th @click="Stud_sort('priezvisko')" :style="this.Stud_Priezvisko_Clicked" v-on:mouseenter="Stud_Change_Header_Color('priezvisko')" v-on:mouseleave="Stud_Leave_Header">Priezvisko</th>
            <th @click="Stud_sort('datum')" :style="this.Stud_Datum_Clicked" v-on:mouseenter="Stud_Change_Header_Color('datum')" v-on:mouseleave="Stud_Leave_Header">Dátum Narodenia</th>
            <th @click="Stud_sort('email')" :style="this.Stud_Email_Clicked" v-on:mouseenter="Stud_Change_Header_Color('email')" v-on:mouseleave="Stud_Leave_Header">Študentský Email</th>
            <th @click="Stud_sort('program')" :style="this.Stud_Program_Clicked" v-on:mouseenter="Stud_Change_Header_Color('program')" v-on:mouseleave="Stud_Leave_Header">Študijný Program</th>
            <th>CRUD Operacie</th>
          </tr>
          <tbody v-if="Studenti_Search==''">
          <tr  v-for="s in studenti_sorted" :key="s.id">
            <td>{{s.id}}</td>
            <td>{{ s.meno }}</td>
            <td>{{ s.priezvisko }}</td>
            <td>{{s.datum_narodenia}}</td>
            <td >{{s.skolsky_email}}</td>
            <div style="border-bottom: 1px solid #ddd;" v-for="p in s.program" :key="p.id">
              <td style="border: none">{{p.nazov}}</td>
            </div>
            <td>
              <img src="../../assets/icons/view.png" class="crud"  @click="View_Student_Profil(s)">
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr  v-for="s in studenti" :key="s.id" v-if="s.is_visible">
            <td>{{s.id}}</td>
            <td>{{ s.meno }}</td>
            <td>{{ s.priezvisko }}</td>
            <td>{{s.datum_narodenia}}</td>
            <td >{{s.skolsky_email}}</td>
            <div style="border-bottom: 1px solid #ddd;" v-for="p in s.program" :key="p.id">
            <td style="border: none">{{p.nazov}}</td>
            </div>
            <td>
              <img src="../../assets/icons/view.png" class="crud"  @click="View_Student_Profil(s)">
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="this.Studenti_Search==''">
          <button @click="Stud_prevPage" v-if="this.Stud_currentPage>1">Predchádzajúce</button>
          <button @click="Stud_selectPage(Stud_SelectPage1)" :class="Stud_SelectPage1_Style" v-if="this.studenti.length>10">{{Stud_SelectPage1}}</button>
          <button @click="Stud_selectPage(Stud_SelectPage2)" :class="Stud_SelectPage2_Style" v-if="this.studenti.length>10">{{Stud_SelectPage2}}</button>
          <button @click="Stud_selectPage(Stud_SelectPage3)" :class="Stud_SelectPage3_Style" v-if="this.studenti.length>20">{{Stud_SelectPage3}}</button>
          <button @click="Stud_selectPage(Stud_SelectPage4)" :class="Stud_SelectPage4_Style" v-if="this.studenti.length>30">{{Stud_SelectPage4}}</button>
          <button @click="Stud_selectPage(Stud_SelectPage5)" :class="Stud_SelectPage5_Style" v-if="this.studenti.length>40">{{Stud_SelectPage5}}</button>
          <button @click="Stud_nextPage"v-if="(this.Stud_currentPage*this.pageSize) < this.studenti.length">Ďalšie</button>
        </div>
      </div>
      <div class="table">
        <h1>Zoznam Študijných Programov</h1>
        <div class="search">
          <div class="add">
            <img src="../../assets/icons/add.png" class="add" @click="add_Program">
          </div>
          <input type="text" name="search" placeholder="Hladať" v-model="Progamy_Search" v-on:input="Search_Programy(Progamy_Search)">
        </div>
        <table id="programy">
          <tr>
            <th  @click="sort('id')" :style="this.ID_Clicked" v-on:mouseenter="Change_Header_Color('id')" v-on:mouseleave="Leave_Header">ID</th>
            <th  @click="sort('nazov')" :style="this.Nazov_Clicked" v-on:mouseenter="Change_Header_Color('nazov')"  v-on:mouseleave="Leave_Header">Nazov</th>
            <th  @click="sort('fakulta')" :style="this.Fakulta_Clicked" v-on:mouseenter="Change_Header_Color('fakulta')"  v-on:mouseleave="Leave_Header">Fakulta</th>
            <th>Mesto</th>
            <th>Ulica</th>
            <th>CRUD Operacie</th>
          </tr>
          <tbody v-if="Progamy_Search==''">
          <tr  v-for="p in programy_sorted" :key="p.id">
            <td>{{ p.id }}</td>
            <td>{{ p.nazov }}</td>
            <td>{{ p.fakulta }}</td>
            <td>{{p.mesto}}</td>
            <td >{{p.ulica}}</td>
            <td>
              <img src="../../assets/icons/edit.png" class="crud"  @click="Edit_Program(p)">
              <img src="../../assets/icons/delete.png" class="crud"  @click="Delete_Program(p)">
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr  v-for="p in programy" :key="p.id" v-if="p.is_visible">
            <td>{{ p.id }}</td>
            <td>{{ p.nazov }}</td>
            <td>{{ p.fakulta }}</td>
            <td>{{p.mesto}}</td>
            <td >{{p.ulica}}</td>
            <td>
              <img src="../../assets/icons/edit.png" class="crud" @click="Edit_Program(p)">
              <img src="../../assets/icons/delete.png" class="crud"  @click="Delete_Program(p)">
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="this.Progamy_Search==''">
          <button @click="prevPage" v-if="this.currentPage>1">Predchádzajúce</button>
          <button @click="selectPage(SelectPage1)" :class="SelectPage1_Style" v-if="this.programy.length>10">{{SelectPage1}}</button>
          <button @click="selectPage(SelectPage2)" :class="SelectPage2_Style" v-if="this.programy.length>10">{{SelectPage2}}</button>
          <button @click="selectPage(SelectPage3)" :class="SelectPage3_Style" v-if="this.programy.length>20">{{SelectPage3}}</button>
          <button @click="selectPage(SelectPage4)" :class="SelectPage4_Style" v-if="this.programy.length>30">{{SelectPage4}}</button>
          <button @click="selectPage(SelectPage5)" :class="SelectPage5_Style" v-if="this.programy.length>40">{{SelectPage5}}</button>
          <button @click="nextPage"v-if="(this.currentPage*this.pageSize) < this.programy.length">Ďalšie</button>
        </div>
      </div>
      <div class="table">
        <h1>Zoznam Zameraní</h1>
        <div class="search">
          <div class="add">
            <img src="../../assets/icons/add.png" class="add" @click="add_Zameranie">
          </div>
          <input type="text" name="search" placeholder="Hladať" v-model="Zamerania_Search" v-on:input="Search_Zamerania(Zamerania_Search)">
        </div>
        <table id="zamerania">
          <tr>
            <th  @click="Zamerania_sort('id')" :style="this.Zamerania_ID_Clicked" v-on:mouseenter="Zamerania_Change_Header_Color('id')" v-on:mouseleave="Zamerania_Leave_Header">ID</th>
            <th  @click="Zamerania_sort('nazov')" :style="this.Zamerania_Nazov_Clicked" v-on:mouseenter="Zamerania_Change_Header_Color('nazov')"  v-on:mouseleave="Zamerania_Leave_Header">Nazov</th>
            <th  @click="Zamerania_sort('program')" :style="this.Zamerania_Program_Clicked" v-on:mouseenter="Zamerania_Change_Header_Color('program')"  v-on:mouseleave="Zamerania_Leave_Header">Študijný program</th>
            <th>CRUD Operacie</th>
          </tr>
          <tbody v-if="Zamerania_Search==''">
          <tr  v-for="z in zamerania_sorted" :key="z.id">
            <td>{{ z.id }}</td>
            <td>{{ z.nazov }}</td>
            <td>{{z.program}}</td>
            <td>
              <img src="../../assets/icons/edit.png" class="crud" @click="Edit_Zamerania(z)">
              <img src="../../assets/icons/delete.png" class="crud" @click="Delete_Zameranie(z)">
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr  v-for="z in zamerania" :key="z.id" v-if="z.is_visible">
            <td>{{ z.id }}</td>
            <td>{{ z.nazov }}</td>
            <td>{{ z.program }}</td>
            <td>
              <img src="../../assets/icons/edit.png" class="crud" @click="Edit_Zamerania(z)">
              <img src="../../assets/icons/delete.png" class="crud" @click="Delete_Zameranie(z)">
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="this.Zamerania_Search==''">
          <button @click="Zamerania_prevPage" v-if="this.Zamerania_currentPage>1">Predchádzajúce</button>
          <button @click="Zamerania_selectPage(Zamerania_SelectPage1)" :class="Zamerania_SelectPage1_Style" v-if="this.zamerania.length>10">{{Zamerania_SelectPage1}}</button>
          <button @click="Zamerania_selectPage(Zamerania_SelectPage2)" :class="Zamerania_SelectPage2_Style" v-if="this.zamerania.length>10">{{Zamerania_SelectPage2}}</button>
          <button @click="Zamerania_selectPage(Zamerania_SelectPage3)" :class="Zamerania_SelectPage3_Style" v-if="this.zamerania.length>20">{{Zamerania_SelectPage3}}</button>
          <button @click="Zamerania_selectPage(Zamerania_SelectPage4)" :class="Zamerania_SelectPage4_Style" v-if="this.zamerania.length>30">{{Zamerania_SelectPage4}}</button>
          <button @click="Zamerania_selectPage(Zamerania_SelectPage5)" :class="Zamerania_SelectPage5_Style" v-if="this.zamerania.length>40">{{Zamerania_SelectPage5}}</button>
          <button @click="Zamerania_nextPage"v-if="(this.Zamerania_currentPage*this.pageSize) < this.zamerania.length">Ďalšie</button>
        </div>
      </div>
      <div class="table">
        <div class="search">
          <h1 style="float: left">Zoznam Zamestnancov</h1>
        <input type="text" name="search" placeholder="Hladať" v-model="Zamestnanci_Search" v-on:input="Search_Zamestnanci(Zamestnanci_Search)">
        </div>
        <table id="zamestnanci">
          <tr>
            <th  @click="Zam_sort('id')" :style="this.Zam_ID_Clicked" v-on:mouseenter="Zam_Change_Header_Color('id')" v-on:mouseleave="Zam_Leave_Header">ID</th>
            <th  @click="Zam_sort('meno')" :style="this.Zam_Meno_Clicked" v-on:mouseenter="Zam_Change_Header_Color('meno')"  v-on:mouseleave="Zam_Leave_Header">Meno</th>
            <th  @click="Zam_sort('priezvisko')" :style="this.Zam_Priezvisko_Clicked" v-on:mouseenter="Zam_Change_Header_Color('priezvisko')"  v-on:mouseleave="Zam_Leave_Header">Priezvisko</th>
            <th  @click="Zam_sort('datum')" :style="this.Zam_Datum_Clicked" v-on:mouseenter="Zam_Change_Header_Color('datum')"  v-on:mouseleave="Zam_Leave_Header">Dátum Narodenia</th>
            <th  @click="Zam_sort('email')" :style="this.Zam_Email_Clicked" v-on:mouseenter="Zam_Change_Header_Color('email')"  v-on:mouseleave="Zam_Leave_Header">Školský Email</th>
            <th>Práva Administrátora</th>
          </tr>
          <tbody v-if="Zamestnanci_Search==''">
          <tr  v-for="z in zamestnanci_sorted" :key="z.id">
            <td>{{ z.id }}</td>
            <td>{{ z.meno }}</td>
            <td>{{ z.priezvisko }}</td>
            <td>{{z.datum_narodenia}}</td>
            <td >{{z.skolsky_email}}</td>
            <td v-if="z.rola_id==2">
              <img src="../../assets/icons/add.png" class="crud" @click="Add_Admin(z)">
            </td>
            <td v-else>
              <img src="../../assets/icons/delete.png" class="crud" @click="Remove_Admin(z)">
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr  v-for="z in zamestnaci" :key="z.id" v-if="z.is_visible">
            <td>{{ z.id }}</td>
            <td>{{ z.meno }}</td>
            <td>{{ z.priezvisko }}</td>
            <td>{{z.datum_narodenia}}</td>
            <td >{{z.skolsky_email}}</td>
            <td>
              <img src="../../assets/icons/edit.png" class="crud">
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="this.Zamestnanci_Search==''">
          <button @click="Zam_prevPage" v-if="this.Zam_currentPage>1">Predchádzajúce</button>
          <button @click="Zam_selectPage(Zam_SelectPage1)" :class="Zam_SelectPage1_Style" v-if="this.zamestnaci.length>10">{{Zam_SelectPage1}}</button>
          <button @click="Zam_selectPage(Zam_SelectPage2)" :class="Zam_SelectPage2_Style" v-if="this.zamestnaci.length>10">{{Zam_SelectPage2}}</button>
          <button @click="Zam_selectPage(Zam_SelectPage3)" :class="Zam_SelectPage3_Style" v-if="this.zamestnaci.length>20">{{Zam_SelectPage3}}</button>
          <button @click="Zam_selectPage(Zam_SelectPage4)" :class="Zam_SelectPage4_Style" v-if="this.zamestnaci.length>30">{{Zam_SelectPage4}}</button>
          <button @click="Zam_selectPage(Zam_SelectPage5)" :class="Zam_SelectPage5_Style" v-if="this.zamestnaci.length>40">{{Zam_SelectPage5}}</button>
          <button @click="Zam_nextPage"v-if="(this.Zam_currentPage*this.pageSize) < this.zamestnaci.length">Ďalšie</button>
        </div>
      </div>
    </div>
    <div v-if="showModal==true">
      <div v-if="Add_Operation==true">
        <Add_Program_MODAL v-if="showModal" :showModal=showModal :fakulty=fakulty :Add_Operation="true" @clicked="onChildClick"></Add_Program_MODAL>
      </div>
      <div v-else>
        <Add_Program_MODAL v-if="showModal" :showModal=showModal :fakulty=fakulty :Add_Operation="false" :Edit_Program="Edit_Program_p" @clicked="onChildClick"></Add_Program_MODAL>
      </div>
    </div>
    <div v-if="Zamerania_showModal==true">
      <div v-if="Zamerania_Add_Operation==true">
        <Zameranie_MODAL v-if="Zamerania_showModal" :showModal=Zamerania_showModal :Programy=programy :Add_Operation="true" @clicked="onChildClick"></Zameranie_MODAL>
      </div>
      <div v-else>
        <Zameranie_MODAL v-if="Zamerania_showModal" :showModal=Zamerania_showModal :Programy=programy :Add_Operation="false" :Edit_Zameranie="Edit_Zameranie" @clicked="onChildClick"></Zameranie_MODAL>
      </div>
    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import ApiRequests from '@/ApiRequests';
import Add_Program_MODAL from "./Stud_Program_MODAL";
import Zameranie_MODAL from "./Zameranie_MODAL";
import auth from '@/auth';


export default {
  name: 'Sprava_UKF',
  components: {Add_Program_MODAL, Zameranie_MODAL},
  data(){
    return {
      currentSort: 'id',
      currentSortDir: 'asc',
      ID_Clicked:'color: white',
      Nazov_Clicked:'color: white',
      Fakulta_Clicked:'color: white',
      ID_IsClicked:false,
      Nazov_IsClicked:false,
      Fakulta_IsClicked:false,
      pageSize:10,
      currentPage:1,
      SelectPage1:1,
      SelectPage2:2,
      SelectPage3:3,
      SelectPage4:4,
      SelectPage5:5,
      SelectPage1_Style:'selected_button',
      SelectPage2_Style:'',
      SelectPage3_Style:'',
      SelectPage4_Style:'',
      SelectPage5_Style:'',
      Progamy_Search:'',
      showModal:false,
      Add_Operation:false,
      Edit_Program_p:[],

      Studenti_Search:'',
      Stud_currentSort: 'id',
      Stud_currentSortDir: 'asc',
      Stud_ID_Clicked:'color: white',
      Stud_Meno_Clicked:'color: white',
      Stud_Priezvisko_Clicked:'color: white',
      Stud_Datum_Clicked:'color: white',
      Stud_Email_Clicked:'color: white',
      Stud_Program_Clicked:'color: white',
      Stud_ID_IsClicked:false,
      Stud_Meno_IsClicked:false,
      Stud_Priezvisko_IsClicked:false,
      Stud_Datum_IsClicked:false,
      Stud_Email_IsClicked:false,
      Stud_Program_IsClicked:false,
      Stud_currentPage:1,
      Stud_SelectPage1:1,
      Stud_SelectPage2:2,
      Stud_SelectPage3:3,
      Stud_SelectPage4:4,
      Stud_SelectPage5:5,
      Stud_SelectPage1_Style:'selected_button',
      Stud_SelectPage2_Style:'',
      Stud_SelectPage3_Style:'',
      Stud_SelectPage4_Style:'',
      Stud_SelectPage5_Style:'',

      //Zamestnanci
      Zamestnanci_Search:'',
      Zam_currentSort: 'id',
      Zam_currentSortDir: 'asc',
      Zam_ID_Clicked:'color: white',
      Zam_Meno_Clicked:'color: white',
      Zam_Priezvisko_Clicked:'color: white',
      Zam_Datum_Clicked:'color: white',
      Zam_Email_Clicked:'color: white',
      Zam_ID_IsClicked:false,
      Zam_Meno_IsClicked:false,
      Zam_Priezvisko_IsClicked:false,
      Zam_Datum_IsClicked:false,
      Zam_Email_IsClicked:false,
      Zam_currentPage:1,
      Zam_SelectPage1:1,
      Zam_SelectPage2:2,
      Zam_SelectPage3:3,
      Zam_SelectPage4:4,
      Zam_SelectPage5:5,
      Zam_SelectPage1_Style:'selected_button',
      Zam_SelectPage2_Style:'',
      Zam_SelectPage3_Style:'',
      Zam_SelectPage4_Style:'',
      Zam_SelectPage5_Style:'',

      //Zamerania
      Zamerania_currentSort: 'id',
      Zamerania_currentSortDir: 'asc',
      Zamerania_ID_Clicked:'color: white',
      Zamerania_Nazov_Clicked:'color: white',
      Zamerania_Program_Clicked:'color: white',
      Zamerania_ID_IsClicked:false,
      Zamerania_Nazov_IsClicked:false,
      Zamerania_Program_IsClicked:false,
      Zamerania_currentPage:1,
      Zamerania_SelectPage1:1,
      Zamerania_SelectPage2:2,
      Zamerania_SelectPage3:3,
      Zamerania_SelectPage4:4,
      Zamerania_SelectPage5:5,
      Zamerania_SelectPage1_Style:'selected_button',
      Zamerania_SelectPage2_Style:'',
      Zamerania_SelectPage3_Style:'',
      Zamerania_SelectPage4_Style:'',
      Zamerania_SelectPage5_Style:'',
      Zamerania_Search:'',
      Zamerania_showModal:false,
      Zamerania_Add_Operation:false,
      Edit_Zameranie:[],
    }
  },
  computed: {
    ...mapGetters({
        studenti:'GET_ZOZNAM_STUDENTOV',
        programy:'GET_ZOZNAM_PROGRAMOV',
        fakulty:'GET_ZOZNAM_FAKULT',
        zamestnaci:'GET_ZOZNAM_ZAMESTNANCOV',
        zamerania:'GET_ZOZNAM_ZAMERANI',
        admin:'GET_ADMIN'
    }),
    programy_sorted:function() {
      if(this.programy.length>0) {
        return this.programy.sort((a,b) => {
          let modifier = 1;
          if(this.currentSortDir === 'desc') modifier = -1;
          if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        }).filter((row, index) => {
          let start = (this.currentPage-1)*this.pageSize;
          let end = this.currentPage*this.pageSize;
          if(index >= start && index < end) return true;
        });
      }
    },
    studenti_sorted:function() {
      if(this.studenti.length>0) {
        return this.studenti.sort((a,b) => {
          let modifier = 1;
          if(this.Stud_currentSortDir === 'desc') modifier = -1;
          if(a[this.Stud_currentSort] < b[this.Stud_currentSort]) return -1 * modifier;
          if(a[this.Stud_currentSort] > b[this.Stud_currentSort]) return 1 * modifier;
        }).filter((row, index) => {
          let start = (this.Stud_currentPage-1)*this.pageSize;
          let end = this.Stud_currentPage*this.pageSize;
          if(index >= start && index < end) return true;
        });
      }
    },
    zamestnanci_sorted:function() {
      if(this.zamestnaci.length>0) {
        return this.zamestnaci.sort((a,b) => {
          let modifier = 1;
          if(this.Zam_currentSortDir === 'desc') modifier = -1;
          if(a[this.Zam_currentSort] < b[this.Zam_currentSort]) return -1 * modifier;
          if(a[this.Zam_currentSort] > b[this.Zam_currentSort]) return 1 * modifier;
        }).filter((row, index) => {
          let start = (this.Zam_currentPage-1)*this.pageSize;
          let end = this.Zam_currentPage*this.pageSize;
          if(index >= start && index < end) return true;
        });
      }
    },
    zamerania_sorted:function() {
      if(this.zamerania.length>0) {
        return this.zamerania.sort((a,b) => {
          let modifier = 1;
          if(this.Zamerania_currentSortDir === 'desc') modifier = -1;
          if(a[this.Zamerania_currentSort] < b[this.Zamerania_currentSort]) return -1 * modifier;
          if(a[this.Zamerania_currentSort] > b[this.Zamerania_currentSort]) return 1 * modifier;
          return 0;
        }).filter((row, index) => {
          let start = (this.Zamerania_currentPage-1)*this.pageSize;
          let end = this.Zamerania_currentPage*this.pageSize;
          if(index >= start && index < end) return true;
        });
      }
    },
  },
  methods:{
    View_Student_Profil(Student){
      ApiRequests.Profil(Student);
    },
    sort:function(s) {
      if(this.Progamy_Search=='') {
        //Reset NavBar
        this.currentPage = 1;
        this.SelectPage1_Style = 'selected_button';
        this.SelectPage2_Style = '';
        this.SelectPage3_Style = '';
        this.SelectPage4_Style = '';
        this.SelectPage5_Style = '';
        this.SelectPage1 = 1;
        this.SelectPage2 = 2;
        this.SelectPage3 = 3;
        this.SelectPage4 = 4;
        this.SelectPage5 = 5;


        switch (s) {
          case "id":
            this.ID_Clicked = "color: black";
            this.ID_IsClicked = true;
            this.Nazov_Clicked = 'color: white';
            this.Nazov_IsClicked = false;
            this.Fakulta_Clicked = 'color: white';
            this.Fakulta_IsClicked = false;
            break;
          case "nazov":
            this.ID_Clicked = 'color: white';
            this.ID_IsClicked = false;
            this.Nazov_Clicked = "color: black";
            this.Nazov_IsClicked = true;
            this.Fakulta_Clicked = 'color: white';
            this.Fakulta_IsClicked = false;
            break;
          case "fakulta":
            this.ID_Clicked = 'color: white';
            this.ID_IsClicked = false;
            this.Nazov_Clicked = 'color: white';
            this.Nazov_IsClicked = false;
            this.Fakulta_Clicked = "color: black";
            this.Fakulta_IsClicked = true;
            break;
        }
        //if s == current sort, reverse
        if (s === this.currentSort) {
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.currentSort = s;
      }
    },
    Stud_sort:function(s) {
      if(this.Studenti_Search=='') {
        //Reset NavBar
        this.Stud_currentPage = 1;
        this.Stud_SelectPage1_Style = 'selected_button';
        this.Stud_SelectPage2_Style = '';
        this.Stud_SelectPage3_Style = '';
        this.Stud_SelectPage4_Style = '';
        this.Stud_SelectPage5_Style = '';
        this.Stud_SelectPage1 = 1;
        this.Stud_SelectPage2 = 2;
        this.Stud_SelectPage3 = 3;
        this.Stud_SelectPage4 = 4;
        this.Stud_SelectPage5 = 5;

        switch (s) {
          case "id":
            this.Stud_ID_Clicked = "color: black";
            this.Stud_ID_IsClicked = true;
            this.Stud_Meno_Clicked = 'color: white';
            this.Stud_Meno_IsClicked = false;
            this.Stud_Priezvisko_Clicked = 'color: white';
            this.Stud_Priezvisko_IsClicked = false;
            this.Stud_Datum_Clicked = 'color: white';
            this.Stud_Datum_IsClicked = false;
            this.Stud_Email_Clicked = 'color: white';
            this.Stud_Email_IsClicked = false;
            this.Stud_Program_Clicked = 'color: white';
            this.Stud_Program_IsClicked = false;
            break;
          case "meno":
            this.Stud_ID_Clicked = 'color: white';
            this.Stud_ID_IsClicked = false;
            this.Stud_Meno_Clicked = "color: black";
            this.Stud_Meno_IsClicked = true;
            this.Stud_Priezvisko_Clicked = 'color: white';
            this.Stud_Priezvisko_IsClicked = false;
            this.Stud_Datum_Clicked = 'color: white';
            this.Stud_Datum_IsClicked = false;
            this.Stud_Email_Clicked = 'color: white';
            this.Stud_Email_IsClicked = false;
            this.Stud_Program_Clicked = 'color: white';
            this.Stud_Program_IsClicked = false;
            break;
          case "priezvisko":
            this.Stud_ID_Clicked = 'color: white';
            this.Stud_ID_IsClicked = false;
            this.Stud_Meno_Clicked = 'color: white';
            this.Stud_Meno_IsClicked = false;
            this.Stud_Priezvisko_Clicked = "color: black";
            this.Stud_Priezvisko_IsClicked = true;
            this.Stud_Datum_Clicked = 'color: white';
            this.Stud_Datum_IsClicked = false;
            this.Stud_Email_Clicked = 'color: white';
            this.Stud_Email_IsClicked = false;
            this.Stud_Program_Clicked = 'color: white';
            this.Stud_Program_IsClicked = false;
            break;
          case "datum":
            this.Stud_ID_Clicked = 'color: white';
            this.Stud_ID_IsClicked = false;
            this.Stud_Meno_Clicked = 'color: white';
            this.Stud_Meno_IsClicked = false;
            this.Stud_Priezvisko_Clicked = 'color: white';
            this.Stud_Priezvisko_IsClicked = false;
            this.Stud_Datum_Clicked = "color: black";
            this.Stud_Datum_IsClicked = true;
            this.Stud_Email_Clicked = 'color: white';
            this.Stud_Email_IsClicked = false;
            this.Stud_Program_Clicked = 'color: white';
            this.Stud_Program_IsClicked = false;
            break;
          case "email":
            this.Stud_ID_Clicked = 'color: white';
            this.Stud_ID_IsClicked = false;
            this.Stud_Meno_Clicked = 'color: white';
            this.Stud_Meno_IsClicked = false;
            this.Stud_Priezvisko_Clicked = 'color: white';
            this.Stud_Priezvisko_IsClicked = false;
            this.Stud_Datum_Clicked = 'color: white';
            this.Stud_Datum_IsClicked = false;
            this.Stud_Email_Clicked = "color: black";
            this.Stud_Email_IsClicked = true;
            this.Stud_Program_Clicked = 'color: white';
            this.Stud_Program_IsClicked = false;
            break;
          case "program":
            this.Stud_ID_Clicked = 'color: white';
            this.Stud_ID_IsClicked = false;
            this.Stud_Meno_Clicked = 'color: white';
            this.Stud_Meno_IsClicked = false;
            this.Stud_Priezvisko_Clicked = 'color: white';
            this.Stud_Priezvisko_IsClicked = false;
            this.Stud_Datum_Clicked = 'color: white';
            this.Stud_Datum_IsClicked = false;
            this.Stud_Email_Clicked = 'color: white';
            this.Stud_Email_IsClicked = false;
            this.Stud_Program_Clicked = "color: black";
            this.Stud_Program_IsClicked = true;
            break;

        }
        //if s == current sort, reverse

        if(s=="datum")s="datum_narodenia";
        if(s=="email")s="skolsky_email";
        if (s === this.Stud_currentSort) {
          this.Stud_currentSortDir = this.Stud_currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.Stud_currentSort = s;
      }
    },
    Change_Header_Color(s){
      if(this.Progamy_Search=='') {
        switch (s) {
          case "id":
            this.ID_Clicked = "background-color: black";
            break;
          case "nazov":
            this.Nazov_Clicked = "background-color: black";
            break;
          case "fakulta":
            this.Fakulta_Clicked = "background-color: black";
            break;
        }
      }
    },
    Leave_Header(){
      if(this.ID_IsClicked){
        this.ID_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.ID_Clicked="background-color: #1DBECF";
      }
      if(this.Nazov_IsClicked){
        this.Nazov_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Nazov_Clicked="background-color: #1DBECF";
      }
      if(this.Fakulta_IsClicked){
        this.Fakulta_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Fakulta_Clicked="background-color: #1DBECF";
      }
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.programy.length)this.currentPage++;
     if(this.currentPage==2){
       this.SelectPage1_Style='';
       this.SelectPage2_Style='selected_button';
     }
     if(this.currentPage==3){
       this.SelectPage2_Style='';
       this.SelectPage3_Style='selected_button';
     }
     if(this.currentPage>3){
       if((this.SelectPage5*this.pageSize) < this.programy.length) {
         this.SelectPage1++;
         this.SelectPage2++;
         this.SelectPage3++;
         this.SelectPage4++;
         this.SelectPage5++;
       }else{
         if((this.currentPage*this.pageSize) < this.programy.length){
           this.SelectPage3_Style='';
           this.SelectPage4_Style='selected_button';
         }else{
           this.SelectPage4_Style='';
           this.SelectPage5_Style='selected_button';
         }
       }
     }

    },
    prevPage:function() {
      if(this.currentPage > 1) {
      if((this.currentPage*this.pageSize)>this.programy.length){
        this.SelectPage5_Style='';
        this.SelectPage4_Style='selected_button';
      }else {
        if (((this.currentPage + 1) * this.pageSize) > this.programy.length) {
          this.SelectPage4_Style = '';
          this.SelectPage3_Style = 'selected_button';
        }else{
          if(this.currentPage>3) {
            this.SelectPage1--;
            this.SelectPage2--;
            this.SelectPage3--;
            this.SelectPage4--;
            this.SelectPage5--;
          }else{
            if(this.currentPage==3){
              this.SelectPage3_Style='';
              this.SelectPage2_Style='selected_button';
            }else{
              this.SelectPage2_Style='';
              this.SelectPage1_Style='selected_button';
            }
          }
        }
      }
        this.currentPage--;
      }
    },
    selectPage(page){
      if(page>this.currentPage){
        for(var i=this.currentPage;i<page;i++){
           this.nextPage();
        }
      }else{
        var rozdiel=this.currentPage-page;
        for(var i=0;i<rozdiel;i++){
          this.prevPage();
        }
      }
    },
    Search_Programy(search){
     for(var i=0;i<this.programy.length;i++){
       if(this.programy[i].nazov.includes(search)){
         this.programy[i].is_visible=true;
       }else
         this.programy[i].is_visible=false;
     }
    },
    add_Program(){
      this.Add_Operation=true;
      this.showModal=true;
    },
    onChildClick () {
      this.showModal = false;
      this.Zamerania_showModal=false;
    },
    Edit_Program(Program){
      this.Add_Operation=false;
      this.showModal=true;
      this.Edit_Program_p=Program;
    },
    Delete_Program(Program){
      ApiRequests.Admin_Delete_Program(Program);
    },
    Search_Studenti(search){
      for(var i=0;i<this.studenti.length;i++){
        if(this.studenti[i].meno.includes(search) || this.studenti[i].priezvisko.includes(search) || this.studenti[i].datum_narodenia.includes(search) || this.studenti[i].skolsky_email.includes(search)){
          this.studenti[i].is_visible=true;
        }else {
          var Hladam_Program = false;
          for (var j = 0; j < this.studenti[i].program.length; j++) {
            if (this.studenti[i].program[j].nazov.includes(search)) Hladam_Program = true
          }
          if (Hladam_Program) {
            this.studenti[i].is_visible = true;
          } else
            this.studenti[i].is_visible = false;
        }
      }
    },
    Stud_Change_Header_Color(s){
      if(this.Studenti_Search=='') {
        switch (s) {
          case "id":
            this.Stud_ID_Clicked = "background-color: black";
            break;
          case "meno":
            this.Stud_Meno_Clicked = "background-color: black";
            break;
          case "priezvisko":
            this.Stud_Priezvisko_Clicked = "background-color: black";
            break;
          case "datum":
            this.Stud_Datum_Clicked = "background-color: black";
            break;
          case "email":
            this.Stud_Email_Clicked = "background-color: black";
            break;
          case "program":
            this.Stud_Program_Clicked = "background-color: black";
            break;
        }
      }
    },
    Stud_Leave_Header(){
      if(this.Stud_ID_IsClicked){
        this.Stud_ID_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Stud_ID_Clicked="background-color: #1DBECF";
      }

      if(this.Stud_Meno_IsClicked){
        this.Stud_Meno_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Stud_Meno_Clicked="background-color: #1DBECF";
      }

      if(this.Stud_Priezvisko_IsClicked){
        this.Stud_Priezvisko_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Stud_Priezvisko_Clicked="background-color: #1DBECF";
      }

      if(this.Stud_Datum_IsClicked){
        this.Stud_Datum_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Stud_Datum_Clicked="background-color: #1DBECF";
      }

      if(this.Stud_Email_IsClicked){
        this.Stud_Email_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Stud_Email_Clicked="background-color: #1DBECF";
      }

      if(this.Stud_Program_IsClicked){
        this.Stud_Program_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Stud_Program_Clicked="background-color: #1DBECF";
      }

    },
    Stud_nextPage:function() {
      if((this.Stud_currentPage*this.pageSize) < this.studenti.length)this.Stud_currentPage++;
      if(this.Stud_currentPage==2){
        this.Stud_SelectPage1_Style='';
        this.Stud_SelectPage2_Style='selected_button';
      }
      if(this.Stud_currentPage==3){
        this.Stud_SelectPage2_Style='';
        this.Stud_SelectPage3_Style='selected_button';
      }
      if(this.Stud_currentPage>3){
        if((this.Stud_SelectPage5*this.pageSize) < this.studenti.length) {
          this.Stud_SelectPage1++;
          this.Stud_SelectPage2++;
          this.Stud_SelectPage3++;
          this.Stud_SelectPage4++;
          this.Stud_SelectPage5++;
        }else{
          if((this.Stud_currentPage*this.pageSize) < this.studenti.length){
            this.Stud_SelectPage3_Style='';
            this.Stud_SelectPage4_Style='selected_button';
          }else{
            this.Stud_SelectPage4_Style='';
            this.Stud_SelectPage5_Style='selected_button';
          }
        }
      }

    },
    Stud_prevPage:function() {
      if(this.Stud_currentPage > 1) {
        if(this.Stud_SelectPage5_Style=='selected_button'){
          this.Stud_SelectPage5_Style='';
          this.Stud_SelectPage4_Style='selected_button';
        }else {
          if (this.Stud_SelectPage4_Style=='selected_button') {
            this.Stud_SelectPage4_Style = '';
            this.Stud_SelectPage3_Style = 'selected_button';
          }else{
            if(this.Stud_currentPage>3) {
              this.Stud_SelectPage1--;
              this.Stud_SelectPage2--;
              this.Stud_SelectPage3--;
              this.Stud_SelectPage4--;
              this.Stud_SelectPage5--;
            }else{
              if(this.Stud_currentPage==3){
                this.Stud_SelectPage3_Style='';
                this.Stud_SelectPage2_Style='selected_button';
              }else{
                this.Stud_SelectPage2_Style='';
                this.Stud_SelectPage1_Style='selected_button';
              }
            }
          }
        }
        this.Stud_currentPage--;
      }
    },
    Stud_selectPage(page){
      if(page>this.Stud_currentPage){
        for(var i=this.Stud_currentPage;i<page;i++){
          this.Stud_nextPage();
        }
      }else{
        var rozdiel=this.Stud_currentPage-page;
        for(var i=0;i<rozdiel;i++){
          this.Stud_prevPage();
        }
      }
    },
    //Zamestnanci
    Zam_sort:function(s) {
      if(this.Zamestnanci_Search=='') {
        //Reset NavBar
        this.Zam_currentPage = 1;
        this.Zam_SelectPage1_Style = 'selected_button';
        this.Zam_SelectPage2_Style = '';
        this.Zam_SelectPage3_Style = '';
        this.Zam_SelectPage4_Style = '';
        this.Zam_SelectPage5_Style = '';
        this.Zam_SelectPage1 = 1;
        this.Zam_SelectPage2 = 2;
        this.Zam_SelectPage3 = 3;
        this.Zam_SelectPage4 = 4;
        this.Zam_SelectPage5 = 5;

        switch (s) {
          case "id":
            this.Zam_ID_Clicked = "color: black";
            this.Zam_ID_IsClicked = true;
            this.Zam_Meno_Clicked = 'color: white';
            this.Zam_Meno_IsClicked = false;
            this.Zam_Priezvisko_Clicked = 'color: white';
            this.Zam_Priezvisko_IsClicked = false;
            this.Zam_Datum_Clicked = 'color: white';
            this.Zam_Datum_IsClicked = false;
            this.Zam_Email_Clicked = 'color: white';
            this.Zam_Email_IsClicked = false;
            break;
          case "meno":
            this.Zam_ID_Clicked = 'color: white';
            this.Zam_ID_IsClicked = false;
            this.Zam_Meno_Clicked = "color: black";
            this.Zam_Meno_IsClicked = true;
            this.Zam_Priezvisko_Clicked = 'color: white';
            this.Zam_Priezvisko_IsClicked = false;
            this.Zam_Datum_Clicked = 'color: white';
            this.Zam_Datum_IsClicked = false;
            this.Zam_Email_Clicked = 'color: white';
            this.Zam_Email_IsClicked = false;
            break;
          case "priezvisko":
            this.Zam_ID_Clicked = 'color: white';
            this.Zam_ID_IsClicked = false;
            this.Zam_Meno_Clicked = 'color: white';
            this.Zam_Meno_IsClicked = false;
            this.Zam_Priezvisko_Clicked = "color: black";
            this.Zam_Priezvisko_IsClicked = true;
            this.Zam_Datum_Clicked = 'color: white';
            this.Zam_Datum_IsClicked = false;
            this.Zam_Email_Clicked = 'color: white';
            this.Zam_Email_IsClicked = false;
            break;
          case "datum":
            this.Zam_ID_Clicked = 'color: white';
            this.Zam_ID_IsClicked = false;
            this.Zam_Meno_Clicked = 'color: white';
            this.Zam_Meno_IsClicked = false;
            this.Zam_Priezvisko_Clicked = 'color: white';
            this.Zam_Priezvisko_IsClicked = false;
            this.Zam_Datum_Clicked = "color: black";
            this.Zam_Datum_IsClicked = true;
            this.Zam_Email_Clicked = 'color: white';
            this.Zam_Email_IsClicked = false;
            break;
          case "email":
            this.Zam_ID_Clicked = 'color: white';
            this.Zam_ID_IsClicked = false;
            this.Zam_Meno_Clicked = 'color: white';
            this.Zam_Meno_IsClicked = false;
            this.Zam_Priezvisko_Clicked = 'color: white';
            this.Zam_Priezvisko_IsClicked = false;
            this.Zam_Datum_Clicked = 'color: white';
            this.Zam_Datum_IsClicked = false;
            this.Zam_Email_Clicked = "color: black";
            this.Zam_Email_IsClicked = true;
            break;

        }
        //if s == current sort, reverse
        if(s=="datum")s="datum_narodenia";
        if(s=="email")s="skolsky_email";
        if (s === this.Zam_currentSort) {
          this.Zam_currentSortDir = this.Zam_currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.Zam_currentSort = s;
      }
    },
    Search_Zamestnanci(search){
      for(var i=0;i<this.zamestnaci.length;i++){
        if(this.zamestnaci[i].meno.includes(search) || this.zamestnaci[i].priezvisko.includes(search)){
          this.zamestnaci[i].is_visible=true;
        }else {
            this.zamestnaci[i].is_visible = false;
        }
      }
    },
    Zam_Change_Header_Color(s){
      if(this.Zamestnanci_Search=='') {
        switch (s) {
          case "id":
            this.Zam_ID_Clicked = "background-color: black";
            break;
          case "meno":
            this.Zam_Meno_Clicked = "background-color: black";
            break;
          case "priezvisko":
            this.Zam_Priezvisko_Clicked = "background-color: black";
            break;
          case "datum":
            this.Zam_Datum_Clicked = "background-color: black";
            break;
          case "email":
            this.Zam_Email_Clicked = "background-color: black";
            break;
        }
      }
    },
    Zam_Leave_Header(){
      if(this.Zam_ID_IsClicked){
        this.Zam_ID_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Zam_ID_Clicked="background-color: #1DBECF";
      }

      if(this.Zam_Meno_IsClicked){
        this.Zam_Meno_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Zam_Meno_Clicked="background-color: #1DBECF";
      }

      if(this.Zam_Priezvisko_IsClicked){
        this.Zam_Priezvisko_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Zam_Priezvisko_Clicked="background-color: #1DBECF";
      }

      if(this.Zam_Datum_IsClicked){
        this.Zam_Datum_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Zam_Datum_Clicked="background-color: #1DBECF";
      }

      if(this.Zam_Email_IsClicked){
        this.Zam_Email_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Zam_Email_Clicked="background-color: #1DBECF";
      }

    },
    Zam_nextPage:function() {
      if((this.Zam_currentPage*this.pageSize) < this.zamestnaci.length)this.Zam_currentPage++;
      if(this.Zam_currentPage==2){
        this.Zam_SelectPage1_Style='';
        this.Zam_SelectPage2_Style='selected_button';
      }
      if(this.Zam_currentPage==3){
        this.Zam_SelectPage2_Style='';
        this.Zam_SelectPage3_Style='selected_button';
      }
      if(this.Zam_currentPage>3){
        if((this.Zam_SelectPage5*this.pageSize) < this.studenti.length) {
          this.Zam_SelectPage1++;
          this.Zam_SelectPage2++;
          this.Zam_SelectPage3++;
          this.Zam_SelectPage4++;
          this.Zam_SelectPage5++;
        }else{
          if((this.Zam_currentPage*this.pageSize) < this.zamestnaci.length){
            this.Zam_SelectPage3_Style='';
            this.Zam_SelectPage4_Style='selected_button';
          }else{
            this.Zam_SelectPage4_Style='';
            this.Zam_SelectPage5_Style='selected_button';
          }
        }
      }

    },
    Zam_prevPage:function() {
      if(this.Zam_currentPage > 1) {
        if( this.Zam_SelectPage5_Style=='selected_button'){
          this.Zam_SelectPage5_Style='';
          this.Zam_SelectPage4_Style='selected_button';
        }else {
          if (this.Zam_SelectPage4_Style=='selected_button') {
            this.Zam_SelectPage4_Style = '';
            this.Zam_SelectPage3_Style = 'selected_button';
          }else{
            if(this.Zam_currentPage>3) {
              this.Zam_SelectPage1--;
              this.Zam_SelectPage2--;
              this.Zam_SelectPage3--;
              this.Zam_SelectPage4--;
              this.Zam_SelectPage5--;
            }else{
              if(this.Zam_currentPage==3){
                this.Zam_SelectPage3_Style='';
                this.Zam_SelectPage2_Style='selected_button';
              }else{
                this.Zam_SelectPage2_Style='';
                this.Zam_SelectPage1_Style='selected_button';
              }
            }
          }
        }
        this.Zam_currentPage--;
      }
    },
    Zam_selectPage(page){
      if(page>this.Zam_currentPage){
        for(var i=this.Zam_currentPage;i<page;i++){
          this.Zam_nextPage();
        }
      }else{
        var rozdiel=this.Zam_currentPage-page;
        for(var i=0;i<rozdiel;i++){
          this.Zam_prevPage();
        }
      }
    },
    Add_Admin(zam){
      ApiRequests.Admin_Add_Admin(zam);
    },
    Remove_Admin(zam){
      ApiRequests.Admin_Remove_Admin(zam);
      if(this.admin.id==zam.id){
        auth.LogOut()
      }
    },

    //Zamerania
    Zamerania_sort:function(s) {
      if(this.Zamerania_Search=='') {
        //Reset NavBar
        this.Zamerania_currentPage = 1;
        this.Zamerania_SelectPage1_Style = 'selected_button';
        this.Zamerania_SelectPage2_Style = '';
        this.Zamerania_SelectPage3_Style = '';
        this.Zamerania_SelectPage4_Style = '';
        this.Zamerania_SelectPage5_Style = '';
        this.Zamerania_SelectPage1 = 1;
        this.Zamerania_SelectPage2 = 2;
        this.Zamerania_SelectPage3 = 3;
        this.Zamerania_SelectPage4 = 4;
        this.Zamerania_SelectPage5 = 5;


        switch (s) {
          case "id":
            this.Zamerania_ID_Clicked = "color: black";
            this.Zamerania_ID_IsClicked = true;
            this.Zamerania_Nazov_Clicked = 'color: white';
            this.Zamerania_Nazov_IsClicked = false;
            this.Zamerania_Program_Clicked = 'color: white';
            this.Zamerania_Program_IsClicked = false;
            break;
          case "nazov":
            this.Zamerania_ID_Clicked = 'color: white';
            this.Zamerania_ID_IsClicked = false;
            this.Zamerania_Nazov_Clicked = "color: black";
            this.Zamerania_Nazov_IsClicked = true;
            this.Zamerania_Program_Clicked = 'color: white';
            this.Zamerania_Program_IsClicked = false;
            break;
          case "program":
            this.Zamerania_ID_Clicked = 'color: white';
            this.Zamerania_ID_IsClicked = false;
            this.Zamerania_Nazov_Clicked = 'color: white';
            this.Zamerania_Nazov_IsClicked = false;
            this.Zamerania_Program_Clicked = "color: black";
            this.Zamerania_Program_IsClicked = true;
            break;
        }
        //if s == current sort, reverse
        if (s === this.Zamerania_currentSort) {
          this.Zamerania_currentSortDir = this.Zamerania_currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.Zamerania_currentSort = s;
      }
    },
    Zamerania_Change_Header_Color(s){
      if(this.Zamerania_Search=='') {
        switch (s) {
          case "id":
            this.Zamerania_ID_Clicked = "background-color: black";
            break;
          case "nazov":
            this.Zamerania_Nazov_Clicked = "background-color: black";
            break;
          case "program":
            this.Zamerania_Program_Clicked = "background-color: black";
            break;
        }
      }
    },
    Zamerania_Leave_Header(){
      if(this.Zamerania_ID_IsClicked){
        this.Zamerania_ID_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Zamerania_ID_Clicked="background-color: #1DBECF";
      }
      if(this.Zamerania_Nazov_IsClicked){
        this.Zamerania_Nazov_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Zamerania_Nazov_Clicked="background-color: #1DBECF";
      }
      if(this.Zamerania_Program_IsClicked){
        this.Zamerania_Program_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Zamerania_Program_Clicked="background-color: #1DBECF";
      }
    },
    Zamerania_nextPage:function() {
      if((this.Zamerania_currentPage*this.pageSize) < this.zamerania.length)this.Zamerania_currentPage++;
      if(this.Zamerania_currentPage==2){
        this.Zamerania_SelectPage1_Style='';
        this.Zamerania_SelectPage2_Style='selected_button';
      }
      if(this.Zamerania_currentPage==3){
        this.Zamerania_SelectPage2_Style='';
        this.Zamerania_SelectPage3_Style='selected_button';
      }
      if(this.Zamerania_currentPage>3){
        if((this.Zamerania_SelectPage5*this.pageSize) < this.zamerania.length) {
          this.Zamerania_SelectPage1++;
          this.Zamerania_SelectPage2++;
          this.Zamerania_SelectPage3++;
          this.Zamerania_SelectPage4++;
          this.Zamerania_SelectPage5++;
        }else{
          if((this.Zamerania_currentPage*this.pageSize) < this.zamerania.length){
            this.Zamerania_SelectPage3_Style='';
            this.Zamerania_SelectPage4_Style='selected_button';
          }else{
            this.Zamerania_SelectPage4_Style='';
            this.Zamerania_SelectPage5_Style='selected_button';
          }
        }
      }

    },
    Zamerania_prevPage:function() {
      if(this.Zamerania_currentPage > 1) {
        if((this.Zamerania_currentPage*this.pageSize)>this.zamerania.length){
          this.Zamerania_SelectPage5_Style='';
          this.Zamerania_SelectPage4_Style='selected_button';
        }else {
          if (((this.Zamerania_currentPage + 1) * this.pageSize) > this.zamerania.length) {
            this.Zamerania_SelectPage4_Style = '';
            this.Zamerania_SelectPage3_Style = 'selected_button';
          }else{
            if(this.Zamerania_currentPage>3) {
              this.Zamerania_SelectPage1--;
              this.Zamerania_SelectPage2--;
              this.Zamerania_SelectPage3--;
              this.Zamerania_SelectPage4--;
              this.Zamerania_SelectPage5--;
            }else{
              if(this.Zamerania_currentPage==3){
                this.Zamerania_SelectPage3_Style='';
                this.Zamerania_SelectPage2_Style='selected_button';
              }else{
                this.Zamerania_SelectPage2_Style='';
                this.Zamerania_SelectPage1_Style='selected_button';
              }
            }
          }
        }
        this.Zamerania_currentPage--;
      }
    },
    Zamerania_selectPage(page){
      if(page>this.Zamerania_currentPage){
        for(var i=this.Zamerania_currentPage;i<page;i++){
          this.Zamerania_nextPage();
        }
      }else{
        var rozdiel=this.Zamerania_currentPage-page;
        for(var i=0;i<rozdiel;i++){
          this.Zamerania_prevPage();
        }
      }
    },
    Search_Zamerania(search){
      for(var i=0;i<this.zamerania.length;i++){
        if(this.zamerania[i].nazov.includes(search) || this.zamerania[i].program.includes(search) ){
          this.zamerania[i].is_visible=true;
        }else
          this.zamerania[i].is_visible=false;
      }
    },
    add_Zameranie(){
      this.Zamerania_Add_Operation=true;
      this.Zamerania_showModal=true;
    },
    Edit_Zamerania(Zameranie){
      this.Zamerania_Add_Operation=false;
      this.Zamerania_showModal=true;
      this.Edit_Zameranie=Zameranie;
    },
    Delete_Zameranie(Zameranie){
      ApiRequests.Admin_Delete_Zameranie(Zameranie);
    },


  },
  created() {
    ApiRequests.Admin_Get_Zoznam_UKF();
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
}

#studenti,#programy, #zamestnanci, #zamerania {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#studenti td, #studenti th, #programy td, #programy th, #zamestnanci td, #zamestnanci th, #zamerania td, #zamerania th {
  border: 1px solid #ddd;
  padding: 8px;
}

#studenti tr:nth-child(even), #programy tr:nth-child(even), #zamestnanci tr:nth-child(even), #zamerania tr:nth-child(even){
  background-color: #f2f2f2;
}

#studenti tr:hover, #programy tr:hover, #zamestnanci tr:hover, #zamerania tr:hover{
  background-color: #ddd;
}


#studenti th, #programy th, #zamestnanci th, #zamerania th {
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
