import  service from '../../services/login';
import { message } from 'antd';
const {api,method} = service.login;
export default {
    namespace: 'login',

    state: {

    },

    subscriptions: {

    },

    effects: {
        * submit({payload}, {call, put, select}){
            const hide = message.loading('正在登录...', 0);
            const form = payload.formData;
            const data = yield call(()=>{
                return fetch(api,{
                    method:method,
                    body:JSON.stringify(form),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((res)=>res.json()).then((data)=>{
                    hide();
                    return data;
                }).catch((err)=>{
                    return err
                })
            });
            switch (data.code) {
                case '0000':
                    message.success('登录成功！', 2.5);
                    payload.history.replace('./index');
                    break;
                case '0001':
                    message.error('账号不存在！', 2.5);
                    break;
                case '0002':
                    message.error('密码错误！', 2.5);
                    break;
                default:
                    message.error('网络错误！', 2.5);
                    break;
            }
        }
    },

    reducers: {
        'loginStatus'(state,{payload}){

        }
    }
};
