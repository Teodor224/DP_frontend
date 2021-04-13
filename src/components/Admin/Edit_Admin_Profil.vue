<template>
  <div>
    <div class="Basic_Grey">
      <div class="left">
        <div>
          <h2>Profilová Fotka</h2>
          <br/>
          <input type="file" id="image" ref="image" v-on:change="handleImageLoad()"/>
        </div>
      </div>
      <div class="right">
        <div class="Basic">
          <h1>{{ admin.meno }} {{ admin.priezvisko }}</h1>
        </div>
        <div class="Basic">
          <div class="field">
            <h3 class="H3left">Meno:</h3>
            <input type="text" name="meno" v-model="admin.meno">
          </div>
          <div class="field">
            <h3 class="H3left">Priezvisko:</h3>
            <input type="text" name="priezvisko" v-model="admin.priezvisko">
          </div>
          <div class="field" style="padding-bottom: 30px">
            <h3 class="H3left" >Krajina:</h3>
            <div style="float: right">
              <select style="float: left" v-model="admin.krajina_id" @change="KrajinaChange()">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option v-for="k in krajiny" :key="k.id" :value=k.id>{{ k.nazov }}</option>
              </select>
            </div>
          </div>
          <div class="field"style="padding-bottom: 30px">
            <h3 class="H3left">Kraj:</h3>
            <div style="float: right">
              <select style="float: left" v-model="admin.kraj_id">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option v-for="k in kraj" :key="k.id"  :value=k.id>{{ k.nazov }}</option>
              </select>
            </div>
          </div>
          <div class="field">
            <h3 class="H3left">Mesto:</h3>
            <input type="text" name="mesto" v-model="admin.mesto">
          </div>
          <div class="field">
            <h3 class="H3left">Ulica:</h3>
            <input type="text" name="ulica" v-model="admin.ulica">
          </div>
          <div class="field">
            <h3 class="H3left">Školský Email:</h3>
            <input type="text" name="email" v-model="admin.skolsky_email">
          </div>
          <div class="field">
            <h3 class="H3left">Súkromný Email:</h3>
            <input type="text" name="email" v-model="admin.sukromny_email">
          </div>
          <div class="field">
            <h3 class="H3left">Tel. Číslo:</h3>
            <input type="text" name="email" v-model="admin.tel_cislo">
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
  name: 'Edit_Admin_Profil',
  computed: {
    ...mapGetters({
      isAuth: 'GET_AUTH',
      admin: 'GET_ADMIN',
      krajiny: 'GET_KRAJINY',
      kraje:'GET_KRAJ',
      rola:'GET_ROLA',
    })
  },
  methods: {
    submit() {
      let formData = new FormData();
      formData.append('image', this.image);
      formData.append("userid", this.admin.id);
      formData.append("meno", this.admin.meno);
      formData.append("priezvisko", this.admin.priezvisko);
      formData.append("krajina_id", this.admin.krajina_id);
      formData.append("kraj_id", this.admin.kraj_id);
      formData.append("mesto", this.admin.mesto);
      formData.append("ulica", this.admin.ulica);
      formData.append("skolsky_email", this.admin.skolsky_email);
      formData.append('sukromny_email',this.admin.sukromny_email);
      formData.append('tel_cislo',this.admin.tel_cislo);
      ApiRequests.Admin_Profil_Update(formData);
    },
    handleImageLoad() {
      this.image = this.$refs.image.files[0];
    },
    resize(e) {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`
    },
    KrajinaChange(){
      this.kraj=[];
      for (let i = 0; i < this.kraje.length; i++){
        if(this.kraje[i].krajina_id == this.admin.krajina_id){
          this.kraj.push(this.kraje[i]);
        }
      }
    },
  },
  mounted() {
    for (let i = 0; i < this.kraje.length; i++){
      if(this.kraje[i].krajina_id == this.admin.krajina_id){
        this.kraj.push(this.kraje[i]);
      }
    };
  },
  data() {
    return {
      image: '',
      kraj:[],
    }
  },
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
  height: 30px;
}

.JZ_Options{
  padding-top: 2%;
}


</style>
