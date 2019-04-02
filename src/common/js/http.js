const token = '2NE6BJMG3VGYYYPSBH6RCHWZLJTVHTYUUVYZF64HWM4X5CZ6MWHIW3B46XUSXFAXOJTK3VLLSKIY6GVPRPPQ2DW4RXSE5URLHEEVB3JYQ3KAMU2NPBDTYAIU6ZDNAH7IPJ5HEJH3'
const http = (url,method,params,config) =>{
    let data = {
        method:method
    };
    if(config){
        data = {
            method:method,
            ...config
        }
    }else{
        data = {
            method:method,
            headers:{
                "content-type":"application/x-www-form-urlencoded"
            }
        }
    }
    if(params){
        data.body = params
    }
    if(url&&method){
        return fetch(url+'?token='+token,data).then((res)=>res.json().then((data)=>{
            return data
        }).catch((err)=>{
            return err
        }));
    }
};
export default http;
