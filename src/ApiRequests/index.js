import BaseApi from "@/BaseApi"
import router from "@/router"
import store from "@/store"
const PROFIL_URL="/profil";
const PROFIL_UploadImage_URL="/profil_Update";
const EDIT_PROFIL="/Edit_Profil";
const FIRMA_PROFIL_URL="/Firma_profil";
const EDIT_FIRMA_PROFIL="/Edit_Firma_profil";
const UPDATE_FIRMA_PROFIL="/firma_profil_update";
const FIRMA_PONUKY_URL="/Firma_ponuky";
const ADD_PONUKA_SCREEN_URL="/Add_Ponuka_Screen";
const ADD_PONUKA_URL="/Add_Ponuka";
const REMOVE_PONUKA_URL="/Remove_Ponuka";
const EDIT_PONUKA_URL="/Edit_Ponuka";
const UPDATE_PONUKA_URL="/Update_Ponuka";
const DETAIL_PONUKA_URL="/Detail_Ponuka";
const DECLINE_STUDENT_URL="/Decline_Student";
const ACCEPT_STUDENT_URL="/Accept_Student";
const SHOW_PONUKY_URL="/Show_Ponuky";
const SHOW_STUDENT_ZH_URL="/Show_Student_ZH";
const JE_ZIADOST_URL="/Je_Ziadost";
const STUDENT_REMOVE_URL="/Student_Remove";
const ADD_ZIADOST_URL="/Add_Ziadost";
const SHOW_KOMENTARE="/Show_Komentare";
const STATISTIKY="/Statistiky";
const NAPISTE_NAM="/Napiste_Nam";
const ADMIN_PROFIL="/Admin_Profil";
const EDIT_ADMIN_PROFIL="/Edit_Admin_Profil";
const UPDATE_ADMIN_PROFIL="/Update_Admin_Profil";
const ADMIN_GET_SPRAVY_URL="/Admin_Get_Spravy";
const ADMIN_SPRAVA_ODPOVED_URL="/Admin_Sprava_Odpoved";
const ADMIN_GET_ZOZNAM_UKF_URL="/Admin_Get_Zoznam_UKF";
const ADMIN_ADD_PROGRAM_URL="/Admin_Add_Program";
const ADMIN_UPDATE_PROGRAM_URL="/Admin_Update_Program";
const ADMIN_DELETE_PROGRAM_URL="/Admin_Delete_Program";
const ADMIN_ADD_ADMIN_URL="/Admin_Add_Admin";
const ADMIN_REMOVE_ADMIN_URL="/Admin_Remove_Admin";
const ADMIN_GET_ZOZNAM_FIRIEM_URL="/Admin_Get_Zoznam_Firiem";
const ADMIN_DELETE_FIRMA_URL="/Admin_Delete_Firma";
const ADMIN_ACCEPT_FIRMA_URL="/Admin_Accept_Firma";
const REGISTRACIA_VALUES_URL="/Registracia_values";
const ADMIN_GET_ZOZNAM_PONUK_URL="/Admin_Get_Zoznam_Ponuk";
const POTVRDIT_KOMENTAR_URL="/Admin_Potvrdit_Komentar";
const DELETE_KOMENTAR_URL="/Admin_Delete_Komentar";
const ADMIN_ADD_ZAMERANIE_URL="/Admin_Add_Zameranie";
const ADMIN_UPDATE_ZAMERANIE_URL="/Admin_Update_Zameranie";
const ADMIN_DELETE_ZAMERANIE_URL="/Admin_Delete_Zameranie";
const ADMIN_GET_ZOZNAM_ZNALOSTI_URL="/Admin_Get_Zoznam_Znalosti";
const ADMIN_ADD_JZ_URL="/Admin_Add_JZ";
const ADMIN_UPDATE_JZ_URL="/Admin_Update_JZ";
const ADMIN_ADD_PCZ_URL="/Admin_Add_PCZ";
const ADMIN_UPDATE_PCZ_URL="/Admin_Update_PCZ";
const ADMIN_GET_ZOZNAM_Regionov_URL="/Admin_Get_Zoznam_Regionov";
const ADMIN_ADD_KRAJINA_URL="/Admin_Add_Krajina";
const ADMIN_UPDATE_KRAJINA_URL="/Admin_Update_Krajina";
const ADMIN_ADD_KRAJ_URL="/Admin_Add_Kraj";
const ADMIN_UPDATE_KRAJ_URL="/Admin_Update_Kraj";
const ADMIN_ADD_KOMENTAR_URL="/Stud_Add_Komentar";
const ADMIN_UPDATE_KOMENTAR_URL="/Stud_Update_Komentar";
const ADMIN_DELETE_KOMENTAR_URL="/Stud_Delete_Komentar";




export default ({
  userDefault:{

  },

  //Home
  Statistiky(){
    BaseApi().post(STATISTIKY).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_POCET_F',response.data.pocet_f);
        store.dispatch('SET_POCET_S',response.data.pocet_s);
        store.dispatch('SET_POCET_AKT_P',response.data.pocet_akt_p);
        store.dispatch('SET_POCET_ABS_P',response.data.pocet_abs_p);
        store.dispatch('SET_VSETKY_F',response.data.firmy);
      }
    });
  },

  Napiste_Nam(user,Sprava_Odoslana){
    BaseApi().post(NAPISTE_NAM,user).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_SO',response.data.success);
      }
    });
  },

  Registracia_values(){
    BaseApi().post(REGISTRACIA_VALUES_URL).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_KRAJINY',response.data.krajiny);
        store.dispatch('SET_KRAJ',response.data.kraje);
      }else{
        console.log("NIE!")
      }
    });
  },
  //STUDENT PROFIL
  Profil(cred){
    BaseApi().post(PROFIL_URL,cred,).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_STUDENT_PROFIL',response.data.student_profil);
        store.dispatch('SET_STUDENT_FILES',response.data.student_files);
        store.dispatch('SET_J_ZNALOSTI',response.data.j_znalosti);
        store.dispatch('SET_PC_ZNALOSTI',response.data.pc_znalosti);
        store.dispatch('SET_STUDENT',response.data.student);
        router.push('/profil');
      }else{
        console.log("NIE!")
      }
    });
  },

  EditProfil(){
    BaseApi().post(EDIT_PROFIL).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_J_Z',response.data.j_z);
        store.dispatch('SET_PC_Z',response.data.pc_z);
        router.push('/Edit_profil');
      }else{
        console.log("NIE")
      }
    });
  },
  Profil_UploadImage(formData){
    BaseApi().post(PROFIL_UploadImage_URL,formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response)=>{
      if(response.data.success){
        if(response.data.student_files != null){
          store.dispatch('SET_STUDENT_FILES',response.data.student_files);
        }
        store.dispatch('SET_STUDENT',response.data.stud);
        store.dispatch('SET_J_ZNALOSTI',response.data.j_z);
        store.dispatch('SET_PC_ZNALOSTI',response.data.pc_z);


        router.push('/profil');

      }else{

        console.log("NIE")
      }
    });
  },

  ShowPonuky(){
    BaseApi().post(SHOW_PONUKY_URL).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_PONUKA',response.data.ponuky);
        store.dispatch('SET_PROGRAMY',response.data.obory);
        store.dispatch('SET_ZAMERANIA',response.data.zamerania);
        store.dispatch('SET_KRAJINY',response.data.krajiny);
        store.dispatch('SET_KRAJ',response.data.kraje);
      }else{
        console.log("NIE")
      }
    });
  },

  ShowStudent_Ziad_Hod(student){
    BaseApi().post(SHOW_STUDENT_ZH_URL,student).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_AIS_PONUKY',response.data.ziadosti);
      }else{
        console.log("NIE")
      }
    });
  },

  STUD_Add_Komentar(Komentar){
    BaseApi().post(ADMIN_ADD_KOMENTAR_URL,Komentar).then((response)=>{
      if(response.data.success){

      }else{
      }
    });
  },
  STUD_Update_Komentar(Komentar){
    BaseApi().post(ADMIN_UPDATE_KOMENTAR_URL,Komentar).then((response)=>{
      if(response.data.success){

      }else{
      }
    });
  },

  Student_Remove_Komentar(Komentar){
    BaseApi().post(ADMIN_DELETE_KOMENTAR_URL,Komentar).then((response)=>{
      if(response.data.success){

      }else{
      }
    });
  },

  Je_Ziadost(student,ponuka){
    BaseApi().post(JE_ZIADOST_URL,{student,ponuka}).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_JE_ZIADOST',response.data.je_ziadost);
      }else{
        console.log("NIE")
      }
    });
  },

  Student_Remove(ponuka){
    BaseApi().post(STUDENT_REMOVE_URL,ponuka).then((response)=>{
      if(response.data.success == true){
      }else{
        console.log("NIE")
      }
    });
  },

  Add_Ziadost(student,ponuka){
    BaseApi().post(ADD_ZIADOST_URL,{student,ponuka}).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_JE_ZIADOST',response.data.je_ziadost);
      }else{
        console.log("NIE")
      }
    });
  },

  Detail_Ponuka(ponuka){
    BaseApi().post(DETAIL_PONUKA_URL,ponuka).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_PONUKA',response.data.Ponuka);
        store.dispatch('SET_FIRMA',response.data.Firma);
        store.dispatch('SET_FIRMA_PROFIL',response.data.firma_image);
        store.dispatch('SET_AIS_PONUKY',response.data.Ais_Ponuky);
        router.push('/Detail_Ponuka');
      }else{
        console.log("NIE")
      }
    });
  },

  Firma_Profil(cred){
    BaseApi().post(FIRMA_PROFIL_URL,cred,).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_FIRMA_PROFIL',response.data.firma_profil);
        store.dispatch('SET_KRAJINY',response.data.krajina);
        store.dispatch('SET_KRAJ',response.data.kraj);
        store.dispatch('SET_CONT_OSOBA',response.data.Cont_Osoba);
        store.dispatch('SET_FIRMA',response.data.firma);
        router.push("/firma")
      }else{
        console.log("NIE")
      }
    });
  },

  ShowKomentare(firma){
    BaseApi().post(SHOW_KOMENTARE,firma,).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_KOMENTARE',response.data.komentare);
      }else{
        console.log("NIE")
      }
    });
  },

  Edit_Firma_Profil(){
    BaseApi().post(EDIT_FIRMA_PROFIL).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_KRAJINY',response.data.krajiny);
        store.dispatch('SET_KRAJ',response.data.kraj);
      }else{
        console.log("NIE")
      }
    });
  },

  Update_Firma_Profil(formData){
    BaseApi().post(UPDATE_FIRMA_PROFIL,formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response)=>{
      if(response.data.success){
        if(response.data.firma_profil != null){
          store.dispatch('SET_FIRMA_PROFIL',response.data.firma_profil);
        }
        store.dispatch('SET_FIRMA',response.data.firma);
        store.dispatch('SET_KRAJINY',response.data.krajina);
        store.dispatch('SET_KRAJ',response.data.kraj);
        store.dispatch('SET_CONT_OSOBA',response.data.Cont_Osoba);
        router.push('/firma');

      }else{

        console.log("NIE")
      }
    });
  },

  Firma_Ponuky(cred){
    BaseApi().post(FIRMA_PONUKY_URL,cred,).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_PONUKA',response.data.Ponuky);
      }else{
        console.log("NIE")
      }
    });
  },

  Add_Ponuka_Screen(){
    BaseApi().post(ADD_PONUKA_SCREEN_URL).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_KRAJINY',response.data.krajiny);
        store.dispatch('SET_KRAJ',response.data.kraje);
        store.dispatch('SET_PROGRAMY',response.data.programy);
        store.dispatch('SET_ZAMERANIA',response.data.zamerania);
        router.push('/add_Ponuka');
      }else{
        console.log("NIE")
      }
    });
  },

  Add_Ponuka(ponuka,firma){
    BaseApi().post(ADD_PONUKA_URL,{ponuka,firma}).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_PONUKA',response.data.Ponuky);
        router.push('/ponuky');
      }else{
        console.log("NIE")
      }
    });
  },

  Remove_Ponuka(id,firma_id){
    BaseApi().post(REMOVE_PONUKA_URL,{id,firma_id}).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_PONUKA',response.data.Ponuky);
      }else{
        console.log("NIE")
      }
    });
  },

  Edit_Ponuka(ponuka){
    BaseApi().post(EDIT_PONUKA_URL,ponuka).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_PONUKA',response.data.Ponuky);
        store.dispatch('SET_KRAJINY',response.data.krajiny);
        store.dispatch('SET_KRAJ',response.data.kraje);
        store.dispatch('SET_PROGRAMY',response.data.programy);
        store.dispatch('SET_ZAMERANIA',response.data.zamerania);
        router.push('/Edit_ponuka');
      }else{
        console.log("NIE")
      }
    });
  },

  Update_Ponuka(ponuka){
    BaseApi().post(UPDATE_PONUKA_URL,ponuka).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_PONUKA',response.data.Ponuky);
        router.push('/ponuky');
      }else{
        console.log("NIE")
      }
    });
  },


  Decline_Student(Stud_ID){
    BaseApi().post(DECLINE_STUDENT_URL,Stud_ID).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_AIS_PONUKY',response.data.Ais_Ponuky);
      }else{
        console.log("NIE")
      }
    });
  },

  Accept_Student(Stud_ID){
    BaseApi().post(ACCEPT_STUDENT_URL,Stud_ID).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_AIS_PONUKY',response.data.Ais_Ponuky);
      }else{
        console.log("NIE")
      }
    });
  },


  //Admin
  Admin_Profil(cred){
    BaseApi().post(ADMIN_PROFIL,cred).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_ADMIN_IMAGE',response.data.admin_image);
        store.dispatch('SET_KRAJINY',response.data.krajina);
        store.dispatch('SET_KRAJ',response.data.kraj);
        router.push('/Admin_Profil');
      }else{
        console.log("NIE")
      }
    });
  },
  Edit_Admin_Profil(){
    BaseApi().post(EDIT_ADMIN_PROFIL).then((response)=>{
      if(response.data.success == true){
        store.dispatch('SET_KRAJINY',response.data.krajiny);
        store.dispatch('SET_KRAJ',response.data.kraje);
        router.push('/Edit_Admin_Profil');
      }else{
        console.log("NIE")
      }
    });
  },
  Admin_Profil_Update(formData){
    BaseApi().post(UPDATE_ADMIN_PROFIL,formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response)=>{
      if(response.data.success){
        if(response.data.image != null){
          store.dispatch('SET_ADMIN_IMAGE',response.data.image);
        }
        store.dispatch('SET_ADMIN',response.data.admin);
        store.dispatch('SET_KRAJINY',response.data.krajina);
        store.dispatch('SET_KRAJ',response.data.kraj);
        router.push('/Admin_Profil');

      }else{

        console.log("NIE")
      }
    });
  },
  Admin_Get_Spravy(){
    BaseApi().post(ADMIN_GET_SPRAVY_URL).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_SPRAVY',response.data.spravy);
      }else{
        console.log("NIE")
      }
    });
  },
  Admin_Odpoved(Sprava){
    BaseApi().post(ADMIN_SPRAVA_ODPOVED_URL,Sprava).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_SPRAVY',response.data.spravy);
      }else{
        console.log("NIE")
      }
    });
  },
  Admin_Get_Zoznam_UKF(){
    BaseApi().post(ADMIN_GET_ZOZNAM_UKF_URL).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_ZOZNAM_STUDENTOV',response.data.studenti);
        store.dispatch('SET_ZOZNAM_PROGRAMOV',response.data.programy);
        store.dispatch('SET_ZOZNAM_FAKULT',response.data.fakulty);
        store.dispatch('SET_ZOZNAM_ZAMESTNANCOV',response.data.zamestnaci);
        store.dispatch('SET_ZOZNAM_ZAMERANI',response.data.zamerania);
      }else{
        console.log("NIE")
      }
    });
  },
  Admin_Add_Program(program){
    BaseApi().post(ADMIN_ADD_PROGRAM_URL,program).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_ZOZNAM_PROGRAMOV',response.data.programy);
      }else{
      }
    });
  },
  Admin_Update_Program(program){
    BaseApi().post( ADMIN_UPDATE_PROGRAM_URL,program).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_ZOZNAM_PROGRAMOV',response.data.programy);
      }else{
      }
    });
  },
  Admin_Delete_Program(program){
    BaseApi().post( ADMIN_DELETE_PROGRAM_URL,program).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_ZOZNAM_PROGRAMOV',response.data.programy);
      }else{
      }
    });
  },
  Admin_Add_Admin(zam){
    BaseApi().post(ADMIN_ADD_ADMIN_URL,zam).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_ZOZNAM_ZAMESTNANCOV',response.data.zamestnaci);
      }else{
      }
    });
  },
  Admin_Remove_Admin(zam){
    BaseApi().post(ADMIN_REMOVE_ADMIN_URL,zam).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_ZOZNAM_ZAMESTNANCOV',response.data.zamestnaci);
      }else{
      }
    });
  },

  Admin_Get_Zoznam_Firiem(){
  BaseApi().post(ADMIN_GET_ZOZNAM_FIRIEM_URL).then((response)=>{
    if(response.data.success){
      store.dispatch('SET_ZOZNAM_FIRIEM',response.data.firmy);
    }else{
      console.log("NIE")
    }
  });
},

  Admin_Delete_Firma(cred){
    BaseApi().post(ADMIN_DELETE_FIRMA_URL,cred).then((response)=>{
      if(response.data.success){
       //?
      }else{
        console.log("NIE")
      }
    });
  },

  Admin_Accept_Firma(firma){
    BaseApi().post(ADMIN_ACCEPT_FIRMA_URL,firma).then((response)=>{
      if(response.data.success){
        //?
      }else{
        console.log("NIE")
      }
    });
  },

  Admin_Get_Zoznam_Ponuk(){
    BaseApi().post(ADMIN_GET_ZOZNAM_PONUK_URL).then((response)=>{
      if(response.data.success){
         store.dispatch('SET_ZOZNAM_AKT_PONUK',response.data.AKT_ponuky);
         store.dispatch('SET_ZOZNAM_ABS_PONUK',response.data.ABS_ponuky);
        store.dispatch('SET_ZOZNAM_KOMENTAROV',response.data.komentare);
        store.dispatch('SET_ZOZNAM_NOVYCH_KOMENTAROV',response.data.nove_komentare);
      }else{
        console.log("NIE")
      }
    });
  },

  Potvrdit_Komentar(komentar){
    BaseApi().post(POTVRDIT_KOMENTAR_URL,komentar).then((response)=>{
      if(response.data.success){
       //?
      }else{
        console.log("NIE")
      }
    });
  },

  Delete_Komentar(komentar){
    BaseApi().post(DELETE_KOMENTAR_URL,komentar).then((response)=>{
      if(response.data.success){
        //?
      }else{
        console.log("NIE")
      }
    });
  },

  Admin_Add_Zameranie(zameranie){
    BaseApi().post(ADMIN_ADD_ZAMERANIE_URL,zameranie).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_ZOZNAM_ZAMERANI',response.data.zamerania);
      }else{
      }
    });
  },
  Admin_Update_Zameranie(zameranie){
    BaseApi().post(ADMIN_UPDATE_ZAMERANIE_URL,zameranie).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_ZOZNAM_ZAMERANI',response.data.zamerania);
      }else{
      }
    });
  },

  Admin_Delete_Zameranie(zameranie){
    BaseApi().post(ADMIN_DELETE_ZAMERANIE_URL,zameranie).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_ZOZNAM_ZAMERANI',response.data.zamerania);
      }else{
      }
    });
  },

  Admin_Get_Zoznam_Znalosti(){
    BaseApi().post(ADMIN_GET_ZOZNAM_ZNALOSTI_URL).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_J_Z',response.data.j_z);
        store.dispatch('SET_PC_Z',response.data.pc_z);
      }else{
        console.log("NIE")
      }
    });
  },

  Admin_Add_JZ(JZ){
    BaseApi().post(ADMIN_ADD_JZ_URL,JZ).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_J_Z',response.data.j_z);
      }else{
      }
    });
  },
  Admin_Update_JZ(JZ){
    BaseApi().post(ADMIN_UPDATE_JZ_URL,JZ).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_J_Z',response.data.j_z);
      }else{
      }
    });
  },

  Admin_Add_PCZ(PCZ){
    BaseApi().post(ADMIN_ADD_PCZ_URL,PCZ).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_PC_Z',response.data.pc_z);
      }else{
      }
    });
  },
  Admin_Update_PCZ(PCZ){
    BaseApi().post(ADMIN_UPDATE_PCZ_URL,PCZ).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_PC_Z',response.data.pc_z);
      }else{
      }
    });
  },

  Admin_Get_Zoznam_Regionov(){
    BaseApi().post(ADMIN_GET_ZOZNAM_Regionov_URL).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_KRAJINY',response.data.krajiny);
        store.dispatch('SET_KRAJ',response.data.kraje);
      }else{
        console.log("NIE")
      }
    });
  },

  Admin_Add_Krajina(Krajina){
    BaseApi().post(ADMIN_ADD_KRAJINA_URL,Krajina).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_KRAJINY',response.data.krajiny);
      }else{
      }
    });
  },
  Admin_Update_Krajina(Krajina){
    BaseApi().post(ADMIN_UPDATE_KRAJINA_URL,Krajina).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_KRAJINY',response.data.krajiny);
      }else{
      }
    });
  },

  Admin_Add_Kraj(Kraj){
    BaseApi().post(ADMIN_ADD_KRAJ_URL,Kraj).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_KRAJ',response.data.kraje);
      }else{
      }
    });
  },
  Admin_Update_Kraj(Kraj){
    BaseApi().post(ADMIN_UPDATE_KRAJ_URL,Kraj).then((response)=>{
      if(response.data.success){
        store.dispatch('SET_KRAJ',response.data.kraje);
      }else{
      }
    });
  },




});
