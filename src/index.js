console.log('hello')
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, BrowserRouter } from 'react-router-dom';
import Advertising from './Advertising';
class App extends React.Component{
    render(){
        return <div className="app">hello world</div>;
    }
}
// 路由配置说明（你不用加载整个配置，
// 只需加载一个你想要的根路由，
// 也可以延迟加载这个配置）。
ReactDom.render((
    <BrowserRouter>
        <Route path="/" component={Advertising}>
        </Route>
    </BrowserRouter>
), document.getElementById('App'));