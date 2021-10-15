import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export default function LoadingPage({ size, width, height }) {
    return (
        <Box width={width || "100%"} minHeight="500px" height={height} display="flex" justifyContent='center' alignItems="center">
            <CircularProgress size={size || 20} />
        </Box>
    )
}
