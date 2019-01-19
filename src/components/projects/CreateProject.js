import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Grid,
    TextField,
    Button,
    FormLabel
} from '@material-ui/core';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { createProject } from '../../store/actions/projectActions';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    form: {
        padding: '10%'
    }
});

class CreateProject extends Component {
    state = {
        title: '',
        content: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.createProject(this.state);
        this.props.history.push('/');
    }

    render() {
        const { classes, auth } = this.props;

        if (!auth.uid) {
            return <Redirect to='/signin' />;
        }

        return (
            <Grid
                container
                className={classes.root}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <form
                    onSubmit={this.handleSubmit}
                    className={classes.form}
                >

                    <FormLabel
                        component="legend"
                    >
                        Create new project
                    </FormLabel>
                    <TextField
                        required
                        id="title"
                        label="Title"
                        defaultValue="Title of the project"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        required
                        id="content"
                        label="Content"
                        multiline
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        className={classes.textField}
                    >
                        Create
                    </Button>

                </form>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createProject: project => dispatch(createProject(project))
    };
};

CreateProject.propTypes = {
    classes: PropTypes.object.isRequired,
    createProject: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles))(CreateProject);
