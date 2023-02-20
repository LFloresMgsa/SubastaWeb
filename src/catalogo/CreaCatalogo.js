import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Description } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const URI = 'http://localhost:5000/api/catalogo'

const CompCreaCatalogo = (props) => {

    const history = useHistory();


    const [Emp_cCodigo, setEmpresa] = useState('')
    const [Lgt_cCategoria, setCategoria] = useState('')
    const [Lgt_cGrupo, setGrupo] = useState('')
    const [Lgt_cClase, setClase] = useState('')
    const [Lgt_cFamilia, setFamilia] = useState('')
    const [Cab_cCatalogo, setCatalogo] = useState('')
    const [Cab_cDescripcion, setDescripcion] = useState('')
    const [Propietario, setPropietario] = useState('')
    const [Padre, setPadre] = useState('')
    const [Madre, setMadre] = useState('')
    const [Info, setInfo] = useState('')
    const [Placa, setPlaca] = useState('')

    // procedimiento para INSERTAR un catalogo con SP MySQL
    const insertaCatalogo = async (e) => {
        try {
            e.preventDefault()
            const response = await fetch(URI + '/sp/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Accion: "INSERTAR", Emp_cCodigo: Emp_cCodigo, Lgt_cCategoria: Lgt_cCategoria, Lgt_cGrupo: Lgt_cGrupo, Lgt_cClase: Lgt_cClase, Lgt_cFamilia: Lgt_cFamilia, Cab_cCatalogo: Cab_cCatalogo, Cab_cDescripcion: Cab_cDescripcion, Propietario: Propietario, Padre: Padre, Madre: Madre, Info: Info, Placa: Placa })
            });
            const json = await response.json();
            setData(json[0]);

        } catch (error) {
            setError(error);
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
                        <h2 >CREA CATALOGO:</h2>
                    </div>

                    <Grid container spacing={2}>

                        <Grid item xs={8}>
                            <TextField
                                label="Empresa"
                                value={Emp_cCodigo}
                                onChange={(e) => setEmpresa(e.target.value)}
                                name="textformat"
                                id="empresa"
                                variant="standard"
                            />

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
                                label="Catalogo"
                                value={Cab_cCatalogo}
                                onChange={(e) => setCatalogo(e.target.value)}
                                name="textformat"
                                id="catalogo"
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

                            <Button variant="contained" size="small" color="primary" onClick={insertaCatalogo}>Crear</Button>

                        </Grid>

                    </Grid>
                </Box >

            </Paper>
        </div>
    )
}

export default CompCreaCatalogo