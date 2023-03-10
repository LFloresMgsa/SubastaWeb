import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';

import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ForkLeft } from '@mui/icons-material';

import ItemContacto from './ItemContacto';
import ItemPujaGrilla from './ItemPujaGrilla';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(numero, puja, fecha, nombre) {
    return { numero, puja, fecha, nombre };
}

const rows = [
    createData(1, 650, '01/01/2023', 'Miguel Lopez'),
    createData(2, 600, '01/01/2023', 'Luis flores'),
    createData(3, 550, '01/01/2023', 'Erika Flores'),
    createData(4, 500, '01/01/2023', 'Jose Hurtado')

];

const ItemPuja = () => {

    const history = useHistory();

    const location = useLocation();
    /* const myObject = location.state.props; */

    return (
        <div>
            <Paper
                sx={{
                    p: 2,
                    margin: 1,
                    maxWidth: 'auto',
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >

                <table>
                    <tr>
                        <th>
                            <ItemContacto />
                        </th>
                        <th>
                            <ItemPujaGrilla />
                        </th>
                    </tr>
                </table>

            </Paper>
        </div>
    );
};

export default ItemPuja;
