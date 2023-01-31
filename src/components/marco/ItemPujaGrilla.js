import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';

import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

const ItemPujaGrilla = (props) => {

    const history = useHistory();

    const location = useLocation();
    const myObject = location.state.props;

    return (
        <box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>

                            <StyledTableCell align="right">Número</StyledTableCell>
                            <StyledTableCell align="right">Puja</StyledTableCell>
                            <StyledTableCell align="center">Fecha</StyledTableCell>
                            <StyledTableCell align="left">Nombre</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>

                                <StyledTableCell align="right">{row.numero}</StyledTableCell>
                                <StyledTableCell align="right">{row.puja}</StyledTableCell>
                                <StyledTableCell align="center">{row.fecha}</StyledTableCell>
                                <StyledTableCell align="left">{row.nombre}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </box>
    );
};

export default ItemPujaGrilla;
