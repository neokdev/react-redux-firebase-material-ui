import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProjectSummary from './ProjectSummary';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
});

const ProjectList = ({ projects, classes }) => {

    return (
        <Fragment>
            {projects && projects.map(project => {
                return (
                    <ProjectSummary
                        key={project.id}
                        project={project}
                        className={classes.card}
                    />
                );
            })}
        </Fragment>
    );
};

ProjectList.propTypes = {
    projects: PropTypes.array,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectList);