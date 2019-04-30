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
import { FETCH_LOCAL, fetchLocale } from './redux/LocaleAction'

import './App.css'

const initialState = {
    locale: {}
}

const reducer = (state = initialState, action) => {
    // console.log('reducer', state, action)
    switch (action.type) {
        case FETCH_LOCAL: return {...state, locale: action.locale}
        default: return state
    }
}

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default class App extends React.Component {
    componentWillMount() {
        store.dispatch(fetchLocale(navigator.language || navigator.userLanguage))
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
