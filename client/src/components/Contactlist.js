/*
    We are going to use a little bit of css in here

    We are going to import react & react strap first & react transition
*/

/*
    This is the page that shows all our contacts once we login.
*/

import React, { Component} from 'react';

import {Container, ListGroup, ListGroupItem, Button, Modal, ModalHeader, Form, FormGroup} from 'reactstrap';

import {CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import {getItems, deleteItem, searchItem} from '../actions/itemActions';
import PropTypes from 'prop-types';


class Contactlist extends Component
{

    state =  {
        modal:false,
        firstname: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
                modal: !this.state.modal
            }
        );
    }

    // life cycle method by react

    // componentDidMount() {
    //     this.props.getItems();
    // }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
        this.toggle();
    }

   render() {


       const { items } = this.props.item  //  this is a deconstructer


       return(
            /*
                1. Dark Color for our contact
                2. style with 2rem margin

                3.
                    When we click it is going to
                    prompt us with firstname, lastname and phonenumber
                    and we enter them accordingly let's see if this
                    works there should be a easier way to do this.
            */


           <div>

          {this.props.isAuthenticated  ? '' :
           <Container>
             <ListGroup>
                 <TransitionGroup className = "Contact-list">

                    {/*items.map maps all the contacts that we got from the getItems*/}

                     {items.map(({ _id,Firstname,Lastname,PhoneNumber,Email }) => (
                         <CSSTransition
                            key = {_id}
                            timeout = {500}
                            classNames = "fade">
                             <ListGroupItem>

                                 <Button
                                    className = "delete-btn"
                                    color= "danger"
                                    size= "sm"
                                    onClick={this.toggle}>
                                        &times;
                                        Delete
                                    </Button>



                                    <p> Firstname: {Firstname} </p>
                                    <p> Lastname: {Lastname}</p>
                                    <p>Phone: {PhoneNumber}</p>
                                    <p>Email: {Email}</p>
                                    <p> id: {_id}</p>

                                {/* <p> DOB : {Birthday} </p> */}

                                <Form>
                                <FormGroup>
                                <Modal
                                    isOpen = {this.state.modal}
                                    toggle = {this.toggle}>
                                <ModalHeader toggle = {this.toggle}>

                                Are you Sure you want to delete this contact?

                                </ModalHeader>
                                <Button
                                color = "dark"
                                style = {{marginTop: '2rem'}}
                                block
                                onClick = {this.onDeleteClick.bind(this, _id)}>
                                    {/*
                                        THis might be a little confusing why we use
                                        bind in here but we have to for the delete to work
                                        or else it wont work.
                                    */}

                                Delete Contact {_id}
                                </Button>
                                </Modal>
                                </FormGroup>
                                </Form>

                                <Button color = "dark">
                                        Update Contact
                                </Button>

                             </ListGroupItem>

                         </CSSTransition>
                     ))}
                 </TransitionGroup>
             </ListGroup>
           </Container>
            }
           </div>
       );
   }
}

// Proptypes

Contactlist.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
       item: state.item
    }
);
export default connect(mapStateToProps, { getItems, deleteItem, searchItem})(Contactlist); // connecting to getItems, deleteItems and searchItems
