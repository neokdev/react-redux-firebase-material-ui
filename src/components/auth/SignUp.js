import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    TextField,
    Button,
    FormLabel
} from '@material-ui/core';
import { signUp } from '../../store/actions/authActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

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

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    }

    handleError = (err) => {
        // eslint-disable-next-line
        const { enqueueSnackbar } = this.props;
        this.props.enqueueSnackbar(err, {
            variant: 'error',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            },
            action: <Button size="small">Dismiss</Button>,
            autoHideDuration: 6000
        });
    }

    componentDidUpdate(prevProps) {
        if (null !== this.props.authError) {
            if (this.props.authError !== prevProps.authError) {
                this.handleError(this.props.authError);
            }
        }

    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    render() {
        const { classes, auth } = this.props;

        if (auth.uid) {
            return <Redirect to='/' />;
        }

        return (
            <Grid
                container
                className={classes.root}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <form
                        onSubmit={this.handleSubmit}
                        className={classes.form}
                    >

                        <FormLabel
                            component="legend"
                        >
                            Sign Up
                        </FormLabel>
                        <TextField
                            required
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="example@example.com"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            required
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            required
                            id="firstName"
                            label="First Name"
                            placeholder="First Name"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            required
                            id="lastName"
                            label="Last Name"
                            placeholder="Last Name"
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
                            Sign Up
                        </Button>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    signUp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(withSnackbar(SignUp));