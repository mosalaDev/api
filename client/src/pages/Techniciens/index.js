import React from 'react';
import { LoadingPage, TechnicianList, TechnicianTable } from '../../component';
import { useGetData } from '../../utils/customeHooks';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';


export default function Techniciens() {
    const { data, loading, error } = useGetData('/technicien');

    const classes = useStyles();
    return (
        <div className={classes.root}>
            {(loading && !data) ?
                <LoadingPage /> :
                <TechnicianTable data={data} />
            }
            <Grid container className={classes.flexed}>
                <Grid item xs={12} sm={6}>
                    <TechnicianList title="Techniciens disponibles" />
                </Grid>
                <Grid item xs={12} sm={1} />
                <Grid item xs={12} sm={5}>
                    <TechnicianList title="Tous les techniciens" />
                </Grid>
            </Grid>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        padding: '20px'
    },
    flexed: {
        marginTop: 30
    }
});
