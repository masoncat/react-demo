console.log('hello')
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, BrowserRouter } from 'react-router-dom'

// const App = React.createClass({/*...*/})
// const About = React.createClass({/*...*/})
// 等等。
class App extends React.Component{
    render(){
        return <div className="app">hello world</div>;
    }
}
class About extends React.Component{
    render(){
        return <div className={'About'}></div>
    }
}

class NoMatch extends React.Component{
    render(){
        return <div className={'About'}></div>
    }
}


class Users extends React.Component{
    render() {
        return (
            <div>
                <h1>Users</h1>
                <div className="master">
                    <ul>
                        {/* 在应用中用 Link 去链接路由 */}
                        {this.state.users.map(user => (
                            <li key={user.id}><Link to={`/user/${user.id}`}>{user.name}</Link></li>
                        ))}
                    </ul>
                </div>
                <div className="detail">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

class User extends React.Component{
    componentDidMount() {
        this.setState({
            // 路由应该通过有用的信息来呈现，例如 URL 的参数
            user: findUserById(this.props.params.userId)
        })
    }

    render() {
        return (
            <div>
                <h2>{this.state.user.name}</h2>
                {/* 等等。 */}
            </div>
        )
    }
}
// 路由配置说明（你不用加载整个配置，
// 只需加载一个你想要的根路由，
// 也可以延迟加载这个配置）。
ReactDom.render((
    <BrowserRouter>
        <Route path="/" component={App}>
        </Route>
    </BrowserRouter>
), document.getElementById('App'));