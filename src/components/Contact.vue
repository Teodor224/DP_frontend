<template>
  <div>
    <div class="Basic_Grey">
      <img src="../assets/banner.jpg">
    </div>
    <div class="Basic">
      <h1>Kontakt</h1>
      <div class="text">
      <p>Webové sídlo UKF slúži na informovanie uchádzačov o štúdium, študentov, zamestnancov a širokej verejnosti o dianí na univerzite, jej štruktúre, pracoviskách, o samotnom štúdiu, výskume a ďalších dôležitých oblastiach. Na informovanie všetkých spomenutých návštevníkov webového sídla UKF slúži Hlavná stránka. Moja UKF je priestor určený primárne na zverejňovanie oznamov, výziev a rozličných informácií podstatných pre akademickú obec.</p>
      </div>
        <div class="text">
        <p style="font-weight: bold">Oficiálna korešpondencia</p>
          <p>Univerzita Konštantína Filozofa v Nitre</p>
          <p> Tr. A. Hlinku 1, 949 01 Nitra</p>
          <p> tel.: +421 37 6408 111
          <p>  e-mail:<a href="mailto:ukf@ukf.sk">ukf@ukf.sk</a></p>
        </div>
      <div class="text">
        <p>  Kontaktné údaje na jednotlivé pracoviská nájdete na linkoch <a href="https://www.ukf.sk/univerzita/rektorat" target="_blank">Rektorát</a> a <a href="https://www.ukf.sk/fakulty-a-sucasti" target="_blank">Fakulty a súčasti</a>.</p>
      </div>
      <div class="text">
        <p>  Pre vyhľadanie kontaktných údajov zamestnancov UKF použite <a href="https://www.ukf.sk/univerzita/kontakt/adresar-osob" target="_blank">Adresár osôb</a>.</p>
      </div>
      <div class="text">
        <a href="https://www.google.com/maps/d/viewer?mid=1mA_stSBCLecsu4m4BFIakc5v5EkNOWXp&ll=48.311784892090095%2C18.091092617734013&z=15&lang=sk" target="_blank">Mapa</a>
      </div>
    </div>
    <div class="write" v-if="this.Sprava_Odoslana==false">
      <h1>Napíšte nám</h1>
      <div class="field">
      <p class="required">Meno:</p>
        <input type="text" name="meno" v-model="user.meno">
      </div>
      <div class="field">
        <p class="required">Priezvisko:</p>
        <input type="text" name="priezvisko" v-model="user.priezvisko">
      </div>
      <div class="field">
        <p class="required">Email:</p>
        <input type="text" name="email" v-model="user.email">
      </div>
      <div class="field">
      <p class="required">Správa:</p>
      <textarea v-model="user.sprava" @input="resize($event)"></textarea>
        <div class="error" v-if="required">
          <p>Vyplňte prosím všetky povinné polia.</p>
        </div>
      </div>
      <button type="submit" @click="Odoslat">Odoslať</button>
    </div>
    <div class="write" v-else>
      <h1>Ďakujeme za vašu správu</h1>
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';
import ApiRequests from '@/ApiRequests';
import {mapGetters} from "vuex";
export default {
  name: 'Contact',
  computed: {
    ...mapGetters({
      Sprava_Odoslana: 'GET_SO',
    }),
  },
  data() {
    return {
      user:{
        email: '',
        meno:'',
        priezvisko:'',
        sprava:''
      },
      required:'',
    }
  },
  methods: {
    resize(e) {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`
    },
    Odoslat(){
      if(this.user.email=='' || this.user.meno=='' || this.user.priezvisko=='' || this.user.sprava==''){
        this.required=true;
      }else {
        ApiRequests.Napiste_Nam(this.user);
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.Basic {
  border-bottom: #1DBECF solid;
  margin-top: 2% !important;
  padding-bottom: 1%;
}

.Basic_Grey {
  border-top: #1DBECF solid;
  text-align: center;
  background-color: #F4F4F4;
}


.text{
  margin-top: 2% !important;
}

a{
  color: #1DBECF;
}

.write{
  margin-top: 2% !important;
  text-align: center;
  padding-bottom: 5%;
}

textarea{
  background-color: #F4F4F4;
  font-family: sans-serif;
  font-size: medium;
  border: #1DBECF solid;
  padding-bottom: 5%;
  width: 61%;
  resize: none;
  box-sizing: border-box;

}

input {
  width: 60%;
  background-color: #F4F4F4;
  font-family: sans-serif;
  font-size: medium;
  border: #1DBECF solid;
}

.field{
  margin-bottom: 10px !important;
  text-align: left;
  padding-left: 25%;
}

.required:after {
  content:" *";
  color: red;
}

</style>
