import React, { Component } from 'react';
import QueryBar  from './index';
import formList  from './config'
export default class test extends Component {
    submitForm = (data) => {
        console.log(data)
    }
  render() {
    return (
      <div>
          <QueryBar formList={formList}  formSubmit={this.submitForm} setFields={{'input':'我是重新设置的值','radio':'1'}}/>
      </div>
    )
  }
}
