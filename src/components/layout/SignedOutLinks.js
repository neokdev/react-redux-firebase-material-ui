import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const paths = {
    home: '/',
    signUp: '/signup',
    signIn: '/signin',
};

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
    },
});

const SignedOutLinks = () => {

    return (
        <div>
            <Button
                color="inherit"
                component={NavLink}
                to={paths.signUp}
            >
                Signup
            </Button>
            <Button
                color="inherit"
                component={NavLink}
                to={paths.signIn}
            >
                Login
            </Button>
        </div >
    );
};

SignedOutLinks.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignedOutLinks);
