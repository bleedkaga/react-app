import React, { Component } from 'react';
import { Tree, Icon } from 'antd';
import menuData from '../../router/routerConfig';
const { privateRoutes } = menuData;
const { TreeNode } = Tree
class Menu extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <Tree
                showIcon
                defaultExpandAll
                defaultSelectedKeys={['0-0-0']}
                switcherIcon={<Icon type="down" />}
            >
                <TreeNode icon={<Icon type="bars" />} title="菜单设置" key="0-0">
                    {privateRoutes.map((item)=>{
                        return(
                            <TreeNode icon={<Icon type={item.icon}  />} title={item.name} key={item.pid}/>
                        )
                    })}
                </TreeNode>
            </Tree>
        )
    }
}
export default Menu
