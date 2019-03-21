import React, {Component} from 'react';
import {Route, withRouter} from 'dva/router';
import {Alert, message, Spin} from "antd";
class PrivateRoute extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false,
            loading:true
        };
    };
    componentDidMount(){
        const {history} = this.props;
        fetch('/api/checkUser',{
            method:'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res)=>res.json()).then((data)=>{
            if(data&&data.status)  {
                this.setState({
                    isAuthenticated:data.status,
                    loading:false
                });
            }else{
                history.replace("/login");
                message.error(message.error(data.message), 2.5);
            }
        }).catch((err)=>{
            return err
        });
    };
    render(){
        let { component: Component, ...rest} = this.props;
        return (
            <Spin spinning={this.state.loading}>
                {
                    this.state.isAuthenticated
                        ? (<Route {...rest} render={(props) => ( <Component app={this.props.app} {...props} /> )}/> )
                        : ''
                }
            </Spin>
        )

    };
}
export default withRouter(PrivateRoute);
