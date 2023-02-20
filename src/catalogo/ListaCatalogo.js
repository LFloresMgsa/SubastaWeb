import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const URI = 'http://localhost:5000/api/catalogo'

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

const CompListaCatalogo = (props) => {

  const history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState([]);
  const [dataDelete, setDataDelete] = useState([]);


  useEffect(() => {
    obtenerCatalogos();
  }, []);


  // procedimiento para CONSULTA un catalogo con SP MySQL
  const obtenerCatalogos = async () => {
    try {
      const response = await fetch(URI + '/sp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Accion: "BUSCARTODOS", Emp_cCodigo: "015" })
      });
      const json = await response.json();
      setData(json[0]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  // procedimiento para ELIMINAR un catalogo con SP MySQL
  const eliminaCatalogo = async (Emp_cCodigo, Cab_cCatalogo) => {
    try {
      const response = await fetch(URI + '/sp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Accion: "ELIMINAR", Emp_cCodigo: Emp_cCodigo, Cab_cCatalogo: Cab_cCatalogo })
      });
      const json = await response.json();
      setDataDelete(json[0]);

    } catch (error) {
      setError(error);
    } finally {
      obtenerCatalogos();
      setLoading(false);
    }
  }

  // procedimiento para EDITAR un catalogo con SP MySQL
  const editarCatalogo = (Emp_cCodigo, Cab_cCatalogo) => {
    history.push({
      pathname: `/editar/${Emp_cCodigo}/${Cab_cCatalogo}`,
      state: { props }
    });
  }

  // procedimiento para CREAR un catalogo con SP MySQL
  const crearCatalogo = () => {
    history.push({
      pathname: '/crear',
      state: { props }
    });
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
        <box>
          <Button variant="contained" size="small" color="primary" onClick={() => crearCatalogo()} >Crear</Button>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>

                  <StyledTableCell align="right">Empresa</StyledTableCell>
                  <StyledTableCell align="right">Categoria</StyledTableCell>
                  <StyledTableCell align="center">Grupo</StyledTableCell>
                  <StyledTableCell align="left">Clase</StyledTableCell>

                  <StyledTableCell align="left">Familia</StyledTableCell>
                  <StyledTableCell align="left">Catalogo</StyledTableCell>
                  <StyledTableCell align="left">Descripcion</StyledTableCell>
                  <StyledTableCell align="left">Propietario</StyledTableCell>
                  <StyledTableCell align="left">Padre</StyledTableCell>
                  <StyledTableCell align="left">Madre</StyledTableCell>
                  <StyledTableCell align="left">Info</StyledTableCell>
                  <StyledTableCell align="left">Placa</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <StyledTableRow key={item.Cab_cCatalogo}>

                    <StyledTableCell align="right">{item.Emp_cCodigo}</StyledTableCell>
                    <StyledTableCell align="right">{item.Lgt_cCategoria}</StyledTableCell>
                    <StyledTableCell align="center">{item.Lgt_cGrupo}</StyledTableCell>
                    <StyledTableCell align="left">{item.Lgt_cClase}</StyledTableCell>

                    <StyledTableCell align="right">{item.Lgt_cFamilia}</StyledTableCell>
                    <StyledTableCell align="right">{item.Cab_cCatalogo}</StyledTableCell>
                    <StyledTableCell align="center">{item.Cab_cDescripcion}</StyledTableCell>
                    <StyledTableCell align="left">{item.Propietario}</StyledTableCell>
                    <StyledTableCell align="right">{item.Padre}</StyledTableCell>
                    <StyledTableCell align="right">{item.Madre}</StyledTableCell>
                    <StyledTableCell align="center">{item.Info}</StyledTableCell>
                    <StyledTableCell align="left">{item.Placa}</StyledTableCell>
                    <StyledTableCell align="left"><Button variant="contained" size="small" color="primary" onClick={() => editarCatalogo(item.Emp_cCodigo, item.Cab_cCatalogo)} >Editar</Button></StyledTableCell>
                    <StyledTableCell align="left"><Button variant="contained" size="small" color="primary" onClick={() => eliminaCatalogo(item.Emp_cCodigo, item.Cab_cCatalogo)} >Eliminar</Button></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </box>

      </Paper>
    </div>
  )
}

export default CompListaCatalogo