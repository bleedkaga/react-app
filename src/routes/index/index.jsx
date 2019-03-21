import React, { Component } from 'react';
import {Layout, Menu, Icon, Avatar, Badge, Popover} from 'antd';
import {  Link, withRouter } from 'dva/router';
import menuData from '../../router/routerConfig';
import './index.less';
const { privateRoutes } = menuData;
const { Header, Sider, Content } = Layout;
class Home extends Component {
    constructor(props){
        super(props);
    }
    state = {
        collapsed: false,
        user:{}
    };

    componentDidMount(){
        fetch('/api/checkUser',{
            method:'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res)=>res.json()).then((data)=>{
            if(data&&data.data){
                this.setState({
                    user:data.data
                })
            }
        }).catch((err)=>{
            return err
        });
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    signOut = () =>{
        const {history} = this.props;
        history.push("/login");
    }

    isFullPath = () => {
        const {history} = this.props;
        return history.location && ['/login'].indexOf(history.location.pathname) !== -1||history.location && ['/register'].indexOf(history.location.pathname) !== -1;
    };
    render() {
        const { children } = this.props;
        const listDom = (<ul className='info'>
            <li>未读消息</li>
            <li>个人信息</li>
            <li onClick={this.signOut}>退出登陆</li>
        </ul>);
        if (this.isFullPath()) {
            return children;
        }
        return (
            <Layout className="container">
                <Sider
                    trigger={null}
                    collapsible
                    theme='light'
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" >
                        <img src={require('../../static/logo.png')} alt='千羚'/>
                    </div>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                        {privateRoutes.map((item)=>(
                            <Menu.Item key={item.id}>
                                <Link to={item.path}>
                                    <Icon type={item.icon} />
                                    <span>{item.name}</span>
                                </Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="header">
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <div className='user'>
                            <Popover placement="bottomRight" title={<div className='title'>账户信息</div>} content={listDom} trigger="click">
                                <Badge count={1}><Avatar icon="user" /></Badge>
                            </Popover>
                            <span style={{marginLeft:'20px'}}>{this.state.user.user_name}</span>
                        </div>
                    </Header>
                    <Content className="content">
                        {children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(Home);
