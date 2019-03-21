import React, { Component } from 'react';
import { Table, Divider, Modal } from 'antd';
import { connect } from 'dva';
const confirm = Modal.confirm;
class Menu extends Component{
    constructor(props) {
        super(props);
        this.state={
            dataSource:[]
        }
    }
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
            type:'menu/getList'
        });
    }
    /*删除*/
    delete = ()=>{
        confirm({
            title: '提示',
            content: '是否确认删除该菜单?',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    /*修改*/
    edit = ()=>{

    };

    /*查看*/
    details = ()=>{
        this.props.history.push('/menu/details');
    };

    render(){
        const columns = [
            { title: 'Id', dataIndex: 'id', key: 'id' },
            { title: 'Pid', dataIndex: 'pid', key: 'pid' },
            { title: '名称', dataIndex: 'name', key: 'name' },
            { title: '路径', dataIndex: 'path', key: 'path' },
            { title: 'Model路径', dataIndex: 'model', key: 'model' },
            { title: '组件路径', dataIndex: 'component', key: 'component' },
            {
                title: '操作', dataIndex: '', key: 'x', render: () => (
                    <div>
                        <a href="javascript:void (0);" onClick={this.delete}>删除</a>
                        <Divider type="vertical" />
                        <a href="javascript:void (0);" onClick={this.edit}>修改</a>
                        <Divider type="vertical" />
                        <a href="javascript:void (0);" onClick={this.details}>查看</a>
                    </div>
                ),
            },
        ];
        const { dataSource } = this.props.menu;
        return(
           <div>
               <Table
                   rowKey={record =>record.id}
                   columns={columns}
                   dataSource={dataSource}
               />
           </div>
        )
    }
}
export default connect((state)=>state)(Menu)
