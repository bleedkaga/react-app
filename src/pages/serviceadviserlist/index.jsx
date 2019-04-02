import React, { Component } from 'react';
import {Form, Table, Input, Button, Select, LocaleProvider, Pagination, Tag, Divider, Modal } from 'antd';
import qs from 'query-string';
import lt from 'lego-tools';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { connect } from 'dva';
import { AddAndEdit, ConnectClient } from './modalForm';
import './index.less';
const Option = Select.Option;
/*option text*/
let channelDesc='',
    typesDesc = '',
    typesDescState = false,
    channelDescState = false;
class Serviceadviser extends Component{
    state = {
        modalVisible:false,/*新增编辑modal显示隐藏*/
        addAanEditTitle:'新增服务顾问',/*新增编辑modal标题*/
        initValues:{},/*服务顾问编辑初始值*/
        clientModalVisible:false,/*转接客户modal显示隐藏*/
        targetCompanyList:[],/*穿梭框右侧数据*/
        rowData:{},/*列表行数据*/
    };
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
            type:'serviceadviser/getServiceadviserList',
            payload:qs.stringify({
                pageIndex:1,
                pageSize:10
            })
        });
        dispatch({
            type:'serviceadviser/getChannelList'
        });
    };
    /*查询表单参数处理*/
    paramsInit=(err,fieldsValue,pagination)=>{
        if (err) {
            return;
        }
        let values = {
            ...fieldsValue
        };
        if(pagination||pagination!==undefined){
            values.pageIndex = pagination.current;
            values.pageSize = pagination.pages;
        }else{
            values.pageIndex = 1;
            values.pageSize = 10;
        }
        for (let index in values){
            if(values[index] === undefined||values[index] === ''){
                delete values[index];
            }
        }
        return values;
    };
    /*顾问名单列表导出*/
    downLoadExport = (e) =>{
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFields((err, fieldsValue) => {
            const  values = this.paramsInit(err, fieldsValue);
            dispatch({
                type:'serviceadviser/getServiceadviserExport',
                payload:qs.stringify(values)
            });
        });
    };
    /*顾问白名单列表查询*/
    handleSearch = (e) =>{
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFields((err, fieldsValue) => {
            const  values = this.paramsInit(err, fieldsValue);
            dispatch({
                type:'serviceadviser/getServiceadviserList',
                payload:qs.stringify(values)
            });
        });
    };
    /*点击新增编辑事件*/
    addAndEdit = (e,row) =>{
        this.setState({
            modalVisible:true
        });
        if(row&&row!==undefined){
            this.setState({
                addAanEditTitle:'编辑服务顾问',
                initValues:row
            });
        }else{
            this.setState({
                addAanEditTitle:'新增服务顾问',
                initValues:false
            });
        }
    };
    /*新增编辑子表单*/
    formRef = (form) =>{
        this.childForm = form;
    };
    /*新增编辑获取顾问类型optionText*/
    getOptionTextType = (value,option) =>{
        typesDesc=option.props.children;
        typesDescState = true;
    };
    /*新增编辑获取所属渠道optionText*/
    getOptionTextChanel = (value,option) => {
        channelDesc=option.props.children;
        channelDescState = true;
    };
    /*新增编辑弹出框确认*/
    onConfirm = () =>{
        this.childForm.validateFields((err, fieldsValue) =>{
            if(!!err){
                return
            }
            const { dispatch } = this.props;
            let values = {
                ...fieldsValue
            };
            if(!this.state.initValues){
                values.channelDesc = channelDesc;
                values.typesDesc = typesDesc;
                dispatch({
                    type:'serviceadviser/addServicedviser',
                    payload:qs.stringify(values)
                });
            }else{
                typesDescState ?  values.typesDesc = typesDesc : values.typesDesc = this.state.initValues.typesDesc;
                channelDescState ? values.channelDesc = channelDesc : values.channelDesc = this.state.initValues.channelDesc;
                values.id = this.state.initValues.id;
                dispatch({
                    type:'serviceadviser/editServicedviser',
                    payload:qs.stringify(values)
                });
            }
            this.setState({
                modalVisible:false
            });
        })
    };
    /*新增编辑弹出框取消*/
    onCancel = () =>{
        this.setState({
            modalVisible:false
        })
    };
    /*删除服务顾问*/
    deleteServiceadviser= (row) =>{
        const {dispatch} = this.props;
        let values = {
            id:row.id,
            serviceName:row.serviceName,
            servicePhone:row.servicePhone
        };
        Modal.confirm({
            title: '提示',
            content: `是否删除服务顾问"${row.serviceName}"?`,
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                dispatch({
                    type:'serviceadviser/deleteServicedviser',
                    payload:qs.stringify(values)
                });
            }
        });
    };
    /*点击转接客户事件*/
    connectClient = (row) =>{
        const { dispatch } = this.props;
        let values = {};
        this.setState({
            clientModalVisible:true,
            rowData:row
        });
        if(row){
            values.serviceName = row.serviceName;
            values.servicePhone = row.servicePhone;
            values.id = row.id;
        }
        dispatch({
            type:'serviceadviser/getCompanyList',
            payload:qs.stringify(values)
        })
    };
    /*待转接设置成拟转出*/
    handleChange = (targetKeys) =>{
        this.setState({
            targetCompanyList:targetKeys
        })
    };
    /*选择所属渠道后查询服务顾问数据*/
    getServiceList = (value) =>{
        const { dispatch } = this.props;
        dispatch({
            type:'serviceadviser/getServiceList',
            payload:qs.stringify({
                id:value,
                pageSize:1000,
                pageIndex:1
            })
        })
    };
    /*转接客户子表单*/
    clientFormRef = (form) =>{
        this.childClientForm = form;
    };
    /*转接客户弹出框确认*/
    onClientConfirm = () =>{
        this.childClientForm.validateFields((err, fieldsValue) => {
            if (!!err) {
                return
            }
            const { serviceList } = this.props.serviceadviser;
            const { dispatch } = this.props;
            /*服务顾问参数处理*/
            const service = serviceList.filter((item) => {
               return item.id === fieldsValue.types;
            });
            /*右侧公司数据处理*/
            const companyList = this.state.targetCompanyList;
            let companyString = '';
            companyList.forEach((item)=>{
                companyString+=item+','
            });
            companyString = companyString.slice(0,companyString.length-1);
            let values = {
                companyId:companyString,
                id:this.state.rowData.id,
                handoverName:this.state.rowData.serviceName,
                handoverPhone:this.state.rowData.servicePhone,
                receiverName:service[0].serviceName,
                receiverPhone:service[0].servicePhone,
                operation:'罗雪松'
            };
            dispatch({
                type:'serviceadviser/connectService',
                payload:qs.stringify(values)
            });
            this.setState({
                clientModalVisible:false
            });
        })

    };
    /*转接客户弹出框取消*/
    onClientCancel = () =>{
        this.setState({
            clientModalVisible:false
        })
    };
    /*分页条*/
    onCurrentChange = (current,pages) =>{
        const { dispatch } = this.props;
        this.props.form.validateFields((err, fieldsValue) => {
            const  values = this.paramsInit(err, fieldsValue,{current,pages});
            dispatch({
                type:'serviceadviser/getServiceadviserList',
                payload:qs.stringify(values)
            });
        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const { dataSource, totalCount, loading, channelList, companyList, serviceList} = this.props.serviceadviser;
        const columns = [
            {title: '序号', dataIndex: 'index',key:'index'},
            {title: '姓名', dataIndex: 'serviceName',key:'serviceName'},
            {title: '电话', dataIndex: 'servicePhone',key:'servicePhone'},
            {title: '所属渠道', dataIndex: 'channelDesc',key:'channelDesc'},
            {
                title: '单位客户数', dataIndex: 'unitCustomer',key:'unitCustomer',
                render:(text, record)=>(<Tag color="green">{record.unitCustomer}</Tag>)
            },
            {
                title: '开通vip单位数', dataIndex: 'vipCompanyQuantity',key:'vipCompanyQuantity',
                render:(text, record)=>(<Tag color="green">{record.vipCompanyQuantity}</Tag>)
            },
            {
                title: '福利业绩', dataIndex: 'welfarePerformance',key:'welfarePerformance',
                render:(text, record)=>(<span>{lt.num.formatMoney(Number(record.welfarePerformance)/100)}</span>)
            },
            {
                title: '税筹业绩', dataIndex: 'taxPlanningPerformance',key:'taxPlanningPerformance',
                render:(text, record)=>(<span>{lt.num.formatMoney(Number(record.taxPlanningPerformance)/100)}</span>)
            },
            {
                title: '操作', dataIndex: 'action',key:'action',
                render: (text, record) => (
                    <span>
                      <a href="javascript:void(0);" onClick={(e)=>this.addAndEdit(e,record)}>编辑</a>
                      <Divider type="vertical" />
                      <a href="javascript:void(0);" onClick={()=>this.connectClient(record)}>转接客户</a>
                      <Divider type="vertical" />
                      <a href="javascript:void(0);" onClick={()=>this.deleteServiceadviser(record)}>删除</a>
                    </span>
                ),
            }
        ];
        return (
            <div className='container'>
                <div className='wrapper clearfix'>
                    <Button type="primary" className='down-load-button' onClick={(e)=>this.addAndEdit(e)}>新增服务顾问</Button>
                    <Button type="primary" className='down-load-button' onClick={this.downLoadExport}>下载服务顾问</Button>
                </div>
                <div className='wrapper'>
                    <Form  onSubmit={this.handleSearch} className="login-form" layout="inline">
                        <Form.Item label="顾问名称">
                            {getFieldDecorator('condition')(
                                <Input  placeholder="请输入单位名称" />
                            )}
                        </Form.Item>
                        <Form.Item label="所属渠道">
                            {getFieldDecorator('channelId')(
                                <Select placeholder="请选择所属渠道" className="chanel-select">
                                    <Option value="">请选择所属渠道</Option>
                                    {channelList.map((item,index)=>(<Option key={index} value={item.channelId}>{item.channelName}</Option>))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='wrapper'>
                    <Table
                        rowKey={record => record.index}
                        columns={columns}
                        dataSource={dataSource}
                        loading={loading}
                        pagination={false}
                    />
                </div>
                <div className='wrapper'>
                    <LocaleProvider locale={zh_CN}>
                        <Pagination
                            size="small"
                            total={Number(totalCount)}
                            showSizeChanger
                            showQuickJumper
                            onShowSizeChange={this.onCurrentChange}
                            onChange={this.onCurrentChange}
                        />
                    </LocaleProvider>
                </div>
                <div className='wrapper'>
                    {/*新增和编辑modal*/}
                    <AddAndEdit
                        ref={this.formRef}
                        title={this.state.addAanEditTitle}
                        visible={this.state.modalVisible}
                        channelList={channelList}
                        initValues={this.state.initValues}
                        onConfirm={this.onConfirm}
                        onCancel={this.onCancel}
                        getOptionTextType={this.getOptionTextType}
                        getOptionTextChanel={this.getOptionTextChanel}
                    />
                    {/*转接客户modal*/}
                    <ConnectClient
                        ref={this.clientFormRef}
                        visible={this.state.clientModalVisible}
                        channelList={channelList}
                        companyList={companyList}
                        serviceList={serviceList}
                        targetCompanyList={this.state.targetCompanyList}
                        getServiceList={this.getServiceList}
                        handleChange={this.handleChange}
                        onConfirm={this.onClientConfirm}
                        onCancel={this.onClientCancel}
                    />
                </div>
            </div>
        )
    }
}
const WrappedSearchForm = Form.create()(Serviceadviser);
export default connect((state)=>(state))(WrappedSearchForm);
