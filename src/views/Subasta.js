import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ItemProgramacion from '../components/subasta/ItemProgramacion';
import Bases from '../components/subasta/bases';
import Button from '@mui/material/Button';
import { eventoService } from '../services/evento.service';
import { storage } from "../storage.js";
import Grid from '@mui/material/Grid';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns';

const SubastaStyled = styled('div')(
  ({ theme }) => css`
    width:100%;
    background-color:grey;
    height:20px;

    .subasta-item {
    }
  `
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {

  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Subasta = (props) => {
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [subastasActual, setSubastasActual] = React.useState([]);
  const [subastasProximas, setSubastasProximas] = React.useState([]);
  const [subastasCerradas, setSubastasCerradas] = React.useState([]);


  // const ActualizaFechasFinalesItems = async () => {
  //   try {
  //     let _body = { Accion: "BUSCARTODOS", Emp_cCodigo: storage.GetStorage("Emp_cCodigo") }

  //     return await eventoService.obtenerCatalogo(_body).then(
  //       (res) => {
  //         console.log(res[0]);
  //         setData(res[0]);
  //       },
  //       (error) => {
  //         console.log(error);

  //       }
  //     );
  //   } catch (error) {
  //     console.error('Error fetching server time:', error);
  //   }
  // };



  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());

    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };


  const obtenerSubastaactual = async () => {
    let _body = { Accion: "EVENTOABIERTO", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio") }

    console.log('obtenerSubastaactual');

    return await eventoService.obtenerEventosCab(_body).then(
      (res) => {
        setSubastasActual(res[0]);
      },
      (error) => {
        console.log(error);
      }
    );


  };


  // const obtenerSubastasproximas = async () => {
  //   let _body = { Accion: "EVENTOPROXIMO", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio") }

  //   console.log('obtenerSubastasproximas');

  //   return await eventoService.obtenerEventosCab(_body).then(

  //     (res) => {
  //       setSubastasProximas(res[0])
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // };

  // const obtenerSubastascerradas = async () => {
  //   let _body = { Accion: "EVENTOCERRADO", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio") }

  //   console.log('obtenerSubastascerradas');

  //   return await eventoService.obtenerEventosCab(_body).then(

  //     (res) => {
  //       setSubastasCerradas(res[0])
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // };

  // const handleChange = async (event, newValue) => {
  //   setValue(newValue);


  //   if (newValue == 1) {

  //     await obtenerSubastaactual();
  //   }

  //   if (newValue == 2) {
  //     await obtenerSubastasproximas();
  //   }

  //   if (newValue == 3) {
  //     await obtenerSubastascerradas();
  //   }

  // };

  useEffect(() => {

    obtenerSubastaactual();

  }, []);

  return (

    <Box sx={{ p:2, width: '100%' }}>
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

        <Tabs value={value} onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          <Tab label="Activas" {...a11yProps(0)} />
          <Tab label="Proximamente" {...a11yProps(1)} />
          <Tab label="Cerradas" {...a11yProps(2)} />

        </Tabs>
      </Box> */}





      <h3>Galpón Legado - Subasta</h3>
      <Typography variant="h6" component="h3">
        <p>Hora actual: {currentTime.toLocaleTimeString(undefined, options)}</p>
      </Typography>
      {subastasActual.map((subastaactual, index) => (
        <ItemProgramacion key={index} {...subastaactual} IndicePanel="0" />
      ))}

      {/* <TabPanel value={value} index={0}>
      </TabPanel> */}

      {/* <TabPanel value={value} index={1}>
        <h3>Proximas Subastas</h3>
        {subastasProximas.map((subastaproxima, index) => (
          <ItemProgramacion key={index} {...subastaproxima} IndicePanel="1" />
        ))}
      </TabPanel>

      <TabPanel value={value} index={2}>
        <h3>Subastas Cerradas</h3>
        {subastasCerradas.map((subastacerrada, index) => (
          <ItemProgramacion key={index} {...subastacerrada} IndicePanel="2" />
        ))}
      </TabPanel> */}


    </Box>

  );
};

export default Subasta;

