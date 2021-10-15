import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles, Button } from '@material-ui/core';
import CustomeModal from '.';

const AppMessageModal = (props) => {
    const { open, handleClose, message, actions } = props;

    const classes = useStyles();
    return (
        <CustomeModal open={open} handleClose={handleClose} contentContainerStyles={{ borderRadius: 5 }}>
            <div className={classes.container}>
                <Typography variant="body1" color="textSecondary">
                    {message}
                </Typography>
                {actions ?
                    <div className={classes.actions}>
                        {actions.map((action, index) => (
                            <Button
                                key={`${index}_${action.label}`}
                                className={`btn ${classes.action}`}
                                variant="contained"
                                color={action.color}
                                onClick={action.onClick}
                                disableElevation
                            >
                                {action.label}
                            </Button>
                        ))}
                    </div> :
                    <Button
                        disableElevation
                        className={`btn ${classes.action}`}
                        variant="contained"
                        color="primary"
                        onClick={handleClose}
                    >
                        Ok
                    </Button>
                }
            </div>
        </CustomeModal>
    )
}

AppMessageModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    actions: PropTypes.arrayOf(PropTypes.object),
    message: PropTypes.string,
}

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: '#fff',
        width: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        textAlign: 'center',
        padding: 15,
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 15,
        width: '100%'
    },
    [theme.breakpoints.down('sm')]: {
        container: {
            width: 290
        }
    }
}));

export default AppMessageModal;