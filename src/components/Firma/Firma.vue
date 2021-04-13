<template>
  <div>
    <div class="Basic_Grey">
      <div class="flex">
        <div class="left">
          <div>
            <div>
              <img :src="getFile(Firma_Profil.image)" style="width: 50%;height: 50%">
            </div>
          </div>
          <div style="padding-top: 30%" v-if="Firma_Profil.pp!='NO_PP'">
            <a :href="getFile(Firma_Profil.pp)" target="_blank"><img src="../../assets/icons/PPTicon.png"
                                                                     style="width: 20%;height: 20%"></a>
            <h3 style="color:#1DBECF">Prezentácia Firmy</h3>
          </div>
        </div>
        <div class="right">
          <div class="Basic">
            <h1>{{ org.nazov }}</h1>
          </div>
          <div class="Basic">
            <div class="field">
              <h3 class="H3left">ICO:</h3>
              <h4>{{ org.ico }}</h4>
            </div>
            <div class="field">
              <h3 class="H3left">Krajina:</h3>
              <h4>{{ krajina[0].nazov }}</h4>
            </div>
            <div class="field">
              <h3 class="H3left">Kraj:</h3>
              <h4>{{ kraj[0].nazov }}</h4>
            </div>
            <div class="field">
              <h3 class="H3left">Mesto:</h3>
              <h4>{{ org.mesto }}</h4>
            </div>
            <div class="field">
              <h3 class="H3left">PSČ:</h3>
              <h4>{{ org.psc }}</h4>
            </div>
            <div class="field">
              <h3 class="H3left">Ulica:</h3>
              <h4>{{ org.ulica }}</h4>
            </div>
          </div>
          <div class="Basic">
            <div class="field">
              <h3 class="H3left">Webová stránka:</h3>
              <h4>{{ org.web }}</h4>
            </div>
            <div class="field">
              <h3 class="H3left">Email:</h3>
              <h4>{{ org.email }}</h4>
            </div>
            <div class="field">
              <h3 class="H3left">Telefónne číslo:</h3>
              <h4>{{ org.tel }}</h4>
            </div>
          </div>
          <div class="Basic">
            <div class="field">
              <h2 class="text_Middle">Kontaktná Osoba</h2>
            </div>
            <div class="field">
              <h3 class="H3left">Meno:</h3>
              <h4>{{ Cont_Osoba.meno }}</h4>
            </div>
            <div class="field">
              <h3 class="H3left">Priezvisko:</h3>
              <h4>{{ Cont_Osoba.priezvisko }}</h4>
            </div>
            <div class="field">
              <h3 class="H3left">Telefónne číslo:</h3>
              <h4>{{ Cont_Osoba.tel }}</h4>
            </div>
            <div class="field">
              <h3 class="H3left">Email:</h3>
              <h4>{{ Cont_Osoba.email }}</h4>
            </div>
          </div>
          <div class="Basic">
            <div class="field">
              <h4 style="text-align: center">{{ org.informacie }}</h4>
            </div>
          </div>
          <div class="Basic" style="border: none">
            <div class="field">
              <h2 class="text_Middle">Komentáre od študentov</h2>
            </div>
            <div class="field" style="padding-bottom: 5%" v-for="k in komentare" :key="k.id">
              <h3 class="H3left" style="color: black">{{ k.Student_Meno }} {{ k.Student_Priezvisko }}:
                <star-rating
                  v-bind:read-only=true
                  v-bind:star-size="20"
                  v-bind:show-rating=false
                  v-bind:rating=k.Hodnotenie
                  active-color="#1DBECF"
                />
              </h3>
              <h4 style="text-align: center">{{ k.Komentar }}</h4>
            </div>
          </div>
        </div>
        <div v-if="rola==4">
          <img src="../../assets/icons/edit.png" class="crud" @click="Edit_Firma_Profil()">
        </div>
      </div>
      <div style="padding-bottom: 5%">
        <button type="submit" @click="Back">Späť</button>
      </div>
    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import ApiRequests from '@/ApiRequests';
import router from "@/router";
import StarRating from 'vue-star-rating'

export default {
  name: 'Firma',
  computed: {
    ...mapGetters({
      org: 'GET_FIRMA',
      Firma_Profil: 'GET_FIRMA_PROFIL',
      krajina: 'GET_KRAJINY',
      kraj: 'GET_KRAJ',
      Cont_Osoba: 'GET_CONT_OSOBA',
      komentare: 'GET_KOMENTARE',
      rola: 'GET_ROLA',
    }),
  },
  components: {
    StarRating
  },
  methods: {
    getFile(file) {
      if (file != "user.png") {
        if (file == "NO_PP") {
          return;
        } else {
          try {
            return require("../../../../backend/storage/firma/" + file);
          } catch (e) {
            return require("../../assets/user.png");
          }
        }
      } else {
        return require("../../assets/user.png");
      }
    },
    Edit_Firma_Profil() {
      router.push('/Edit_Firma_profil');
    },
    imageLoadError() {
      console.log('Image failed to load');
    },
    Back() {
      this.$router.go(-1);
    },
  },
  created() {
    ApiRequests.ShowKomentare(this.org);
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

.flex {
  display: flex;
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
  padding-top: 2%;
  flex: 1;
}

.H3left {
  color: #1DBECF;
  float: left;
}

.right {
  padding-top: 2%;
  flex: 1;
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

.crud {
  height: 30px;
  width: 30px;
}

.text_Middle {
  text-align: center;
  color: #1DBECF;
  padding-bottom: 2%;
}

</style>
