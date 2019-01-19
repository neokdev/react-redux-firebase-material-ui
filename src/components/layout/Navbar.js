import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    LinearProgress,
} from '@material-ui/core';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, } from 'react-redux-firebase';

const paths = {
    home: '/'
};

const styles = {
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1
    }
};

const Navbar = (props) => {

    const { classes, auth, profile } = props;
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

    return (
        <div>
            <AppBar
                position="static"
                className={classes.root}
                color='primary'
            >
                <Toolbar>
                    <Typography
                        className={classes.title}
                        variant="h5"
                        color="inherit"
                        component={Link}
                        to={paths.home} >

                        MarioPlan
                    </Typography>
                    {
                        !isLoaded(auth)
                            ? null
                            : links
                    }
                </Toolbar>
            </AppBar>
            <div className={classes.root}>
                {
                    !isLoaded(auth)
                        ? <LinearProgress
                            color="primary"
                        />
                        : null
                }
            </div>

        </div >
    );
};

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    firebase: PropTypes.shape({
        login: PropTypes.func.isRequired
    }),
    auth: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    };
};

export default compose(
    firebaseConnect(),
    connect(mapStateToProps),
    withStyles(styles))(Navbar);