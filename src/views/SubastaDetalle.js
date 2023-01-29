import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';

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

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

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
    return {numero, puja, fecha, nombre };
}

const rows = [
    createData(1,650,'01/01/2023','Miguel Lopez'),
    createData(2,600,'01/01/2023','Luis flores'),
    createData(3,550,'01/01/2023','Erika Flores'),
    createData(4,500,'01/01/2023','Jose Hurtado')
    
];



const SubastaDetalle = () => {



    const history = useHistory();

    const location = useLocation();
    const myObject = location.state.props;

    const handleRegresarSubasta = () => {

        console.log("handleRegresarSubasta");
        history.push({
            pathname: '/Subasta'

        });
    }

    return (


        <div>
            <Paper
                sx={{
                    p: 2,
                    margin: 2,
                    maxWidth: 'auto',
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase sx={{ width: 150, height: 150 }}>
                            <Img alt="complex" src={myObject.imagen} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    <b>Placa: {myObject.placa} - PUJAR POR N° {myObject.id}</b>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {/* <p><b>Propietario</b>: {myObject.propietario}</p> */}

                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <p><b>Propietario</b>: {myObject.propietario}</p>
                                    <p><b>Padre:</b> {myObject.padre}</p>
                                    <p><b>Madre:</b> {myObject.madre}</p>

                                    <p><b>Info:</b> {myObject.info}</p>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                    <Button onClick={handleRegresarSubasta}>Regresar</Button>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" component="div">
                                <b>Precio Base : S/. {myObject.precio}</b>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item>
                    <Typography variant="h5" component="div">
                                <p> .</p>
                                {/* <b>Precio Base : S/. {myObject.precio}</b> */}
                            </Typography>                        
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                    </Grid>
                </Grid>
            </Paper>



            <div>

            </div>

        </div >


    );
};

export default SubastaDetalle;


// rsc