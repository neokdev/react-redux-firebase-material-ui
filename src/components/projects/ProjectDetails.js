import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Divider,
    CardHeader,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const styles = theme => ({
    root: {
        marginTop: '20px',

    },
    card: {
        minWidth: 275,
        maxWidth: 800,
    },
    divider: {
        margin: '20px 0'
    }
});

const ProjectDetails = (props) => {
    const { auth, classes, project } = props;

    if (!auth.uid) {
        return <Redirect to='/signin' />;
    }

    if (project) {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.root}
            >
                <Card
                    className={classes.card}
                >
                    <CardHeader
                        title={project.title}
                        subheader={moment(project.createdAt.toDate()).calendar()}
                    />
                    <CardContent>
                        <Typography
                            component="p">
                            {project.content}
                        </Typography>
                        <Divider
                            className={classes.divider}
                        />
                        <Typography
                            component="p"
                            color="textSecondary">
                            Posted by {project.authorFirstName} {project.authorLastName}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid >);
    } else {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.root}
            >
                Loading project...
            </Grid >);
    }
};

ProjectDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;

    return {
        project: project,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects' }
    ]),
    withStyles(styles)
)(ProjectDetails);