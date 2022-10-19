import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import React from 'react'
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from 'react-bootstrap/Spinner'
import NavbarMenu from "../layout/NavbarMenu";
import Footer from "../layout/Footer";

const EmployerRoute =({component: Component, ...rest}) => {

    const {authState: {authloading, isAuthenticated, isEmployer}} = useContext(AuthContext)

    if(authloading){
        return (
            <div className='spiner-container'>
                <Spinner animation = 'border' variant = 'info'/>
            </div>
        )
    }

    return (
        <Route {...rest}  render = {props => isAuthenticated && isEmployer ? (
            <>
            <NavbarMenu/>
            <Component {...rest} {...props}/>
            <Footer/>
            </>
            ):(<Redirect to={{
                pathname: '/employer/login',
                state: { message: "You do not have permission to access !" },
            }}/>) } />
    )
}

export default EmployerRoute