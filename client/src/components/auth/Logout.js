/*
    This is where we logout very simple page
*/

import React, { Component, Fragment } from 'react';
import { logout } from '../../actions/authActions';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }
    onClickrefresh = () => {
        window.location.reload(false)
    }
    render() {
        return (
            <div>
               <Fragment>
                   <NavLink onClick= {this.props.logout} href= '#'>
                       Logout
                   </NavLink>

                 </Fragment> 
            </div>
        )
    }
}

export default connect(null, { logout })(Logout);
