import React, { Component } from 'react';
import { Breadcrumb, Form, Input, Select, Button, Divider} from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import './index.less';
const Option = Select.Option;
const { TextArea } = Input;
class apiManagementDetails extends Component{
    handleSubmit = () => {
        const { dispatch } = this.props;
        this.props.form.validateFields((err, fieldsValue) => {
            if(err){
                return;
            }
            dispatch({
                type:'apiManagement/createApiManagement',
                payload:fieldsValue
            });
        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <div className='container'>
                    <div className='wrapper'>
                        <Breadcrumb>
                            <Breadcrumb.Item>主页</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to='/apiManagement'> API管理</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>API管理新增</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className='wrapper'>
                        <div className="form-wrapper">
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Item
                                    label="接口名称"
                                >
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true, message: '请输入接口名称!',
                                        }],
                                    })(
                                        <Input palaceholder="请输入接口名称"/>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    label="请求方式"
                                >
                                    {getFieldDecorator('method', {
                                        rules: [{
                                            required: true, message: '请选择请求方式!',
                                        }],
                                    })(
                                        <Select placeholder="请选择请求方式">
                                            <Option value="get">GET</Option>
                                            <Option value="post">POST</Option>
                                            <Option value="put">PUT</Option>
                                            <Option value="delete">DELETE</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    label="路由地址"
                                >
                                    {getFieldDecorator('path', {
                                        rules: [{
                                            required: true, message: '请输入路由地址!',
                                        }],
                                    })(
                                        <Input  palaceholder="请输入路由地址"/>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    label="参数"
                                >
                                    {getFieldDecorator('params', {
                                        rules: [{ required: false, message: '请输入参数!' }]
                                    })(
                                        <Input  palaceholder="请输入关参数"/>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    label="关联表"
                                >
                                    {getFieldDecorator('table', {
                                        rules: [{ required: true, message: '请输入关联表!' }]
                                    })(
                                        <Input  palaceholder="请输入关联表"/>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    label="SQL"
                                    extra="sql查询语句，支持egg和sql语言"
                                >
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('sql', {
                                        rules: [{ required: false, message: '请输入sql查询语句!' }],
                                    })(
                                        <TextArea rows={6} palaceholder="请输入sql查询语句"/>
                                    )}
                                </Form.Item>
                                <Form.Item >
                                    <Button type="primary" ghost>
                                        <Link to='/apiManagement'>取消</Link>
                                    </Button>
                                    <Divider type="vertical" />
                                    <Button type="primary" htmlType="submit">提交</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const WrappedSearchForm = Form.create()(apiManagementDetails);
export default connect((state)=>(state))(WrappedSearchForm);
