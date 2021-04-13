<template>
  <div class="modal" v-if="showModal">
    <div v-if="showModal" class="modal-content">
      <div class="modal-header">
        <h2 v-if="Add_Operation">Pridať nový Komentár</h2>
        <h2 v-else>Upraviť  Komentár</h2>
      </div>
      <hr>
      <div class="modal-body">
        <slot name="body">
          <div class="field">
            <p class="required">Komentar</p>
            <textarea v-model="Komentar.komentar" @input="resize($event)"></textarea>
          </div>
          <div class="field">
            <p class="required">Hodnotenie</p>
            <div class="star">
            <star-rating
              v-bind:star-size="30"
              v-bind:show-rating=true
              v-bind:rating=Komentar.hodnotenie
              v-model="Komentar.hodnotenie"
              active-color="#1DBECF"
            />
              </div>
          </div>
        </slot>
      </div>
      <div>
        <button @click="closeModal">Zatvoriť</button>
        <button @click="Create_Program" v-if="Add_Operation">Vytvoriť</button>
        <button @click="Update_Program" v-else>Zmeniť</button>
      </div>
    </div>
  </div>
</template>

<script>
import ApiRequests from '@/ApiRequests';
import StarRating from 'vue-star-rating'
export default {

  name: 'Komentar_Modal',
  components: {
    StarRating
  },
  props: {
    showModal: Boolean,
    Add_Operation: Boolean,
    Komentar_K:Object,
  },
  data(){
    return{
      Komentar:{
        komentar:'',
        hodnotenie:0
      }
    }
  },
  methods: {
    resize(e) {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`
    },
    closeModal() {
      this.$emit('clicked');
    },
    Create_Program(){
      this.Komentar_K.komentar=this.Komentar.komentar;
      this.Komentar_K.hodnotenie=this.Komentar.hodnotenie
      ApiRequests.STUD_Add_Komentar(this.Komentar_K);
      this.closeModal();
    },
    Update_Program(){
      this.Komentar_K.komentar=this.Komentar.komentar;
      this.Komentar_K.hodnotenie=this.Komentar.hodnotenie;
      ApiRequests.STUD_Update_Komentar(this.Komentar_K);
      this.closeModal();
    }
  },
  mounted() {
    if(this.Add_Operation==false){
        this.Komentar.komentar=this.Komentar_K.komentar;
        this.Komentar.hodnotenie=this.Komentar_K.hodnotenie;
    }
  }
};
</script>

<style>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-width: 100%;
  height: 400px;
  max-height: 100%;
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.modal-header{
  background-color: #1DBECF;
  padding-top: 2%;
  padding-bottom: 2%;
}

.modal-body{
  padding-top: 10%;
  padding-bottom: 10%;
}

.field {
  margin-top: 10px !important;

}


textarea{
  background-color: #F4F4F4;
  font-family: sans-serif;
  font-size: medium;
  border: #1DBECF solid;
  padding-bottom: 5%;
  width: 70%;
  resize: none;
  box-sizing: border-box;

}

.star{
  padding-left: 37%;
}



</style>
