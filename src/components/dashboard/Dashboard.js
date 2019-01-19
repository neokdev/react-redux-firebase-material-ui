import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Notifications from './Notifications';
import ProjetList from '../projects/ProjectList';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
// eslint-disable-next-line
import { firebaseConnect, isLoaded } from 'react-redux-firebase';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: '20px'
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

class Dashboard extends Component {
    render() {
        const { projects, classes, auth, isLoaded, notifications } = this.props;

        if (!auth.uid && isLoaded) {
            return <Redirect to='/signin' />;
        }

        return (
            <Grid
                container
                className={classes.root}
                spacing={16}
            >

                <Grid item xs={12} md={8}>
                    <Grid container className={classes.demo} justify="center" spacing={Number(16)}>
                        <ProjetList projects={projects} />
                    </Grid>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Grid container className={classes.demo} justify="center" spacing={Number(16)}>
                        <Grid key={0} item>
                            <Notifications notifications={notifications} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    projects: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    };
};

export default compose(
    connect(mapStateToProps),
    firebaseConnect(),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc'] },
        { collection: 'notifications', limit: 10, orderBy: ['time', 'desc'] }
    ]),
    withStyles(styles)
)(Dashboard);