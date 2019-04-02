/*参数处理*/
const paramsFormat = (params) => {
    let data = params;
    if(typeof data === "object"){
        for (let i in data){
            if(data[i] === undefined||data[i] === ''){
                delete data[i];
            }
        }
    }
    return data;
};
export {
    paramsFormat,
}
