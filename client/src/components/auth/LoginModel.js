/*
    This is the pae we login
*/

import React, { Component } from 'react';
import {

    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
// Imports

class LoginModel extends Component {
    state =  {
        modal: false,
        email: "",
        password: "",
        msg: null
    }

    static propTypes  = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    } 

    /*
        A life cycle method that constantly looks for error messages.
        For example: if the email matche but the password doesnt match in 
                     the backend we throw an error.
                     if your account doesnt exist we throw an error.
                     We get this erros from the backend so we do not 
                     show it on the frontend. we can work on this in 
                     the future
    */

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated} = this.props;
        if (error !== prevProps.error) {
            // Check for registeration error
            if(error.id === 'LOGIN_FAIL') {
                this.setState({msg: error.msg.msg})
            }
            else{
                this.setState({msg:null})
            }

        }

        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    toggle = () =>
    {
        // Clear errors
        this.props.clearErrors();
        this.setState(
            {
                modal: !this.state.modal
            }
        );
    };


    onChangeEmail = (e) => {

        this.setState({
            email: e.target.value
        })
    };

    onChangePassword = (e) => {

        this.setState({
            password: e.target.value
        })
    };

    


    onSubmit = (e) => {
        e.preventDefault();

        const { email, password} = this.state;

        // Create a user object
        const newUser = {
            email,
            password
        }

    this.props.login(newUser);

    // this.toggle();
    }

    render()
    {
        return (
            <div>
              <NavLink onClick = {this.toggle} href="#">
                  Login
              </NavLink>
                <Modal 
                isOpen = {this.state.modal}
                toggle = {this.toggle}
                >
                <ModalHeader toggle = {this.toggle}>
                  Login to your account
                </ModalHeader>
                <ModalBody>
                    {this.state.msg ? <Alert color ="danger">{this.state.msg}</Alert>: null} {/* checking for error msg*/}
                <Form onSubmit = {this.onSubmit}>
                    <FormGroup>
                        <Label for = "name">
                            </Label>
                            <Label for = "email">
                            </Label>
                            <Input 
                                type = "email"
                                name= "email"
                                id = "email"
                                placeholder= "Email"
                                onChange = {this.onChangeEmail}

                                required
                                >

                            </Input>
                            <Label for = "password">
                            </Label>
                            <Input 
                                type = "password"
                                name= "password"
                                id = "password"
                                placeholder= "Password"
                                onChange = {this.onChangePassword}
                                required
                                >

                            </Input>
                          
                            <Button 
                                color = "dark"
                                style = {{marginTop: '2rem'}}
                                block>

                                Login </Button>

                        
                    </FormGroup>
                    </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
)

export default connect(mapStateToProps, {login, clearErrors })(LoginModel);