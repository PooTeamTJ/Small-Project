import React from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
    return (
        <div class="container">
            <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto ">
                    <div class="card card-signin my-2">
                        <div class="card-body">
                            <h5 class="card-title text-center">Create an account</h5>
                            <form class="form-signin">
                                <div class="form-label-group">
                                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
                                    <label for="inputEmail">Email</label>
                                </div>

                                <div class="form-label-group">
                                        <input type="text" id="inputName" class="form-control" placeholder="Name" required />
                                        <label for="inputName">Full Name</label>
                                </div>

                                <div class="form-label-group">
                                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
                                    <label for="inputPassword">Password</label>
                                </div>

                                <div class="form-label-group">
                                        <input type="text" id="inputCompany" class="form-control" placeholder="Company" required />
                                        <label for="inputCompany">Company</label>
                                </div>

                                <div class="form-label-group">
                                        <input type="text" id="inputJob" class="form-control" placeholder="Job" required />
                                        <label for="inputJob">Job Title</label>
                                </div>
                                <div class="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                    <label class="custom-control-label" for="customCheck1">Remember password</label>
                                </div>
                                <button class="btn btn-primary btn-block text-uppercase" type="submit">Sign up</button>
                                <div class="text-center m-2">
                                    Already have an account?
                                    <Link to="/" style={{ color: 'orange' }}> Login here</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage