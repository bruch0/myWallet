import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import GlobalStyle from './Styles/GlobalStyles'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'

function App () {
  return (
    <>
        <GlobalStyle />
        <BrowserRouter>
            <Switch>
                <Route path='/' component={SignIn} exact/>
                <Route path='/sign-up' component={SignUp} exact/>
                <Route path='/home' component={Home} exact/>
            </Switch>
        </BrowserRouter>
    </>
  )
}

export default App
