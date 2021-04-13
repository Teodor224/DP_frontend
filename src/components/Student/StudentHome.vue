<template>
  <div>
    <div class="Basic_Grey">
      <div class="Filter">
        <div class="Filter_Param">
          <label>Obor</label>
          <select v-model="Hladat.obor" @change="OborChange()">
            <option disabled selected value> -- Vyberte z možností --</option>
            <option v-for="o in obory" :key="o.id" :value=o.id>{{ o.nazov }}</option>
          </select>
        </div>
        <div class="Filter_Param" v-if="Hladat.obor!=''">
          <label>Zameranie</label>
          <select v-model="Hladat.zameranie">
            <option disabled selected value> -- Vyberte z možností --</option>
            <option v-for="z in zameranie_sorted" :key="z.id" :value=z.id>{{ z.nazov }}</option>
          </select>
        </div>
        <div class="Filter_Param">
          <label>Krajina</label>
          <select v-model="Hladat.krajina" @change="KrajinaChange()">
            <option disabled selected value> -- Vyberte z možností --</option>
            <option v-for="k in krajiny" :key="k.id" :value=k.id>{{ k.nazov }}</option>
          </select>
        </div>
        <div class="Filter_Param" v-if="Hladat.krajina!=''">
          <label>Kraj</label>
          <select v-model="Hladat.kraj">
            <option disabled selected value> -- Vyberte z možností --</option>
            <option v-for="k in kraj_sorted" :key="k.id" :value=k.id>{{ k.nazov }}</option>
          </select>
        </div>
      </div>
        <div class="Filter_Button">
          <button type="submit" @click="Reset_Filter" v-if="this.reset_filter">Reset</button>
          <button type="submit" @click="Filtrovat">Filtrovať</button>
        </div>
    </div>
    <div class="ponuky">
      <div class="ponuka" v-for="p in ponuky" :key="p.id" @click="Detail(p)" v-if="p.is_visible">
        <div class="left">
          <img :src="getFile(p.firma_image)">
        </div>
        <div class="right">
          <h2>{{ p.nazov }}</h2>
          <h4>{{ p.firma }}</h4>
          <h4>{{ p.mesto }}</h4>
          <h2>Od {{ p.mzda }}€ mesačne</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiRequests from '@/ApiRequests';
import {mapGetters} from "vuex";

export default {
  name: 'StudentHome',
  data() {
    return {
      Hladat: {
        obor: '',
        zameranie: '',
        krajina: '',
        kraj: '',
      },
      zameranie_sorted: [],
      kraj_sorted: [],
      reset_filter:false,
    }
  },
  computed: {
    ...mapGetters({
      ponuky: 'GET_PONUKA',
      obory: 'GET_PROGRAMY',
      zamerania: 'GET_ZAMERANIA',
      krajiny: 'GET_KRAJINY',
      kraje: 'GET_KRAJ'
    }),
  },
  methods: {
    Detail(id) {
      ApiRequests.Detail_Ponuka(id);
    },
    getFile(image) {
      try {
        return require("../../../../backend/storage/firma/" + image);
      } catch (e) {
        return require("../../assets/user.png");
      }
    },
    OborChange() {
      this.zameranie_sorted = [];
      for (let i = 0; i < this.zamerania.length; i++) {
        if (this.zamerania[i].studentske_programy_id == this.Hladat.obor) {
          this.zameranie_sorted.push(this.zamerania[i]);
        }
      }
    },
    KrajinaChange() {
      this.kraj_sorted = [];
      for (let i = 0; i < this.kraje.length; i++) {
        if (this.kraje[i].krajina_id == this.Hladat.krajina) {
          this.kraj_sorted.push(this.kraje[i]);
        }
      }
    },
    Filtrovat(){
      for(let i=0;i<this.ponuky.length;i++){
        this.ponuky[i].is_visible=true;
        if(this.Hladat.obor!=''){
          if(this.ponuky[i].obor_id!=this.Hladat.obor){
            this.ponuky[i].is_visible=false;
            this.reset_filter=true;
          }
        }

        if(this.Hladat.zameranie!=''){
          if(this.ponuky[i].zameranie_id!=this.Hladat.zameranie){
            this.ponuky[i].is_visible=false;
            this.reset_filter=true;
          }
        }

        if(this.Hladat.krajina!=''){
          if(this.ponuky[i].krajina_id!=this.Hladat.krajina){
            this.ponuky[i].is_visible=false;
            this.reset_filter=true;
          }
        }

        if(this.Hladat.kraj!=''){
          if(this.ponuky[i].kraj_id!=this.Hladat.kraj){
            this.ponuky[i].is_visible=false;
            this.reset_filter=true;
          }
        }

      }
    },
    Reset_Filter(){
      this.reset_filter=false;
      this.Hladat.zameranie='';
      this.Hladat.obor='';
      this.Hladat.krajina='';
      this.Hladat.kraj='';
      for(let i=0;i<this.ponuky.length;i++) {
        this.ponuky[i].is_visible = true;
      }
    }
  },
  created() {
    ApiRequests.ShowPonuky()
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

.Filter {
  padding-top: 3%;
  text-align: right;
  padding-right: 30%;
}

.Filter_Param {
  padding-bottom: 2%;
}

.Filter_Button{
  padding-bottom: 3%;
  text-align: center;
}

select {
  height: 30px;
  width: 50%;
  margin-right: 2% !important;
  text-align: center;
  text-align-last: center;
}

.ponuky {
  display: flex;
  flex-wrap: wrap;
  padding-top: 5%;
  padding-bottom: 5%;
}

.ponuka {
  border: #1DBECF solid;
  flex-grow: 1;
  width: 30%;
  display: flex;
  margin: 1% !important;

}

.left {
  padding-top: 2%;
  flex: 1;
}

.right {
  padding-top: 2%;
  flex: 1;
}


h3 {
  color: black;
  padding-bottom: 5%;
}

h2 {
  color: #1DBECF;
  padding-bottom: 10%;
}

h4 {
  padding-bottom: 2%;
}

img {
  width: 100px;
  height: 100px;
}


</style>
