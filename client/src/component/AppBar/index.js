import React from 'react';
import { Typography, Avatar, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Menu } from '@mui/icons-material';

export default function AppBar({ asideWidth, title, toggleAside }) {
    const useStyles = makeStyles({
        root: {
            position: 'fixed',
            top: 0,
            width: `calc(100vw - ${asideWidth || 250}px)`,
            marginLeft: asideWidth || 250,
            backgroundColor: '#ffffffd9',
            boxShadow: '1px 0px 5px #8f8f8f',
            backdropFilter: 'blur(10px)',
            zIndex: 1000
        },
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px'
        }
    });
    const classes = useStyles();
    console.log(asideWidth);
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={toggleAside} style={{ marginRight: 10 }}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h1" color="GrayText" sx={{ fontSize: '2rem' }}>{title}</Typography>
                </div>
                <Avatar style={{ width: 30, height: 30 }}></Avatar>
            </div>
        </div>
    )
}
