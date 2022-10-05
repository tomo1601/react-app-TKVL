import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import React from 'react'
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from 'react-bootstrap/Spinner'
import NavbarMenu from "../layout/NavbarMenu";

const ProtectedRoute =({component: Component, ...rest}) => {

    const {authState: {authloading, isAuthenticated}} = useContext(AuthContext)

    if(authloading){
        return (
            <div className='spiner-container'>
                <Spinner animation = 'border' variant = 'info'/>
            </div>
        )
    }

    return (
        <Route {...rest}  render = {props => isAuthenticated ? (
            <>
            <NavbarMenu/>
            <Component {...rest} {...props}/>
            </>
            ):(<Redirect to='/user/login'/>) } />
 //       isAuthenticated ?<><NavbarMenu> </NavbarMenu> <Component/></> : <Redirect to={'/user/login'}/>
    )
}

export default ProtectedRoute