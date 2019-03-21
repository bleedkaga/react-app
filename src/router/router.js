import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import PrivateRoute from './privateRoute';
import { routerConfig } from '../utils/config';
const { routes, privateRoutes, privateRoutesAll} = routerConfig;
function router({ history, app }) {
    return (
        <Router history={history}>
            <Switch>
                {
                    routes.map(({path,...dynamics},index)=>(
                        <Route
                            key={index}
                            path={path}
                            exact
                            component={dynamic({
                                app,
                                ...dynamics
                            })}
                        />
                    ))
                }
                {
                    privateRoutes.map(({path,...dynamics},index)=>(
                        <PrivateRoute
                            key={index}
                            path={path}
                            exact
                            app={app}
                            component={dynamic({
                                app,
                                ...dynamics
                            })}
                        />
                    ))
                }
                {
                    privateRoutesAll.map(({path,...dynamics},index)=>(
                        <PrivateRoute
                            key={index}
                            path={path}
                            exact
                            app={app}
                            component={dynamic({
                                app,
                                ...dynamics
                            })}
                        />
                    ))
                }
            </Switch>
        </Router>
    );
}

export default router;
