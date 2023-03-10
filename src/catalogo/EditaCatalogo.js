import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Description } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { signingRequestService } from '../services/api.helper'

const CompEditaCatalogo = (props) => {
    const history = useHistory()
    const [data, setData] = useState([])
    const [error, setError] = useState([])
    const [loading, setLoading] = useState([])

    const [Lgt_cCategoria, setCategoria] = useState('')
    const [Lgt_cGrupo, setGrupo] = useState('')
    const [Lgt_cClase, setClase] = useState('')
    const [Lgt_cFamilia, setFamilia] = useState('')

    const [Cab_cDescripcion, setDescripcion] = useState('')
    const [Propietario, setPropietario] = useState('')
    const [Padre, setPadre] = useState('')
    const [Madre, setMadre] = useState('')
    const [Info, setInfo] = useState('')
    const [Placa, setPlaca] = useState('')


    const { Emp_cCodigo } = useParams()
    const { Cab_cCatalogo } = useParams()


    useEffect(() => {

        obtenerCatalogo()
    }, [])

    // procedimiento para CONSULTA un catalogo con SP MySQL
    const obtenerCatalogo = async () => {
        try {
            let _result;
            let _body = { Accion: "BUSCARREGISTRO", Emp_cCodigo: Emp_cCodigo, Cab_cCatalogo: Cab_cCatalogo }
            await signingRequestService.ejecutaSP(_body).then(
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
                setCategoria(item.Lgt_cCategoria),
                setGrupo(item.Lgt_cGrupo),
                setClase(item.Lgt_cClase),
                setFamilia(item.Lgt_cFamilia),
                setDescripcion(item.Cab_cDescripcion),
                setPropietario(item.Propietario),
                setPadre(item.Padre),
                setMadre(item.Madre),
                setInfo(item.Info),
                setPlaca(item.Placa)
            ))

        } finally {
            setLoading(false);
        }
    }


    // procedimiento para EDITAR un catalogo con SP MySQL
    const editarCatalogo = async (e) => {
        try {
            let _body = { Accion: "EDITAR", Emp_cCodigo: Emp_cCodigo, Lgt_cCategoria: Lgt_cCategoria, Lgt_cGrupo: Lgt_cGrupo, Lgt_cClase: Lgt_cClase, Lgt_cFamilia: Lgt_cFamilia, Cab_cCatalogo: Cab_cCatalogo, Cab_cDescripcion: Cab_cDescripcion, Propietario: Propietario, Padre: Padre, Madre: Madre, Info: Info, Placa: Placa }
            await signingRequestService.ejecutaSP(_body).then(
                (res) => {
                    setData(res[0]);
                },
                (error) => {
                    console.log(error)
                    setError(error);
                }
            )
        } finally {
            history.push({
                pathname: '/catalogo'
            });
            setLoading(false);
        }
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
                        <h2 >EDITA CATALOGO:</h2>
                    </div>

                    <Grid container spacing={2}>

                        <Grid item xs={8}>

                            <TextField
                                label="Categoria"
                                value={Lgt_cCategoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                name="textformat"
                                id="categoria"
                                variant="standard"
                            />


                            <TextField
                                label="Grupo"
                                value={Lgt_cGrupo}
                                onChange={(e) => setGrupo(e.target.value)}
                                name="textformat"
                                id="grupo"
                                variant="standard"
                            />

                            <TextField
                                label="Clase"
                                value={Lgt_cClase}
                                onChange={(e) => setClase(e.target.value)}
                                name="textformat"
                                id="clase"
                                variant="standard"
                            />
                            <TextField
                                label="Familia"
                                value={Lgt_cFamilia}
                                onChange={(e) => setFamilia(e.target.value)}
                                name="textformat"
                                id="familia"
                                variant="standard"
                            />

                            <TextField
                                label="Descripcion"
                                value={Cab_cDescripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                name="textformat"
                                id="descripcion"
                                variant="standard"
                            />
                            <TextField
                                label="Propietario"
                                value={Propietario}
                                onChange={(e) => setPropietario(e.target.value)}
                                name="textformat"
                                id="propietario"
                                variant="standard"
                            />
                            <TextField
                                label="Pade"
                                value={Padre}
                                onChange={(e) => setPadre(e.target.value)}
                                name="textformat"
                                id="padre"
                                variant="standard"
                            />
                            <TextField
                                label="Madre"
                                value={Madre}
                                onChange={(e) => setMadre(e.target.value)}
                                name="textformat"
                                id="madre"
                                variant="standard"
                            />
                            <TextField
                                label="Info"
                                value={Info}
                                onChange={(e) => setInfo(e.target.value)}
                                name="textformat"
                                id="info"
                                variant="standard"
                            />
                            <TextField
                                label="Placa"
                                value={Placa}
                                onChange={(e) => setPlaca(e.target.value)}
                                name="textformat"
                                id="placa"
                                variant="standard"
                            />

                            <Button variant="contained" size="small" color="primary" onClick={editarCatalogo}>Actualizar</Button>

                        </Grid>

                    </Grid>
                </Box >

            </Paper>
        </div>
    )

}

export default CompEditaCatalogo