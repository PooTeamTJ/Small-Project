// We need our react to work on the Navbar

import React, { Component, Fragment } from 'react';
import { Link, Route, Redirect } from "react-router-dom"
import '../App.css'

/*
    We are import all this from the react strap 
    Beacause we want a responsive navbar
    We can work more on this in the future
*/

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap'

import Logout from './auth/Logout';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

// imports

class AppNavbar extends Component
{
    
     state = {isOpen: false}

     static propTypes = {auth: propTypes.object.isRequired } // we get the proptypes from the import

     /*
        What toggle does is it changes the state to true if it is false and false if it is true
    */

     toggle = () =>  {
            this.setState({
                    isOpen: !this.state.isOpen
                }
            );
        }
            /*
                We are going to render our nav bar using 
                Differnt components that we imported on the 
                top
            */
        
            render() {
                const {isAuthenticated, user } = this.props.auth;

                /*
                    THis changes our navbar from [login, create user] => [welcom..user, logout]
                    once you are authorizedd.
                */

                const authLinks = (
                    <Fragment>
                        <NavItem>
                            <span className = "navbar-text mr-3">
                                <strong>
                                    {user ? `Welcome ${user.name}` : ''}
                                </strong>
                            </span>
                        </NavItem>
                        <NavItem>
                             <Logout></Logout>
                             
                         </NavItem>
                    </Fragment>
                );
                
                /*
                    Deafault modal you are going to see once you first visit the page
                    [login, create user]
                */
                
                return(
                        <div>
                            {/*
                                    --- THis is just the navbar---
                                1.
                                        We want our navbar to have a dark color for now
                                        so that the text can be a lite color
                                        later on we can change it to what ever color we 
                                        want."dark"
                                    2. 
                                        We want to really see how responsive is our front end
                                        so we are doing small "sm".
                                    3. 
                                        we want our margin to be below 5 points
                                        "mb-5".
                                    
                                    We can change this in the future
                            */}
                            <Navbar style={{ backgroundColor: '#0971FF', color: 'white'}} expand = "sm" className="mb-5">
                                    <Container>
                                        {/* Headning as Contact Manager */}
                                        <NavbarBrand href = "/" style={{ color: 'white'}}> Assistant To The Regional Contact Manager </NavbarBrand>
                                        {/* 
                                            When we click the nav bar it is going to
                                            change the isOPen to opposite state.
                                        */}
                                        <NavbarToggler onClick = {this.toggle}/>
                                        <Collapse isOpen={this.state.isOpen} navbar>
                                            <Nav className= "ml-auto" navbar>
                                            {isAuthenticated ? authLinks : null} {/* checking for authentication*/}
                                            </Nav>
                                        </Collapse>
                                    </Container>
                            </Navbar>
                        </div> 
                );
            }

}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar); // Connecting the authentication