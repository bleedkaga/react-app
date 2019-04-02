import { message } from 'antd';
import http from '../../common/js/http';
import qs from "query-string";
export default {
    namespace: 'serviceadviser',

    state: {
        dataSource:[],//表格数据源
        channelList:[],//所属渠道下拉数据
        serviceList:[],//服务顾问下拉数据
        companyList:[],//待转企业
        loading:true,
        totalPages:1,
        totalCount:0,
        pageIndex:1,
        pageSize:10
    },

    subscriptions: {

    },

    effects: {
        /*获取所属渠道下拉数据*/
        *getChannelList({payload}, {call, put, select}){
            const res = yield call(()=>(http('gsChannelManagement/queryChannel','POST',payload)));
            if(res.code===0){
                yield put({
                    type:'channelList',
                    payload:res
                });
            }else{
                message.warning(res.message);
            }
        },
        /*获取服务顾问下拉数据*/
        *getServiceList({payload}, {call, put, select}){
            const res = yield call(()=>(http('gsServiceConsultantManagement/queryServiceConsultantManagement','POST',payload)));
            if(res.code===0){
                yield put({
                    type:'serviceList',
                    payload:res
                });
            }else{
                message.warning(res.message);
            }
        },
        /*新增服务顾问*/
        *addServicedviser({payload}, {call, put, select}){
            const res = yield call(()=>(http('gsServiceConsultantManagement/addServiceManagement','POST',payload)));
            if(res.code===0){
               yield put({
                   type:'getServiceadviserList',
                   payload:qs.stringify({
                       pageIndex:1,
                       pageSize:10
                   })
               });
                message.success('添加成功');
            }else{
                message.warning(res.message);
            }
        },
        /*编辑服务顾问*/
        *editServicedviser({payload}, {call, put, select}){
            const res = yield call(()=>(http('gsServiceConsultantManagement/updateServiceManagement','POST',payload)));
            if(res.code===0){
                yield put({
                    type:'getServiceadviserList',
                    payload:qs.stringify({
                        pageIndex:1,
                        pageSize:10
                    })
                });
                message.success('编辑成功');
            }else{
                message.warning(res.message);
            }
        },
        /*删除服务顾问*/
        *deleteServicedviser({payload}, {call, put, select}){
            const res = yield call(()=>(http('gsServiceConsultantManagement/delServiceConsultant','POST',payload)));
            if(res.code===0){
                yield put({
                    type:'getServiceadviserList',
                    payload:qs.stringify({
                        pageIndex:1,
                        pageSize:10
                    })
                });
                message.success('删除成功');
            }else{
                message.warning(res.message);
            }
        },
        /*获取列表数据*/
        *getServiceadviserList({payload}, {call, put, select}){
            const res =  yield call(()=>(http('gsServiceConsultantManagement/queryServiceConsultantManagement','POST',payload)));
            if(res.code===0){
                /*添加列表序号*/
                for (let indexNum=0;indexNum<=res.data.length-1;indexNum++) {
                    let obj = Object.assign(res.data[indexNum]);
                    obj.index = indexNum+1;
                }
                yield put({
                    type:'serviceadviserList',
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
        *getServiceadviserExport({payload}, {call, put, select}){
        const res =  yield call(()=>(http('gsServiceConsultantManagement/downloadServiceConsultant','POST',payload)));
        if(res.code===0){
            window.location.href = res.data.url;
        }else{
            message.warning(res.message);
        }
    },
        /*获取待转企业数据*/
        *getCompanyList({payload}, {call, put, select}){
            const res =  yield call(()=>(http('gsServiceConsultantManagement/getManagementCompanyList','POST',payload)));
            if(res.code===0){
                res.data.forEach((item) => {
                    let obj = Object.assign(item);
                    obj.key = item.id;
                });
               yield put({
                   type:'companyList',
                   payload:res
               })
            }else{
                message.warning(res.message);
            }
        },
        /*转接客户操作*/
        *connectService({payload}, {call, put, select}){
            const res =  yield call(()=>(http('gsServiceConsultantManagement/batchCustomerTransfer','POST',payload)));
            if(res.code===0){
                yield put({
                    type:'getServiceadviserList',
                    payload:qs.stringify({
                        pageIndex:1,
                        pageSize:10
                    })
                });
                message.success('批量移动成功');
            }else{
                message.warning(res.message);
            }
        }
    },

    reducers: {
            /*返回列表数据*/
            'serviceadviserList'(state,{ payload }){
                return {
                    ...state,
                    dataSource: payload.data,
                    totalPages: payload.totalPages,
                    totalCount:payload.totalCount,
                    pageIndex: payload.pageIndex,
                    pageSize:payload.pageSize
                }
            },
            /*返回所属渠道数据*/
            'channelList'(state,{ payload }){
                return {
                    ...state,
                    channelList: payload.data
                }
            },
            /*返回服务顾问数据*/
            'serviceList'(state,{ payload }){
                return {
                    ...state,
                    serviceList: payload.data
                }
            },
            /*返回待转企业数据*/
            'companyList'(state,{payload}){
                return {
                    ...state,
                    companyList: payload.data
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
