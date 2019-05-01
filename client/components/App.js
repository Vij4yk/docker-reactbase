import React from "react"
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux' 
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Header from './header/Header'
import Navbar from './top-navbar/Navbar'
import PostWall from './page/post-wall/PostWall'
import RegisterForm from './page/register/RegisterForm'
import SigninForm from './page/signin/SigninForm'
import Footer from './footer/Footer'
import RootReducer from './redux/RootReducer'
import { localeAction } from './redux/Localization'

import './App.css'

const store = createStore(
    RootReducer,
    applyMiddleware(thunk)
)

export default class App extends React.Component {
    componentWillMount() {
        store.dispatch(localeAction(navigator.language || navigator.userLanguage))
    }

    render() {
        return (
            <div className="container">
            <Provider store={store}>
            <Router>
                <Link to='/' className="deco-none">
                    <Header/>
                </Link>
                <Navbar/>
                <Route path="/" exact component={PostWall} />
                <Route path='/register' component={RegisterForm} />
                <Route path='/signin' component={SigninForm} />
                <Footer/>
            </Router>
            </Provider>
            </div>
        )
    }
}
