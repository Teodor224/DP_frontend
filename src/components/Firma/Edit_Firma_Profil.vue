<template>
  <div>
    <div class="Basic_Grey">
      <div class="left">
        <div>
          <h2>Profilová Fotka</h2>
          <br/>
          <input type="file" id="image" ref="image" v-on:change="handleImageLoad()"/>
        </div>
        <div style="padding-top: 30%">
          <h2>Prezentácia</h2>
          <br/>
          <input type="file" id="pp" ref="pp" v-on:change="handlePPLoad()"/>
        </div>
      </div>
      <div class="right">
        <div class="Basic">
          <h1>{{ org.nazov }}</h1>
        </div>
        <div class="Basic">
          <div class="field">
            <h3 class="H3left">ICO:</h3>
            <input type="text" name="ico" v-model="org.ico">
          </div>
          <div class="field" style="padding-bottom: 30px">
            <h3 class="H3left" >Krajina:</h3>
            <div style="float: right">
              <select style="float: left" v-model="org.krajina_id" @change="KrajinaChange()">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option v-for="k in krajiny" :key="k.id" :value=k.id>{{ k.nazov }}</option>
              </select>
            </div>
          </div>
          <div class="field"style="padding-bottom: 30px">
            <h3 class="H3left">Kraj:</h3>
            <div style="float: right">
              <select style="float: left" v-model="org.kraj_id">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option v-for="k in kraj" :key="k.id"  :value=k.id>{{ k.nazov }}</option>
              </select>
            </div>
          </div>
          <div class="field">
            <h3 class="H3left">Mesto:</h3>
            <input type="text" name="mesto" v-model="org.mesto">
          </div>
          <div class="field">
            <h3 class="H3left">PSČ:</h3>
            <input type="text" name="psc" v-model="org.psc">
          </div>
          <div class="field">
            <h3 class="H3left">Ulica:</h3>
            <input type="text" name="ulica" v-model="org.ulica">
          </div>
        </div>
        <div class="Basic">
          <div class="field">
            <h3 class="H3left">Webová stránka:</h3>
            <input type="text" name="web" v-model="org.web">
          </div>
          <div class="field">
            <h3 class="H3left">Email:</h3>
            <input type="text" name="email" v-model="org.email">
          </div>
          <div class="field">
            <h3 class="H3left">Telefónne číslo:</h3>
            <input type="text" name="tel" v-model="org.tel">
          </div>
        </div>
        <div class="Basic">
          <div class="field">
            <h2 class="text_Middle">Kontaktná Osoba</h2>
          </div>
          <div class="field">
            <h3 class="H3left">Meno:</h3>
            <input type="text" name="email" v-model="Cont_Osoba.meno">
          </div>
          <div class="field">
            <h3 class="H3left">Priezvisko:</h3>
            <input type="text" name="email" v-model="Cont_Osoba.priezvisko">
          </div>
          <div class="field">
            <h3 class="H3left">Telefónne číslo:</h3>
            <input type="text" name="email" v-model="Cont_Osoba.tel">
          </div>
          <div class="field">
            <h3 class="H3left">Email:</h3>
            <input type="text" name="email" v-model="Cont_Osoba.email">
          </div>
        </div>
        <div class="Basic" style="border: none">
          <div class="field">
            <textarea v-model="org.informacie" cols="50" rows="10" @input="resize($event)"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="button">
      <button v-on:click="submit()">Uložiť</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ApiRequests from '@/ApiRequests';


export default {
  name: 'Edit_Firma_Profil',
  computed: {
    ...mapGetters({
      org: 'GET_FIRMA',
      krajiny: 'GET_KRAJINY',
      kraje:'GET_KRAJ',
      Cont_Osoba:'GET_CONT_OSOBA'
    })
  },
  methods: {
    submit() {
      let formData = new FormData();
      formData.append('image', this.image);
      formData.append("userid", this.org.id);
      formData.append('pp', this.pp);
      formData.append('email', this.org.email);
      formData.append('ico', this.org.ico);
      formData.append('info', this.org.informacie);
      formData.append('krajina', this.org.krajina_id);
      formData.append('kraj', this.org.kraj_id);
      formData.append('mesto', this.org.mesto);
      formData.append('psc', this.org.psc);
      formData.append('mesto', this.org.mesto);
      formData.append('ulica', this.org.ulica);
      formData.append('tel', this.org.tel);
      formData.append('web', this.org.web);
      formData.append('CO_meno', this.Cont_Osoba.meno);
      formData.append('CO_priezvisko', this.Cont_Osoba.priezvisko);
      formData.append('CO_tel', this.Cont_Osoba.tel);
      formData.append('CO_email', this.Cont_Osoba.email);

        ApiRequests.Update_Firma_Profil(formData);
    },
    handleImageLoad() {
      this.image = this.$refs.image.files[0];
    },
    handlePPLoad() {
      this.pp = this.$refs.pp.files[0];
    },
    resize(e) {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`
    },
    KrajinaChange(){
      this.kraj=[];
      for (let i = 0; i < this.kraje.length; i++){
        if(this.kraje[i].krajina_id == this.org.krajina_id){
          this.kraj.push(this.kraje[i]);
        }
      }
    },
  },
  data() {
    return {
      image: '',
      pp: '',
      kraj:[],
    }

  },
  created() {
    ApiRequests.Edit_Firma_Profil();
    for (let i = 0; i < this.kraje.length; i++){
      if(this.kraje[i].krajina_id == this.org.krajina_id){
        this.kraj.push(this.kraje[i]);
      }
    };
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.Basic_Grey {
  border-top: #1DBECF solid;
  text-align: center;
  display: flex;
  background-color: #F4F4F4;
}


h1 {
  color: black;
}

h3 {
  color: black;
}

img {
  width: 50%;
  height: 50%;
}

.left {
  padding-top: 8%;
  flex: 1;
  color: #1DBECF;
}

.right {
  flex: 1;
  padding-top: 5%;
}

.Basic {
  padding-bottom: 5%;
  padding-top: 2%;
  border-bottom: #1DBECF solid;
  margin-right: 5% !important;
  margin-left: 5% !important;
}

.field {
  margin-top: 5px !important;
  text-align: right;

}

.H3left {
  color: #1DBECF;
  float: left;
}

.middle {
  text-align: center;
  color: #1DBECF;
  padding-bottom: 2%;
}

.button {
  text-align: center;
  padding-top: 2%;
  padding-bottom: 2%;
  border-bottom: #1DBECF solid;
  background-color: #F4F4F4;
}

textarea {
  font-family: sans-serif;
  font-size: medium;
  border: #1DBECF solid;

}

.add_button {
  text-align: left;
  padding-top: 5%;
  padding-bottom: 2%;
}

select {
  height: 25px;
  text-align: right;

}

.JZ_Options {
  padding-top: 2%;
}


.text_Middle{
  text-align: center;
  color: #1DBECF;
}


</style>
