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
import Box from '@mui/material/Box';
import { eventoService } from '../../../services/evento.service';

import { storage } from "../../../storage.js";



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

const ListaPedido = (props) => {

  const history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState([]);
  const [dataDelete, setDataDelete] = useState([]);


  // Load de pagina
  useEffect(() => {
    listar();
  }, []);

  // procedimiento para CONSULTA un catalogo con SP MySQL
  const listar = async () => {
    let _body = { Accion: "BUSCARTODOS", Emp_cCodigo:storage.GetStorage("Emp_cCodigo") , Pan_cAnio:storage.GetStorage("Pan_cAnio")  }

    return await eventoService.obtenerPedidoCabAuth(_body).then(
      (res) => {
        setData(res[0]);
      },
      (error) => {
        console.log(error);

      }
    );
  };


  // procedimiento para ELIMINAR un catalogo con SP MySQL
  // const eliminar = async (Emp_cCodigo, Pan_cAnio,Pdm_cNummov) => {
  //   if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
  //     try {
  //       let _result;
  //       let _body = ({ Accion: "ELIMINAR", Emp_cCodigo: Emp_cCodigo, Pan_cAnio: Pan_cAnio, Pdm_cNummov:Pdm_cNummov })

  //       await eventoService.obtenerPedidoCabAuth(_body).then(
  //         (res) => {
  //           _result = res;
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );

  //       if (_result.error) {
  //         throw _result.error;
  //       }

  //       alert('El registro fue eliminado');
  //       listar();

  //     } catch (error) {
  //       alert(error);
  //     } 
  //   } 
  // };



  // procedimiento para EDITAR un catalogo con SP MySQL
       const consultar = (Emp_cCodigo, Pan_cAnio,Pdm_cNummov) => {
       history.push({
       pathname: `/consulta/${Emp_cCodigo}/${Pan_cAnio}/${Pdm_cNummov}`,
       state: { props }
       });
      }

  // procedimiento para CREAR un catalogo con SP MySQL
  // const crear = () => {
  //   history.push({
  //     pathname: '/crear',
  //     state: { props }
  //   });
  // }

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
        <Box>

          <table>
            <tbody>
              <tr>
                {/* <td>
                  <Button variant="contained" size="small" color="primary"
                    onClick={() => crear()} >Nuevo
                  </Button>
                </td> */}
              </tr>
              <tr>
                <td>
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>

                          <StyledTableCell align="right">Empresa</StyledTableCell>
                          <StyledTableCell align="right">Año</StyledTableCell>
                          <StyledTableCell align="center">Periodo</StyledTableCell>
                          <StyledTableCell align="left">Movimiento</StyledTableCell>
                          <StyledTableCell align="left">Nombre</StyledTableCell>
                          <StyledTableCell align="left">Apellido</StyledTableCell>
                          <StyledTableCell align="left">D.N.I</StyledTableCell>
                          <StyledTableCell align="left">Dirección</StyledTableCell>
                          <StyledTableCell align="left">Distrito</StyledTableCell>
                          <StyledTableCell align="left">Departamento</StyledTableCell>
                          <StyledTableCell align="left">Telefono</StyledTableCell>
                          <StyledTableCell align="left">Correo</StyledTableCell>
                          <StyledTableCell align="left">Comentario</StyledTableCell>
                          <StyledTableCell align="left">Fecha</StyledTableCell>
                          <StyledTableCell align="left">Estado</StyledTableCell>                          
                          <StyledTableCell align="left"></StyledTableCell>
                          <StyledTableCell align="left"></StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((item) => (
                          <StyledTableRow key={item.Pdm_cNummov}>

                            <StyledTableCell align="right">{item.Emp_cCodigo}</StyledTableCell>
                            <StyledTableCell align="right">{item.Pan_cAnio}</StyledTableCell>
                            <StyledTableCell align="center">{item.Per_cPeriodo}</StyledTableCell>
                            <StyledTableCell align="left">{item.Pdm_cNummov}</StyledTableCell>

                            <StyledTableCell align="right">{item.Cli_cNombre}</StyledTableCell>
                            <StyledTableCell align="right">{item.Cli_cApellido}</StyledTableCell>
                            <StyledTableCell align="center">{item.Cli_cDocId}</StyledTableCell>
                            <StyledTableCell align="left">{item.Pdm_cDireccion}</StyledTableCell>
                            <StyledTableCell align="right">{item.Pdm_cDistrito}</StyledTableCell>
                            <StyledTableCell align="right">{item.Pdm_cDepartamento}</StyledTableCell>
                            <StyledTableCell align="center">{item.Cli_cTelefono}</StyledTableCell>
                            <StyledTableCell align="left">{item.Cli_cCorreo}</StyledTableCell>
                            <StyledTableCell align="left">{item.Pdm_cComentario}</StyledTableCell>
                            <StyledTableCell align="left">{item.Pdm_dFecha}</StyledTableCell>
                            <StyledTableCell align="left">{item.Pdm_cEstado}</StyledTableCell>
                            <StyledTableCell align="left"><Button variant="contained" size="small" color="primary" onClick={() => consultar(item.Emp_cCodigo, item.Cab_cCatalogo)} >Consultar</Button></StyledTableCell>

                            {/* <StyledTableCell align="left"><Button variant="contained" size="small" color="primary" onClick={() => editar(item.Emp_cCodigo, item.Cab_cCatalogo)} >Editar</Button></StyledTableCell>
                            <StyledTableCell align="left"><Button variant="contained" size="small" color="primary" onClick={() => eliminar(item.Emp_cCodigo, item.Cab_cCatalogo)} >Eliminar</Button></StyledTableCell> */}
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </td>
              </tr>
            </tbody>
          </table>




        </Box>

      </Paper>
    </div>
  )
}

export default ListaPedido