<template>
  <div>
    <div class="Basic_Grey">
      <div class="table">
        <div class="search">
          <h1 style="float: left">Zoznam Aktuálnych Ponúk</h1>
          <input type="text" name="search" placeholder="Hladať" v-model="AP_Search" v-on:input="Search_AP(AP_Search)">
        </div>
        <table id="nove_ponuky">
          <tr>
            <th @click="AP_sort('id')" :style="this.AP_ID_Clicked" v-on:mouseenter="AP_Change_Header_Color('id')" v-on:mouseleave="AP_Leave_Header">ID</th>
            <th @click="AP_sort('nazov')" :style="this.AP_Nazov_Clicked" v-on:mouseenter="AP_Change_Header_Color('nazov')" v-on:mouseleave="AP_Leave_Header">Názov</th>
            <th @click="AP_sort('firma')" :style="this.AP_Firma_Clicked" v-on:mouseenter="AP_Change_Header_Color('firma')" v-on:mouseleave="AP_Leave_Header">Firma</th>
            <th @click="AP_sort('od')" :style="this.AP_Od_Clicked" v-on:mouseenter="AP_Change_Header_Color('od')" v-on:mouseleave="AP_Leave_Header">Od</th>
            <th @click="AP_sort('do')" :style="this.AP_Do_Clicked" v-on:mouseenter="AP_Change_Header_Color('do')" v-on:mouseleave="AP_Leave_Header">Do</th>
            <th @click="AP_sort('mesto')" :style="this.AP_Mesto_Clicked" v-on:mouseenter="AP_Change_Header_Color('mesto')" v-on:mouseleave="AP_Leave_Header">Mesto</th>
            <th>CRUD Operacie</th>
          </tr>
          <tbody v-if="AP_Search==''">
          <tr  v-for="p in Aktualne_Ponuky_sorted" :key="p.id">
            <td>{{p.id}}</td>
            <td>{{ p.nazov }}</td>
            <td>{{ p.firma }}</td>
            <td>{{p.od}}</td>
            <td >{{p.do}}</td>
            <td >{{p.mesto}}</td>
            <td>
              <img src="../../assets/icons/view.png" class="crud" @click="Detail(p)">
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr  v-for="p in AKT_ponuky" :key="p.id" v-if="p.is_visible">
            <td>{{p.id}}</td>
            <td>{{ p.nazov }}</td>
            <td>{{ p.firma }}</td>
            <td>{{p.od}}</td>
            <td >{{p.do}}</td>
            <td >{{p.mesto}}</td>
            <td>
              <img src="../../assets/icons/view.png" class="crud" @click="Detail(p)">
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="this.AP_Search==''">
          <button @click="AP_prevPage" v-if="this.AP_currentPage>1">Predchádzajúce</button>
          <button @click="AP_selectPage(AP_SelectPage1)" :class="AP_SelectPage1_Style" v-if="this.AKT_ponuky.length>10">{{AP_SelectPage1}}</button>
          <button @click="AP_selectPage(AP_SelectPage2)" :class="AP_SelectPage2_Style" v-if="this.AKT_ponuky.length>10">{{AP_SelectPage2}}</button>
          <button @click="AP_selectPage(AP_SelectPage3)" :class="AP_SelectPage3_Style" v-if="this.AKT_ponuky.length>20">{{AP_SelectPage3}}</button>
          <button @click="AP_selectPage(AP_SelectPage4)" :class="AP_SelectPage4_Style" v-if="this.AKT_ponuky.length>30">{{AP_SelectPage4}}</button>
          <button @click="AP_selectPage(AP_SelectPage5)" :class="AP_SelectPage5_Style" v-if="this.AKT_ponuky.length>40">{{AP_SelectPage5}}</button>
          <button @click="AP_nextPage"v-if="(this.AP_currentPage*this.pageSize) < this.AKT_ponuky.length">Ďalšie</button>
        </div>
      </div>
      <div class="table">
        <div class="search">
          <h1 style="float: left">Zoznam Absolvovaných Ponúk</h1>
          <input type="text" name="search" placeholder="Hladať" v-model="ABS_P_Search" v-on:input="Search_ABS_P(ABS_P_Search)">
        </div>
        <table id="absolvovane_ponuky">
          <tr>
            <th @click="ABS_P_sort('id')" :style="this.ABS_P_ID_Clicked" v-on:mouseenter="ABS_P_Change_Header_Color('id')" v-on:mouseleave="ABS_P_Leave_Header">ID</th>
            <th @click="ABS_P_sort('nazov')" :style="this.ABS_P_Nazov_Clicked" v-on:mouseenter="ABS_P_Change_Header_Color('nazov')" v-on:mouseleave="ABS_P_Leave_Header">Názov</th>
            <th @click="ABS_P_sort('firma')" :style="this.ABS_P_Firma_Clicked" v-on:mouseenter="ABS_P_Change_Header_Color('firma')" v-on:mouseleave="ABS_P_Leave_Header">Firma</th>
            <th @click="ABS_P_sort('od')" :style="this.ABS_P_Od_Clicked" v-on:mouseenter="ABS_P_Change_Header_Color('od')" v-on:mouseleave="ABS_P_Leave_Header">Od</th>
            <th @click="ABS_P_sort('do')" :style="this.ABS_P_Do_Clicked" v-on:mouseenter="ABS_P_Change_Header_Color('do')" v-on:mouseleave="ABS_P_Leave_Header">Do</th>
            <th @click="ABS_P_sort('mesto')" :style="this.ABS_P_Mesto_Clicked" v-on:mouseenter="ABS_P_Change_Header_Color('mesto')" v-on:mouseleave="ABS_P_Leave_Header">Mesto</th>
            <th>CRUD Operacie</th>
          </tr>
          <tbody v-if="ABS_P_Search==''">
          <tr  v-for="p in Absolvovane_Ponuky_sorted" :key="p.id">
            <td>{{p.id}}</td>
            <td>{{ p.nazov }}</td>
            <td>{{ p.firma }}</td>
            <td>{{p.od}}</td>
            <td >{{p.do}}</td>
            <td >{{p.mesto}}</td>
            <td>
              <img src="../../assets/icons/view.png" class="crud" @click="Detail(p)">
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr  v-for="p in ABS_ponuky" :key="p.id" v-if="p.is_visible">
            <td>{{p.id}}</td>
            <td>{{ p.nazov }}</td>
            <td>{{ p.firma }}</td>
            <td>{{p.od}}</td>
            <td >{{p.do}}</td>
            <td >{{p.mesto}}</td>
            <td>
              <img src="../../assets/icons/view.png" class="crud" @click="Detail(p)">
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="this.ABS_P_Search==''">
          <button @click="ABS_P_prevPage" v-if="this.ABS_P_currentPage>1">Predchádzajúce</button>
          <button @click="ABS_P_selectPage(ABS_P_SelectPage1)" :class="ABS_P_SelectPage1_Style" v-if="this.ABS_ponuky.length>10">{{ABS_P_SelectPage1}}</button>
          <button @click="ABS_P_selectPage(ABS_P_SelectPage2)" :class="ABS_P_SelectPage2_Style" v-if="this.ABS_ponuky.length>10">{{ABS_P_SelectPage2}}</button>
          <button @click="ABS_P_selectPage(ABS_P_SelectPage3)" :class="ABS_P_SelectPage3_Style" v-if="this.ABS_ponuky.length>20">{{ABS_P_SelectPage3}}</button>
          <button @click="ABS_P_selectPage(ABS_P_SelectPage4)" :class="ABS_P_SelectPage4_Style" v-if="this.ABS_ponuky.length>30">{{ABS_P_SelectPage4}}</button>
          <button @click="ABS_P_selectPage(ABS_P_SelectPage5)" :class="ABS_P_SelectPage5_Style" v-if="this.ABS_ponuky.length>40">{{ABS_P_SelectPage5}}</button>
          <button @click="ABS_P_nextPage"v-if="(this.ABS_P_currentPage*this.pageSize) < this.ABS_ponuky.length">Ďalšie</button>
        </div>
      </div>
      <div class="table" v-if="nove_komentare.length>0">
        <div class="search">
          <h1 style="float: left">Zoznam Nových Komentárov</h1>
        </div>
        <table id="Nove_Komentare">
          <tr>
            <th>ID</th>
            <th>Meno Študenta</th>
            <th>Priezvisko Študenta</th>
            <th>Firma</th>
            <th>Ponuka</th>
            <th>Hodnotenie</th>
            <th>Komentár</th>
            <th>CRUD Operacie</th>
          </tr>
          <tbody>
          <tr  v-for="k in nove_komentare" :key="k.id">
            <td>{{k.id}}</td>
            <td>{{ k.meno }}</td>
            <td>{{ k.priezvisko }}</td>
            <td>{{k.firma}}</td>
            <td >{{k.ponuka}}</td>
            <td >{{k.hodnotenie}}</td>
            <td >{{k.komentar}}</td>
            <td>
              <img src="../../assets/icons/accept.png" class="crud" @click="Potvrdit_Komentar(k)">
              <img src="../../assets/icons/delete.png" class="crud" @click="Delete_Komentar(k)">
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <h1 style="text-align: center">Žiadne nové komentáre</h1>
      </div>
      <div class="table" v-if="this.komentare.length>0">
        <div class="search">
          <h1 style="float: left">Zoznam Komentárov</h1>
          <input type="text" name="search" placeholder="Hladať" v-model="Kom_Search" v-on:input="Search_Kom(Kom_Search)">
        </div>
        <table id="komentare">
          <tr>
            <th @click="Kom_sort('id')" :style="this.Kom_ID_Clicked" v-on:mouseenter="Kom_Change_Header_Color('id')" v-on:mouseleave="Kom_Leave_Header">ID</th>
            <th @click="Kom_sort('meno')" :style="this.Kom_Meno_Clicked" v-on:mouseenter="Kom_Change_Header_Color('meno')" v-on:mouseleave="Kom_Leave_Header">Meno Študenta</th>
            <th @click="Kom_sort('priezvisko')" :style="this.Kom_Priezvisko_Clicked" v-on:mouseenter="Kom_Change_Header_Color('priezvisko')" v-on:mouseleave="Kom_Leave_Header">Priezvisko Študenta</th>
            <th @click="Kom_sort('firma')" :style="this.Kom_Firma_Clicked" v-on:mouseenter="Kom_Change_Header_Color('firma')" v-on:mouseleave="Kom_Leave_Header">Firma</th>
            <th @click="Kom_sort('ponuka')" :style="this.Kom_Ponuka_Clicked" v-on:mouseenter="Kom_Change_Header_Color('ponuka')" v-on:mouseleave="Kom_Leave_Header">Ponuka</th>
            <th @click="Kom_sort('hodnotenie')" :style="this.Kom_Hodnotenie_Clicked" v-on:mouseenter="Kom_Change_Header_Color('hodnotenie')" v-on:mouseleave="Kom_Leave_Header">Hodnotenie</th>
            <th @click="Kom_sort('komentar')" :style="this.Kom_Komentar_Clicked" v-on:mouseenter="Kom_Change_Header_Color('komentar')" v-on:mouseleave="Kom_Leave_Header">Komentar</th>
            <th>CRUD Operacie</th>
          </tr>
          <tbody v-if="Kom_Search==''">
          <tr  v-for="k in Komentare_sorted" :key="k.id">
            <td>{{k.id}}</td>
            <td>{{ k.meno }}</td>
            <td>{{ k.priezvisko }}</td>
            <td>{{k.firma}}</td>
            <td >{{k.ponuka}}</td>
            <td >{{k.hodnotenie}}</td>
            <td >{{k.komentar}}</td>
            <td>
              <img src="../../assets/icons/view.png" class="crud" @click="Detail_Komentar(k)">
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr  v-for="k in komentare" :key="k.id" v-if="k.is_visible">
            <td>{{k.id}}</td>
            <td>{{ k.meno }}</td>
            <td>{{ k.priezvisko }}</td>
            <td>{{k.firma}}</td>
            <td >{{k.ponuka}}</td>
            <td >{{k.hodnotenie}}</td>
            <td >{{k.komentar}}</td>
            <td>
              <img src="../../assets/icons/view.png" class="crud" @click="Detail_Komentar(k)">
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="this.Kom_Search==''">
          <button @click="Kom_prevPage" v-if="this.Kom_currentPage>1">Predchádzajúce</button>
          <button @click="Kom_selectPage(Kom_SelectPage1)" :class="ABS_P_SelectPage1_Style" v-if="this.komentare.length>10">{{Kom_SelectPage1}}</button>
          <button @click="Kom_selectPage(Kom_SelectPage2)" :class="ABS_P_SelectPage2_Style" v-if="this.komentare.length>10">{{Kom_SelectPage2}}</button>
          <button @click="Kom_selectPage(Kom_SelectPage3)" :class="ABS_P_SelectPage3_Style" v-if="this.komentare.length>20">{{Kom_SelectPage3}}</button>
          <button @click="Kom_selectPage(Kom_SelectPage4)" :class="ABS_P_SelectPage4_Style" v-if="this.komentare.length>30">{{Kom_SelectPage4}}</button>
          <button @click="Kom_selectPage(Kom_SelectPage5)" :class="ABS_P_SelectPage5_Style" v-if="this.komentare.length>40">{{Kom_SelectPage5}}</button>
          <button @click="Kom_nextPage"v-if="(this.Kom_currentPage*this.pageSize) < this.komentare.length">Ďalšie</button>
        </div>
      </div>
      <div v-else>
        <h1 style="text-align: center">Žiadne komentáre</h1>
      </div>
    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import ApiRequests from '@/ApiRequests';

export default {
  name: 'Sprava_Ponuk',

  data(){
    return {
      pageSize:10,
      showModal:false,


      AP_currentSort: 'id',
      AP_currentSortDir: 'asc',
      AP_ID_Clicked:'color: white',
      AP_Nazov_Clicked:'color: white',
      AP_Firma_Clicked:'color: white',
      AP_Od_Clicked:'color: white',
      AP_Do_Clicked:'color: white',
      AP_Mesto_Clicked:'color: white',
      AP_ID_IsClicked:false,
      AP_Nazov_IsClicked:false,
      AP_Firma_IsClicked:false,
      AP_Od_IsClicked:false,
      AP_Do_IsClicked:false,
      AP_Mesto_IsClicked:false,
      AP_currentPage:1,
      AP_SelectPage1:1,
      AP_SelectPage2:2,
      AP_SelectPage3:3,
      AP_SelectPage4:4,
      AP_SelectPage5:5,
      AP_SelectPage1_Style:'selected_button',
      AP_SelectPage2_Style:'',
      AP_SelectPage3_Style:'',
      AP_SelectPage4_Style:'',
      AP_SelectPage5_Style:'',
      AP_Search:'',

      //Absolvované Ponuky:
      ABS_P_currentSort: 'id',
      ABS_P_currentSortDir: 'asc',
      ABS_P_ID_Clicked:'color: white',
      ABS_P_Nazov_Clicked:'color: white',
      ABS_P_Firma_Clicked:'color: white',
      ABS_P_Od_Clicked:'color: white',
      ABS_P_Do_Clicked:'color: white',
      ABS_P_Mesto_Clicked:'color: white',
      ABS_P_ID_IsClicked:false,
      ABS_P_Nazov_IsClicked:false,
      ABS_P_Firma_IsClicked:false,
      ABS_P_Od_IsClicked:false,
      ABS_P_Do_IsClicked:false,
      ABS_P_Mesto_IsClicked:false,
      ABS_P_currentPage:1,
      ABS_P_SelectPage1:1,
      ABS_P_SelectPage2:2,
      ABS_P_SelectPage3:3,
      ABS_P_SelectPage4:4,
      ABS_P_SelectPage5:5,
      ABS_P_SelectPage1_Style:'selected_button',
      ABS_P_SelectPage2_Style:'',
      ABS_P_SelectPage3_Style:'',
      ABS_P_SelectPage4_Style:'',
      ABS_P_SelectPage5_Style:'',
      ABS_P_Search:'',

      //Komentare
      Kom_currentSort: 'id',
      Kom_currentSortDir: 'asc',
      Kom_ID_Clicked:'color: white',
      Kom_Meno_Clicked:'color: white',
      Kom_Priezvisko_Clicked:'color: white',
      Kom_Firma_Clicked:'color: white',
      Kom_Ponuka_Clicked:'color: white',
      Kom_Hodnotenie_Clicked:'color: white',
      Kom_Komentar_Clicked:'color: white',
      Kom_ID_IsClicked:false,
      Kom_Meno_IsClicked:false,
      Kom_Priezvisko_IsClicked:false,
      Kom_Firma_IsClicked:false,
      Kom_Ponuka_IsClicked:false,
      Kom_Hodnotenie_IsClicked:false,
      Kom_Komentar_IsClicked:false,
      Kom_currentPage:1,
      Kom_SelectPage1:1,
      Kom_SelectPage2:2,
      Kom_SelectPage3:3,
      Kom_SelectPage4:4,
      Kom_SelectPage5:5,
      Kom_SelectPage1_Style:'selected_button',
      Kom_SelectPage2_Style:'',
      Kom_SelectPage3_Style:'',
      Kom_SelectPage4_Style:'',
      Kom_SelectPage5_Style:'',
      Kom_Search:'',
    }
  },
  computed: {
    ...mapGetters({
        AKT_ponuky:'GET_ZOZNAM_AKT_PONUK',
        ABS_ponuky:'GET_ZOZNAM_ABS_PONUK',
        nove_komentare:'GET_ZOZNAM_NOVYCH_KOMENTAROV',
        komentare:'GET_ZOZNAM_KOMENTAROV',
    }),
    Aktualne_Ponuky_sorted:function() {
      if(this.AKT_ponuky.length>0) {
        return this.AKT_ponuky.sort((a,b) => {
          let modifier = 1;
          if(this.AP_currentSortDir === 'desc') modifier = -1;
          if(a[this.AP_currentSort] < b[this.AP_currentSort]) return -1 * modifier;
          if(a[this.AP_currentSort] > b[this.AP_currentSort]) return 1 * modifier;
          return 0;
        }).filter((row, index) => {
          let start = (this.AP_currentPage-1)*this.pageSize;
          let end = this.AP_currentPage*this.pageSize;
          if(index >= start && index < end) return true;
        });
      }
    },
    Absolvovane_Ponuky_sorted:function() {
      if(this.ABS_ponuky.length>0) {
        return this.ABS_ponuky.sort((a,b) => {
          let modifier = 1;
          if(this.ABS_P_currentSortDir === 'desc') modifier = -1;
          if(a[this.ABS_P_currentSort] < b[this.ABS_P_currentSort]) return -1 * modifier;
          if(a[this.ABS_P_currentSort] > b[this.ABS_P_currentSort]) return 1 * modifier;
          return 0;
        }).filter((row, index) => {
          let start = (this.ABS_P_currentPage-1)*this.pageSize;
          let end = this.ABS_P_currentPage*this.pageSize;
          if(index >= start && index < end) return true;
        });
      }
    },
    Komentare_sorted:function() {
      if(this.komentare.length>0) {
        return this.komentare.sort((a,b) => {
          let modifier = 1;
          if(this.Kom_currentSortDir === 'desc') modifier = -1;
          if(a[this.Kom_currentSort] < b[this.Kom_currentSort]) return -1 * modifier;
          if(a[this.Kom_currentSort] > b[this.Kom_currentSort]) return 1 * modifier;
          return 0;
        }).filter((row, index) => {
          let start = (this.Kom_currentPage-1)*this.pageSize;
          let end = this.Kom_currentPage*this.pageSize;
          if(index >= start && index < end) return true;
        });
      }
    },
  },
  methods:{
    AP_sort:function(s) {
      if(this.AP_Search=='') {
        //Reset NavBar
        this.AP_currentPage = 1;
        this.AP_SelectPage1_Style = 'selected_button';
        this.AP_SelectPage2_Style = '';
        this.AP_SelectPage3_Style = '';
        this.AP_SelectPage4_Style = '';
        this.AP_SelectPage5_Style = '';
        this.AP_SelectPage1 = 1;
        this.AP_SelectPage2 = 2;
        this.AP_SelectPage3 = 3;
        this.AP_SelectPage4 = 4;
        this.AP_SelectPage5 = 5;


        switch (s) {
          case "id":
            this.AP_ID_Clicked = "color: black";
            this.AP_ID_IsClicked = true;
            this.AP_Nazov_Clicked = 'color: white';
            this.AP_Nazov_IsClicked = false;
            this.AP_Firma_Clicked = 'color: white';
            this.AP_Firma_IsClicked = false;
            this.AP_Od_Clicked = 'color: white';
            this.AP_Od_IsClicked = false;
            this.AP_Do_Clicked = 'color: white';
            this.AP_Do_IsClicked = false;
            this.AP_Mesto_Clicked = 'color: white';
            this.AP_Mesto_IsClicked = false;
            break;
          case "nazov":
            this.AP_ID_Clicked = "color: white";
            this.AP_ID_IsClicked = false;
            this.AP_Nazov_Clicked = 'color: black';
            this.AP_Nazov_IsClicked = true;
            this.AP_Firma_Clicked = 'color: white';
            this.AP_Firma_IsClicked = false;
            this.AP_Od_Clicked = 'color: white';
            this.AP_Od_IsClicked = false;
            this.AP_Do_Clicked = 'color: white';
            this.AP_Do_IsClicked = false;
            this.AP_Mesto_Clicked = 'color: white';
            this.AP_Mesto_IsClicked = false;
            break;
          case "firma":
            this.AP_ID_Clicked = "color: white";
            this.AP_ID_IsClicked = false;
            this.AP_Nazov_Clicked = 'color: white';
            this.AP_Nazov_IsClicked = false;
            this.AP_Firma_Clicked = 'color: black';
            this.AP_Firma_IsClicked = true;
            this.AP_Od_Clicked = 'color: white';
            this.AP_Od_IsClicked = false;
            this.AP_Do_Clicked = 'color: white';
            this.AP_Do_IsClicked = false;
            this.AP_Mesto_Clicked = 'color: white';
            this.AP_Mesto_IsClicked = false;
            break;
          case "od":
            this.AP_ID_Clicked = "color: white";
            this.AP_ID_IsClicked = false;
            this.AP_Nazov_Clicked = 'color: white';
            this.AP_Nazov_IsClicked = false;
            this.AP_Firma_Clicked = 'color: white';
            this.AP_Firma_IsClicked = false;
            this.AP_Od_Clicked = 'color: black';
            this.AP_Od_IsClicked = true;
            this.AP_Do_Clicked = 'color: white';
            this.AP_Do_IsClicked = false;
            this.AP_Mesto_Clicked = 'color: white';
            this.AP_Mesto_IsClicked = false;
            break;
          case "do":
            this.AP_ID_Clicked = "color: white";
            this.AP_ID_IsClicked = false;
            this.AP_Nazov_Clicked = 'color: white';
            this.AP_Nazov_IsClicked = false;
            this.AP_Firma_Clicked = 'color: white';
            this.AP_Firma_IsClicked = false;
            this.AP_Od_Clicked = 'color: white';
            this.AP_Od_IsClicked = false;
            this.AP_Do_Clicked = 'color: black';
            this.AP_Do_IsClicked = true;
            this.AP_Mesto_Clicked = 'color: white';
            this.AP_Mesto_IsClicked = false;
            break;
          case "mesto":
            this.AP_ID_Clicked = "color: white";
            this.AP_ID_IsClicked = false;
            this.AP_Nazov_Clicked = 'color: white';
            this.AP_Nazov_IsClicked = false;
            this.AP_Firma_Clicked = 'color: white';
            this.AP_Firma_IsClicked = false;
            this.AP_Od_Clicked = 'color: white';
            this.AP_Od_IsClicked = false;
            this.AP_Do_Clicked = 'color: white';
            this.AP_Do_IsClicked = false;
            this.AP_Mesto_Clicked = 'color: black';
            this.AP_Mesto_IsClicked = true;
            break;
        }


        //if s == current sort, reverse
        if (s === this.AP_currentSort) {
          this.AP_currentSortDir = this.AP_currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.AP_currentSort = s;
      }
    },
    AP_Change_Header_Color(s){
      if(this.AP_Search=='') {
        switch (s) {
          case "id":
            this.AP_ID_Clicked = "background-color: black";
            break;
          case "nazov":
            this.AP_Nazov_Clicked = "background-color: black";
            break;
          case "firma":
            this.AP_Firma_Clicked = "background-color: black";
            break;
          case "od":
            this.AP_Od_Clicked = "background-color: black";
            break;
          case "do":
            this.AP_Do_Clicked = "background-color: black";
            break;
          case "mesto":
            this.AP_Mesto_Clicked = "background-color: black";
            break;
        }
      }
    },
    AP_Leave_Header(){
      if(this.AP_ID_IsClicked){
        this.AP_ID_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.AP_ID_Clicked="background-color: #1DBECF";
      }
      if(this.AP_Nazov_IsClicked){
        this.AP_Nazov_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.AP_Nazov_Clicked="background-color: #1DBECF";
      }
      if(this.AP_Firma_IsClicked){
        this.AP_Firma_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.AP_Firma_Clicked="background-color: #1DBECF";
      }
      if(this.AP_Od_IsClicked){
        this.AP_Od_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.AP_Od_Clicked="background-color: #1DBECF";
      }
      if(this.AP_Do_IsClicked){
        this.AP_Do_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.AP_Do_Clicked="background-color: #1DBECF";
      }
      if(this.AP_Mesto_IsClicked){
        this.AP_Mesto_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.AP_Mesto_Clicked="background-color: #1DBECF";
      }
    },
    AP_nextPage:function() {
      if((this.AP_currentPage*this.pageSize) < this.AKT_ponuky.length)this.AP_currentPage++;
     if(this.AP_currentPage==2){
       this.AP_SelectPage1_Style='';
       this.AP_SelectPage2_Style='selected_button';
     }
     if(this.AP_currentPage==3){
       this.AP_SelectPage2_Style='';
       this.AP_SelectPage3_Style='selected_button';
     }
     if(this.AP_currentPage>3){
       if((this.AP_SelectPage5*this.pageSize) < this.AKT_ponuky.length) {
         this.AP_SelectPage1++;
         this.AP_SelectPage2++;
         this.AP_SelectPage3++;
         this.AP_SelectPage4++;
         this.AP_SelectPage5++;
       }else{
         if((this.AP_currentPage*this.pageSize) < this.AKT_ponuky.length){
           this.AP_SelectPage3_Style='';
           this.AP_SelectPage4_Style='selected_button';
         }else{
           this.AP_SelectPage4_Style='';
           this.AP_SelectPage5_Style='selected_button';
         }
       }
     }

    },
    AP_prevPage:function() {
      if(this.AP_currentPage > 1) {
      if(this.AP_SelectPage5_Style=='selected_button'){
        this.AP_SelectPage5_Style='';
        this.AP_SelectPage4_Style='selected_button';
      }else {
        if (this.AP_SelectPage4_Style=='selected_button') {
          this.AP_SelectPage4_Style = '';
          this.AP_SelectPage3_Style = 'selected_button';
        }else{
          if(this.AP_currentPage>3) {
            this.AP_SelectPage1--;
            this.AP_SelectPage2--;
            this.AP_SelectPage3--;
            this.AP_SelectPage4--;
            this.AP_SelectPage5--;
          }else{
            if(this.AP_currentPage==3){
              this.AP_SelectPage3_Style='';
              this.AP_SelectPage2_Style='selected_button';
            }else{
              this.AP_SelectPage2_Style='';
              this.AP_SelectPage1_Style='selected_button';
            }
          }
        }
      }
        this.AP_currentPage--;
      }
    },
    AP_selectPage(page){
      if(page>this.AP_currentPage){
        for(var i=this.AP_currentPage;i<page;i++){
           this.AP_nextPage();
        }
      }else{
        var rozdiel=this.AP_currentPage-page;
        for(var i=0;i<rozdiel;i++){
          this.AP_prevPage();
        }
      }
    },
    Search_AP(search){
     for(var i=0;i<this.AKT_ponuky.length;i++){
       if(this.AKT_ponuky[i].nazov.includes(search) || this.AKT_ponuky[i].firma.includes(search) || this.AKT_ponuky[i].od.includes(search) || this.AKT_ponuky[i].do.includes(search) || this.AKT_ponuky[i].mesto.includes(search)){
         this.AKT_ponuky[i].is_visible=true;
       }else
         this.AKT_ponuky[i].is_visible=false;
     }
    },
    Detail(id) {
      ApiRequests.Detail_Ponuka(id);
    },

    //Absolvovane ponuky
    ABS_P_sort:function(s) {
      if(this.ABS_P_Search=='') {
        //Reset NavBar
        this.ABS_P_currentPage = 1;
        this.ABS_P_SelectPage1_Style = 'selected_button';
        this.ABS_P_SelectPage2_Style = '';
        this.ABS_P_SelectPage3_Style = '';
        this.ABS_P_SelectPage4_Style = '';
        this.ABS_P_SelectPage5_Style = '';
        this.ABS_P_SelectPage1 = 1;
        this.ABS_P_SelectPage2 = 2;
        this.ABS_P_SelectPage3 = 3;
        this.ABS_P_SelectPage4 = 4;
        this.ABS_P_SelectPage5 = 5;


        switch (s) {
          case "id":
            this.ABS_P_ID_Clicked = "color: black";
            this.ABS_P_ID_IsClicked = true;
            this.ABS_P_Nazov_Clicked = 'color: white';
            this.ABS_P_Nazov_IsClicked = false;
            this.ABS_P_Firma_Clicked = 'color: white';
            this.ABS_P_Firma_IsClicked = false;
            this.ABS_P_Od_Clicked = 'color: white';
            this.ABS_P_Od_IsClicked = false;
            this.ABS_P_Do_Clicked = 'color: white';
            this.ABS_P_Do_IsClicked = false;
            this.ABS_P_Mesto_Clicked = 'color: white';
            this.ABS_P_Mesto_IsClicked = false;
            break;
          case "nazov":
            this.ABS_P_ID_Clicked = "color: white";
            this.ABS_P_ID_IsClicked = false;
            this.ABS_P_Nazov_Clicked = 'color: black';
            this.ABS_P_Nazov_IsClicked = true;
            this.ABS_P_Firma_Clicked = 'color: white';
            this.ABS_P_Firma_IsClicked = false;
            this.ABS_P_Od_Clicked = 'color: white';
            this.ABS_P_Od_IsClicked = false;
            this.ABS_P_Do_Clicked = 'color: white';
            this.ABS_P_Do_IsClicked = false;
            this.ABS_P_Mesto_Clicked = 'color: white';
            this.ABS_P_Mesto_IsClicked = false;
            break;
          case "firma":
            this.ABS_P_ID_Clicked = "color: white";
            this.ABS_P_ID_IsClicked = false;
            this.ABS_P_Nazov_Clicked = 'color: white';
            this.ABS_P_Nazov_IsClicked = false;
            this.ABS_P_Firma_Clicked = 'color: black';
            this.ABS_P_Firma_IsClicked = true;
            this.ABS_P_Od_Clicked = 'color: white';
            this.ABS_P_Od_IsClicked = false;
            this.ABS_P_Do_Clicked = 'color: white';
            this.ABS_P_Do_IsClicked = false;
            this.ABS_P_Mesto_Clicked = 'color: white';
            this.ABS_P_Mesto_IsClicked = false;
            break;
          case "od":
            this.ABS_P_ID_Clicked = "color: white";
            this.ABS_P_ID_IsClicked = false;
            this.ABS_P_Nazov_Clicked = 'color: white';
            this.ABS_P_Nazov_IsClicked = false;
            this.ABS_P_Firma_Clicked = 'color: white';
            this.ABS_P_Firma_IsClicked = false;
            this.ABS_P_Od_Clicked = 'color: black';
            this.ABS_P_Od_IsClicked = true;
            this.ABS_P_Do_Clicked = 'color: white';
            this.ABS_P_Do_IsClicked = false;
            this.ABS_P_Mesto_Clicked = 'color: white';
            this.ABS_P_Mesto_IsClicked = false;
            break;
          case "do":
            this.ABS_P_ID_Clicked = "color: white";
            this.ABS_P_ID_IsClicked = false;
            this.ABS_P_Nazov_Clicked = 'color: white';
            this.ABS_P_Nazov_IsClicked = false;
            this.ABS_P_Firma_Clicked = 'color: white';
            this.ABS_P_Firma_IsClicked = false;
            this.ABS_P_Od_Clicked = 'color: white';
            this.ABS_P_Od_IsClicked = false;
            this.ABS_P_Do_Clicked = 'color: black';
            this.ABS_P_Do_IsClicked = true;
            this.ABS_P_Mesto_Clicked = 'color: white';
            this.ABS_P_Mesto_IsClicked = false;
            break;
          case "mesto":
            this.ABS_P_ID_Clicked = "color: white";
            this.ABS_P_ID_IsClicked = false;
            this.ABS_P_Nazov_Clicked = 'color: white';
            this.ABS_P_Nazov_IsClicked = false;
            this.ABS_P_Firma_Clicked = 'color: white';
            this.ABS_P_Firma_IsClicked = false;
            this.ABS_P_Od_Clicked = 'color: white';
            this.ABS_P_Od_IsClicked = false;
            this.ABS_P_Do_Clicked = 'color: white';
            this.ABS_P_Do_IsClicked = false;
            this.ABS_P_Mesto_Clicked = 'color: black';
            this.ABS_P_Mesto_IsClicked = true;
            break;
        }


        //if s == current sort, reverse
        if (s === this.ABS_P_currentSort) {
          this.ABS_P_currentSortDir = this.ABS_P_currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.ABS_P_currentSort = s;
      }
    },
    ABS_P_Change_Header_Color(s){
      if(this.ABS_P_Search=='') {
        switch (s) {
          case "id":
            this.ABS_P_ID_Clicked = "background-color: black";
            break;
          case "nazov":
            this.ABS_P_Nazov_Clicked = "background-color: black";
            break;
          case "firma":
            this.ABS_P_Firma_Clicked = "background-color: black";
            break;
          case "od":
            this.ABS_P_Od_Clicked = "background-color: black";
            break;
          case "do":
            this.ABS_P_Do_Clicked = "background-color: black";
            break;
          case "mesto":
            this.ABS_P_Mesto_Clicked = "background-color: black";
            break;
        }
      }
    },
    ABS_P_Leave_Header(){
      if(this.ABS_P_ID_IsClicked){
        this.ABS_P_ID_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.ABS_P_ID_Clicked="background-color: #1DBECF";
      }
      if(this.ABS_P_Nazov_IsClicked){
        this.ABS_P_Nazov_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.ABS_P_Nazov_Clicked="background-color: #1DBECF";
      }
      if(this.ABS_P_Firma_IsClicked){
        this.ABS_P_Firma_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.ABS_P_Firma_Clicked="background-color: #1DBECF";
      }
      if(this.ABS_P_Od_IsClicked){
        this.ABS_P_Od_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.ABS_P_Od_Clicked="background-color: #1DBECF";
      }
      if(this.ABS_P_Do_IsClicked){
        this.ABS_P_Do_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.ABS_P_Do_Clicked="background-color: #1DBECF";
      }
      if(this.ABS_P_Mesto_IsClicked){
        this.ABS_P_Mesto_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.ABS_P_Mesto_Clicked="background-color: #1DBECF";
      }
    },
    ABS_P_nextPage:function() {
      if((this.ABS_P_currentPage*this.pageSize) < this.ABS_ponuky.length)this.AP_currentPage++;
      if(this.ABS_P_currentPage==2){
        this.ABS_P_SelectPage1_Style='';
        this.ABS_P_SelectPage2_Style='selected_button';
      }
      if(this.ABS_P_currentPage==3){
        this.ABS_P_SelectPage2_Style='';
        this.ABS_P_SelectPage3_Style='selected_button';
      }
      if(this.ABS_P_currentPage>3){
        if((this.ABS_P_SelectPage5*this.pageSize) < this.ABS_ponuky.length) {
          this.ABS_P_SelectPage1++;
          this.ABS_P_SelectPage2++;
          this.ABS_P_SelectPage3++;
          this.ABS_P_SelectPage4++;
          this.ABS_P_SelectPage5++;
        }else{
          if((this.ABS_P_currentPage*this.pageSize) < this.ABS_ponuky.length){
            this.ABS_P_SelectPage3_Style='';
            this.ABS_P_SelectPage4_Style='selected_button';
          }else{
            this.ABS_P_SelectPage4_Style='';
            this.ABS_P_SelectPage5_Style='selected_button';
          }
        }
      }

    },
    ABS_P_prevPage:function() {
      if(this.ABS_P_currentPage > 1) {
        if(this.ABS_P_SelectPage5_Style=='selected_button'){
          this.ABS_P_SelectPage5_Style='';
          this.ABS_P_SelectPage4_Style='selected_button';
        }else {
          if (this.ABS_P_SelectPage4_Style=='selected_button') {
            this.ABS_P_SelectPage4_Style = '';
            this.ABS_P_SelectPage3_Style = 'selected_button';
          }else{
            if(this.ABS_P_currentPage>3) {
              this.ABS_P_SelectPage1--;
              this.ABS_P_SelectPage2--;
              this.ABS_P_SelectPage3--;
              this.ABS_P_SelectPage4--;
              this.ABS_P_SelectPage5--;
            }else{
              if(this.ABS_P_currentPage==3){
                this.ABS_P_SelectPage3_Style='';
                this.ABS_P_SelectPage2_Style='selected_button';
              }else{
                this.ABS_P_SelectPage2_Style='';
                this.ABS_P_SelectPage1_Style='selected_button';
              }
            }
          }
        }
        this.ABS_P_currentPage--;
      }
    },
    ABS_P_selectPage(page){
      if(page>this.ABS_P_currentPage){
        for(var i=this.ABS_P_currentPage;i<page;i++){
          this.ABS_P_nextPage();
        }
      }else{
        var rozdiel=this.ABS_P_currentPage-page;
        for(var i=0;i<rozdiel;i++){
          this.ABS_P_prevPage();
        }
      }
    },
    Search_ABS_P(search){
      for(var i=0;i<this.ABS_ponuky.length;i++){
        if(this.ABS_ponuky[i].nazov.includes(search) || this.ABS_ponuky[i].firma.includes(search) || this.ABS_ponuky[i].od.includes(search) || this.ABS_ponuky[i].do.includes(search) || this.AKT_ponuky[i].mesto.includes(search)){
          this.ABS_ponuky[i].is_visible=true;
        }else
          this.ABS_ponuky[i].is_visible=false;
      }
    },

    //Komentare
    Kom_sort:function(s) {
      if(this.Kom_Search=='') {
        //Reset NavBar
        this.Kom_currentPage = 1;
        this.Kom_SelectPage1_Style = 'selected_button';
        this.Kom_SelectPage2_Style = '';
        this.Kom_SelectPage3_Style = '';
        this.Kom_SelectPage4_Style = '';
        this.Kom_SelectPage5_Style = '';
        this.Kom_SelectPage1 = 1;
        this.Kom_SelectPage2 = 2;
        this.Kom_SelectPage3 = 3;
        this.Kom_SelectPage4 = 4;
        this.Kom_SelectPage5 = 5;


        switch (s) {
          case "id":
            this.Kom_ID_Clicked = "color: black";
            this.Kom_ID_IsClicked = true;
            this.Kom_Meno_Clicked = 'color: white';
            this.Kom_Meno_IsClicked = false;
            this.Kom_Priezvisko_Clicked = 'color: white';
            this.Kom_Priezvisko_IsClicked = false;
            this.Kom_Firma_Clicked = 'color: white';
            this.Kom_Firma_IsClicked = false;
            this.Kom_Ponuka_Clicked = 'color: white';
            this.Kom_Ponuka_IsClicked = false;
            this.Kom_Hodnotenie_Clicked = 'color: white';
            this.Kom_Hodnotenie_IsClicked = false;
            this.Kom_Komentar_Clicked = 'color: white';
            this.Kom_Komentar_IsClicked = false;
            break;
          case "meno":
            this.Kom_ID_Clicked = "color: white";
            this.Kom_ID_IsClicked = false;
            this.Kom_Meno_Clicked = "color: black";
            this.Kom_Meno_IsClicked = true;
            this.Kom_Priezvisko_Clicked = 'color: white';
            this.Kom_Priezvisko_IsClicked = false;
            this.Kom_Firma_Clicked = 'color: white';
            this.Kom_Firma_IsClicked = false;
            this.Kom_Ponuka_Clicked = 'color: white';
            this.Kom_Ponuka_IsClicked = false;
            this.Kom_Hodnotenie_Clicked = 'color: white';
            this.Kom_Hodnotenie_IsClicked = false;
            this.Kom_Komentar_Clicked = 'color: white';
            this.Kom_Komentar_IsClicked = false;
            break;
          case "priezvisko":
            this.Kom_ID_Clicked = "color: white";
            this.Kom_ID_IsClicked = false;
            this.Kom_Meno_Clicked = 'color: white';
            this.Kom_Meno_IsClicked = false;
            this.Kom_Priezvisko_Clicked = "color: black";
            this.Kom_Priezvisko_IsClicked = true;
            this.Kom_Firma_Clicked = 'color: white';
            this.Kom_Firma_IsClicked = false;
            this.Kom_Ponuka_Clicked = 'color: white';
            this.Kom_Ponuka_IsClicked = false;
            this.Kom_Hodnotenie_Clicked = 'color: white';
            this.Kom_Hodnotenie_IsClicked = false;
            this.Kom_Komentar_Clicked = 'color: white';
            this.Kom_Komentar_IsClicked = false;
            break;
          case "firma":
            this.Kom_ID_Clicked = "color: white";
            this.Kom_ID_IsClicked = false;
            this.Kom_Meno_Clicked = 'color: white';
            this.Kom_Meno_IsClicked = false;
            this.Kom_Priezvisko_Clicked = 'color: white';
            this.Kom_Priezvisko_IsClicked = false;
            this.Kom_Firma_Clicked = "color: black";
            this.Kom_Firma_IsClicked = true;
            this.Kom_Ponuka_Clicked = 'color: white';
            this.Kom_Ponuka_IsClicked = false;
            this.Kom_Hodnotenie_Clicked = 'color: white';
            this.Kom_Hodnotenie_IsClicked = false;
            this.Kom_Komentar_Clicked = 'color: white';
            this.Kom_Komentar_IsClicked = false;
            break;
          case "ponuka":
            this.Kom_ID_Clicked = "color: white";
            this.Kom_ID_IsClicked = false;
            this.Kom_Meno_Clicked = 'color: white';
            this.Kom_Meno_IsClicked = false;
            this.Kom_Priezvisko_Clicked = 'color: white';
            this.Kom_Priezvisko_IsClicked = false;
            this.Kom_Firma_Clicked = 'color: white';
            this.Kom_Firma_IsClicked = false;
            this.Kom_Ponuka_Clicked = "color: black";
            this.Kom_Ponuka_IsClicked = true;
            this.Kom_Hodnotenie_Clicked = 'color: white';
            this.Kom_Hodnotenie_IsClicked = false;
            this.Kom_Komentar_Clicked = 'color: white';
            this.Kom_Komentar_IsClicked = false;
            break;
          case "hodnotenie":
            this.Kom_ID_Clicked = "color: white";
            this.Kom_ID_IsClicked = false;
            this.Kom_Meno_Clicked = 'color: white';
            this.Kom_Meno_IsClicked = false;
            this.Kom_Priezvisko_Clicked = 'color: white';
            this.Kom_Priezvisko_IsClicked = false;
            this.Kom_Firma_Clicked = 'color: white';
            this.Kom_Firma_IsClicked = false;
            this.Kom_Ponuka_Clicked = 'color: white';
            this.Kom_Ponuka_IsClicked = false;
            this.Kom_Hodnotenie_Clicked = "color: black";
            this.Kom_Hodnotenie_IsClicked = true;
            this.Kom_Komentar_Clicked = 'color: white';
            this.Kom_Komentar_IsClicked = false;
            break;
          case "komentar":
            this.Kom_ID_Clicked = "color: white";
            this.Kom_ID_IsClicked = false;
            this.Kom_Meno_Clicked = 'color: white';
            this.Kom_Meno_IsClicked = false;
            this.Kom_Priezvisko_Clicked = 'color: white';
            this.Kom_Priezvisko_IsClicked = false;
            this.Kom_Firma_Clicked = 'color: white';
            this.Kom_Firma_IsClicked = false;
            this.Kom_Ponuka_Clicked = 'color: white';
            this.Kom_Ponuka_IsClicked = false;
            this.Kom_Hodnotenie_Clicked = 'color: white';
            this.Kom_Hodnotenie_IsClicked = false;
            this.Kom_Komentar_Clicked = "color: black";
            this.Kom_Komentar_IsClicked = true;
            break;
        }


        //if s == current sort, reverse
        if (s === this.Kom_currentSort) {
          this.Kom_currentSortDir = this.Kom_currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.Kom_currentSort = s;
      }
    },
    Kom_Change_Header_Color(s){
      if(this.Kom_Search=='') {
        switch (s) {
          case "id":
            this.Kom_ID_Clicked = "background-color: black";
            break;
          case "meno":
            this.Kom_Meno_Clicked = "background-color: black";
            break;
          case "priezvisko":
            this.Kom_Priezvisko_Clicked = "background-color: black";
            break;
          case "firma":
            this.Kom_Firma_Clicked = "background-color: black";
            break;
          case "ponuka":
            this.Kom_Ponuka_Clicked = "background-color: black";
            break;
          case "hodnotenie":
            this.Kom_Hodnotenie_Clicked = "background-color: black";
            break;
          case "komentar":
            this.Kom_Komentar_Clicked = "background-color: black";
            break;
        }
      }
    },
    Kom_Leave_Header(){
      if(this.Kom_ID_IsClicked){
        this.Kom_ID_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Kom_ID_Clicked="background-color: #1DBECF";
      }
      if(this.Kom_Meno_IsClicked){
        this.Kom_Meno_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Kom_Meno_Clicked="background-color: #1DBECF";
      }
      if(this.Kom_Priezvisko_IsClicked){
        this.Kom_Priezvisko_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Kom_Priezvisko_Clicked="background-color: #1DBECF";
      }
      if(this.Kom_Firma_IsClicked){
        this.Kom_Firma_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Kom_Firma_Clicked="background-color: #1DBECF";
      }
      if(this.Kom_Ponuka_IsClicked){
        this.Kom_Ponuka_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Kom_Ponuka_Clicked="background-color: #1DBECF";
      }
      if(this.Kom_Hodnotenie_IsClicked){
        this.Kom_Hodnotenie_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Kom_Hodnotenie_Clicked="background-color: #1DBECF";
      }
      if(this.Kom_Komentar_IsClicked){
        this.Kom_Komentar_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Kom_Komentar_Clicked="background-color: #1DBECF";
      }
    },
    Kom_nextPage:function() {
      if((this.Kom_currentPage*this.pageSize) < this.komentare.length)this.Kom_currentPage++;
      if(this.Kom_currentPage==2){
        this.Kom_SelectPage1_Style='';
        this.Kom_SelectPage2_Style='selected_button';
      }
      if(this.Kom_currentPage==3){
        this.Kom_SelectPage2_Style='';
        this.Kom_SelectPage3_Style='selected_button';
      }
      if(this.Kom_currentPage>3){
        if((this.Kom_SelectPage5*this.pageSize) < this.komentare.length) {
          this.Kom_SelectPage1++;
          this.Kom_SelectPage2++;
          this.Kom_SelectPage3++;
          this.Kom_SelectPage4++;
          this.Kom_SelectPage5++;
        }else{
          if((this.Kom_currentPage*this.pageSize) < this.komentare.length){
            this.Kom_SelectPage3_Style='';
            this.Kom_SelectPage4_Style='selected_button';
          }else{
            this.Kom_SelectPage4_Style='';
            this.Kom_SelectPage5_Style='selected_button';
          }
        }
      }

    },
    Kom_prevPage:function() {
      if(this.Kom_currentPage > 1) {
        if(this.Kom_SelectPage5_Style=='selected_button'){
          this.Kom_SelectPage5_Style='';
          this.Kom_SelectPage4_Style='selected_button';
        }else {
          if (this.Kom_SelectPage4_Style=='selected_button') {
            this.Kom_SelectPage4_Style = '';
            this.Kom_SelectPage3_Style = 'selected_button';
          }else{
            if(this.Kom_currentPage>3) {
              this.Kom_SelectPage1--;
              this.Kom_SelectPage2--;
              this.Kom_SelectPage3--;
              this.Kom_SelectPage4--;
              this.Kom_SelectPage5--;
            }else{
              if(this.Kom_currentPage==3){
                this.Kom_SelectPage3_Style='';
                this.Kom_SelectPage2_Style='selected_button';
              }else{
                this.Kom_SelectPage2_Style='';
                this.Kom_SelectPage1_Style='selected_button';
              }
            }
          }
        }
        this.Kom_currentPage--;
      }
    },
    Kom_selectPage(page){
      if(page>this.Kom_currentPage){
        for(var i=this.Kom_currentPage;i<page;i++){
          this.Kom_nextPage();
        }
      }else{
        var rozdiel=this.Kom_currentPage-page;
        for(var i=0;i<rozdiel;i++){
          this.Kom_prevPage();
        }
      }
    },
    Search_Kom(search){
      for(var i=0;i<this.komentare.length;i++){
        if(this.komentare[i].meno.includes(search) || this.komentare[i].priezvisko.includes(search) || this.komentare[i].firma.includes(search) || this.komentare[i].ponuka.includes(search) || this.komentare[i].hodnotenie==search || this.komentare[i].komentar.includes(search)){
          this.komentare[i].is_visible=true;
        }else
          this.komentare[i].is_visible=false;
      }
    },

    Potvrdit_Komentar(komentar){
      ApiRequests.Potvrdit_Komentar(komentar);
      ApiRequests.Admin_Get_Zoznam_Ponuk();
    },
    Delete_Komentar(komentar){
      ApiRequests.Delete_Komentar(komentar);
      ApiRequests.Admin_Get_Zoznam_Ponuk();
    },
    Detail_Komentar(komentar){
        let Ponuka=komentar;
        Ponuka.id=Ponuka.ponuka_id;
        ApiRequests.Detail_Ponuka(Ponuka);
    }

  },
  created() {
    ApiRequests.Admin_Get_Zoznam_Ponuk();
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

#nove_ponuky,#absolvovane_ponuky, #Nove_Komentare, #komentare {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#nove_ponuky td, #nove_ponuky th, #absolvovane_ponuky td, #absolvovane_ponuky th, #Nove_Komentare td, #Nove_Komentare th, #komentare td, #komentare th {
  border: 1px solid #ddd;
  padding: 8px;
}

#nove_ponuky tr:nth-child(even), #absolvovane_ponuky tr:nth-child(even), #Nove_Komentare tr:nth-child(even), #komentare tr:nth-child(even){
  background-color: #f2f2f2;
}

#nove_ponuky tr:hover, #absolvovane_ponuky tr:hover, #Nove_Komentare tr:hover, #komentare tr:hover{
  background-color: #ddd;
}


#nove_ponuky th, #absolvovane_ponuky th, #Nove_Komentare th, #komentare th {
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


</style>
