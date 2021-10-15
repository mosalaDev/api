import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { useTheme } from '@mui/material';

const CustomeModal = (props) => {
    const { children, open, handleClose, contentContainerStyles, contentContainerClassName } = props;

    const theme = useTheme();
    const useStyles = makeStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.common.white,
            borderRadius: 0,
            boxShadow: theme.shadows[3],
            padding: theme.spacing(2, 3),
            maxHeight: '100vh',
            overflowY: 'auto',
            zIndex: 1
        },
    });
    const classes = useStyles();
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    style: {
                        backgroundColor: '#00000096'
                    }
                }}
            >
                <Fade in={open}>
                    <div className={clsx(classes.paper, contentContainerClassName)} style={contentContainerStyles}>
                        {children}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}


CustomeModal.propTypes = {
    children: PropTypes.element,
    handleClose: PropTypes.func,
    open: PropTypes.bool,
    contentContainerStyles: PropTypes.object,
    contentContainerClassName: PropTypes.string,
}

export default CustomeModal;