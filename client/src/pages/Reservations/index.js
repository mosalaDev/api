import React, { useEffect, useState } from 'react';
import { useGetData } from '../../utils/customeHooks';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LoadingPage } from '../../component';
import { ReservationTable } from '../../component';

export default function Reservations() {
    const { data, loading, error } = useGetData('/reservation');

    console.log(data);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            {(loading || !data) ?
                <LoadingPage /> :
                <div style={{ maxWidth: 1000, margin: 'auto' }}>
                    <ReservationTable rows={data} />
                </div>
            }
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        padding: '20px'
    }
});
