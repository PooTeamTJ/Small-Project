import { Link } from 'react-router-dom'

import React, { Component } from 'react'
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
import {register} from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

class RegisterPage extends React.Component {
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
            <div class="container">
                <div class="row">
                    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto ">
                        <div class="card card-signin my-2">
                            <div class="card-body">
                                <h5 class="card-title text-center">Create an account</h5>
                                {this.state.msg ? <Alert color ="danger">{this.state.msg}</Alert>: null} 
                                <Form onSubmit={this.onSubmit} className="form-signin">
                                    <div class="form-label-group">
                                        <Input type ="text" name="name" id ="Contact" placeholder="Name" onChange ={this.onChangeName} required></Input>
                                        <Label for="Contact">Full Name</Label>
                                    </div>
                                    <div class="form-label-group">
                                        <Input type="email" name="email" id="Email" placeholder="Email" onChange={this.onChangeEmail} required></Input>
                                        <Label for="Email">Email</Label>
                                    </div>
                                    <div class="form-label-group">
                                        <Input type="password" name="password" id="Password" placeholder="Password" onChange={this.onChangePassword} required></Input>
                                        <Label for="Password">Password</Label>
                                    </div>
                                    <div class="form-label-group">
                                        <Input type="text" name="age" id="Age" placeholder="Age" onChange={this.onChangeAge}></Input> 
                                        <Label for="Age">Age</Label>
                                    </div>
                                    <div class="custom-control custom-checkbox mb-3">
                                        <Input type="checkbox" class="custom-control-input" id="customCheck1"></Input>
                                        <Label class="custom-control-label" for="customCheck1">Remember password</Label>
                                    </div>
                                    <Button class="btn btn-lg btn-block text-uppercase" style={{ backgroundColor: '#0971FF' }} block>Sign up</Button>
                                    <div class="text-center m-2">
                                        Already have an account?
                                        <Link to="/" style={{ color: 'orange' }}> Login here</Link>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
)

export default connect(mapStateToProps, {register, clearErrors })(RegisterPage);