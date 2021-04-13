<template>
  <div>
    <div class="Basic_Grey">
      <h1>Registrácia firmy</h1>
      <div class="formular">
        <div class="Basic">
          <h3>Prihlasovacie údaje</h3>
          <div class="field">
            <p class="required">Email</p>
            <input type="text" name="email" v-model="cred.email">
          </div>
          <div class="field">
            <p class="required">Heslo</p>
            <input type="password" name="psw" v-model="cred.heslo">
          </div>
        </div>
        <div class="Basic">
          <h3>Informácie o firme</h3>
          <div class="field">
            <p class="required">Názov</p>
            <input type="text" name="name" v-model="cred.nazov">
          </div>
          <div class="field">
            <p class="required">IČO</p>
            <input type="text" name="ico" v-model="cred.ico">
          </div>
          <div class="field">
            <p class="required">Krajina</p>
            <select style="float: left" v-model="cred.krajina_id" @change="KrajinaChange()">
              <option disabled selected value> -- Vyberte z možností --</option>
              <option v-for="k in krajiny" :key="k.id" :value=k.id>{{ k.nazov }}</option>
            </select>
          </div>
          <div class="field" v-if="cred.krajina_id!=''">
            <p class="required">Kraj</p>
            <select style="float: left" v-model="cred.kraj_id">
              <option disabled selected value> -- Vyberte z možností --</option>
              <option v-for="k in kraj" :key="k.id" :value=k.id>{{ k.nazov }}</option>
            </select>
          </div>
          <div class="field">
            <div style="float: left">
              <p class="required">Mesto</p>
              <input type="text" name="mesto" v-model="cred.mesto">
            </div>
            <div style="float: right">
              <p class="required">PSČ</p>
              <input type="text" name="psc" v-model="cred.psc">
            </div>
          </div>
          <div class="field" style="margin-top: 90px !important;">
            <p class="required">Ulica</p>
            <input type="text" name="ulica" v-model="cred.ulica">
          </div>
          <div class="field">
            <p style="vertical-align: top">Informácie</p>
            <textarea v-model="cred.info" @input="resize($event)"></textarea>
          </div>
          <div class="field">
            <p>Telefónne číslo</p>
            <input type="text" name="tel" placeholder="+" v-model="cred.tel">
          </div>
          <div class="field">
            <p>Webový portál</p>
            <input type="text" name="tel" v-model="cred.web">
          </div>
        </div>
        <div class="Basic">
          <h3>Kontaktná Osoba</h3>
          <div class="field">
            <div style="float: left">
              <p class="required">Meno</p>
              <input type="text" name="meno" v-model="cred.osoba_meno">
            </div>
            <div style="float: right">
              <p class="required">Priezvisko</p>
              <input type="text" name="priezvisko" v-model="cred.osoba_priezvisko">
            </div>
          </div>
          <div class="field" style="margin-top: 70px !important;">
            <p class="required">Telefónne číslo</p>
            <input type="text" name="Osoba_tel" placeholder="+" v-model="cred.osoba_tel">
          </div>
          <div class="field">
            <p class="required">Email</p>
            <input type="text" name="Osoba_emial" v-model="cred.osoba_email">
          </div>
        </div>
      </div>
      <div class="error" v-if="required">
        <p>Vyplňte prosím všetky povinné polia.</p>
      </div>
      <div class="field">
        <button type="submit" @click="submit">Registrovať sa</button>
      </div>
    </div>
  </div>
</template>


<script>
import auth from '@/auth'
import {mapGetters} from "vuex";
import ApiRequests from '@/ApiRequests';

export default {
  name: 'Register',
  data() {
    return {
      cred: {
        nazov: '',
        ico: '',
        krajina_id: '',
        kraj_id: '',
        mesto: '',
        ulica: '',
        info: '',
        tel: '',
        web: '',
        osoba_meno: '',
        osoba_priezvisko: '',
        osoba_tel: '',
        osoba_email: '',
        email: '',
        heslo: ''
      },
      kraj: [],
      required:'',
    }
  },
  computed: {
    ...mapGetters({
      krajiny: 'GET_KRAJINY',
      kraje: 'GET_KRAJ',
    })
  },
  methods: {
    submit() {
      if(this.cred.nazov=='' || this.cred.ico=='' || this.cred.krajina_id=='' || this.cred.mesto=='' || this.cred.psc=='' || this.cred.ulica=='' ||
        this.cred.osoba_meno=='' || this.cred.osoba_priezvisko=='' || this.cred.osoba_tel=='' || this.cred.osoba_email=='' || this.cred.email=='' || this.cred.heslo==''){
        this.required=true;
      }else {
        auth.Register(this.cred)
      }
    },
    resize(e) {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`
    },
    KrajinaChange() {
      this.kraj = [];
      for (let i = 0; i < this.kraje.length; i++) {
        if (this.kraje[i].krajina_id == this.cred.krajina_id) {
          this.kraj.push(this.kraje[i]);
        }
      }
    },
  },
  created() {
    ApiRequests.Registracia_values();
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
  margin-top: 10px !important;

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

.Basic {
  padding-bottom: 2%;
  border-bottom: #1DBECF solid;
  margin-right: 40% !important;
}

select {
  width: 100%;
  height: 30px;
  margin-bottom: 10px !important;
}

.required:after {
  content: " *";
  color: red;
}


</style>
