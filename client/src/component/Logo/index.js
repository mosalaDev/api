import React from 'react';
import logo from '../../assets/logo.png';
import { makeStyles } from '@mui/styles';

export default function Logo({ size }) {
    const useStyles = makeStyles({
        root: {
            width: size || 80,
        }
    });
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <img src={logo} alt="mosala maboko" />
        </div>
    )
}
