import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    TextField,
    Button,
    FormLabel
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
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
    },
});

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        error: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.signIn(this.state);
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

    // componentDidUpdate(prevProps) {

    //     if (null !== this.props.authError) {
    //         if (this.props.authError !== prevProps.authError) {
    //             this.handleError(this.props.authError);
    //         }
    //     }

    // }

    render() {
        const { classes, auth, authError } = this.props;

        if (auth.uid) {
            return <Redirect to='/' />;
        }

        if (authError) {
            this.handleError(authError);
        }

        return (
            < Grid
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
                        Sign In
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
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        className={classes.textField}
                    >
                        Login
                    </Button>
                </form>
            </Grid >
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
    signIn: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    authError: PropTypes.string,
    enqueueSnackbar: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withStyles(styles)(SignIn)));
