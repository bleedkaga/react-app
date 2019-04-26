import React, { Component } from 'react';
import { Breadcrumb, Form, Table, Input, Button, Select, Pagination, Divider} from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { paramsFormat } from "utils/tools";
import './index.less';
const Option = Select.Option;
@connect(state=>state)
@Form.create()
class Page extends Component{
    constructor(props){
        super(props);
        this.columns = [
            {title: '序号', dataIndex: 'index',key:'index'},
            {title: '接口名称', dataIndex: 'name',key:'name'},
            {title: '请求方式', dataIndex: 'method',key:'method'},
            {title: '路由地址', dataIndex: 'path',key:'path'},
            {title: '参数', dataIndex: 'params',key:'params'},
            {title: '关联表', dataIndex: 'table',key:'table'},
            {title: 'SQL语句', dataIndex: 'sql',key:'sql'},
            {
                title: '操作', dataIndex: 'action',key:'action',
                render:(text, record)=>(
                    <span>
                      <span onClick={()=>this.createApiManagement(record)}>编辑</span>
                      <Divider type="vertical" />
                      <span onClick={()=>this.deleteApiManagement(record)}>删除</span>
                    </span>
                )
            },
        ];
    }
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
            type:'apiManagement/getApiManagementList',
        });
    };
    /*新增*/
    createApiManagement = () =>{

    };
    /*删除*/
    deleteApiManagement = () =>{

    };

    /*列表查询*/
    handleSearch = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFields((err, fieldsValue) => {
            const params = paramsFormat(fieldsValue);
            dispatch({
                type:'apiManagement/getApiManagementList',
                payload:params
            });
        });
    };
    /*分页条*/
    onCurrentChange = (current,pages) =>{
        const { dispatch } = this.props;
        this.props.form.validateFields((err, fieldsValue) => {
            dispatch({
                type:'apiManagement/getApiManagementList',
                payload:{}
            });
        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const {dataSource,totalCount,loading} = this.props.apiManagement;
        return (
            <div className='container'>
                <div className='wrapper'>
                    <Breadcrumb>
                        <Breadcrumb.Item>主页</Breadcrumb.Item>
                        <Breadcrumb.Item>API管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className='wrapper'>
                    <Form  onSubmit={this.handleSearch} className="login-form" layout="inline">
                        <Form.Item label="接口名称">
                            {getFieldDecorator('name')(
                                <Input  placeholder="请输入接口名称" />
                            )}
                        </Form.Item>
                        <Form.Item label="请求方式">
                            {getFieldDecorator('method')(
                                <Select placeholder="请选择请求方式" className="chanel-select">
                                    <Option value="get">GET</Option>
                                    <Option value="post">POST</Option>
                                    <Option value="put">PUT</Option>
                                    <Option value="delete">DELETE</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="路径">
                            {getFieldDecorator('path')(
                                <Input  placeholder="请输入请求路径" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="reset">重置</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='wrapper'>
                    <Button icon="file-add" type="primary" ghost>
                        <Link to='/managementApi/details'> 新增接口</Link>
                    </Button>
                </div>
                <div className='wrapper'>
                    <Table
                        rowKey={record => record.index}
                        columns={this.columns}
                        dataSource={dataSource}
                        loading={loading}
                        pagination={false}
                    />
                </div>
                <div className='wrapper'>
                    <Pagination
                        size="small"
                        total={Number(totalCount)}
                        showSizeChanger
                        showQuickJumper
                        onShowSizeChange={this.onCurrentChange}
                        onChange={this.onCurrentChange}
                    />
                </div>
            </div>
        )
    }
}
export default Page;
