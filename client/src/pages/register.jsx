import { Link } from 'react-router-dom'
import '../App.css'
import React, { Component } from 'react';
import {
    Button,
    Form,
    Input,
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
        msg: null,
        successMessage: null
    };

    static propTypes  = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        showSuccess:PropTypes.bool

    }

    componentDidUpdate(prevProps) {
<<<<<<< HEAD
        // console.log(this.props)
        const { error, isAuthenticated } = this.props;
=======
        const { error, isAuthenticated, showSuccess} = this.props;
>>>>>>> 1bf2902b6ecc4609123f199a11065ca50206c763
        if (error !== prevProps.error) {
            if (error.id === 'REGISTER_FAIL') {
                this.setState({msg: error.msg.msg, successMessage:null})
            }
            if (error.id === 'REGISTER_SUCCESS') {
                this.setState({msg: error.msg.msg})
            }
            else {
                this.setState({msg:null})
            }

        }
        if(showSuccess !== prevProps.showSuccess)
        {
          if (showSuccess === true)
            this.setState({successMessage:'User was created!', msg: null})

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
            <body className="background">
                <div class="container pt-5">
                    <div class="row">
                        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto ">
                            <div class="card card-signin my-2">
                                <div class="card-body">
                                    <h5 class="card-title text-center">Create an account</h5>
                                    {this.state.msg ? <Alert color ="danger">{this.state.msg}</Alert>: null}
                                    {this.state.successMessage ? <Alert color ="success">{this.state.successMessage}</Alert>: null}

                                    <Form onSubmit={this.onSubmit} className="form-signin">
                                        <div class="form-label-group mb-2">
                                            <Input type ="text" name="name" id ="Contact" placeholder="Name" onChange ={this.onChangeName} required></Input>

                                        </div>
                                        <div class="form-label-group mb-2">
                                            <Input type="email" name="email" id="Email" placeholder="Email" onChange={this.onChangeEmail} required></Input>

                                        </div>
                                        <div class="form-label-group mb-2">
                                            <Input type="password" name="password" id="Password" placeholder="Password" onChange={this.onChangePassword} required></Input>

                                        </div>
                                        <div class="form-label-group mb-4">
                                            <Input type="text" name="age" id="Age" placeholder="Age" onChange={this.onChangeAge}></Input>

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
            </body>
        )
    }
}

const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error,
        showSuccess:state.auth.showSuccess
    }
)

export default connect(mapStateToProps, {register, clearErrors })(RegisterPage);
