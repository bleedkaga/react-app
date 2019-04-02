import React, { Component } from 'react';
import {Form, Table, Input, Button, Select, DatePicker, LocaleProvider, Pagination} from 'antd';
import qs from 'query-string';
import lt from 'lego-tools';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { connect } from 'dva';
import './index.less';
const Option = Select.Option;
const { RangePicker } = DatePicker;
class Salaryrecord extends Component{
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
            type:'salaryrecord/getSalaryrecordList',
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
    /*税筹业绩列表导出*/
    downLoadExport = (e) =>{
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFields((err, fieldsValue) => {
            const  values = this.paramsInit(err, fieldsValue);
            dispatch({
                type:'salaryrecord/getSalaryrecordExport',
                payload:qs.stringify(values)
            });
        });
    };
    /*税筹业绩列表查询*/
    handleSearch = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFields((err, fieldsValue) => {
            const  values = this.paramsInit(err, fieldsValue);
            dispatch({
                type:'salaryrecord/getSalaryrecordList',
                payload:qs.stringify(values)
            });
        });
    };
    /*分页条*/
    onCurrentChange = (current,pages) =>{
        const { dispatch } = this.props;
        this.props.form.validateFields((err, fieldsValue) => {
            const  values = this.paramsInit(err, fieldsValue,{current,pages});
            dispatch({
                type:'salaryrecord/getSalaryrecordList',
                payload:qs.stringify(values)
            });
        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const {dataSource,totalCount,loading} = this.props.salaryrecord;
        const columns = [
            {title: '序号', dataIndex: 'index',key:'index'},
            {
                title: '交易时间', dataIndex: 'createtime',key:'createtime',
                render:(text, record)=>(
                    <span>{lt.date.format(new Date(Number(record.createtime)),'yyyy-MM-dd HH:mm:ss')}</span>
                )
            },
            {title: '单位名称', dataIndex: 'sendMoneyName',key:'sendMoneyName'},
            {title: '订单号', dataIndex: 'tradeNo',key:'tradeNo'},
            {title: '购买渠道', dataIndex: 'paymentChannelDesc',key:'paymentChannelDesc'},
            {
                title: '汇款金额', dataIndex: 'totalAmount',key:'totalAmount',
                render:(text, record)=>(<span>{lt.num.formatMoney(Number(record.totalAmount)/100)}</span>)
            },
            {
                title: '服务顾问', dataIndex: 'serviceManager',key:'serviceManager',
                render:(text, record) => (
                    <span>{text+'-'+record.serviceManagerPhone}</span>
                )
            },
        ];
        return (
            <div className='container'>
                <div className='wrapper clearfix'>
                    <Button type="primary" className='down-load-button' onClick={this.downLoadExport}>下载查询结果</Button>
                </div>
                <div className='wrapper'>
                    <Form  onSubmit={this.handleSearch} className="login-form" layout="inline">
                        <Form.Item label="单位名称">
                            {getFieldDecorator('sendMoneyName')(
                                <Input  placeholder="请输入单位名称" />
                            )}
                        </Form.Item>
                        <Form.Item label="购买渠道">
                            {getFieldDecorator('channelType')(
                                <Select placeholder="请选择购买渠道" className="chanel-select">
                                    <Option value="">请选择购买渠道</Option>
                                    <Option value="bank_transfer">银行转账</Option>
                                    <Option value="ALIPAY_zzy_cash">支付宝</Option>
                                    <Option value="yeepay_zzy_cash">易宝网银</Option>
                                    <Option value="WXPAY_zzy_cash">微信</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="订单号">
                            {getFieldDecorator('tradeNo')(
                                <Input  placeholder="请输入订单号" />
                            )}
                        </Form.Item>
                        <Form.Item label="交易时间">
                            <LocaleProvider locale={zh_CN}>
                            {getFieldDecorator('timeSearch')(
                                <RangePicker format="YYYY-MM-DD" showTime/>
                            )}
                            </LocaleProvider>
                        </Form.Item>
                        <Form.Item label="服务顾问">
                            {getFieldDecorator('serviceManagerPhone')(
                                <Input  placeholder="请输入顾问电话" />
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
            </div>
        )
    }
}
const WrappedSearchForm = Form.create()(Salaryrecord);
export default connect((state)=>(state))(WrappedSearchForm);