<template>
  <div>
    <div class="Basic_Grey">
      <img src="../assets/banner.jpg">
      <h1>Kariérny portál Univerzity Konštantína Filozofa v Nitre</h1>
    </div>
    <div class="Basic">
      <div class="stats" v-if="this.pocet_f>0">
        <div class="Graph">
          <h3>Počet Firiem</h3>
          <chartjs-doughnut v-bind:labels="labelsF" v-bind:datasets="datasetsF"
                            v-bind:option="optionF"></chartjs-doughnut>
        </div>
        <div class="Graph">
          <h3>Počet Študentov</h3>
          <chartjs-doughnut v-bind:labels="labelsS" v-bind:datasets="datasetsS"
                            v-bind:option="optionS" ></chartjs-doughnut>
        </div>
        <div class="Graph">
          <h3>Počet Pracovných pozícii</h3>
          <chartjs-doughnut v-bind:labels="labelsP" v-bind:datasets="datasetsP"
                            v-bind:option="optionP"></chartjs-doughnut>
        </div>
      </div>
    </div>
    <div class="Basic_Grey">
      <h1>Prečo sa registrovať?</h1>
      <div class="video">
        <iframe width="512px" height="315px" src="https://www.youtube.com/embed/RkLAPd0KRgQ" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
      </div>
    </div>
    <div class="Basic">
      <h1>Naši partneri</h1>
      <div class="Top">
        <div class="firma" v-for="f in firmy_images" :key="f.id">
          <img :src="getFile(f.image)" style="width: 200px;height: 200px">
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import ApiRequests from '@/ApiRequests';

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      pocet_f: 'GET_POCET_F',
      pocet_s: 'GET_POCET_S',
      pocet_akt_p: 'GET_POCET_AKT_P',
      pocet_abs_p: 'GET_POCET_ABS_P',
      firmy_images: 'GET_VSETKY_F',
    }),
  },
  data() {
    return {
      labelsF: ["Firmy"],
      datasetsF: [
        {
          data: [this.pocet_f],
          backgroundColor: ["Blue"],
          responsive: true
        }
      ],
      optionF: {
        legend: {
          display: false
        },
        aspectRatio: 4
      },
      labelsS: ["Študenti"],
      datasetsS: [
        {
          data: [1],
          backgroundColor: ["Blue"]
        }
      ],
      optionS: {
        legend: {
          display: false
        },
        aspectRatio: 4
      },
      labelsP: ["Aktuálne pracovné pozície","Absolvované pracovné pozície"],
      datasetsP: [
        {
          data: [1,1],
          backgroundColor: ["Blue","Blue"]
        }
      ],
      optionP: {
        legend: {
          display: false
        },
        aspectRatio: 4
      },
    }
  },
  methods:{
    getFile(file) {
      if (file != "user.png" && file!=null) {
        return require("../../../backend/storage/firma/" + file);
      } else {
        return require("../assets/user.png");
      }
    },
  },
  created() {
    ApiRequests.Statistiky();
    this.datasetsF[0].data[0]=this.pocet_f;
    this.datasetsP[0].data[0]=this.pocet_akt_p;
    this.datasetsP[0].data[1]=this.pocet_abs_p;
    this.datasetsS[0].data[0]=this.pocet_s;
  },
 watch:{
   pocet_f : function (){
     this.datasetsF[0].data[0]=this.pocet_f;
   },
   pocet_akt_p:function (){
     this.datasetsP[0].data[0]=this.pocet_akt_p;
   },
   pocet_abs_p: function (){
     this.datasetsP[0].data[1]=this.pocet_abs_p;
   },
   pocet_s: function (){
     this.datasetsS[0].data[0]=this.pocet_s;
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
}


h1 {
  padding-bottom: 2%;
  padding-top: 2%;
}

.stats {
  padding-bottom: 5%;
  padding-top: 5%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;

}

.video {
  flex: 1;
  padding-bottom: 5%;
}

.Graph {
  flex: 1;
}

.Top {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 5%;
}

.firma{
  flex-grow: 1;
  width: 30%;
}

</style>
