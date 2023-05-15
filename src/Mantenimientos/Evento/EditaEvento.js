import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { eventoService } from '../../services/evento.service';
import { general } from '../../components/general/general'

const EditaEvento = (props) => {
    const history = useHistory()
    const [data, setData] = useState([])
    const [error, setError] = useState([])
    const [loading, setLoading] = useState([])

    const [Vtt_cTipoEvento, setTipoEvento] = useState('')
    const [Dvm_cDescripcion, setDescripcion] = useState('')
    const [Dvm_dInicio, setFinicio] = useState(new Date());
    const [Dvm_dFin, setFfin] = useState(new Date());
    const [Dvm_cEstado, setEstado] = useState('')


    const { Emp_cCodigo } = useParams()
    const { Pan_cAnio } = useParams()
    const { Per_cPeriodo } = useParams()
    const { Dvm_cNummov } = useParams()

    // Load de Pagina
    useEffect(() => {

        obtenerEventos()
    }, [])

    // procedimiento para CONSULTA un catalogo con SP MySQL
    const obtenerEventos = async () => {
        try {
            let _result;
            let _body = { Accion: "BUSCARREGISTRO", Emp_cCodigo: Emp_cCodigo, Pan_cAnio: Pan_cAnio, Per_cPeriodo: Per_cPeriodo, Dvm_cNummov: Dvm_cNummov }

            await eventoService.obtenerEventosCabAuth(_body).then(
                (res) => {
                    setData(res[0]);
                    _result = res[0];
                },
                (error) => {
                    console.log(error)
                    setError(error);
                }
            )

            _result.map((item) => (
                setTipoEvento(item.Vtt_cTipoEvento),
                setDescripcion(item.Dvm_cDescripcion),
                setFinicio(item.Dvm_dInicio),
                setFfin(item.Dvm_dFin),
                setEstado(item.Dvm_cEstado)

            ))

        } finally {
            setLoading(false);
        }
    }



    // procedimiento para EDITAR un catalogo con SP MySQL
    const editarEvento = async (e) => {
        try {
            let pDvm_dInicio = general.convertirFechaTextToIsoText(Dvm_dInicio);
            let pDvm_dFin = general.convertirFechaTextToIsoText(Dvm_dFin);

            let _body = { Accion: "EDITAR", Emp_cCodigo: Emp_cCodigo, Pan_cAnio: Pan_cAnio, Per_cPeriodo: Per_cPeriodo, Dvm_cNummov: Dvm_cNummov, Vtt_cTipoEvento: Vtt_cTipoEvento, Dvm_cDescripcion: Dvm_cDescripcion, Dvm_dInicio: pDvm_dInicio, Dvm_dFin: pDvm_dFin, Dvm_cEstado: Dvm_cEstado }

            console.log(_body);

            await eventoService.obtenerEventosCabAuth(_body).then(
                (res) => {
                    setData(res[0]);
                },
                (error) => {
                    console.log(error)
                    setError(error);
                }
            );


            alert('El registro fue actualizado');

        } catch (error) {
            alert(error);


        } finally {
            history.push({
                pathname: '/MantEvento'
            });
            setLoading(false);
        }
    }

    const cancelar = async (e) => {
        history.push({
            pathname: '/MantEvento'
        });
        setLoading(false);
    }

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

                <Box sx={{ flexGrow: 1 }}>
                    <div align="left">
                        <h2 >EDITA EVENTOS:</h2>
                    </div>

                    <Grid container spacing={2}>

                        <Grid item xs={8}>
                            <TextField
                                label="Empresa"
                                value={Emp_cCodigo}
                                onChange={(e) => setTipoEvento(e.target.value)}
                                name="textformat"
                                id="Nro Movimiento"
                                variant="standard"
                                disabled="true"
                            />
                            <TextField
                                label="Año"
                                value={Pan_cAnio}
                                onChange={(e) => setTipoEvento(e.target.value)}
                                name="textformat"
                                id="Nro Movimiento"
                                variant="standard"
                                disabled="true"
                            />
                            <TextField
                                label="Periodo"
                                value={Per_cPeriodo}
                                onChange={(e) => setTipoEvento(e.target.value)}
                                name="textformat"
                                id="Nro Movimiento"
                                variant="standard"
                                disabled="true"
                            />

                            <TextField
                                label="Nro Movimiento"
                                value={Dvm_cNummov}
                                onChange={(e) => setTipoEvento(e.target.value)}
                                name="textformat"
                                id="Nro Movimiento"
                                variant="standard"
                                disabled="true"
                            />

                            <TextField
                                label="Tipo Evento"
                                value={Vtt_cTipoEvento}
                                onChange={(e) => setTipoEvento(e.target.value)}
                                name="textformat"
                                id="Tipo Evento"
                                variant="standard"
                            />


                            <TextField
                                label="Descripción"
                                value={Dvm_cDescripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                name="textformat"
                                id="Descripción"
                                variant="standard"
                            />

                            <TextField
                                label="Fecha Inicio"
                                value={Dvm_dInicio}
                                onChange={(e) => setFinicio(e.target.value)}
                                name="textformat"
                                id="Fecha Inicio"
                                variant="standard"
                            />
                            <TextField
                                label="Fecha Fin"
                                value={Dvm_dFin}
                                onChange={(e) => setFfin(e.target.value)}
                                name="textformat"
                                id="Fecha Fin"
                                variant="standard"
                            />
                            <TextField
                                label="Estado"
                                value={Dvm_cEstado}
                                onChange={(e) => setEstado(e.target.value)}
                                name="textformat"
                                id="Estado"
                                variant="standard"
                            />


                        </Grid>

                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Button variant="contained" size="small" color="primary" onClick={editarEvento}>Actualizar</Button>
                                        </td>
                                        <td>
                                            <Button variant="contained" size="small" color="primary" onClick={cancelar}>Cancelar</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Grid>
                    </Grid>
                </Box >

            </Paper>
        </div>
    )

}

export default EditaEvento