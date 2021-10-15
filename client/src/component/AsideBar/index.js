import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { Logo } from '..';


export default function AsideBar({ width, setTitle }) {
    const theme = useTheme();

    const toggleActive = (t) => {
        setTitle(t);
    };

    const StyledLink = styled(NavLink)({
        display: 'block',
        padding: '10px 20px',
        fontWeight: '500',
        color: '#444',
        transition: 'color .2s',
        "&:hover": {
            color: theme.palette.primary.main
        }
    });

    const useStyles = makeStyles({
        root: {
            backgroundColor: '#fff',
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: width > 0 ? 0 : -250,
            zIndex: 1001
        },
        innerAside: {
            width: width || 250,
        },
        menuItem: {
            transition: 'background .2s, margin .2s'
        },
        active: {
            color: theme.palette.primary.main,
            backgroundColor: '#0020b10f',
            width: 'fit-content',
            marginLeft: '20px',
            borderRadius: '26px',
        },
        header: {
            padding: '10px 20px'
        },
        menu: {
        }
    });

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.innerAside}>
                <div className={classes.header}>
                    <Logo />
                </div>
                <menu className={classes.menu}>
                    <StyledLink exact activeClassName={classes.active} className={classes.menuItem} to={`/`} onClick={() => toggleActive('Home')}>
                        Home
                    </StyledLink>
                    <StyledLink activeClassName={classes.active} className={classes.menuItem} to={`/réservations`} onClick={() => toggleActive('Réservations')}>
                        Réservations
                    </StyledLink>
                    <StyledLink activeClassName={classes.active} className={classes.menuItem} to={`/affectations`} onClick={() => toggleActive('Affectations')}>
                        Affectations
                    </StyledLink>
                    <StyledLink activeClassName={classes.active} className={classes.menuItem} to={`/techniciens`} onClick={() => toggleActive('Techniciens')}>
                        Techniciens
                    </StyledLink>
                    <StyledLink activeClassName={classes.active} className={classes.menuItem} to={`/parametres`} onClick={() => toggleActive('Parametres')}>
                        Parametres
                    </StyledLink>
                </menu>
            </div>
        </div>
    )
}