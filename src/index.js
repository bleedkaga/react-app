import React from 'react';
import dva from 'dva';
import global from './models/global';
import Home from './pages/index/index';
import DvaRouter from './router/router';
import { Router } from 'dva/router';
import './index.css';
import {LocaleProvider} from 'antd';
import createHistory from 'history/createBrowserHistory'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
// 1. Initialize
const app = dva({
    history:createHistory()
});

// 2. Plugins
// app.use({});
// 3. Model
app.model(global);
// 4. Router
app.router((props)=>{
    return(
        <LocaleProvider locale={zh_CN}>
            <Router history={props.history}>
                    <Home history={props.history}>
                        <DvaRouter {...props}/>
                    </Home>
            </Router>
        </LocaleProvider>
    )
});


// 5. Start
app.start('#root');
