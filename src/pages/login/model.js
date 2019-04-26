import { routerRedux } from 'dva/router'
import { message } from 'antd';
import request from 'common/js/axios'
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
            const data = yield call(()=>request('api/login','POST',form));
            switch (data.code) {    
                case '0000':
                    message.success('登录成功！', 2.5);
                    hide();
                    yield put(routerRedux.push('./managementApi'));
                    break;
                case '0001':
                    message.error('账号不存在！', 2.5);
                    break;
                case '0002':
                    hide();
                    message.error('密码错误！', 2.5);
                    break;
                default:
                    hide();
                    message.error('网络错误！', 2.5);
                    break;
            }
        }
    },

    reducers: {
        
    }
};
