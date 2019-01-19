import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider
} from '@material-ui/core';
import moment from 'moment';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        margin: '25px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
        borderRadius: '4px'
    },
    title: {
        textAlign: 'center',
        padding: '20px 20px 0 20px'
        // fontWeight: 'fontWeightMedium',
        // fontSize: 'h2.fontSize'
    },
    nav: {
        // textAlign: 'justify',
    },
    list: {
        paddingTop: '.5em',
        paddingBottom: '0'
    },
    divider: {
        marginTop: '.7em'
    },
});

const Notifications = (props) => {
    const { classes, notifications } = props;

    return (
        <div className={classes.root}>
            <Typography
                className={classes.title}
                variant="h5"
            >
                Notifications
            </Typography>
            <List component="nav">
                {notifications && notifications.map(item => {
                    return (
                        <Fragment key={item.id}>
                            <Divider className={classes.divider} />
                            <ListItem className={classes.list}>
                                <ListItemText
                                    className={classes.nav}
                                    primary={item.user + ' '}
                                    primaryTypographyProps={
                                        {
                                            color: 'secondary',
                                            fontWeight: '700'
                                        }
                                    }
                                    secondary={item.content}
                                />
                            </ListItem>
                            <ListItem className={classes.list}>
                                <ListItemText
                                    primary={moment(item.time.toDate()).fromNow()}
                                    className={classes.nav}
                                    primaryTypographyProps={
                                        {
                                            variant: 'caption'
                                        }
                                    }
                                />
                            </ListItem>
                        </Fragment>
                    );
                })}
            </List>
        </div>
    );
};

Notifications.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notifications);