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
import CustomAlert from '../mensajes/CustomAlert';


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



const ConsultaPedido = (props) => {

    const history = useHistory()
    const [data, setData] = useState([])
    const [error, setError] = useState([])
    const [loading, setLoading] = useState([])


    const [Pdd_nCantidad, setCantidad] = useState('')
    const [Cab_cCatalogo, setCatalogo] = useState('')
    const [Pdd_cDescripcion, setDescripcion] = useState('')
    const [Pdd_nPrecioUnitario, setPeriodo] = useState('')
    const [Pdd_nPrecioNeto, setNombre] = useState('')
    


    const { Emp_cCodigo } = useParams()
    const { Pan_cAnio } = useParams()
    const { Pdm_cNummov } = useParams()
    const { Pdd_nItem } = useParams()
    

    // const [disabledPujar, setDisabledPujar] = useState(false)

    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    let _cMensajesJson;
    let _msgerror = '';
    let _mensaje = '';

    

    //#region Alerta
    const [alertOpen, setAlertOpen] = useState(false);

    const handleAlertOpen = () => {
        setAlertOpen(true);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    };
    //#endregion

    //#region Alerta de confirmacion

    // const [confirmOpen, setConfirmOpen] = useState(false);

    // const handleConfirmOpen = () => {

    //     let _mensaje = "";

    //     if (ppuja <= 0) { _mensaje = "El importe de la puja debe ser mayor a cero" }
        
    //     if (papellido == "") { _mensaje = "Ingrese su Apellido" }
    //     if (ptelefono == "") { _mensaje = "Ingrese su Teléfono" }
    //     if (pnombre == "") { _mensaje = "Ingrese su número Nombre" }
    //     if (pdocumento == "") { _mensaje = "Ingrese su Documento de Id." }        

    //     if (_mensaje != "") {

    //         setAlertMessage(_mensaje);
    //         setAlertType("alert");
    //         handleAlertOpen();
    //     }
    //     else {
    //         setAlertMessage("¿Deseas confirmar la Puja?");
    //         setConfirmOpen(true);
    //         }        
    // };

    // const handleConfirmClose = (result) => {
    //     if (result) {
    //         handleGrabarSubasta();
    //     }

    //     setConfirmOpen(false);
    // };

   

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
            {/* <CustomAlert
                type={alertType}
                message={alertMessage}
                open={alertOpen}
                onClose={handleAlertClose}
            />
            <CustomAlert
                type="confirm"
                message={alertMessage}
                open={confirmOpen}
                onClose={handleConfirmClose}
            /> */}

            <Box sx={{ flexGrow: 1 }}>

                <Grid container spacing={1}>

                    {/* <Grid item xs={4}>

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

                                <Grid item xs={12}>
                                    <TextField id="outlined-documento" label="Documento Id." variant="standard"
                                        value={pdocumento}
                                        onChange={(e) => setDocumento(e.target.value)}
                                        disabled={disabledPujar} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-nombre" label="Nombres" variant="standard"
                                        value={pnombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        disabled={disabledPujar} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-apellido" label="Apellidos" variant="standard"
                                        value={papellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                        disabled={disabledPujar} />

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-telefono" label="Teléfono" variant="standard"
                                        value={ptelefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        disabled={disabledPujar} />

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-correo" label="Correo" variant="standard"
                                        value={pcorreo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        disabled={disabledPujar} />
                                </Grid>
                                <Grid item xs={12}>
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
                            <Grid container spacing={2}   alignItems="center"  justifyContent="center">
                                <Grid item xs={6}>
                                    <Button variant="outlined" size="small" color="primary" onClick={handleRegresarSubasta}>Regresar</Button>
                                </Grid>

                                <Grid item xs={6}>
                                    <Button variant="contained" size="small" color="primary" onClick={handleConfirmOpen} disabled={disabledPujar} >Realizar Puja</Button>
                                </Grid>
                            </Grid>
                        </Paper>

                        
                    </Grid> */}
                    <Grid item xs={8}>
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


                    </Grid>
                </Grid>
            </Box >

        </div >
    );
};

export default ConsultaPedido;
