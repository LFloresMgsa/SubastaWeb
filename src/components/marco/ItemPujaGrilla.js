import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';

import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { eventoService } from '../../services/evento.service';

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



const ItemPujaGrilla = (props) => {


    const [subastasPuja, setSubastasPuja] = React.useState([]);

    const obtenerPujasDetalle = async (pCab_cCatalogo, pDvm_cNummov) => {
        let _body = { Accion: "EVENTOABIERTO_DET_PUJA", Emp_cCodigo: "015", Pan_cAnio: "2023", Dvm_cNummov: pDvm_cNummov, Cab_cCatalogo: pCab_cCatalogo }


        return await eventoService.obtenerEventosDetPuja(_body).then(

            (res) => {

                setSubastasPuja(res[0])
            },
            (error) => {
                console.log(error);
            }
        );
    };


    useEffect(() => {

        // obtenerPujasDetalle(props.Cab_cCatalogo, props.Dvm_cNummov);
        obtenerPujasDetalle(props.pCab_cCatalogo, props.pDvm_cNummov);

    }, []);


    return (
        <box>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>

                            
                            <StyledTableCell align="right">Puja</StyledTableCell>
                            <StyledTableCell align="center">Fecha</StyledTableCell>
                            <StyledTableCell align="left">Nombre</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subastasPuja.map((row) => (
                            <StyledTableRow key={row.Dvd_nCorrel}>

                            
                                <StyledTableCell align="right">{row.Dvd_nImporte}</StyledTableCell>
                                <StyledTableCell align="center">{row.Dvd_dFechaPuja}</StyledTableCell>
                                <StyledTableCell align="left"> {`${row.Dvd_cNombres}, ${row.Dvd_cApellidos} `}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </box>
    );
};

export default ItemPujaGrilla;
