import axios from 'axios';
const apiAxios = (url,method,params,config) =>{
    let options = {};
    if(config){
        options = {
            url:url,
            method:method,
            ...config
        }
    }else{
        options = {
            url:url,
            method:method,
            headers:{
                "content-type":"application/json"
            }
        }
    }
    if(params){
        method==='GET'?  options.params = params :  options.data = params;
    }
    if(url&&method){
        return axios(options).then((data)=>{
            return data.data
        }).catch((err)=>{
            return err
        });
    }
};
const GET = (url,params,config) => {
    return apiAxios(url,"GET",params,config);
};
const POST = (url,params,config)=>{
   return apiAxios(url,"POST",params,config);
};
export {
    GET,
    POST,
};
