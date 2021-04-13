<template>
  <div>
    <div class="Basic_Grey">
      <div class="table"v-if="this.Pocet_Firiem>0">
        <div class="search">
          <h1 style="float: left">Zoznam Firiem</h1>
          <input type="text" name="search" placeholder="Hladať" v-model="Firmy_Search" v-on:input="Search_Firmy(Firmy_Search)">
        </div>
        <table id="firmy">
          <tr>
            <th @click="Firmy_sort('id')" :style="this.Firmy_ID_Clicked" v-on:mouseenter="Firmy_Change_Header_Color('id')" v-on:mouseleave="Firmy_Leave_Header">ID</th>
            <th @click="Firmy_sort('nazov')" :style="this.Firmy_Nazov_Clicked" v-on:mouseenter="Firmy_Change_Header_Color('nazov')" v-on:mouseleave="Firmy_Leave_Header">Nazov</th>
            <th @click="Firmy_sort('email')" :style="this.Firmy_Email_Clicked" v-on:mouseenter="Firmy_Change_Header_Color('email')" v-on:mouseleave="Firmy_Leave_Header">Email</th>
            <th @click="Firmy_sort('krajina')" :style="this.Firmy_Krajina_Clicked" v-on:mouseenter="Firmy_Change_Header_Color('krajina')" v-on:mouseleave="Firmy_Leave_Header">Krajina</th>
            <th @click="Firmy_sort('mesto')" :style="this.Firmy_Mesto_Clicked" v-on:mouseenter="Firmy_Change_Header_Color('mesto')" v-on:mouseleave="Firmy_Leave_Header">Mesto</th>
            <th>CRUD Operacie</th>
          </tr>
          <tbody v-if="Firmy_Search==''">
          <tr  v-for="f in firmy_sorted" :key="f.id" v-if="f.je_schvalena">
            <td>{{f.id}}</td>
            <td>{{ f.nazov }}</td>
            <td>{{ f.email }}</td>
            <td>{{f.krajina}}</td>
            <td >{{f.mesto}}</td>
            <td>
              <img src="../../assets/icons/view.png" class="crud" @click="Firma_Profil(f)">
              <img src="../../assets/icons/delete.png" class="crud" @click="Delete_Firma(f)">
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr  v-for="f in firmy" :key="f.id" v-if="f.je_schvalena && f.is_visible">
            <td>{{f.id}}</td>
            <td>{{ f.nazov }}</td>
            <td>{{ f.email }}</td>
            <td>{{f.krajina}}</td>
            <td >{{f.mesto}}</td>
            <td>
              <img src="../../assets/icons/view.png" class="crud" @click="Firma_Profil(f)">
              <img src="../../assets/icons/delete.png" class="crud" @click="Delete_Firma(f)">
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="this.Firmy_Search==''">
          <button @click="Firmy_prevPage" v-if="this.Firmy_currentPage>1">Predchádzajúce</button>
          <button @click="Firmy_selectPage(Firmy_SelectPage1)" :class="Firmy_SelectPage1_Style" v-if="this.firmy.length>10">{{Firmy_SelectPage1}}</button>
          <button @click="Firmy_selectPage(Firmy_SelectPage2)" :class="Firmy_SelectPage2_Style" v-if="this.firmy.length>10">{{Firmy_SelectPage2}}</button>
          <button @click="Firmy_selectPage(Firmy_SelectPage3)" :class="Firmy_SelectPage3_Style" v-if="this.firmy.length>20">{{Firmy_SelectPage3}}</button>
          <button @click="Firmy_selectPage(Firmy_SelectPage4)" :class="Firmy_SelectPage4_Style" v-if="this.firmy.length>30">{{Firmy_SelectPage4}}</button>
          <button @click="Firmy_selectPage(Firmy_SelectPage5)" :class="Firmy_SelectPage5_Style" v-if="this.firmy.length>40">{{Firmy_SelectPage5}}</button>
          <button @click="Firmy_nextPage"v-if="(this.Firmy_currentPage*this.pageSize) < this.firmy.length">Ďalšie</button>
        </div>
      </div>
      <div v-else>
        <H1>Zoznam Firiem je prázdny</H1>
      </div>
      <div class="table"v-if="Pocet_Novych_Firiem>0">
        <div class="search">
          <h1 style="float: left">Zoznam Nových Firiem</h1>
        </div>
        <table id="nove_firmy">
          <tr>
            <th>ID</th>
            <th>Nazov</th>
            <th>Email</th>
            <th>Krajina</th>
            <th>Mesto</th>
            <th>CRUD Operacie</th>
          </tr>
          <tbody>
          <tr  v-for="f in firmy" :key="f.id" v-if="f.je_schvalena==false">
            <td>{{f.id}}</td>
            <td>{{ f.nazov }}</td>
            <td>{{ f.email }}</td>
            <td>{{f.krajina}}</td>
            <td >{{f.mesto}}</td>
            <td>
              <img src="../../assets/icons/accept.png" class="crud" @click="Accept_Firma(f)">
              <img src="../../assets/icons/delete.png" class="crud" @click="Delete_Firma(f)">
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <h1>Žiadne nové registrácie</h1>
      </div>
    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import ApiRequests from '@/ApiRequests';

export default {
  name: 'Sprava_Firiem',
  computed: {
    ...mapGetters({
      firmy:'GET_ZOZNAM_FIRIEM',
    }),
    firmy_sorted:function() {
      if(this.firmy.length>0) {
        return this.firmy.sort((a,b) => {
          let modifier = 1;
          if(this.Firmy_currentSortDir === 'desc') modifier = -1;
          if(a[this.Firmy_currentSort] < b[this.Firmy_currentSort]) return -1 * modifier;
          if(a[this.Firmy_currentSort] > b[this.Firmy_currentSort]) return 1 * modifier;
        }).filter((row, index) => {
          let start = (this.Firmy_currentPage-1)*this.pageSize;
          let end = this.Firmy_currentPage*this.pageSize;
          if(index >= start && index < end) return true;
        });
      }
    },
  },
  data(){
    return{
      Pocet_Novych_Firiem:0,
      Pocet_Firiem:0,
      pageSize:10,

      Firmy_Search:'',
      Firmy_currentSort: 'id',
      Firmy_currentSortDir: 'asc',
      Firmy_ID_Clicked:'color: white',
      Firmy_Nazov_Clicked:'color: white',
      Firmy_Email_Clicked:'color: white',
      Firmy_Krajina_Clicked:'color: white',
      Firmy_Mesto_Clicked:'color: white',
      Firmy_ID_IsClicked:false,
      Firmy_Nazov_IsClicked:false,
      Firmy_Email_IsClicked:false,
      Firmy_Krajina_IsClicked:false,
      Firmy_Mesto_IsClicked:false,
      Firmy_currentPage:1,
      Firmy_SelectPage1:1,
      Firmy_SelectPage2:2,
      Firmy_SelectPage3:3,
      Firmy_SelectPage4:4,
      Firmy_SelectPage5:5,
      Firmy_SelectPage1_Style:'selected_button',
      Firmy_SelectPage2_Style:'',
      Firmy_SelectPage3_Style:'',
      Firmy_SelectPage4_Style:'',
      Firmy_SelectPage5_Style:'',
    }
  },
  methods:{
    Firmy_sort:function(s) {
      if(this.Firmy_Search=='') {
        //Reset NavBar
        this.Firmy_currentPage = 1;
        this.Firmy_SelectPage1_Style = 'selected_button';
        this.Firmy_SelectPage2_Style = '';
        this.Firmy_SelectPage3_Style = '';
        this.Firmy_SelectPage4_Style = '';
        this.Firmy_SelectPage5_Style = '';
        this.Firmy_SelectPage1 = 1;
        this.Firmy_SelectPage2 = 2;
        this.Firmy_SelectPage3 = 3;
        this.Firmy_SelectPage4 = 4;
        this.Firmy_SelectPage5 = 5;

        switch (s) {
          case "id":
            this.Firmy_ID_Clicked = "color: black";
            this.Firmy_ID_IsClicked = true;
            this.Firmy_Nazov_Clicked = 'color: white';
            this.Firmy_Nazov_IsClicked = false;
            this.Firmy_Email_Clicked = 'color: white';
            this.Firmy_Email_IsClicked = false;
            this.Firmy_Krajina_Clicked = 'color: white';
            this.Firmy_Krajina_IsClicked = false;
            this.Firmy_Mesto_Clicked = 'color: white';
            this.Firmy_Mesto_IsClicked = false;
            break;
          case "nazov":
            this.Firmy_ID_Clicked = 'color: white';
            this.Firmy_ID_IsClicked = false;
            this.Firmy_Nazov_Clicked = "color: black";
            this.Firmy_Nazov_IsClicked = true;
            this.Firmy_Email_Clicked = 'color: white';
            this.Firmy_Email_IsClicked = false;
            this.Firmy_Krajina_Clicked = 'color: white';
            this.Firmy_Krajina_IsClicked = false;
            this.Firmy_Mesto_Clicked = 'color: white';
            this.Firmy_Mesto_IsClicked = false;
            break;
          case "email":
            this.Firmy_ID_Clicked = 'color: white';
            this.Firmy_ID_IsClicked = false;
            this.Firmy_Nazov_Clicked = 'color: white';
            this.Firmy_Nazov_IsClicked = false;
            this.Firmy_Email_Clicked = "color: black";
            this.Firmy_Email_IsClicked = true;
            this.Firmy_Krajina_Clicked = 'color: white';
            this.Firmy_Krajina_IsClicked = false;
            this.Firmy_Mesto_Clicked = 'color: white';
            this.Firmy_Mesto_IsClicked = false;
            break;
          case "krajina":
            this.Firmy_ID_Clicked = 'color: white';
            this.Firmy_ID_IsClicked = false;
            this.Firmy_Nazov_Clicked = 'color: white';
            this.Firmy_Nazov_IsClicked = false;
            this.Firmy_Email_Clicked = 'color: white';
            this.Firmy_Email_IsClicked = false;
            this.Firmy_Krajina_Clicked = "color: black";
            this.Firmy_Krajina_IsClicked = true;
            this.Firmy_Mesto_Clicked = 'color: white';
            this.Firmy_Mesto_IsClicked = false;
            break;
          case "mesto":
            this.Firmy_ID_Clicked = 'color: white';
            this.Firmy_ID_IsClicked = false;
            this.Firmy_Nazov_Clicked = 'color: white';
            this.Firmy_Nazov_IsClicked = false;
            this.Firmy_Email_Clicked = 'color: white';
            this.Firmy_Email_IsClicked = false;
            this.Firmy_Krajina_Clicked = 'color: white';
            this.Firmy_Krajina_IsClicked = false;
            this.Firmy_Mesto_Clicked = "color: black";
            this.Firmy_Mesto_IsClicked = true;
            break;

        }
        //if s == current sort, reverse
        if (s === this.Firmy_currentSort) {
          this.Firmy_currentSortDir = this.Firmy_currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.Firmy_currentSort = s;
      }
    },
    Search_Firmy(search){
      for(var i=0;i<this.firmy.length;i++){
        if(this.firmy[i].nazov.includes(search) || this.firmy[i].email.includes(search) || this.firmy[i].krajina.includes(search) || this.firmy[i].mesto.includes(search)){
          this.firmy[i].is_visible=true;
        }else {
            this.firmy[i].is_visible = false;
        }
      }
    },
    Firmy_Change_Header_Color(s){
      if(this.Firmy_Search=='') {
        switch (s) {
          case "id":
            this.Firmy_ID_Clicked = "background-color: black";
            break;
          case "nazov":
            this.Firmy_Nazov_Clicked = "background-color: black";
            break;
          case "email":
            this.Firmy_Email_Clicked = "background-color: black";
            break;
          case "krajina":
            this.Firmy_Krajina_Clicked = "background-color: black";
            break;
          case "mesto":
            this.Firmy_Mesto_Clicked = "background-color: black";
            break;
        }
      }
    },
    Firmy_Leave_Header(){
      if(this.Firmy_ID_IsClicked){
        this.Firmy_ID_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Firmy_ID_Clicked="background-color: #1DBECF";
      }

      if(this.Firmy_Nazov_IsClicked){
        this.Firmy_Nazov_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Firmy_Nazov_Clicked="background-color: #1DBECF";
      }

      if(this.Firmy_Email_IsClicked){
        this.Firmy_Email_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Firmy_Email_Clicked="background-color: #1DBECF";
      }

      if(this.Firmy_Krajina_IsClicked){
        this.Firmy_Krajina_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Firmy_Krajina_Clicked="background-color: #1DBECF";
      }

      if(this.Firmy_Mesto_IsClicked){
        this.Firmy_Mesto_Clicked="color: black;background-color: #1DBECF";
      }else{
        this.Firmy_Mesto_Clicked="background-color: #1DBECF";
      }

    },
    Firmy_nextPage:function() {
      if((this.Firmy_currentPage*this.pageSize) < this.firmy.length)this.Firmy_currentPage++;
      if(this.Firmy_currentPage==2){
        this.Firmy_SelectPage1_Style='';
        this.Firmy_SelectPage2_Style='selected_button';
      }
      if(this.Firmy_currentPage==3){
        this.Firmy_SelectPage2_Style='';
        this.Firmy_SelectPage3_Style='selected_button';
      }
      if(this.Firmy_currentPage>3){
        if((this.Firmy_SelectPage5*this.pageSize) < this.firmy.length) {
          this.Firmy_SelectPage1++;
          this.Firmy_SelectPage2++;
          this.Firmy_SelectPage3++;
          this.Firmy_SelectPage4++;
          this.Firmy_SelectPage5++;
        }else{
          if((this.Firmy_currentPage*this.pageSize) < this.firmy.length){
            this.Firmy_SelectPage3_Style='';
            this.Firmy_SelectPage4_Style='selected_button';
          }else{
            this.Firmy_SelectPage4_Style='';
            this.Firmy_SelectPage5_Style='selected_button';
          }
        }
      }

    },
    Firmy_prevPage:function() {
      if(this.Firmy_currentPage > 1) {
        if(this.Firmy_SelectPage5_Style=='selected_button'){
          this.Firmy_SelectPage5_Style='';
          this.Firmy_SelectPage4_Style='selected_button';
        }else {
          if (this.Firmy_SelectPage4_Style=='selected_button') {
            this.Firmy_SelectPage4_Style = '';
            this.Firmy_SelectPage3_Style = 'selected_button';
          }else{
            if(this.Firmy_currentPage>3) {
              this.Firmy_SelectPage1--;
              this.Firmy_SelectPage2--;
              this.Firmy_SelectPage3--;
              this.Firmy_SelectPage4--;
              this.Firmy_SelectPage5--;
            }else{
              if(this.Firmy_currentPage==3){
                this.Firmy_SelectPage3_Style='';
                this.Firmy_SelectPage2_Style='selected_button';
              }else{
                this.Firmy_SelectPage2_Style='';
                this.Firmy_SelectPage1_Style='selected_button';
              }
            }
          }
        }
        this.Firmy_currentPage--;
      }
    },
    Firmy_selectPage(page){
      if(page>this.Firmy_currentPage){
        for(var i=this.Firmy_currentPage;i<page;i++){
          this.Firmy_nextPage();
        }
      }else{
        var rozdiel=this.Firmy_currentPage-page;
        for(var i=0;i<rozdiel;i++){
          this.Firmy_prevPage();
        }
      }
    },
    Firma_Profil(cred) {
      ApiRequests.Firma_Profil(cred);
    },
    Delete_Firma(cred){
      ApiRequests.Admin_Delete_Firma(cred);
      if(cred.je_schvalena){
        this.Pocet_Firiem--;
      }else{
        this.Pocet_Novych_Firiem--;
      }
      for(var i=0;i<this.firmy.length;i++){
      if(cred.id==this.firmy[i].id){
        this.firmy.splice(i,1);
      }
      }
    },
    Accept_Firma(Firma){
      ApiRequests.Admin_Accept_Firma(Firma);
        this.Pocet_Firiem++;
        Firma.je_schvalena=true;
        this.Pocet_Novych_Firiem--;
    }
  },
  watch: {
    firmy: function () {
      this.Pocet_Novych_Firiem=0;
      this.Pocet_Firiem=0;
      for(var i=0;i<this.firmy.length;i++){
        if(this.firmy[i].je_schvalena){
          this.Pocet_Firiem++;
        }else{
          this.Pocet_Novych_Firiem++;
        }
      }
    },
  },
  created() {
    ApiRequests.Admin_Get_Zoznam_Firiem();
  },
  mounted() {
    this.Pocet_Novych_Firiem=0;
    this.Pocet_Firiem=0;
    for(var i=0;i<this.firmy.length;i++){
      if(this.firmy[i].je_schvalena){
        this.Pocet_Firiem++;
      }else{
        this.Pocet_Novych_Firiem++;
      }
    }
  }
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
  padding-bottom: 2%;
}


h1 {
  padding-bottom: 2%;
  padding-top: 2%;
}

.table {
  padding: 2%;
}

#firmy, #nove_firmy {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#firmy td, #firmy th, #nove_firmy td, #nove_firmy th {
  border: 1px solid #ddd;
  padding: 8px;
}

#firmy tr:nth-child(even), #nove_firmy tr:nth-child(even){
  background-color: #f2f2f2;
}

#firmy tr:hover, #nove_firmy tr:hover{
  background-color: #ddd;
}


#firmy th, #nove_firmy th {
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
