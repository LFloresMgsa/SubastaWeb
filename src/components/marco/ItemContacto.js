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

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import NumberFormat from 'react-number-format';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';
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



const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="S/ "
        />
    );
});

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};



const ItemContacto = (props) => {

    const history = useHistory();

    const [pdocumento, setDocumento] = useState('')
    const [pnombre, setNombre] = useState('')
    const [papellido, setApellido] = useState('')
    const [ptelefono, setTelefono] = useState('')
    const [pcorreo, setCorreo] = useState('')
    const [ppuja, setPuja] = useState(0)

    const [subastasPuja, setSubastasPuja] = React.useState([]);


    const [disabledPujar, setDisabledPujar] = useState(false)


    const grabarPujaDetalle = async (pCab_cCatalogo, pDvm_cNummov, pDvd_cDocID, pDvd_cNombres, pDvd_cApellidos, pDvd_cTelefono, pDvd_cCorreo, pDvd_nImporte) => {
        let _body = {
            Accion: "INSERTAR", Emp_cCodigo: "015", Pan_cAnio: "2023", Per_cPeriodo: "04", Dvm_cNummov: pDvm_cNummov, Cab_cCatalogo: pCab_cCatalogo,
            Dvd_nCorrel: 0, Dvd_cDocID: pDvd_cDocID, Dvd_cNombres: pDvd_cNombres, Dvd_cApellidos: pDvd_cApellidos,
            Dvd_cTelefono: pDvd_cTelefono, Dvd_cCorreo: pDvd_cCorreo, Dvd_nImporte: ppuja, Dvd_cEstado: "A", Dvd_dFechaPuja: "2023-04-26"
        }

        return await eventoService.obtenerEventosDetPuja(_body).then(

            (res) => {

                setSubastasPujaGrabar(res[0])
            },
            (error) => {
                console.log(error);
            }
        );
    };

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

    const handleGrabarSubasta = async () => {

        grabarPujaDetalle(props.pCab_cCatalogo, props.pDvm_cNummov, pdocumento, pnombre, papellido, ptelefono, pcorreo, ppuja);
        obtenerPujasDetalle(props.pCab_cCatalogo, props.pDvm_cNummov);
    }

    const handleRegresarSubasta = () => {

        console.log("handleRegresarSubasta");
        history.push({
            pathname: '/Subasta'

        });
    }

    const [values, setValues] = React.useState({
        textmask: '',
        numberformat: '',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleDisabled = (valor) => {

        if (valor == 0) {

            setDisabledPujar(false);
        }
        else {
            setDisabledPujar(true);
        }

    }

    useEffect(() => {

        obtenerPujasDetalle(props.pCab_cCatalogo, props.pDvm_cNummov);
        handleDisabled(props.pIndicePanel);

    }, []);

    return (
        <div >
            <Box sx={{ flexGrow: 1 }}>


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
                    <div align="left">
                        <h2 >Contacto:</h2>
                    </div>

                    <Grid container spacing={2}>

                        <Grid item xs={8}>

                            <table >
                                <tbody>
                                    <tr>
                                        <td>
                                            <TextField id="outlined-documento" label="Documento Id." variant="standard"
                                                value={pdocumento}
                                                onChange={(e) => setDocumento(e.target.value)}
                                                disabled={disabledPujar} />

                                            <TextField id="outlined-nombre" label="Nombres" variant="standard"
                                                value={pnombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                                disabled={disabledPujar} />

                                            <TextField id="outlined-apellido" label="Apellidos" variant="standard"
                                                value={papellido}
                                                onChange={(e) => setApellido(e.target.value)}
                                                disabled={disabledPujar} />


                                            <TextField id="outlined-telefono" label="Teléfono" variant="standard"
                                                value={ptelefono}
                                                onChange={(e) => setTelefono(e.target.value)}
                                                disabled={disabledPujar} />


                                            <TextField id="outlined-correo" label="Correo" variant="standard"
                                                value={pcorreo}
                                                onChange={(e) => setCorreo(e.target.value)}
                                                disabled={disabledPujar} />

                                            <TextField
                                                label="Valor de Puja"
                                                value={ppuja}
                                                onChange={(e) => setPuja(e.target.value)}
                                                name="numberformat"
                                                id="outlined-puja"
                                                InputProps={{
                                                    inputComponent: NumberFormatCustom,
                                                }}
                                                variant="standard"
                                                disabled={disabledPujar} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>


                        </Grid>

                    </Grid>
                </Paper>

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
                    <Grid container spacing={2}>

                        <Grid item xs={8}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Button variant="contained" size="small" color="primary" onClick={handleGrabarSubasta} disabled={disabledPujar} >Pujar</Button>
                                        </td>
                                        <td>
                                            <Button variant="contained" size="small" color="primary" onClick={handleRegresarSubasta}>Regresar</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </Grid>

                    </Grid>
                </Paper>

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
                </Paper>
            </Box >

        </div>
    );
};

export default ItemContacto;
