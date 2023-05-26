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

  const [subastasActual, setSubastasActual] = React.useState([]);
  const [subastasProximas, setSubastasProximas] = React.useState([]);
  const [subastasCerradas, setSubastasCerradas] = React.useState([]);



  const obtenerSubastaactual = async () => {
    let _body = { Accion: "EVENTOABIERTO", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio") }


    return await eventoService.obtenerEventosCab(_body).then(
      (res) => {
        setSubastasActual(res[0]);
      },
      (error) => {
        console.log(error);
      }
    );


  };


  const obtenerSubastasproximas = async () => {
    let _body = { Accion: "EVENTOPROXIMO", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio") }


    return await eventoService.obtenerEventosCab(_body).then(

      (res) => {
        //  console.log(res)
        setSubastasProximas(res[0])
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const obtenerSubastascerradas = async () => {
    let _body = { Accion: "EVENTOCERRADO", Emp_cCodigo: storage.GetStorage("Emp_cCodigo"), Pan_cAnio: storage.GetStorage("Pan_cAnio") }


    return await eventoService.obtenerEventosCab(_body).then(

      (res) => {
        //  console.log(res)
        setSubastasCerradas(res[0])
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);


    if (newValue == 0) {

      obtenerSubastaactual();
    }

    if (newValue == 1) {
      obtenerSubastasproximas();
    }

    if (newValue == 2) {
      obtenerSubastascerradas();
    }

  };

  useEffect(() => {

    obtenerSubastaactual();

  }, []);

  return (

    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

        <Tabs value={value} onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          <Tab label="Activas" {...a11yProps(0)} />
          <Tab label="Proximamente" {...a11yProps(1)} />
          <Tab label="Cerradas" {...a11yProps(2)} />
          <Tab label="Bases" {...a11yProps(3)} />
        </Tabs>
      </Box>


      <TabPanel value={value} index={0}>
        <h1>Bienvenido a la Subasta</h1>
        {subastasActual.map((subastaactual, index) => (
          <ItemProgramacion key={index} {...subastaactual} IndicePanel="0" />
        ))}
      </TabPanel>

      <TabPanel value={value} index={1}>
        <h1>Proximas Subastas</h1>
        {subastasProximas.map((subastaproxima, index) => (
          <ItemProgramacion key={index} {...subastaproxima} IndicePanel="1" />
        ))}
      </TabPanel>

      <TabPanel value={value} index={2}>
        <h1>Subastas Cerradas</h1>
        {subastasCerradas.map((subastacerrada, index) => (
          <ItemProgramacion key={index} {...subastacerrada} IndicePanel="2" />
        ))}
      </TabPanel>

      <TabPanel value={value} index={3}>
        <h1>Bases de la Subasta</h1>
        <Bases />

      </TabPanel>

    </Box>

  );
};

export default Subasta;

