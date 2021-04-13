import axios from "axios";

let BaseApi=axios.create({
  baseURL:"http://lumen.pro/api"
});

const Api = function (){

  return BaseApi;
}

export default Api
