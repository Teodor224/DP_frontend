<template>
  <div>
    <div class="Basic_Grey">
      <h1>Pridanie novej ponuky</h1>
      <div class="formular">
        <div class="field">
          <p class="required">Názov</p>
          <input type="text" name="email" v-model="ponuka.nazov">
        </div>
        <div class="field">
          <p class="required" style="vertical-align: top">Informácie</p>
          <textarea v-model="ponuka.info" @input="resize($event)"></textarea>
        </div>
        <div class="field">
          <p class="required">Ponuka platná od</p>
          <input type="date" name="od" v-model="ponuka.od">
        </div>
        <div class="field">
          <p class="required">Ponuka platná do</p>
          <input type="date" name="do" v-model="ponuka.do">
        </div>
        <div class="field">
          <p class="required">Krajina</p>
          <select style="float: left" v-model="ponuka.krajina_id" @change="KrajinaChange()">
            <option disabled selected value> -- Vyberte z možností --</option>
            <option v-for="k in krajiny" :key="k.id" :value=k.id>{{ k.nazov }}</option>
          </select>
        </div>
        <div class="field" v-if="ponuka.krajina_id!=''">
          <p class="required">Kraj</p>
          <select style="float: left" v-model="ponuka.kraj_id">
            <option disabled selected value> -- Vyberte z možností --</option>
            <option v-for="k in kraj" :key="k.id"  :value=k.id>{{ k.nazov }}</option>
          </select>
        </div>
        <div class="field">
          <p class="required">Mesto</p>
          <input type="text" name="mesto" v-model="ponuka.mesto">
        </div>
        <div class="field">
          <p class="required">Mzda €/hodinu (Netto)</p>
          <input type="number" name="mzda" v-model="ponuka.mzda">
        </div>
        <div class="field">
          <p class="required">Obor</p>
          <select style="float: left" v-model="ponuka.obor" @change="OborChange()">
            <option disabled selected value> -- Vyberte z možností --</option>
            <option v-for="p in programy" :key="p.id" :value=p.id>{{ p.nazov }}</option>
          </select>
        </div>
        <div class="field" v-if="ponuka.obor!=''">
          <p class="required">Zameranie</p>
          <select style="float: left" v-model="ponuka.zameranie">
            <option disabled selected value> -- Vyberte z možností --</option>
            <option v-for="z in zameranie" :key="z.id"  :value=z.id>{{ z.nazov }}</option>
          </select>
        </div>
        <div class="error" v-if="required">
          <p>Vyplňte prosím všetky povinné polia.</p>
        </div>
      </div>
        <div class="field" style="padding-top: 40px">
          <button type="submit" @click="zrusit(org)">Zrušiť</button>
          <button type="submit" @click="add_ponuka">Vytvoriť Ponuku</button>
        </div>
    </div>
  </div>
</template>


<script>
import ApiRequests from '@/ApiRequests';
import {mapGetters} from "vuex";

export default {
  name: 'add_ponuka',
  computed: {
    ...mapGetters({
      org: 'GET_FIRMA',
      krajiny: 'GET_KRAJINY',
      kraje: 'GET_KRAJ',
      programy: 'GET_PROGRAMY',
      zamerania: 'GET_ZAMERANIA',
    })
  },
  data() {
    return {
      ponuka: {
        nazov: '',
        info: '',
        od: '',
        do: '',
        krajina_id:'',
        kraj_id:'',
        mzda: '',
        mesto: '',
        obor: '',
        zameranie: ''
      },
      kraj:[],
      zameranie:[],
      required:'',
    }
  },
  methods: {
    add_ponuka() {
      if(this.ponuka.nazov=='' || this.ponuka.info=='' || this.ponuka.od=='' || this.ponuka.do=='' || this.ponuka.krajina_id=='' || this.ponuka.kraj_id=='' ||
        this.ponuka.mzda=='' || this.ponuka.mesto=='' || this.ponuka.obor=='' || this.ponuka.zameranie==''){
        this.required=true;
      }else {
        ApiRequests.Add_Ponuka(this.ponuka, this.org)
      }
    },
    resize(e) {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`
    },
    KrajinaChange(){
      this.kraj=[];
      for (let i = 0; i < this.kraje.length; i++){
        if(this.kraje[i].krajina_id == this.ponuka.krajina_id){
          this.kraj.push(this.kraje[i]);
        }
      }
    },
    OborChange(){
      this.zameranie=[];
      for (let i = 0; i < this.zamerania.length; i++){
        if(this.zamerania[i].studentske_programy_id == this.ponuka.obor){
          this.zameranie.push(this.zamerania[i]);
        }
      }
    },
    zrusit(cred){
      this.$router.go(-1);
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
  padding-bottom: 2%;
}

.formular {
  text-align: left;
  padding-left: 30%;
  padding-right: 30%;
}


h1 {
  margin-top: 2% !important;
  padding-bottom: 2%;
}

h3 {
  margin-top: 2% !important;
  margin-bottom: 2% !important;
}

.field {
  margin-top: 5px !important;

}

textarea {
  font-family: sans-serif;
  font-size: medium;
  padding-bottom: 5%;
  width: 100%;
  resize: none;
  box-sizing: border-box;
}

input {
  width: 99%;
}


select {
  width: 100%;
  height: 30px;
}

.required:after {
  content: " *";
  color: red;
}


</style>
