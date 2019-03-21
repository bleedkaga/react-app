import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import './index.less'
const FormItem = Form.Item;
class NormalRegisterForm extends Component {
    // 表单提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {

          }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='app-container'>
                <div className='app-content'>
                    <div className="app-logo">
                        <img src={require('../../static/logo.png')} alt='千羚'/>
                    </div>
                    <div className='app-name'>
                       欢迎回到千羚
                    </div>
                    <div className='app-form'>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '请输入昵称!'}]
                                })(
                                    <Input prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="昵称"/>
                                )}
                            </FormItem>
                            <FormItem>
                            {getFieldDecorator('accout', {
                                rules: [{ required: true, message: '请输入账号!'}]
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号"/>
                            )}
                            </FormItem>
                            <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码"/>
                            )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    注册
                                </Button>
                                <Link to='/login'>立即登录</Link>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);
export default WrappedNormalRegisterForm;
