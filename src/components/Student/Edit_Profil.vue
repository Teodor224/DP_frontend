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
          <h2>Životopis</h2>
          <br/>
          <input type="file" id="pdf" ref="pdf" v-on:change="handlePDFLoad()"/>
        </div>
      </div>
      <div class="right">
        <div class="Basic">
          <h1>{{ stud.meno }} {{ stud.priezvisko }}</h1>
        </div>
        <div class="Basic">
          <div class="field">
            <h3 class="H3left">Súkromný Email:</h3>
            <input type="text" name="email" v-model="student.sukromny_email">
          </div>
          <div class="field">
            <h3 class="H3left">Tel. Číslo:</h3>
            <input type="text" name="email" v-model="student.tel_cislo">
          </div>
        </div>
        <div class="Basic">
          <div class="field">
            <h3 class="middle">Jazykové Znalosti</h3>
            <div>
              <select style="float: left" v-model="JZ0">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="jz in j_z" :key="j_z.id" :value=jz.id>{{jz.nazov}}</option>
              </select>
              <select v-model="JZU0">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="1">Materinský Jazyk</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="JZ>0">
              <select style="float: left"  v-model="JZ1">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="jz in j_z" :key="j_z.id" :value=jz.id>{{jz.nazov}}</option>
              </select>
              <select v-model="JZU1">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="2">Expert (C2)</option>
                <option value="3">Pokročilý (C1)</option>
                <option value="4">Stredne Pokročilý (B2)</option>
                <option value="5">Mierne Pokročilý (B1)</option>
                <option value="6">Začiatočník (A2)</option>
                <option value="7">Úplný začiatočník (A1)</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="JZ>1">
              <select style="float: left" v-model="JZ2">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="jz in j_z" :key="j_z.id" :value=jz.id>{{jz.nazov}}</option>
              </select>
              <select v-model="JZU2">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="2">Expert (C2)</option>
                <option value="3">Pokročilý (C1)</option>
                <option value="4">Stredne Pokročilý (B2)</option>
                <option value="5">Mierne Pokročilý (B1)</option>
                <option value="6">Začiatočník (A2)</option>
                <option value="7">Úplný začiatočník (A1)</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="JZ>2">
              <select style="float: left" v-model="JZ3">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="jz in j_z" :key="j_z.id" :value=jz.id>{{jz.nazov}}</option>
              </select>
              <select v-model="JZU3">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="2">Expert (C2)</option>
                <option value="3">Pokročilý (C1)</option>
                <option value="4">Stredne Pokročilý (B2)</option>
                <option value="5">Mierne Pokročilý (B1)</option>
                <option value="6">Začiatočník (A2)</option>
                <option value="7">Úplný začiatočník (A1)</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="JZ>3">
              <select style="float: left" v-model="JZ4">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="jz in j_z" :key="j_z.id" :value=jz.id>{{jz.nazov}}</option>
              </select>
              <select v-model="JZU4">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="2">Expert (C2)</option>
                <option value="3">Pokročilý (C1)</option>
                <option value="4">Stredne Pokročilý (B2)</option>
                <option value="5">Mierne Pokročilý (B1)</option>
                <option value="6">Začiatočník (A2)</option>
                <option value="7">Úplný začiatočník (A1)</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="JZ>4">
              <select style="float: left" v-model="JZ5">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="jz in j_z" :key="j_z.id" :value=jz.id>{{jz.nazov}}</option>
              </select>
              <select v-model="JZU5">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="2">Expert (C2)</option>
                <option value="3">Pokročilý (C1)</option>
                <option value="4">Stredne Pokročilý (B2)</option>
                <option value="5">Mierne Pokročilý (B1)</option>
                <option value="6">Začiatočník (A2)</option>
                <option value="7">Úplný začiatočník (A1)</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="JZ>5">
              <select style="float: left" v-model="JZ6">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="jz in j_z" :key="j_z.id" :value=jz.id>{{jz.nazov}}</option>
              </select>
              <select v-model="JZU6">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="2">Expert (C2)</option>
                <option value="3">Pokročilý (C1)</option>
                <option value="4">Stredne Pokročilý (B2)</option>
                <option value="5">Mierne Pokročilý (B1)</option>
                <option value="6">Začiatočník (A2)</option>
                <option value="7">Úplný začiatočník (A1)</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="JZ>6">
              <select style="float: left" v-model="JZ7">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="jz in j_z" :key="j_z.id" :value=jz.id>{{jz.nazov}}</option>
              </select>
              <select v-model="JZU7">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="2">Expert (C2)</option>
                <option value="3">Pokročilý (C1)</option>
                <option value="4">Stredne Pokročilý (B2)</option>
                <option value="5">Mierne Pokročilý (B1)</option>
                <option value="6">Začiatočník (A2)</option>
                <option value="7">Úplný začiatočník (A1)</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="JZ>7">
              <select style="float: left" v-model="JZ8">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="jz in j_z" :key="j_z.id" :value=jz.id>{{jz.nazov}}</option>
              </select>
              <select v-model="JZU8">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="2">Expert (C2)</option>
                <option value="3">Pokročilý (C1)</option>
                <option value="4">Stredne Pokročilý (B2)</option>
                <option value="5">Mierne Pokročilý (B1)</option>
                <option value="6">Začiatočník (A2)</option>
                <option value="7">Úplný začiatočník (A1)</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="JZ>8">
              <select style="float: left" v-model="JZ9">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="jz in j_z" :key="j_z.id" :value=jz.id>{{jz.nazov}}</option>
              </select>
              <select v-model="JZU9">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="2">Expert (C2)</option>
                <option value="3">Pokročilý (C1)</option>
                <option value="4">Stredne Pokročilý (B2)</option>
                <option value="5">Mierne Pokročilý (B1)</option>
                <option value="6">Začiatočník (A2)</option>
                <option value="7">Úplný začiatočník (A1)</option>
              </select>
            </div>
          </div>
          <div class="add_button">
            <button v-on:click="Add_JZ()" style="padding: 1%" v-if="JZ<9">Pridať ďalšiu možnosť</button>
            <button v-on:click="Remove_JZ()" style="padding: 1%; float: right" v-if="JZ>0">Odobrať možnosť</button>
          </div>
        </div>
        <div class="Basic">
          <div class="field">
            <h3 class="middle">Počitačové Znalosti</h3>
            <div  v-if="PCZ>-1">
            <select style="float: left" v-model="PCZ0">
              <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="pcj in pc_z" :key="pc_z.id" :value=pcj.id>{{pcj.nazov}}</option>
            </select>
              <select v-model="PCZU0">
              <option disabled selected value> -- Vyberte z možností --</option>
              <option value="1">Základy</option>
              <option value="2">Pokročilý</option>
              <option value="3">Expert</option>
            </select>
            </div>
            <div class="JZ_Options" v-if="PCZ>0">
              <select style="float: left" v-model="PCZ1">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="pcj in pc_z" :key="pc_z.id" :value=pcj.id>{{pcj.nazov}}</option>
              </select>
              <select v-model="PCZU1">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="1">Základy</option>
                <option value="2">Pokročilý</option>
                <option value="3">Expert</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="PCZ>1">
              <select style="float: left" v-model="PCZ2">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="pcj in pc_z" :key="pc_z.id" :value=pcj.id>{{pcj.nazov}}</option>
              </select>
              <select v-model="PCZU2">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="1">Základy</option>
                <option value="2">Pokročilý</option>
                <option value="3">Expert</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="PCZ>2">
              <select style="float: left" v-model="PCZ3">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="pcj in pc_z" :key="pc_z.id" :value=pcj.id>{{pcj.nazov}}</option>
              </select>
              <select v-model="PCZU3">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="1">Základy</option>
                <option value="2">Pokročilý</option>
                <option value="3">Expert</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="PCZ>3">
              <select style="float: left" v-model="PCZ4">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="pcj in pc_z" :key="pc_z.id" :value=pcj.id>{{pcj.nazov}}</option>
              </select>
              <select v-model="PCZU4">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="1">Základy</option>
                <option value="2">Pokročilý</option>
                <option value="3">Expert</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="PCZ>4">
              <select style="float: left" v-model="PCZ5">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="pcj in pc_z" :key="pc_z.id" :value=pcj.id>{{pcj.nazov}}</option>
              </select>
              <select v-model="PCZU5">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="1">Základy</option>
                <option value="2">Pokročilý</option>
                <option value="3">Expert</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="PCZ>5">
              <select style="float: left" v-model="PCZ6">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="pcj in pc_z" :key="pc_z.id" :value=pcj.id>{{pcj.nazov}}</option>
              </select>
              <select v-model="PCZU6">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="1">Základy</option>
                <option value="2">Pokročilý</option>
                <option value="3">Expert</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="PCZ>6">
              <select style="float: left" v-model="PCZ7">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="pcj in pc_z" :key="pc_z.id" :value=pcj.id>{{pcj.nazov}}</option>
              </select>
              <select v-model="PCZU7">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="1">Základy</option>
                <option value="2">Pokročilý</option>
                <option value="3">Expert</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="PCZ>7">
              <select style="float: left" v-model="PCZ8">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="pcj in pc_z" :key="pc_z.id" :value=pcj.id>{{pcj.nazov}}</option>
              </select>
              <select v-model="PCZU8">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="1">Základy</option>
                <option value="2">Pokročilý</option>
                <option value="3">Expert</option>
              </select>
            </div>
            <div class="JZ_Options" v-if="PCZ>8">
              <select style="float: left" v-model="PCZ9">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option  v-for="pcj in pc_z" :key="pc_z.id" :value=pcj.id>{{pcj.nazov}}</option>
              </select>
              <select v-model="PCZU9">
                <option disabled selected value> -- Vyberte z možností --</option>
                <option value="1">Základy</option>
                <option value="2">Pokročilý</option>
                <option value="3">Expert</option>
              </select>
            </div>
          </div>
          <div class="add_button">
            <button v-on:click="Add_PCZ()" style="padding: 1%" v-if="PCZ<9">Pridať ďalšiu možnosť</button>
            <button v-on:click="Remove_PCZ()" style="padding: 1%; float: right" v-if="PCZ>-1">Odobrať možnosť</button>
          </div>
        </div>
        <div class="Basic">
          <div class="field">
            <textarea v-model="student.info" cols="50" rows="10" @input="resize($event)"></textarea>
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
  name: 'Edit_Profil',
  computed: {
    ...mapGetters({
      isAuth: 'GET_AUTH',
      stud: 'GET_STUDENT',
      j_znalosti: 'GET_J_ZNALOSTI',
      pc_znalosti: 'GET_PC_ZNALOSTI',
      j_z:'GET_J_Z',
      pc_z:'GET_PC_Z',
    })
  },
  methods: {
    submit() {
      let formData = new FormData();
      formData.append('image', this.image);
      formData.append("userid", this.stud.id);
      formData.append('pdf', this.pdf);
      formData.append('stud_email',this.student.sukromny_email);
      formData.append('stud_tel',this.student.tel_cislo);
      formData.append('stud_info',this.student.info);
      formData.append('JZ0',this.JZ0);
      formData.append('JZ1',this.JZ1);
      formData.append('JZ2',this.JZ2);
      formData.append('JZ3',this.JZ3);
      formData.append('JZ4',this.JZ4);
      formData.append('JZ5',this.JZ5);
      formData.append('JZ6',this.JZ6);
      formData.append('JZ7',this.JZ7);
      formData.append('JZ8',this.JZ8);
      formData.append('JZ9',this.JZ9);
      formData.append('JZU0',this.JZU0);
      formData.append('JZU1',this.JZU1);
      formData.append('JZU2',this.JZU2);
      formData.append('JZU3',this.JZU3);
      formData.append('JZU4',this.JZU4);
      formData.append('JZU5',this.JZU5);
      formData.append('JZU6',this.JZU6);
      formData.append('JZU7',this.JZU7);
      formData.append('JZU8',this.JZU8);
      formData.append('JZU9',this.JZU9);
      formData.append('PCZ0',this.PCZ0);
      formData.append('PCZ1',this.PCZ1);
      formData.append('PCZ2',this.PCZ2);
      formData.append('PCZ3',this.PCZ3);
      formData.append('PCZ4',this.PCZ4);
      formData.append('PCZ5',this.PCZ5);
      formData.append('PCZ6',this.PCZ6);
      formData.append('PCZ7',this.PCZ7);
      formData.append('PCZ8',this.PCZ8);
      formData.append('PCZ9',this.PCZ9);
      formData.append('PCZU0',this.PCZU0);
      formData.append('PCZU1',this.PCZU1);
      formData.append('PCZU2',this.PCZU2);
      formData.append('PCZU3',this.PCZU3);
      formData.append('PCZU4',this.PCZU4);
      formData.append('PCZU5',this.PCZU5);
      formData.append('PCZU6',this.PCZU6);
      formData.append('PCZU7',this.PCZU7);
      formData.append('PCZU8',this.PCZU8);
      formData.append('PCZU9',this.PCZU9);
      ApiRequests.Profil_UploadImage(formData);
    },
    handleImageLoad() {
      this.image = this.$refs.image.files[0];
    },
    handlePDFLoad() {
      this.pdf = this.$refs.pdf.files[0];
    },
    resize(e) {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`
    },
    Add_JZ() {
      this.JZ = this.JZ + 1
      },
    Add_PCZ() {
      this.PCZ = this.PCZ + 1
    },
    Remove_JZ(){
      this.JZ = this.JZ - 1
      switch (this.JZ){
        case 0:this.JZ1='';this.JZU1='';break;
        case 1:this.JZ2='';this.JZU2='';break;
        case 2:this.JZ3='';this.JZU3='';break;
        case 3:this.JZ4='';this.JZU4='';break;
        case 4:this.JZ5='';this.JZU5='';break;
        case 5:this.JZ6='';this.JZU6='';break;
        case 6:this.JZ7='';this.JZU7='';break;
        case 7:this.JZ8='';this.JZU8='';break;
        case 8:this.JZ9='';this.JZU9='';break;
      }
    },
    Remove_PCZ(){
      this.PCZ = this.PCZ - 1
      switch (this.PCZ){
        case 0-1:this.PCZ0='';this.PCZU0='';break;
        case 0:this.PCZ1='';this.PCZU1='';break;
        case 1:this.PCZ2='';this.PCZU2='';break;
        case 2:this.PCZ3='';this.PCZU3='';break;
        case 3:this.PCZ4='';this.PCZU4='';break;
        case 4:this.PCZ5='';this.PCZU5='';break;
        case 5:this.PCZ6='';this.PCZU6='';break;
        case 6:this.PCZ7='';this.PCZU7='';break;
        case 7:this.PCZ8='';this.PCZU8='';break;
        case 8:this.PCZ9='';this.PCZU9='';break;
      }
    }
  },
  data() {
    return {
      image: '',
      pdf: '',
      student: {
        sukromny_email: '',
        tel_cislo: '',
        info: ''
      },
      JZ : 0,
      JZ0: '',
      JZ1:'',
      JZ2:'',
      JZ3:'',
      JZ4:'',
      JZ5:'',
      JZ6:'',
      JZ7:'',
      JZ8:'',
      JZ9:'',


      JZU0:1,
      JZU1:'',
      JZU2:'',
      JZU3:'',
      JZU4:'',
      JZU5:'',
      JZU6:'',
      JZU7:'',
      JZU8:'',
      JZU9:'',

      PCZ : 0,
      PCZ0:'',
      PCZ1:'',
      PCZ2:'',
      PCZ3:'',
      PCZ4:'',
      PCZ5:'',
      PCZ6:'',
      PCZ7:'',
      PCZ8:'',
      PCZ9:'',

      PCZU0:'',
      PCZU1:'',
      PCZU2:'',
      PCZU3:'',
      PCZU4:'',
      PCZU5:'',
      PCZU6:'',
      PCZU7:'',
      PCZU8:'',
      PCZU9:'',


    }

  },
  mounted() {
    this.student.sukromny_email = this.stud.sukromny_email;
    this.student.tel_cislo = this.stud.tel_cislo;
    this.student.info = this.stud.informacie;
    this.JZ=this.j_znalosti.length-1;

    if(this.JZ>-1){
      this.JZ0=this.j_znalosti[0].jazykove_znalosti_id;
    }
    if(this.JZ>0){
      this.JZ1=this.j_znalosti[1].jazykove_znalosti_id;
      switch (this.j_znalosti[1].uroven){
        case "Expert (C2)": this.JZU1=2;break;
        case "Pokročilý (C1)": this.JZU1=3;break;
        case "Stredne Pokročilý (B2)": this.JZU1=4;break;
        case "Mierne Pokročilý (B1)": this.JZU1=5;break;
        case "Začiatočník (A2)": this.JZU1=6;break;
        case "Úplný začiatočník (A1)": this.JZU1=7;break;
      }
    }
    if(this.JZ>1){
      this.JZ2=this.j_znalosti[2].jazykove_znalosti_id;
      switch (this.j_znalosti[2].uroven){
        case "Expert (C2)": this.JZU2=2;break;
        case "Pokročilý (C1)": this.JZU2=3;break;
        case "Stredne Pokročilý (B2)": this.JZU2=4;break;
        case "Mierne Pokročilý (B1)": this.JZU2=5;break;
        case "Začiatočník (A2)": this.JZU2=6;break;
        case "Úplný začiatočník (A1)": this.JZU2=7;break;
      }
    }
    if(this.JZ>2){
      this.JZ3=this.j_znalosti[3].jazykove_znalosti_id;
      switch (this.j_znalosti[3].uroven){
        case "Expert (C2)": this.JZU3=2;break;
        case "Pokročilý (C1)": this.JZU3=3;break;
        case "Stredne Pokročilý (B2)": this.JZU3=4;break;
        case "Mierne Pokročilý (B1)": this.JZU3=5;break;
        case "Začiatočník (A2)": this.JZU3=6;break;
        case "Úplný začiatočník (A1)": this.JZU3=7;break;
      }
    }
    if(this.JZ>3){
      this.JZ4=this.j_znalosti[4].jazykove_znalosti_id;
      switch (this.j_znalosti[4].uroven){
        case "Expert (C2)": this.JZU4=2;break;
        case "Pokročilý (C1)": this.JZU4=3;break;
        case "Stredne Pokročilý (B2)": this.JZU4=4;break;
        case "Mierne Pokročilý (B1)": this.JZU4=5;break;
        case "Začiatočník (A2)": this.JZU4=6;break;
        case "Úplný začiatočník (A1)": this.JZU4=7;break;
      }
    }
    if(this.JZ>4){
      this.JZ5=this.j_znalosti[5].jazykove_znalosti_id;
      switch (this.j_znalosti[5].uroven){
        case "Expert (C2)": this.JZU5=2;break;
        case "Pokročilý (C1)": this.JZU5=3;break;
        case "Stredne Pokročilý (B2)": this.JZU5=4;break;
        case "Mierne Pokročilý (B1)": this.JZU5=5;break;
        case "Začiatočník (A2)": this.JZU5=6;break;
        case "Úplný začiatočník (A1)": this.JZU5=7;break;
      }
    }
    if(this.JZ>5){
      this.JZ6=this.j_znalosti[6].jazykove_znalosti_id;
      switch (this.j_znalosti[6].uroven){
        case "Expert (C2)": this.JZU6=2;break;
        case "Pokročilý (C1)": this.JZU6=3;break;
        case "Stredne Pokročilý (B2)": this.JZU6=4;break;
        case "Mierne Pokročilý (B1)": this.JZU6=5;break;
        case "Začiatočník (A2)": this.JZU6=6;break;
        case "Úplný začiatočník (A1)": this.JZU6=7;break;
      }
    }
    if(this.JZ>6){
      this.JZ7=this.j_znalosti[7].jazykove_znalosti_id;
      switch (this.j_znalosti[7].uroven){
        case "Expert (C2)": this.JZU7=2;break;
        case "Pokročilý (C1)": this.JZU7=3;break;
        case "Stredne Pokročilý (B2)": this.JZU7=4;break;
        case "Mierne Pokročilý (B1)": this.JZU7=5;break;
        case "Začiatočník (A2)": this.JZU7=6;break;
        case "Úplný začiatočník (A1)": this.JZU7=7;break;
      }
    }
    if(this.JZ>7){
      this.JZ8=this.j_znalosti[8].jazykove_znalosti_id;
      switch (this.j_znalosti[8].uroven){
        case "Expert (C2)": this.JZU8=2;break;
        case "Pokročilý (C1)": this.JZU8=3;break;
        case "Stredne Pokročilý (B2)": this.JZU8=4;break;
        case "Mierne Pokročilý (B1)": this.JZU8=5;break;
        case "Začiatočník (A2)": this.JZU8=6;break;
        case "Úplný začiatočník (A1)": this.JZU8=7;break;
      }
    }
    if(this.JZ>8){
      this.JZ9=this.j_znalosti[9].jazykove_znalosti_id;
      switch (this.j_znalosti[9].uroven){
        case "Expert (C2)": this.JZU9=2;break;
        case "Pokročilý (C1)": this.JZU9=3;break;
        case "Stredne Pokročilý (B2)": this.JZU9=4;break;
        case "Mierne Pokročilý (B1)": this.JZU9=5;break;
        case "Začiatočník (A2)": this.JZU9=6;break;
        case "Úplný začiatočník (A1)": this.JZU9=7;break;
      }
    }

    this.PCZ=this.pc_znalosti.length-1;

    if(this.PCZ>-1){
      this.PCZ0=this.pc_znalosti[0].pc_znalosti_id;
      switch (this.pc_znalosti[0].uroven){
        case "Základy": this.PCZU0=1;break;
        case "Pokročilý": this.PCZU0=2;break;
        case "Expert": this.PCZU0=3;break;
      }
    }
    if(this.PCZ>0){
      this.PCZ1=this.pc_znalosti[1].pc_znalosti_id;
      switch (this.pc_znalosti[1].uroven){
        case "Základy": this.PCZU1=1;break;
        case "Pokročilý": this.PCZU1=2;break;
        case "Expert": this.PCZU1=3;break;
      }
    }
    if(this.PCZ>1){
      this.PCZ2=this.pc_znalosti[2].pc_znalosti_id;
      switch (this.pc_znalosti[2].uroven){
        case "Základy": this.PCZU2=1;break;
        case "Pokročilý": this.PCZU2=2;break;
        case "Expert": this.PCZU2=3;break;
      }
    }
    if(this.PCZ>2){
      this.PCZ3=this.pc_znalosti[3].pc_znalosti_id;
      switch (this.pc_znalosti[3].uroven){
        case "Základy": this.PCZU3=1;break;
        case "Pokročilý": this.PCZU3=2;break;
        case "Expert": this.PCZU3=3;break;
      }
    }
    if(this.PCZ>3){
      this.PCZ4=this.pc_znalosti[4].pc_znalosti_id;
      switch (this.pc_znalosti[4].uroven){
        case "Základy": this.PCZU4=1;break;
        case "Pokročilý": this.PCZU4=2;break;
        case "Expert": this.PCZU4=3;break;
      }
    }
    if(this.PCZ>4){
      this.PCZ5=this.pc_znalosti[5].pc_znalosti_id;
      switch (this.pc_znalosti[5].uroven){
        case "Základy": this.PCZU5=1;break;
        case "Pokročilý": this.PCZU5=2;break;
        case "Expert": this.PCZU5=3;break;
      }
    }
    if(this.PCZ>5){
      this.PCZ6=this.pc_znalosti[6].pc_znalosti_id;
      switch (this.pc_znalosti[6].uroven){
        case "Základy": this.PCZU6=1;break;
        case "Pokročilý": this.PCZU6=2;break;
        case "Expert": this.PCZU6=3;break;
      }
    }
    if(this.PCZ>6){
      this.PCZ7=this.pc_znalosti[7].pc_znalosti_id;
      switch (this.pc_znalosti[7].uroven){
        case "Základy": this.PCZU7=1;break;
        case "Pokročilý": this.PCZU7=2;break;
        case "Expert": this.PCZU7=3;break;
      }
    }
    if(this.PCZ>7){
      this.PCZ8=this.pc_znalosti[8].pc_znalosti_id;
      switch (this.pc_znalosti[8].uroven){
        case "Základy": this.PCZU8=1;break;
        case "Pokročilý": this.PCZU8=2;break;
        case "Expert": this.PCZU8=3;break;
      }
    }
    if(this.PCZ>8){
      this.PCZ9=this.pc_znalosti[9].pc_znalosti_id;
      switch (this.pc_znalosti[9].uroven){
        case "Základy": this.PCZU9=1;break;
        case "Pokročilý": this.PCZU9=2;break;
        case "Expert": this.PCZU9=3;break;
      }
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
