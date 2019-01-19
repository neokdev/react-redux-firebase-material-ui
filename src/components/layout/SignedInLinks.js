import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Fab,
    Menu,
    MenuItem,
    Button
} from '@material-ui/core';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { withStyles } from '@material-ui/core/styles';

const paths = {
    home: '/',
    create: '/create',

};

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
    },
});

class SignedInLinks extends Component {

    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        // eslint-disable-next-line
        const { classes, signOut, profile } = this.props;

        return (
            <div>
                <Button
                    color="inherit"
                    component={NavLink}
                    to={paths.create}
                >
                    New Project
                </Button>
                <Button
                    color="inherit"
                    onClick={this.props.signOut}
                >
                    Log Out
                </Button>
                <Fab
                    color='secondary'
                    className={classes.fab}
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <span>{profile.initials}</span>
                </Fab
                >
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem
                        onClick={this.handleClose}
                        component={NavLink}
                        to={paths.create}
                    >
                        New Project
                    </MenuItem>
                    <MenuItem
                        onClick={this.props.signOut}
                    >
                        Log Out
                    </MenuItem>
                    <MenuItem
                        onClick={this.handleClose}
                        component={NavLink}
                        to={paths.home}
                    >

                    </MenuItem>
                </Menu>
            </div >
        );
    }
}

SignedInLinks.propTypes = {
    classes: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(SignedInLinks));
