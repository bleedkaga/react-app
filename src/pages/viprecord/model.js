import { message } from 'antd';
import http from '../../common/js/http';
export default {
    namespace: 'viprecord',

    state: {
        dataSource:[],//表格数据源
        loading:true,
        totalPages:1,
        totalCount:0,
        pageIndex:1,
        pageSize:10
    },

    subscriptions: {

    },

    effects: {
            /*获取列表数据*/
            *getViprecordList({payload}, {call, put, select}){
                const res =  yield call(()=>(http('companyManageController/queryVIPCompanyList','POST',payload)));
                if(res.code===0){
                    /*添加列表序号*/
                    for (let indexNum=0;indexNum<=res.data.length-1;indexNum++) {
                        let obj = Object.assign(res.data[indexNum]);
                        obj.index = indexNum+1;
                    }
                    yield put({
                        type:'viprecordList',
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
        /*下载列表数据*/
        *getViprecordExport({payload}, {call, put, select}){
            const res =  yield call(()=>(http('companyManageController/exportVIPCompanyList','POST',payload)));
            if(res.code===0){
                window.location.href = res.data.url;
            }else{
                message.warning(res.message);
            }
        }
    },

    reducers: {
            'viprecordList'(state,{ payload }){
                return {
                    ...state,
                    dataSource: payload.data,
                    totalPages: payload.totalPages,
                    totalCount:payload.totalCount,
                    pageIndex: payload.pageIndex,
                    pageSize:payload.pageSize
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
