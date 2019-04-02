import http from '../../common/js/http'
export default {
    namespace: 'serviceadviserchangelist',

    state: {
        dataSource:[],//表格数据源
        detailsDataSource:[],
        loading:true,
        detailsLoading:true,
        totalPages:1,
        totalCount:0,
        pageIndex:1,
        pageSize:10
    },

    subscriptions: {

    },

    effects: {
            /*获取列表数据*/
            *getServiceadviserchangeList({payload}, {call, put, select}){
                const res =  yield call(()=>(http('gsTransferRecord/queryTransferRecord','POST',payload)));
                if(res.code===0){
                    /*添加列表序号*/
                    for (let indexNum=0;indexNum<=res.data.length-1;indexNum++) {
                        let obj = Object.assign(res.data[indexNum]);
                        obj.index = indexNum+1;
                    }
                    yield put({
                        type:'serviceadviserchangeList',
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
            *getServiceadviserchangeDetails({payload}, {call, put, select}){
                const res = yield call(()=>(http('gsTransferRecord/queryTransferEnterprise','POST',payload)));
                if(res.code===0){
                    /*添加列表序号*/
                    for (let indexNum=0;indexNum<=res.data.length-1;indexNum++) {
                        let obj = Object.assign(res.data[indexNum]);
                        obj.index = indexNum+1;
                    }
                    yield put({
                        type:'serviceadviserchangeDetails',
                        payload:res
                    });
                    yield put({
                        type:'detailsLoading',
                        payload:false
                    });
                }else{
                    yield put({
                        type:'detailsLoading',
                        payload:false
                    });
                }
            }
    },

    reducers: {
            'serviceadviserchangeList'(state,{ payload }){
                return {
                    ...state,
                    dataSource: payload.data,
                    totalPages: payload.totalPages,
                    totalCount:payload.totalCount,
                    pageIndex: payload.pageIndex,
                    pageSize:payload.pageSize
                }
            },
            'serviceadviserchangeDetails'(state,{ payload }){
                    return {
                        ...state,
                        detailsDataSource:payload.data
                    }
            },
            'loading'(state,{payload}){
                return {
                    ...state,
                    loading:payload
                }
            },
            'detailsLoading'(state,{payload}){
                return {
                    ...state,
                    detailsLoading:payload
                }
            }
    }
};
