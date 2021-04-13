<template>
  <div class="modal" v-if="showModal">
    <div v-if="showModal" class="modal-content">
      <div class="modal-header">
        <h2 v-if="Add_Operation">Pridať novú krajinu</h2>
        <h2 v-else>Upraviť  krajinu</h2>
      </div>
      <hr>
      <div class="modal-body">
        <slot name="body">
          <div class="field">
            <p class="required">Nazov</p>
            <input type="text" name="nazov" v-model="Krajina.nazov">
          </div>
          <div class="field">
            <p class="required">Kontinent</p>
            <input type="text" name="nazov" v-model="Krajina.kontinent">
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
export default {

  name: 'Krajina_Modal',
  props: {
    showModal: Boolean,
    Add_Operation: Boolean,
    Edit_Krajina:Object,
  },
  data(){
    return{
      Krajina:{
        nazov:'',
        kontinent:''
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('clicked');
    },
    Create_Program(){
      ApiRequests.Admin_Add_Krajina(this.Krajina);
      this.closeModal();
    },
    Update_Program(){
      this.Edit_Krajina.nazov=this.Krajina.nazov;
      this.Edit_Krajina.kontinent=this.Krajina.kontinent;
      ApiRequests.Admin_Update_Krajina(this.Edit_Krajina);
      this.closeModal();
    }
  },
  mounted() {
    if(this.Add_Operation==false){
        this.Krajina.nazov=this.Edit_Krajina.nazov;
        this.Krajina.kontinent=this.Edit_Krajina.kontinent;
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

input{
  width: 70%;
  text-align: center;
}

select{
  width: 70%;
  text-align: center;
  text-align-last: center;
}

option{
  text-align: center;
}



</style>
