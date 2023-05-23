import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { eventoService } from '../../../services/evento.service';

import { storage } from "../../../storage.js";

const TAX_RATE = 0.18;

function totalPedido(items) {
 
  if (items) {
    
    let ntotal= items.map(({ Pdd_nPrecioNeto }) => Pdd_nPrecioNeto).reduce((sum, i) => sum + i, 0);
    
    

    return ntotal;
  }
  else {
    return 0;
  }

}

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function ccyFormatInt(num) {
  return `${num.toFixed(0)}`;
}


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

const columns = [
  { field: 'Pan_cAnio', headerName: 'Año', width: 70 },
  { field: 'Per_cPeriodo', headerName: 'Periodo', width: 70 },
  { field: 'Pdm_cNummov', headerName: 'Movimiento', width: 110 },
  { field: 'Cli_cNombre', headerName: 'Nombre', width: 110 },
  { field: 'Cli_cApellido', headerName: 'Apellido', width: 110 },
  { field: 'Cli_cDocId', headerName: 'D.N.I', width: 110 },
  { field: 'Pdm_cDireccion', headerName: 'Dirección', width: 200 },
  { field: 'Pdm_cDistrito', headerName: 'Distrito', width: 110 },
  { field: 'Pdm_cDepartamento', headerName: 'Departamento', width: 110 },
  { field: 'Cli_cTelefono', headerName: 'Telefono', width: 110 },
  { field: 'Cli_cCorreo', headerName: 'Correo', width: 150 },
  { field: 'Pdm_cComentario', headerName: 'Comentario', width: 100 },
  { field: 'Pdm_dFecha', headerName: 'Fecha', width: 200 },
  { field: 'Pdm_cEstado', headerName: 'Estado', width: 50 },
];





function Derecha(cadena, cantidad) {
  if (cantidad >= 0 && cantidad <= cadena.length) {
    return cadena.slice(-cantidad);
  } else {
    return "La cantidad especificada es inválida.";
  }
}


const CabeceraDetalle = (props) => {
  
  
  const [invoiceTotal, setInvoiceTotal] = useState(0);

  const nsubtotal = invoiceTotal /(TAX_RATE+1) ;
  const nimpuestos = invoiceTotal-nsubtotal;
  
  const [data, setData] = useState([]);

  const [error, setError] = useState([]);
  const [loading, setLoading] = useState([]);
  const [dataDelete, setDataDelete] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const handleRowClick = async (param) => {
    let pPdm_cNummov = Derecha(param[0], 10);
    
//    invoiceSubtotal = subtotal(selectedRow);

    await listarDetalle(pPdm_cNummov);


  };

  // procedimiento para CONSULTA un catalogo con SP MySQL
  const listarCabecera = async () => {
    let _body = { Accion: "BUSCARTODOS", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio") }

    return await eventoService.obtenerPedidoCabAuth(_body).then(
      (res) => {
        setData(res[0]);

      },
      (error) => {
        console.log(error);

      }
    );
  };

  const listarDetalle = async (pPdm_cNummov) => {
    let _body = { Accion: "BUSCARTODOS", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio"), Pdm_cNummov: pPdm_cNummov }

    //console.log(pPdm_cNummov);

    return await eventoService.obtenerPedidoDetAuth(_body).then(
      (res) => {
        setSelectedRow(res[0]);
        setInvoiceTotal(totalPedido(res[0]));
        //console.log(res[0]);
      },
      (error) => {
        console.log(error);

      }
    );
  };

  // Load de pagina
  useEffect(() => {

    listarCabecera();


  }, []);

  const getRowId = (row) => {
    return `${row.Emp_cCodigo}-${row.Pan_cAnio}-${row.Pdm_cNummov}`;
  };

  return (
    <div>
      <Box sx={{ width: '100%', flexGrow: 1 }}>

        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Paper
              sx={{
                p: 2,
                margin: 1,
                maxWidth: 'auto',
                height: '100%',
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            >
              <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={getRowId}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                  handleRowClick(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              sx={{
                p: 2,
                margin: 1,
                maxWidth: 'auto',
                height: '100%',
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            >
              {data && (
                <div>
                  <h2>Detalle del Pedido : {data.Pdm_cNummov}</h2>


                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left">ID</StyledTableCell>
                          <StyledTableCell align="left">Codigo</StyledTableCell>
                          <StyledTableCell align="left">Producto</StyledTableCell>
                          <StyledTableCell align="right">Cantidad</StyledTableCell>
                          <StyledTableCell align="right">P.U.</StyledTableCell>
                          <StyledTableCell align="right">Total</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedRow && (
                          selectedRow.map((detail) => (
                            <StyledTableRow key={detail.Pdd_nItem}>
                              <StyledTableCell align="left">{detail.Pdd_nItem}</StyledTableCell>
                              <StyledTableCell align="left">{detail.Cab_cCatalogo}</StyledTableCell>
                              <StyledTableCell align="left">{detail.Pdd_cDescripcion}</StyledTableCell>
                              <StyledTableCell align="right">{detail.Pdd_nCantidad}</StyledTableCell>
                              <StyledTableCell align="right">{ccyFormat(detail.Pdd_nPrecioUnitario)}</StyledTableCell>
                              <StyledTableCell align="right">{ccyFormat(detail.Pdd_nPrecioNeto)}</StyledTableCell>
                            </StyledTableRow>
                          ))

                        )}
                        <TableRow >
                          <TableCell rowSpan={1} />
                          <TableCell colSpan={4} >Sub Total</TableCell>
                          <TableCell align="right">S/. {ccyFormat(nsubtotal)}</TableCell>
                        </TableRow>

                        <TableRow >
                          <TableCell rowSpan={1} />
                          <TableCell colSpan={4} >IGV {ccyFormatInt(TAX_RATE*100)} % </TableCell>
                          <TableCell align="right">S/. {ccyFormat(nimpuestos)}</TableCell>
                        </TableRow>

                        <TableRow >
                          <TableCell rowSpan={1} />
                          <TableCell colSpan={4} >Total</TableCell>
                          <TableCell align="right">S/. {ccyFormat(invoiceTotal)}</TableCell>
                        </TableRow>




                      </TableBody>
                    </Table>
                  </TableContainer>


                </div>
              )}


            </Paper>

          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CabeceraDetalle;
