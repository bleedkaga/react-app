import { message } from 'antd';
import { POST, GET } from '../../common/js/axios';
export default {
    namespace: 'apiManagement',

    state: {
        dataSource:[],
        loading:true,
        totalPages:1,
        totalCount:0,
        pageIndex:1,
        pageSize:10
    },

    subscriptions: {

    },

    effects: {
        /*获取API列表*/
        *getApiManagementList({payload}, {call, put, select}){
            const res =  yield call(()=>(GET('/api/apiManagement',payload)));
            if(res.code===0){
                /*添加列表序号*/
                for (let indexNum=0;indexNum<=res.data.length-1;indexNum++) {
                    let obj = Object.assign(res.data[indexNum]);
                    obj.index = indexNum+1;
                }
                yield put({
                    type:'apiManagementList',
                    payload:res
                });
                yield put({
                    type:'loading',
                    payload:false
                });
            }else{
                yield put({
                    type:'loading',
                    payload:false
                });
            }
        },
        /*新增API*/
        *createApiManagement({payload}, {call, put, select}){
            const res =  yield call(()=>(POST('/api/apiManagement',payload)));
        }
    },

    reducers: {
        'apiManagementList'(state,{ payload }){
            return {
                ...state,
                dataSource: payload.data,
            }
        },
        'loading'(state,{payload}){
            return {
                ...state,
                loading:payload
            }
        }
    }
};
