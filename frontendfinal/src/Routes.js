import React from 'react'

import { BrowserRouter , Switch , Route } from "react-router-dom"

import home from "./core/Home" 
import SignUp from './user/Signup'

import SignIN from './user/Signin'


// defining the routes here and the code here is  
const  Routes = ()=> {
    return (
        <div>
            <BrowserRouter>
            <Switch>
            < Route path="/" exact component = {home} />
            <Route path ="/signup" exact component ={SignUp}/>
            <Route path ="/signin" exact component ={SignIN}/>
            </Switch>

            </BrowserRouter>
        </div>
    )
}

export default Routes;
