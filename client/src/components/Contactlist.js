/*
    We are going to use a little bit of css in here
    We are going to import react & react strap first & react transition
*/

/*
    This is the page that shows all our contacts once we login.
*/

import React, { Component, Fragment} from 'react';

import {Container, ListGroup, ListGroupItem, Button, Modal, ModalHeader, Form, FormGroup, ModalBody,Label, Input} from 'reactstrap';

import {CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { deleteItem, searchItem, updateItem, getItems} from '../actions/itemActions';
import PropTypes from 'prop-types';



class Contactlist extends Component
{
  
    state =  {

        firstname: null,
        lastname: null,
        phonenumber: null,
        email: null,
        dob: null
    }


    
    static propTypes = {
        isAuthenticated: PropTypes.bool
    }
   
    // life cycle method by react

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

    onSubmit = (id, Firstname, Lastname, PhoneNumber, Email) => {
        // e.preventDefault();

        if(this.state.firstname !== null){
            Firstname = this.state.firstname  
           };

         if(this.state.lastname !== null){
            Lastname = this.state.lastname  
          };

          if(this.state.phonenumber !== null){
            PhoneNumber = this.state.phonenumber 
          };

          if(this.state.email !== null){
            Email = this.state.email 
          };
       

        const newItem = {
            Firstname : Firstname,
            Lastname: Lastname,
            PhoneNumber: PhoneNumber,
            Email: Email,
            
        }
        
        console.log(newItem)
            this.props.updateItem(newItem, id);

                  
    }


    onDeleteClick = (id) => {
        
        
        this.props.deleteItem(id);
      
    }

    onGetitem = () => {
        this.props.getItems();
    }

    onClicklose = () => {
        window.location.reload(false)
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
          {this.props.isAuthenticated ? 
       
           <Container> 
                 <Button onClick = {this.onGetitem.bind(this)}> Show Contacts </Button>
                 <br></br>
                 <br></br>
               <Button onClick = {this.onClicklose.bind(this)}> Close contacts</Button>
              
             <ListGroup>
           
                 <TransitionGroup className = "Contact-list">
              
                    {/*items.map maps all the contacts that we got from the getItems*/}
                      
                     {items.map(({ _id,Firstname,Lastname,PhoneNumber,Email}) => (
                         <CSSTransition 
                            key = {_id} 
                            timeout = {500} 
                            classNames = "fade">
                             <ListGroupItem>
                                    
                                 <Button
                                    className = "delete-btn"
                                    color= "danger"
                                    size= "sm"
                                    onClick = {this.onDeleteClick.bind(this, _id)}
                                    >
                                        &times;     
                                        Delete
                                        
                                      
                                  </Button>
                                  {/* <Button>Edit </Button>  */}
                                   
                              
                                  
                                        {/*
                                            THis might be a little confusing why we use 
                                            bind in here but we have to for the delete to work
                                            or else it wont work.
                                        */}
                         
                        
                                 <div>
                                    <Input type = "text" defaultValue = {Firstname} onChange = {this.onChangeFirst}>  </Input>
                                    <Input type = "text"  defaultValue = {Lastname} onChange = {this.onChangeLast}> </Input>
                                    <Input type = "text"  defaultValue = {PhoneNumber} onChange = {this.onChangePhone}> </Input>
                                    <Input type = "text"  defaultValue = {Email} onChange = {this.onChangeEmail}> </Input>


                                     {/* <p> {_id} </p> */}
                                    <Button onClick = {this.onSubmit.bind(this, _id, Firstname, Lastname, PhoneNumber, Email)}> Save </Button>
                                    
                                  
                                 </div>                                        
                            </ListGroupItem>
                             
                         </CSSTransition>
                     ))}
                 </TransitionGroup>
             </ListGroup>
           </Container>
            : null }
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
       item: state.item,
       isAuthenticated: state.auth.isAuthenticated
    }
);
export default connect(mapStateToProps, { deleteItem, searchItem, updateItem, getItems})(Contactlist); // connecting to getItems, deleteItems and searchItems
