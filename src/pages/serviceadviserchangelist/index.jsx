import React, { Component } from 'react';
import {Form, Table, Input, Button, DatePicker, LocaleProvider, Pagination, Tag, Modal, Alert} from 'antd';
import lt from 'lego-tools';
import qs from 'query-string';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { connect } from 'dva';
import './index.less';
const { RangePicker } = DatePicker;
class Serviceadviserchangelist extends Component{
    state={
        visible:false,
        detailsMessage:''
    };
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
            type:'serviceadviserchangelist/getServiceadviserchangeList',
            payload:qs.stringify({
                pageIndex:1,
                pageSize:10
            })
        });
    };
    /*查询表单参数处理*/
    paramsInit=(err, fieldsValue,pagination)=>{
        if (err) {
            return;
        }
        const timeSearch = fieldsValue['timeSearch'];
        let values = {};
        if(timeSearch){
            values = {
                ...fieldsValue,
                startDate:timeSearch[0].format('YYYY-MM-DD'),
                endDate:timeSearch[1].format('YYYY-MM-DD')
            };
        }else{
            values = {
                ...fieldsValue
            };
        }
        if(pagination||pagination!==undefined){
            values.pageIndex = pagination.current;
            values.pageSize = pagination.pages;
        }else{
            values.pageIndex = 1;
            values.pageSize = 10;
        }
        delete values.timeSearch;
        for (let index in values){
            if(values[index] === undefined||values[index] === ''){
                delete values[index];
            }
        }
        return values;
    };
    /*交接记录列表查询*/
    handleSearch = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFields((err, fieldsValue) => {
            const  values = this.paramsInit(err, fieldsValue);
            dispatch({
                type:'serviceadviserchangelist/getServiceadviserchangeList',
                payload:qs.stringify(values)
            });
        });
    };
    /*查看详情*/
    viewDetails = (e,row) => {
        const { dispatch } = this.props;
        if(row&&row.id){
            dispatch({
                type:'serviceadviserchangelist/getServiceadviserchangeDetails',
                payload:qs.stringify({id:row.id})
            });
            this.setState({
                visible:true,
                detailsMessage:`${row.handoverName}交接给${row.receiverName}的企业`
            })
        }
    };
    /*查看详情确定按钮*/
    handleOk = () => {
        this.setState({
            visible:false
        })
    };
    /*分页条*/
    onCurrentChange = (current,pages) =>{
        const { dispatch } = this.props;
        this.props.form.validateFields((err, fieldsValue) => {
            const  values = this.paramsInit(err, fieldsValue,{current,pages});
            dispatch({
                type:'serviceadviserchangelist/getServiceadviserchangeList',
                payload:qs.stringify(values)
            });
        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const {dataSource,detailsDataSource,totalCount,loading,detailsLoading} = this.props.serviceadviserchangelist;
        const columns = [
            {title: '序号', dataIndex: 'index',key:'index'},
            {
                title: '交接时间', dataIndex: 'createTime',key:'createTime',
                render:(text, record)=>(
                    <span>{lt.date.format(new Date(Number(record.createTime)),'yyyy-MM-dd HH:mm:ss')}</span>
                )
            },
            {
                title: '交接人', dataIndex: 'handoverName',key:'handoverName',
                render:(text, record) => (
                    <span>{text+'-'+record.handoverPhone}</span>
                )
            },
            {
                title: '接收人', dataIndex: 'receiverName',key:'receiverName',
                render:(text, record) => (
                    <span>{text+'-'+record.receiverPhone}</span>
                )
            },
            {
                title: '交接企业数', dataIndex: 'companyEnterprises',key:'companyEnterprises',
                render:(text, record)=>(<Tag color="green" onClick={(e)=>this.viewDetails(e,record)}>{record.companyEnterprises}</Tag>)
            }
        ];
        const  detailsColumns = [
            {title: '序号', dataIndex: 'index',key:'index'},
            {title: '企业名称', dataIndex: 'companyName',key:'companyName'},
        ];
        return (
            <div className='container'>
                <div className='wrapper'>
                    <Form  onSubmit={this.handleSearch} className="login-form" layout="inline">
                        <Form.Item label="交接人">
                            {getFieldDecorator('handover')(
                                <Input  placeholder="请输入服务顾问姓名或电话" />
                            )}
                        </Form.Item>
                        <Form.Item label="接收人">
                            {getFieldDecorator('recipient')(
                                <Input  placeholder="请输入服务顾问姓名或电话" />
                            )}
                        </Form.Item>
                        <Form.Item label="交易时间">
                            <LocaleProvider locale={zh_CN}>
                            {getFieldDecorator('timeSearch')(
                                <RangePicker format="YYYY-MM-DD" showTime/>
                            )}
                            </LocaleProvider>
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
                    <Modal
                        title="交接详情"
                        centered
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleOk}
                        okButtonProps={{ ghost: true }}
                        cancelButtonProps={{ ghost: true }}
                    >
                        <div className="wrapper">
                            <Alert message={this.state.detailsMessage} type="info" />
                        </div>
                        <div className="wrapper">
                            <Table
                                rowKey={record => record.index}
                                columns={detailsColumns}
                                dataSource={detailsDataSource}
                                loading={detailsLoading}
                                pagination={false}
                            />
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}
const WrappedSearchForm = Form.create()(Serviceadviserchangelist);
export default connect((state)=>(state))(WrappedSearchForm);
