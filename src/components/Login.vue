<template>
  <div>
    <div class="Basic_Grey">
      <div class="left">
        <h1>Prihlásenie študenta</h1>
        <div>
          <label style="margin-right: 25px !important;">ID</label>
          <input type="text" name="student_id" v-model="cred.student_ID">
        </div>
        <div>
          <label>Heslo</label>
          <input type="password" name="student_heslo" v-model="cred.student_heslo">
        </div>
        <div class="error" v-if="status=='A_ERROR'">
          <p>Prihlásenie bolo neúspešné. Skontrolujte prosím svoj login a heslo.</p>
        </div>
        <div class="button">
          <button type="submit" @click="submitStudent">Login</button>
        </div>
      </div>
      <div class="right">
        <h1>Prihlásenie Firmy</h1>
        <div>
          <label>Email</label>
          <input type="text" name="email" v-model="cred.firma_email">
        </div>
        <div>
          <label>Heslo</label>
          <input type="password" name="psw" v-model="cred.firma_heslo">
        </div>
        <div class="error" v-if="status=='F_ERROR'">
          <p>Prihlásenie bolo neúspešné. Skontrolujte prosím svoj login a heslo.</p>
        </div>
        <div class="button">
          <button type="submit" @click="submitFirma">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import auth from '@/auth'
import {mapGetters} from "vuex";
import store from "@/store"

export default {
  name: 'Login',
  computed: {
    ...mapGetters({
     status:'GET_STATUS'
    }),
  },
  data() {
    return {
      cred: {
        student_ID: '',
        student_heslo: '',
        firma_email:'',
        firma_heslo:''
      }
    }
  },
  methods: {
    submitFirma() {
      auth.LogIn(this.cred,)
    },
    submitStudent() {
      auth.LoginAis(this.cred)
    }
  },
  created() {
    store.dispatch('SET_STATUS', "");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.Basic_Grey {
  border-top: #1DBECF solid;
  background-color: #F4F4F4;
  border-bottom: #1DBECF solid;
  display: flex;
  text-align: center;
}


h1 {
  margin-top: 10% !important;
  padding-bottom: 5%;
}

.left {
  flex: 1;
  margin-right: 2px !important;
  margin-bottom: 5% !important;
}

.right {
  flex: 1;
  border-left: #1DBECF solid;
  padding-left: 2px;
}

.button{
  padding-top: 2%;
}



</style>
