import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'nom', headerName: 'Nom de la spécialité', width: 300, flex: 3 },
    { field: 'verification', headerName: 'Vérification', flex: 2 },
];

export default function SpecialitiesGrid({ data }) {
    const rows = data.map((d, i) => {
        return {
            id: i + 1,
            nom: d.nom_travail,
            verification: d.specialite_artisan.niveau || 'Non verifié'
        };
    });
    return (
        <div style={{
            height: (52 * rows.length) + 56 + 0.3 * rows.length, width: '100%'
        }}>
            <DataGrid
                rows={rows}
                columns={columns}
                hideFooter
                style={{ borderRadius: 0 }}
            />
        </div >
    );
}