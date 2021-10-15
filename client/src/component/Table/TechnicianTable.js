import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Typography } from '@mui/material';
import { getServiceImage } from '../../utils/serviceImage';

export default function TechnicianTable({ data }) {
    const rows = data || [];

    const { url } = useRouteMatch();
    const history = useHistory();
    const goToTechnician = (id) => {
        history.push(url + "/" + id);
    };

    const theme = useTheme();
    return (
        <Paper sx={{ borderRadius: 0 }}>
            <Typography sx={{ padding: theme.spacing(1, 2), fontWeight: '500' }} >Nouvelles demandes</Typography>
            <TableContainer sx={{ maxHeight: 400 }}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow onClick={() => goToTechnician(row.id)} key={row.name} sx={{
                                cursor: "pointer",
                                '&:hover': {
                                    backgroundColor: '#eaeaea'
                                },
                                '&:first-child > *': {
                                    borderTop: '1px solid #eaeaea'
                                },
                                '& > *': {
                                    padding: '10px 16px!important',
                                }
                            }}>
                                <TableCell component="th" scope="row" style={{ width: 25 }}>
                                    <Avatar style={{ width: 25, height: 25 }} src={getServiceImage(row.service.nom_service)} />
                                </TableCell>
                                <TableCell style={{ width: 160, textTransform: 'capitalize' }} align="left">
                                    {row.service.nom_service}
                                </TableCell>
                                <TableCell style={{ width: 160 }}>
                                    {row.user.nom} {row.user.prenom}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.zone.nom}
                                </TableCell>
                                <TableCell style={{ width: 250 }} align="right">
                                    {row.organisation}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}