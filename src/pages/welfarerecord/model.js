import { message } from 'antd';
import http from '../../common/js/http';
export default {
    namespace: 'welfarerecord',

    state: {
        dataSource:[],//表格数据源
        loading:true,
        totalPages:1,
        totalCount:1,
        pageIndex:1,
        pageSize:10
    },

    subscriptions: {

    },

    effects: {
            /*获取列表数据*/
            *getWelfarerecordList({payload}, {call, put, select}){
                let res =  yield call(()=>(http('gsMoneyBuy/queryList','POST',payload)));
                if(res.code===0){
                    /*添加列表序号*/
                    for (let indexNum=0;indexNum<=res.data.list.length-1;indexNum++) {
                        let obj = Object.assign(res.data.list[indexNum]);
                        obj.index = indexNum+1;
                    }
                    yield put({
                        type:'welfarerecordList',
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
        *getWelfarerecordExport({payload}, {call, put, select}){
            const res =  yield call(()=>(http('gsMoneyBuy/queryListExport','POST',payload)));
            if(res.code===0){
                window.location.href = res.data.url;
            }else{
                message.warning(res.message);
            }
        }
    },

    reducers: {
            'welfarerecordList'(state,{ payload }){
                return {
                    ...state,
                    dataSource: payload.data.list,
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
