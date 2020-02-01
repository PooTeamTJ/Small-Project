/*
    This is the page that adds our contacts
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
    Input
} from 'reactstrap';

import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypess from 'prop-types';
//Imports

class ItemModel extends Component {
    state =  {
        modal: false,
        firstname: " ",
        lastname: " ",
        phonenumber: " ",
        email: "",
        dob: ""
    }

    static propTypes = {
        isAuthenticated: PropTypess.bool
    }

    toggle = () => {
        this.setState({
                modal: !this.state.modal
            }
        );
    };

    /*
        The value that we take from the input 
        we set the state of our state.
        Firstname, Lastname, phonenumber, email, dob
    */
    
    onChangeFirst = (e) => {

        this.setState({
            firstname: e.target.value
        })
    };

    onChangeLast = (e) => {

        this.setState({
            lastname: e.target.value
        })
    };

    onChangePhone = (e) => {

        this.setState({
            phonenumber: e.target.value
        })
    };

    
    onChangeEmail = (e) => {

        this.setState({
            email: e.target.value
        })
    };

    onChangeDOB = (e) => {

        this.setState({
            dob: e.target.value
        })
    };

/*
    We send our input values that got from the user to
    itemactions.
*/
    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            Firstname: this.state.firstname,
            Lastname: this.state.lastname,
            PhoneNumber: this.state.phonenumber,
            Email: this.state.email,
            Dob: this.state.dob
        }
    
    this.props.addItem(newItem);

    this.toggle();
    }

    render() {
        return (
            <div>
                {/* checking for authentication  before we show our Add button */}

                {this.props.isAuthenticated ?  
                <Button 
                    color="dark" 
                    style = {{marginBottom: '2rem'}} 
                    onClick= {this.toggle}>  
                        Add Contact
                </Button> : 
                    <h4 
                        className = "mb-3 ml-4"
                        textAlign = "center">
                            Welcome to contact Manager!!!
                            </h4>}
                    
                   
                            <Modal 
                            isOpen = {this.state.modal}
                            toggle = {this.toggle}
                            >
                
                        <ModalHeader toggle = {this.toggle}>
                        Add some contacts 
                        </ModalHeader>
                            <ModalBody>
                <Form onSubmit = {this.onSubmit}>
                    <FormGroup>
                        <Label for = "Contact">
                            Contact
                            </Label>
                            <Input 
                                type = "text"
                                firstname= "firstname"
                                id = "Contact"
                                placeholder= "Firstname"
                                onChange = {this.onChangeFirst}
                                required
                                >

                            </Input>
                            <Input 
                                type = "text"
                                lastname= "Lastname"
                                id = "Contact"
                                placeholder= "Lastname"
                                onChange = {this.onChangeLast}
                                required
                                >

                            </Input>
                            <Input 
                                type = "text"
                                phonenumber= "Phonenumber"
                                id = "Contact"
                                placeholder= "Phonenumber"
                                onChange = {this.onChangePhone}
                                required
                                >

                            </Input>
                            <Input 
                                type = "text"
                                email= "email"
                                id = "Contact"
                                placeholder= "Email"
                                onChange = {this.onChangeEmail}
                                required
                                >
                            </Input>
                            <Input 
                                type = "text"
                                dob= "dob"
                                id = "Contact"
                                placeholder= "DOB"
                                onChange = {this.onChangeDOB}
                                >
                            </Input>
                            <Button 
                                color = "dark"
                                style = {{marginTop: '2rem'}}
                                block>

                                Add Contact
                            </Button>

                        
                         </FormGroup>
                    </Form>
                </ModalBody>        
            </Modal>
        </div>
            
        );
    }
}

const mapStateToProps = state => ({
        item: state.item,
        isAuthenticated: state.auth.isAuthenticated
    }
)

export default connect(mapStateToProps, {addItem})(ItemModel);