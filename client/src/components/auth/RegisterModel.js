/*
    This is our registartion page even though its in the auth
    folder we dont need any authoriazation to access it
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
import {register} from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
// imports

class RegisterModel extends Component {
    state =  {
        modal: false,
        name: "",
        email: "",
        password: "",
        age: "",
        msg: null
    };

    static propTypes  = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired

    } 

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated} = this.props;
        if (error !== prevProps.error) {

            // Check for registeration error

            if(error.id === 'REGISTER_FAIL') {
                this.setState({msg: error.msg.msg})
            }
            else {
                this.setState({msg:null})
            }

        }

        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors is coming from erroActions
        this.props.clearErrors();
        this.setState({
                modal: !this.state.modal
            }
        );
    };

    onChangeName = (e) => {

        this.setState({
            name: e.target.value
        })
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

    onChangeAge = (e) => {

        this.setState({
            age: e.target.value
        })
    };
    


    onSubmit = (e) => {
        e.preventDefault();

        const {name, email, password, age} = this.state;

        // Create a user object
        const newUser = {
            name,
            email,
            password,
            age
        }

    this.props.register(newUser);

    }

    render() {
        return (
            <div>
                {/* The href is # because it is a empty link we can
                     We can change it int the future */   }

              <NavLink onClick = {this.toggle} href="#"> 
                  Create User
              </NavLink>
                <Modal 
                isOpen = {this.state.modal}
                toggle = {this.toggle}
                >
                    <ModalHeader toggle = {this.toggle}>
                        Create your account
                    </ModalHeader>
                <ModalBody>
                    {/* Checking to see if this there is an error msg 
                        from the backend while while creating the account and
                        then we thrown the message.
                        This does not work currntly because our backend doesnt send a msg
                        back we only get a response like 200, 400, 401 we can work on this 
                        in the future.
                        For example if the email exists we can say email already exist or
                        your password is not longeer than 6 characters something like that
                    */ }
                    {this.state.msg ? <Alert color ="danger">{this.state.msg}</Alert>: null} 
                 <Form onSubmit = {this.onSubmit}>
                    <FormGroup>
                        <Label for = "name">
                            </Label>
                            <Input 
                                type = "text"
                                name= "name"
                                id = "Contact"
                                placeholder= "Name"
                                onChange = {this.onChangeName}
                                required
                                >

                            </Input>
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
                                id = "passeord"
                                placeholder= "Password"
                                onChange = {this.onChangePassword}
                                required
                                >

                            </Input>

                            <Label for = "age">
                            </Label>
                            <Input 
                                type = "text"
                                name= "age"
                                id = "age"
                                placeholder= "age"
                                onChange = {this.onChangeAge}

                                >

                            </Input>
                          
                            <Button 
                                color = "dark"
                                style = {{marginTop: '2rem'}}
                                block>

                                Create User
                            </Button>

                        
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

export default connect(mapStateToProps, {register, clearErrors })(RegisterModel);