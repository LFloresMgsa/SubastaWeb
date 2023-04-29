import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { eventoService } from '../services/evento.service';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const CatalogoBs = (props) => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [accion, setAccion] = useState('');
    const [empCCodigo, setEmpCCodigo] = useState('');
    const [lgtCCategoria, setLgtCCategoria] = useState('');
    const [lgtCGrupo, setLgtCGrupo] = useState('');
    const [lgtCClase, setLgtCClase] = useState('');
    const [lgtCFamilia, setLgtCFamilia] = useState('');
    const [cabCCatalogo, setCabCCatalogo] = useState('');
    const [cabCDescripcion, setCabCDescripcion] = useState('');
    const [propietario, setPropietario] = useState('');
    const [padre, setPadre] = useState('');
    const [madre, setMadre] = useState('');
    const [info, setInfo] = useState('');
    const [placa, setPlaca] = useState('');
    const [editMode, setEditMode] = useState(false);
    
    useEffect(() => {
        getData();
    }, []);



    const getData = async () => {
        let _body = { Accion: "BUSCARTODOS", Emp_cCodigo: "015" }


        return await eventoService.obtenerCatalogo(_body).then(
            (res) => {
                setData(res[0]);
            },
            (error) => {
                console.log(error);
            }
        );


    };



    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = async () => {
        try {
            await axios.post('/api/evento/lgm_catalogo_bs', {
                Accion: accion,
                Emp_cCodigo: empCCodigo,
                Lgt_cCategoria: lgtCCategoria,
                Lgt_cGrupo: lgtCGrupo,
                Lgt_cClase: lgtCClase,
                Lgt_cFamilia: lgtCFamilia,
                Cab_cCatalogo: cabCCatalogo,
                Cab_cDescripcion: cabCDescripcion,
                Propietario: propietario,
                Padre: padre,
                Madre: madre,
                Info: info,
                Placa: placa,
            });
            getData();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSave = async () => {
        const newData = {
            Accion: accion,
            Emp_cCodigo: empCCodigo,
            Lgt_cCategoria: lgtCCategoria,
            Lgt_cGrupo: lgtCGrupo,
            Lgt_cClase: lgtCClase,
            Lgt_cFamilia: lgtCFamilia,
            Cab_cCatalogo: cabCCatalogo,
            Cab_cDescripcion: cabCDescripcion,
            Propietario: propietario,
            Padre: padre,
            Madre: madre,
            Info: info,
            Placa: placa,
        };

        try {
            // Si editMode es verdadero, actualizamos un registro existente
            if (editMode) {
                await axios.put(`/lgm_catalogo_bs/${selectedItem.id}`, newData);
            }
            // De lo contrario, creamos un registro nuevo
            else {
                await axios.post("/lgm_catalogo_bs", newData);
            }

            // Actualizamos la lista de datos y cerramos el dialogo
            fetchData();
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            await axios.put(`/api/catalogo/${id}`, {
                Accion: accion,
                Emp_cCodigo: empCCodigo,
                Lgt_cCategoria: lgtCCategoria,
                Lgt_cGrupo: lgtCGrupo,
                Lgt_cClase: lgtCClase,
                Lgt_cFamilia: lgtCFamilia,
                Cab_cCatalogo: cabCCatalogo,
                Cab_cDescripcion: cabCDescripcion,
                Propietario: propietario,
                Padre: padre,
                Madre: madre,
                Info: info,
                Placa: placa,
            });
            getData();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/catalogo /${id}`);
            getData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (item) => {
        setAccion(item.Accion);
        setEmpCCodigo(item.Emp_cCodigo);
        setLgtCCategoria(item.Lgt_cCategoria);
        setLgtCGrupo(item.Lgt_cGrupo);
        setLgtCClase(item.Lgt_cClase);
        setLgtCFamilia(item.Lgt_cFamilia);
        setCabCCatalogo(item.Cab_cCatalogo);
        setCabCDescripcion(item.Cab_cDescripcion);
        setPropietario(item.Propietario);
        setPadre(item.Padre);
        setMadre(item.Madre);
        setInfo(item.Info);
        setPlaca(item.Placa);
        handleOpen();
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Crear
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Crear/Editar Registro</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor ingrese la información correspondiente al registro.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Accion"
                        type="text"
                        fullWidth
                        value={accion}
                        onChange={(e) => setAccion(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Emp_cCodigo"
                        type="text"
                        fullWidth
                        value={empCCodigo}
                        onChange={(e) => setEmpCCodigo(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Lgt_cCategoria"
                        type="text"
                        fullWidth
                        value={lgtCCategoria}
                        onChange={(e) => setLgtCCategoria(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Lgt_cGrupo"
                        type="text"
                        fullWidth
                        value={lgtCGrupo}
                        onChange={(e) => setLgtCGrupo(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Lgt_cClase"
                        type="text"
                        fullWidth
                        value={lgtCClase}
                        onChange={(e) => setLgtCClase(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Lgt_cFamilia"
                        type="text"
                        fullWidth
                        value={lgtCFamilia}
                        onChange={(e) => setLgtCFamilia(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Cab_cCatalogo"
                        type="text"
                        fullWidth
                        value={cabCCatalogo}
                        onChange={(e) => setCabCCatalogo(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Cab_cDescripcion"
                        type="text"
                        fullWidth
                        value={cabCDescripcion}
                        onChange={(e) => setCabCDescripcion(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Propietario"
                        type="text"
                        fullWidth
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Padre"
                        type="text"
                        fullWidth
                        value
                        onChange={(e) => setPadre(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Madre"
                        type="text"
                        fullWidth
                        value={madre}
                        onChange={(e) => setMadre(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Info"
                        type="text"
                        fullWidth
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Placa"
                        type="text"
                        fullWidth
                        value={placa}
                        onChange={(e) => setPlaca(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Accion</TableCell>
                            <TableCell>Emp_cCodigo</TableCell>
                            <TableCell>Lgt_cCategoria</TableCell>
                            <TableCell>Lgt_cGrupo</TableCell>
                            <TableCell>Lgt_cClase</TableCell>
                            <TableCell>Lgt_cFamilia</TableCell>
                            <TableCell>Cab_cCatalogo</TableCell>
                            <TableCell>Cab_cDescripcion</TableCell>
                            <TableCell>Propietario</TableCell>
                            <TableCell>Padre</TableCell>
                            <TableCell>Madre</TableCell>
                            <TableCell>Info</TableCell>
                            <TableCell>Placa</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.Accion}</TableCell>
                                <TableCell>{item.Emp_cCodigo}</TableCell>
                                <TableCell>{item.Lgt_cCategoria}</TableCell>
                                <TableCell>{item.Lgt_cGrupo}</TableCell>
                                <TableCell>{item.Lgt_cClase}</TableCell>
                                <TableCell>{item.Lgt_cFamilia}</TableCell>
                                <TableCell>{item.Cab_cCatalogo}</TableCell>
                                <TableCell>{item.Cab_cDescripcion}</TableCell>
                                <TableCell>{item.Propietario}</TableCell>
                                <TableCell>{item.Padre}</TableCell>
                                <TableCell>{item.Madre}</TableCell>
                                <TableCell>{item.Info}</TableCell>
                                <TableCell>{item.Placa}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(item)}>
                                        <InfoIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(item.id)}>
                                        <InfoIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};


export default CatalogoBs;