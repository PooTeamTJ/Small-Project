/*
    This page takes 
    Takes the first name our contact and search them
    in the loaded list.
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
import { searchItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
// Imoprts

class SearchList extends Component
{
    state = 
    {
        modal: false,
        firstname: " "
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }


    onChangeFirst = (e) => {

        this.setState({
            firstname: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();

    const newItem = {
        Firstname: this.state.firstname
    }
    this.props.searchItem(newItem);
    }

    render()
    {
        return (
        <div style={{width: "50px"}}>

            {this.props.isAuthenticated ?    
                    <Form inline onSubmit = {this.onSubmit} style={{width: "25vw"}}>
                                         <FormGroup>
                                                    <Input 
                                                        type = "text"
                                                        firstname= "firstname"
                                                        id = "Contact"
                                                        placeholder= "Firstname"
                                                        onChange = {this.onChangeFirst}
                                                        className="mb-2 ml-3"
                                                        >

                                                     </Input>
                                                    <Button color = "dark" className="ml-3 mb-2">
                                                        Search Contact
                                                    </Button>
                                            </FormGroup>
                    </Form>
                                            : ''}
                    <Modal isOpen = {this.state.modal} toggle = {this.toggle}>
                    <ModalHeader toggle = {this.toggle}>
                        Search some contacts 
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
                                                        >

                                                     </Input>

                            
                                                    <Button 
                                                        color = "dark"
                                                        style = {{marginTop: '2rem'}}
                                                        block>

                                                        Search Contact
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
        item: state.item,
        isAuthenticated: state.auth.isAuthenticated
    }
)

export default connect(mapStateToProps, {searchItem})(SearchList);
