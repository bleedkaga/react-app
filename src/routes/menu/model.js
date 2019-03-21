import service from "../../services/login";
const {api,method} = service.menuList;
export default {
    namespace: 'menu',

    state: {
        dataSource:[]
    },

    reducers: {
        'list'(state,{ payload }){
            return {
                ...state,
                dataSource: payload.list
            }
        }

    },

    effects: {
        * getList ({payload}, {call, put, select}){
            const data = yield call(()=>{
                return fetch(api,{
                    method:method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((res)=>res.json()).then((data)=>{
                    return data
                }).catch((err)=>{
                    return err
                })
            });
            yield put({
                type:'list',
                payload:{
                    list:data
                }
            })
        }
    },

    subscriptions: {

    }

};
