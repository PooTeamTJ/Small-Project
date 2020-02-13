import {getItems} from '../actions/itemActions';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';

class getContacts extends Component {
    ongetItem = () => {
        this.props.getItems()

    }

render(){
    return (

        <Button onClick = {this.ongetItem()}>
            Show my contacts
        </Button>

    );
}

}

getContacts.propTypes = { 
    getItems: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
 });

 export default connect(mapStateToProps, { getItems })(getContacts);