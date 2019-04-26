import React from "react";
import {Select, Form, Radio, Checkbox, Button, Input, DatePicker, TimePicker} from "antd";
import moment from "moment"
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;
const Option = Select.Option;
@Form.create()
class Index extends React.Component{

    componentDidMount() {
      const { setFieldsValue } = this.props.form;
      const { setFields } = this.props;
      setFieldsValue(setFields);
    };

    //初始化option
    initOptionList = (data,type) => {
        if(!data){
            return [];
        };
        let optionMap = [];
        data.forEach((item) => {
            const stateMap = new Map([
                ['select',()=>{optionMap.push(<Option value={item.value} key={item.value}>{item.text}</Option>)}],
                ['checkbox',()=>{optionMap.push(<Checkbox value={item.value} key={item.value}>{item.text}</Checkbox>)}],
                ['radio',()=>{optionMap.push(<Radio value={item.value} key={item.value}>{item.text}</Radio>)}],
            ]);
            let state = stateMap.get(type);
            state.call(this);
        });
        return optionMap;
    };

    //获取查询参数
    commit = ()=>{
        const { getFieldsValue }=this.props.form;
        const { formList, formSubmit } = this.props;
        let data = getFieldsValue();
        let params = {};
        Object.keys(data).forEach(item => {
            if(data[item] !== undefined && data[item] !== ''){
                params[item] = data[item];
                if(data[item]&&data[item].format){
                    formList.forEach(val => {
                        if(val.format&&item === val.field){
                            params[item] = data[item].format(val.format);
                        } 
                     })
                }
            }
        })
        formSubmit(params);
    };

    //重置查询参数
    reset= () =>{
       this.props.form.resetFields();
    };

    //初始化Form
    initFormList = ()=>{
        const { getFieldDecorator }=this.props.form;
        const formList = this.props.formList;
        let formItemList=[];
        if(formList&&formList.length>0){
            formList.forEach(item => {
               let { type, lable, placeholder, field } = item;
               let width = item.width || null;
               let option = item.option||[];
               const componentsMap = new Map([
                   //INPUT组件
                   ['input',()=>{const input=<FormItem label={lable} key={field}>{ getFieldDecorator(field)(
                            <Input style={{width:width}} placeholder={placeholder} />
                        )}
                    </FormItem>
                    formItemList.push(input);
                   }],
                   //SELECT组件
                   ['select',()=>{
                    const select = <FormItem label={lable} key={field} >
                    {getFieldDecorator(field)(
                        <Select style={{width:width}} placeholder={placeholder}>
                           {this.initOptionList(option,type)}
                        </Select>
                    )}
                    </FormItem>;
                    formItemList.push(select);
                   }],
                   //CHEKBOX组件
                   ['checkbox',()=>{
                    const checkbox=<FormItem  label={lable} key={field}>
                        {getFieldDecorator(field,{
                            valuePropName:"checked",
                        })(
                            <Checkbox.Group>
                              {this.initOptionList(option,type)}
                            </Checkbox.Group>
                        )}
                    </FormItem>
                    formItemList.push(checkbox);
                   }],
                   //RIDIO组件
                   ['radio',()=>{
                    const radio = <FormItem label={lable} key={field}>
                        {getFieldDecorator(field)(
                            <Radio.Group>
                              {this.initOptionList(option,type)}
                            </Radio.Group>
                        )}
                    </FormItem>
                    formItemList.push(radio);
                   }],
                   //DATE组件
                   ['date',()=>{
                    const date=<FormItem label={lable} key={field} >
                        {getFieldDecorator(field)(
                            <DatePicker
                                style={{width:width}}
                                for-mat="YY-MM-DD HH:mm:ss"
                                placeholder={placeholder}
                            />
                        )}
                    </FormItem>
                    formItemList.push(date);
                   }],
                   //TIME组件
                   ['time',()=>{
                    const time=<FormItem label={lable} key={field} >
                        {getFieldDecorator(field)(
                            <TimePicker
                                style={{width:width}}
                                for-mat="HH:mm:ss"
                                placeholder={placeholder}
                            />
                        )}
                    </FormItem>
                    formItemList.push(time);
                   }],
                ])
                let component = componentsMap.get(type);
                component.call(this);
            })
        }
     return formItemList;
    };
 
    render(){
        return(<Form layout="inline">
            {this.initFormList()}
            <FormItem>
                <Button type="primary" onClick={()=>{this.commit()}}>
                  查询
                </Button>
            </FormItem>
            <FormItem>
                <Button onClick={()=>{this.reset()}}>
                  重置
                </Button>
            </FormItem>
        </Form>)
    }
}
 
export default Index;
