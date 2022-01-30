import React, { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Affectations, HomePage, Parametres, Reservations, SingleTechnician, Techniciens } from '../../pages';
import AppBar from '../../component/AppBar';
import { makeStyles } from '@mui/styles';
import { useMediaQuery } from '@mui/material';
import AsideBar from '../../component/AsideBar';
import SingleReservation from '../../pages/Reservations/SingleReservation';

export default function MainNavigation() {
    const match = useMediaQuery("(max-width: 800px)");
    console.log("match", match);
    const [title, setTitle] = useState('Home');
    const [asideWidth, setAsideWidth] = useState(match ? 0 : 250);
    const [openAside, setOpenAside] = useState(true);

    const toggleAside = () => {
        if (openAside) {
            setAsideWidth(-1);
        } else {
            setAsideWidth(250);
        }
        setOpenAside(!openAside);
    };

    const { path } = useRouteMatch();

    const useStyles = makeStyles(theme => ({
        root: {
            backgroundColor: '#E5E5E5',
            minHeight: '100vh',
        },
        main: {
            marginLeft: asideWidth,
            paddingTop: 65
        }
    }));
    useEffect(() => {
        if (window.innerWidth <= 800) {
            setAsideWidth(-1);
        }
    }, []);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar asideWidth={asideWidth} title={title} toggleAside={toggleAside} />
            <AsideBar width={asideWidth} setTitle={setTitle} />
            <main className={classes.main}>
                <Switch>
                    <Route path="/techniciens/:id" component={SingleTechnician} />
                    <Route path="/reservations/:id" component={SingleReservation} />
                    <Route path="/reservations" component={Reservations} />
                    <Route path="/affectations" component={Affectations} />
                    <Route path="/parametres" component={Parametres} />
                    <Route path="/techniciens" component={Techniciens} />
                    <Route path={path} component={HomePage} />
                </Switch>
            </main>
        </div>
    );
}