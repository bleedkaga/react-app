import React from 'react';
import dva from 'dva';
import models from './models/index';
import Home from './routes/index/index';
import DvaRouter from './router/router';
import { Router } from 'dva/router';
import './index.css';
import createHistory from 'history/createBrowserHistory'

// 1. Initialize
const app = dva({
    history:createHistory()
});

// 2. Plugins
// app.use({});
// 3. Model
models.map((model)=>{
    app.model(model);
});
// 4. Router
app.router((props)=>{
    return(
        <Router history={props.history}>
            <Home history={props.history}>
                <DvaRouter {...props}/>
            </Home>
        </Router>

    )
});


// 5. Start
app.start('#root');
