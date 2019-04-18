import React, { Component } from 'react';
import { Breadcrumb, Form, Table, Input, Button, Select, LocaleProvider, Pagination, Divider} from 'antd';
import { connect } from 'dva';
import './index.less';

@Form.create()
@connect((state)=>(state))
class Page extends Component{

    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props)
    }

    componentDidMount(){
       
    };
    
    render(){
        return (
            <div className='container'>
                
            </div>
        )
    }
}
export default Page
