import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

const paths = {
    project: '/project/'
};

const styles = theme => ({
    card: {
        minWidth: 470,
        margin: '10px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 16,
        fontWeight: 500
    },
    pos: {
        marginBottom: 12,
    },
});

const ProjectSummary = (props) => {
    const { classes, project } = props;

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} gutterBottom>
                        {project.title}
                    </Typography>
                    <Typography className={classes.pos}>
                        Posted by {project.authorFirstName} {project.authorLastName}
                    </Typography>
                    <Typography component="p" color="textSecondary">
                        {moment(project.createdAt.toDate()).fromNow()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        component={Link}
                        to={paths.project + project.id}
                    >
                        Project Details
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

ProjectSummary.propTypes = {
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectSummary);