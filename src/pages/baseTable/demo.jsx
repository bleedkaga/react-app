import React, { Component } from 'react';
import BaseTable  from './index';
import { Divider } from 'antd'

class Index extends Component {
    constructor(props) {
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
            }
        ];
        this.data = [
            {
                "id":"1",
                "method":"POST",
                "path":"/api/userlist",
                "params":"userId",
                "name":"用户列表删除",
                "table":"user_list",
                "sql":""
            },
            {
                "id":"2",
                "method":"POST",
                "path":"/api/userlist",
                "params":"",
                "name":"用户列表添加",
                "table":"user_list",
                "sql":""
            }
        ]
    }
    onchange=(data,cloumns)=>{
        console.log('当前页---'+data,'每页条数---'+cloumns)
    }
  render() {
    return (
      <div>
          <BaseTable 
            columns={this.columns}
            dataSource={this.data}
            loading={ false }
            total={30}
            onCurrentChange={this.onchange}
          />
      </div>
    )
  }
}

export default Index