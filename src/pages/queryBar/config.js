const formList= [
    {
        type: 'select',
        lable: '下拉选择',
        placeholder: '请选择',
        width: '171px',
        field:'select',
        option: [{value:"1",text:'1'}, {value:"2",text:'2'},{value:'3',text:'3'}]
    },
    {
        type: 'input',
        lable: '输入',
        placeholder: '请填写',
        field:'input',
    },
    {
        type: 'checkbox',
        lable: '多选',
        placeholder: '请勾选',
        field:'checkbox',
        option: [{value:"1",text:'checkbox1'}, {value:"2",text:'checkbox2'},{value:'3',text:'checkbox3'}]
    },
    {
        type: 'radio',
        lable: '单选',
        placeholder: '请勾选',
        field:'radio',
        option: [{value:"1",text:'radio1'}, {value:"2",text:'radio2'},{value:'3',text:'radio3'}]
    },
    {
        type: 'date',
        lable: '日期',
        placeholder: '请填写日期',
        field:'date',
        format:'YYYY-MM-DD'
    },
    {
        type: 'time',
        lable: '时间',
        placeholder: '请填写时间',
        width: '171px',
        field:'time',
        format:'HH:mm:ss'
    },
]

export default formList
