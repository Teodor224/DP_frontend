<template>
  <div class="modal" v-if="showModal">
    <div v-if="showModal" class="modal-content">
      <div class="modal-header">
        <h2 v-if="Add_Operation">Pridať nový kraj</h2>
        <h2 v-else>Upraviť kraj</h2>
      </div>
      <hr>
      <div class="modal-body">
        <slot name="body">
          <div class="field">
            <p class="required">Nazov</p>
            <input type="text" name="nazov" v-model="Kraj.nazov">
          </div>
          <div class="field">
            <p class="required">Štát</p>
            <select v-model="Kraj.krajina_id">
              <option disabled selected value> -- Vyberte z možností --</option>
              <option v-for="k in Krajiny" :key="k.id"  :value=k.id>{{ k.nazov }}</option>
            </select>
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

  name: 'Kraj_Modal',
  props: {
    showModal: Boolean,
    Add_Operation: Boolean,
    Krajiny:Array,
    Edit_Kraj:Object,
  },
  data(){
    return{
      Kraj:{
        nazov:'',
        krajina_id:''
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('clicked');
    },
    Create_Program(){
      ApiRequests.Admin_Add_Kraj(this.Kraj);
      this.closeModal();
    },
    Update_Program(){
      this.Edit_Kraj.nazov=this.Kraj.nazov;
      this.Edit_Kraj.krajina_id=this.Kraj.krajina_id;
      ApiRequests.Admin_Update_Kraj(this.Edit_Kraj);
      this.closeModal();
    }
  },
  mounted() {
    if(this.Add_Operation==false){
        this.Kraj.nazov=this.Edit_Kraj.nazov;
        this.Kraj.krajina_id=this.Edit_Kraj.krajina_id;
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
