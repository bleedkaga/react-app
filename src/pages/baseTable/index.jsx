import React, { Component } from 'react';
import { Table, Pagination } from 'antd';

class Index extends Component {
  render() {
      const { columns, dataSource, loading, total, onCurrentChange} = this.props;
    return (
      <div>
            <Table
                rowKey={record => record.index}
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                pagination={false}
                bordered
            />
            <Pagination
                size="small"
                total={Number(total)}
                showSizeChanger
                showQuickJumper
                onShowSizeChange={onCurrentChange}
                onChange={onCurrentChange}
            />
      </div>
    )
  }
}

export default Index;