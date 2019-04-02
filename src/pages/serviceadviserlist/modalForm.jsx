import React, { Component } from "react";
import {Input, Modal, Select, Form, Transfer, LocaleProvider, Pagination} from "antd";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
const Option = Select.Option;

/*新增和编辑modal*/
class AddAndEditComponet extends Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        const { channelList, title, visible, onConfirm, onCancel, getOptionTextType, getOptionTextChanel } = this.props;
        return (
            <Modal
                title={title}
                centered
                visible={visible}
                onOk={onConfirm}
                onCancel={onCancel}
            >
                <div className="wrapper">
                    <Form layout="vertical" >
                        <Form.Item label="名称">
                            {getFieldDecorator('serviceName', {
                                rules: [{ required: true, message: '请填写名称！' }],
                            })(
                                <Input placeholder="请输入名称"/>
                            )}
                        </Form.Item>
                        <Form.Item label="电话">
                            {getFieldDecorator('servicePhone', {
                                rules: [{ required: true, message: '请填写电话！' }],
                            })(
                                <Input placeholder="请输入电话"/>
                            )}
                        </Form.Item>
                        <Form.Item label="顾问类型">
                            {getFieldDecorator('types', {
                                rules: [{ required: true, message: '请选择类型！' }],
                            })(
                                <Select placeholder="请选择类型" onSelect	={getOptionTextType}>
                                    <Option value=''>请选择类型</Option>
                                    <Option  value={1}>普通顾问</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="所属渠道">
                            {getFieldDecorator('channelId', {
                                rules: [{ required: true, message: '请选择所属渠道！' }],
                            })(
                                <Select placeholder="请选择所属渠道" onSelect={getOptionTextChanel}>
                                    <Option value=''>请选择所属渠道</Option>
                                    {channelList.map((item,index)=>(<Option key={index} value={item.channelId}>{item.channelName}</Option>))}
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        )
    }
}
const AddAndEdit = Form.create({
    mapPropsToFields (props) {
        const fieldsName = ['serviceName', 'servicePhone', 'types', 'channelId'];
        let p = {};
        let {initValues} = props;
        if (initValues) {
            // 编辑时赋初值
            fieldsName.forEach(key => {
                if(key!=='channelId'){
                    return p[key] = Form.createFormField({value: initValues[key]})
                }else{
                    return p['channelId'] = Form.createFormField({value: Number(initValues['channelId'])})
                }
            });
        }
        return p;
    },
})(AddAndEditComponet);

/*转接客户modal*/
class ConnectClientComponent extends Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        const { channelList, companyList, targetCompanyList, visible, onConfirm, onCancel, getServiceList, handleChange, serviceList} = this.props;
        return (
            <Modal
                title="关联企业"
                centered
                visible={visible}
                onOk={onConfirm}
                onCancel={onCancel}
                width={600}
            >
                <div className="wrapper">
                    <div className="wrapper">
                        <LocaleProvider locale={zh_CN}>
                            <Transfer
                                showSearch
                                dataSource={companyList}
                                targetKeys={targetCompanyList}
                                titles={['待转企业','拟转出企业']}
                                listStyle={{width: 252, height: 300}}
                                render={item => item.companyName}
                                onChange={handleChange}
                            />
                        </LocaleProvider>
                    </div>
                    <div className="wrapper" style={{'paddingTop':'20px'}}>
                        <span>设置接收人</span>
                        <Form layout="vertical" style={{'paddingTop':'10px'}}>
                            <Form.Item label="所属渠道">
                                {getFieldDecorator('channelId', {
                                    rules: [{ required: true, message: '请选择所属渠道！' }],
                                })(
                                    <Select placeholder="请选择所属渠道" onSelect={getServiceList}>
                                        <Option value=''>请选择所属渠道</Option>
                                        {channelList.map((item,index)=>(<Option key={index} value={item.channelId}>{item.channelName}</Option>))}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="服务顾问">
                                {getFieldDecorator('types', {
                                    rules: [{ required: true, message: '请选择服务顾问！' }],
                                })(
                                    <Select placeholder="请选择类型">
                                        <Option value=''>请选择类型</Option>
                                        {serviceList.map((item,index)=>(<Option key={index} value={item.id}>{`${item.serviceName}-${item.servicePhone}`}</Option>))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Modal>
        )
    }
}
const ConnectClient = Form.create()(ConnectClientComponent);

export {
    AddAndEdit,
    ConnectClient
}
