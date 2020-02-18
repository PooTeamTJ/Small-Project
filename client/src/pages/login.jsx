import React, { Component } from "react"
import { Link, Route, Redirect } from "react-router-dom"
import ContactPage from "../pages/contact"
import '../App.css'


import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
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




class LoginPage extends React.Component {
    // NEW CODE!!!
    state = {
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

    onChangeEmail = (e) => {

        this.setState({
            email: e.target.value
        })
    }

    onChangePassword = (e) => {

        this.setState({
            password: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const { email, password} = this.state;

        // Create a user object
        const newUser = {
            email,
            password
        }

    this.props.login(newUser)
    }


    render() {
        return (
            <body className="background">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Sign In</h5>
                                    {this.state.msg ? <Alert color ="danger">{this.state.msg}</Alert>: null} {/* checking for error msg*/}
                                    <Form onSubmit={this.onSubmit} className="form-signin">
                                        <div className="form-label-group mb-2">
                                            <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChangeEmail} className="form-control"  required autoFocus></Input>
                                        </div>

                                        <div className="form-label-group mb-2">
                                            <Input type="password" name="password" id="password" className="form-control" placeholder="Password" onChange={this.onChangePassword} required></Input>
                                        </div>
                                        <div className="custom-control custom-checkbox mb-3">
                                            <Input type="checkbox" className="custom-control-input" id="customCheck1"></Input>
                                            <Label className="custom-control-label" for="customCheck1">Remember password</Label>
                                        </div>
                                        <Button className="btn btn-lg btn-block text-uppercase" style={{ backgroundColor: '#0971FF' }} block>Sign in</Button>
                                        <div className="text-center pt-3">
                                            Don't have an account?
                                            <Link to="/register" style={{ color: 'orange' }}> Create an Account</Link>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Route exact path="/">
                        {this.props.isAuthenticated ? <Redirect to="/contact" /> : null }
                    </Route>
                </div>
            </body>


        )
    }
}

const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
)

export default connect(mapStateToProps, {login, clearErrors})(LoginPage)
