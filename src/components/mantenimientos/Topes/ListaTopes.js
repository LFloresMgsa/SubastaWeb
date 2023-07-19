import React, { Fragment, useState, useEffect } from 'react';

import { MenuItem, CircularProgress } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

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
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { storage } from "../../../storage.js";
import Slider from '@mui/material/Slider';
import { withStyles } from '@mui/styles';

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
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

const ListaTopes = (props) => {

  const [refreshKey, setRefreshKey] = useState(0); // Estado para forzar el renderizado de los sliders
  const history = useHistory();
  const [dataCab, setDataCab] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [selectedValue, setSelectedValue] = useState(''); // Estado para rastrear el valor seleccionado en el Select

  const [keyListaEventoCab, setNummov] = React.useState('');

  const handleChangeSelectNummov = (event) => {
    setNummov(event.target.value);
  };

  // procedimiento para CONSULTA un catalogo con SP MySQL
  const listarCabeceraEventos = async () => {
    let _body = { Accion: "BUSCARTODOS", Emp_cCodigo: storage.GetStorage("Emp_cCodigo") }
    setLoading(true);
    return await eventoService.obtenerEventosCabAuth(_body).then(
      (res) => {
        setLoading(false);
        setDataCab(res[0]);

      },
      (error) => {
        setLoading(false);
        console.log(error);

      }
    );
  };

  // procedimiento para CONSULTA un catalogo con SP MySQL
  const listarDetalleEventoTopes = async () => {

    let Dvm_cNummov = keyListaEventoCab.substring(keyListaEventoCab.length - 10);

    let _body = {
      Accion: "BUSCARTODOS_PLACA", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"),
      Pan_cAnio: storage.GetStorage("Pan_cAnio"),
      Dvm_cNummov: Dvm_cNummov
    }

    console.log(_body);

    setLoading(true);

    return await eventoService.obtenerEventosDetAuth(_body).then(
      (res) => {
        setData(res[0]);

        console.log(res[0]);

        // Convertimos las fechas de texto a objetos Date
        const formattedData = res[0].map((item) => ({
          ...item,
          FECHAFINBASE: new Date(item.Dvd_dFin),
          FECHAFIN: new Date(item.Dvd_dFin),
          FECHACAB: new Date(item.Dvm_dFin),
          IMPORTEFIN: item.Dvd_nImporte,
          IMPORTEBASE: item.Dvd_nImporte
        }));

        setFilteredData(formattedData);


        setLoading(false);

        //  console.log(formattedData);

      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  };


  const handleSliderChangeImporte = (index, newValue) => {

    setFilteredData((prevData) => {
      if (newValue >= 0) {
        const updatedData = [...prevData];
        const updatedImporte =
          updatedData[index].IMPORTEBASE + newValue
          ;
        updatedData[index] = {
          ...updatedData[index],
          IMPORTEFIN: updatedImporte
        };
        return updatedData;
      }
      return prevData;
    });
  };

  const handleSliderChangeFin = (index, newValue) => {



    setFilteredData((prevData) => {
      if (newValue >= 0) {
        const updatedData = [...prevData];
        const updatedDate = new Date(
          updatedData[index].FECHACAB.getTime() + newValue * 60000
        );
        updatedData[index] = {
          ...updatedData[index],
          FECHAFIN: updatedDate
        };
        return updatedData;
      }
      return prevData;
    });
  };


  function calcularDiferenciaEnMinutos(datetime1, datetime2) {


    // Convertimos los parámetros a objetos Date
    const date1 = new Date(datetime1);
    const date2 = new Date(datetime2);

    // Obtenemos la diferencia en milisegundos entre ambas fechas
    const diffInMilliseconds = Math.abs(date2 - date1);

    // Calculamos la cantidad de minutos de diferencia
    const minutesDifference = Math.floor(diffInMilliseconds / (1000 * 60));

    return minutesDifference;
  }

  const formatDateTime = (datetime) => {
    const dateObject = new Date(datetime);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const hour = String(dateObject.getHours()).padStart(2, '0');
    const minute = String(dateObject.getMinutes()).padStart(2, '0');
    const second = String(dateObject.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };

  // procedimiento para EDITAR un catalogo con SP MySQL
  const actualizarTopes = async (pNummov, pOrden, pCatalogo, pImporte, pFecha) => {
    try {
      let _fechaFin = formatDateTime(pFecha);

      let _body = {
        Accion: "EDITAR_TOPE", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio"),
        Per_cPeriodo: null, Dvm_cNummov: pNummov,
        Cab_cCatalogo: pCatalogo, Dvd_nOrden: pOrden,
        Dvd_nImporte: pImporte, Dvd_cEstado: null,
        Dvd_dInicio: null, Dvd_dFin: _fechaFin, Dvd_cComentario: null
      }

      console.log(_body);


      await eventoService.obtenerEventosDetAuth(_body).then(
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
      setLoading(false);
    }
  }

  // Restaurar los valores originales de los Sliders
  const handleRestoreValues = async () => {
    await listarDetalleEventoTopes();
    handleRefreshSliders();
  };

  // Función para forzar el renderizado de los sliders nuevamente
  const handleRefreshSliders = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };




  // if (loading) {
  //   // Muestra un indicador de carga mientras se obtienen los datos del API
  //   return <CircularProgress />;
  // }

  // Load de pagina
  useEffect(() => {
    listarCabeceraEventos();
    listarDetalleEventoTopes();
  }, []);


  return (
    <div>
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
          <Grid container spacing={1}>


            <Grid item xs={12} >

              <div>
                <Grid container spacing={1}>
                  <Grid item xs={12} lg={6}>

                    <FormControl fullWidth>
                      <Select labelId="select-label"
                        value={keyListaEventoCab}
                        onChange={handleChangeSelectNummov}
                      >
                        {dataCab.map(item => (
                          <MenuItem key={`${item.Emp_cCodigo}-${item.Pan_cAnio}-${item.Dvm_cNummov}`}
                            value={`${item.Emp_cCodigo}-${item.Pan_cAnio}-${item.Dvm_cNummov}`} >
                            {item.Dvm_cDescripcion}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Button variant="contained" color="primary" onClick={handleRestoreValues}> Actualizar Lista </Button>
                  </Grid>

                </Grid>
              </div>

            </Grid>
            <Grid item xs={12} >
              <TableContainer component={Paper}>

                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">Imagen</StyledTableCell>
                      <StyledTableCell align="left">Placa</StyledTableCell>
                      <StyledTableCell align="left">Código</StyledTableCell>
                      <StyledTableCell align="center">Tope Puja</StyledTableCell>
                      <StyledTableCell align="center">Fecha Final</StyledTableCell>

                      <StyledTableCell align="center">Accion</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((item, idx) => (
                      <StyledTableRow item={item} key={idx}>

                        <StyledTableCell align="left">
                          <img
                            src={`../../../${item.Cab_cEnlace}`}
                            alt="Imagen"
                            style={{ width: '100px', height: 'auto' }}
                          />

                        </StyledTableCell>
                        <StyledTableCell align="left">{item.Placa}</StyledTableCell>
                        <StyledTableCell align="left">{item.Cab_cCatalogo}</StyledTableCell>

                        <StyledTableCell align="center">
                          <Box sx={{ width: 350 }}>
                            <Slider
                              aria-label="Importe"
                              defaultValue={0}
                              step={100}
                              min={0}
                              max={10000}
                              onChange={(event, newValue) => handleSliderChangeImporte(idx, newValue)}
                            />

                            S/. {ccyFormat(item.IMPORTEFIN)}
                          </Box>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Box sx={{ width: 350 }}>
                            <Slider
                              key={`${item.idx}-${refreshKey}`} // Agregar un key único para forzar el renderizado
                              aria-label="Final"
                              defaultValue={item.Diferencia || 0}
                              step={10}
                              min={0}
                              max={1440}
                              onChange={(event, newValue) => handleSliderChangeFin(idx, newValue)}
                              on
                            />

                            {`${item.FECHAFIN.toLocaleDateString()} ${item.FECHAFIN.toLocaleTimeString()}`}

                          </Box>
                        </StyledTableCell>

                        <StyledTableCell align="left">
                          <Button variant="outlined" size="small" color="primary" onClick={(event) => actualizarTopes(item.Dvm_cNummov, item.Dvd_nOrden, item.Cab_cCatalogo, item.IMPORTEFIN, item.FECHAFIN)}>Actualizar</Button>
                        </StyledTableCell>

                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>

              </TableContainer>
            </Grid>

          </Grid>
        </Paper>
      </Box >
    </div >
  )
}


export default ListaTopes