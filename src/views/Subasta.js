import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { subastaService } from '../services/subasta.service';
import { subastacerradaService } from '../services/subastacerrada.service';
import { subastaproximaService } from '../services/subastaproxima.service';
import ItemSubasta from '../components/marco/ItemSubasta';
import ItemProgramacion from '../components/marco/ItemProgramacion';
import Bases from '../components/marco/Bases';
import { subastaactualService } from '../services/subastaactual.service';

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
  const [subastas, setSubastas] = React.useState([]);
  const [subastasActual, setSubastasActual] = React.useState([]);
  const [subastasProximas, setSubastasProximas] = React.useState([]);
  const [subastasCerradas, setSubastasCerradas] = React.useState([]);

  const obtenerSubastas = async () => {
    return await subastaService.obtenerSubasta().then(
      (res) => {
        console.log(res)
        setSubastas(res)
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const obtenerSubastaactual = async () => {
    return await subastaactualService.obtenerSubastaactual().then(
      (res) => {
        console.log(res)
        setSubastasActual(res)
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const obtenerSubastasproximas = async () => {
    return await subastaproximaService.obtenerSubastaproxima().then(
      (res) => {
        console.log(res)
        setSubastasProximas(res)
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const obtenerSubastascerradas = async () => {
    return await subastacerradaService.obtenerSubastacerrada().then(
      (res) => {
        console.log(res)
        setSubastasCerradas(res)
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // llamar api
    obtenerSubastas();
    obtenerSubastasproximas();
    obtenerSubastascerradas();
    obtenerSubastaactual();
  };

  return (

    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Bases" {...a11yProps(0)} />
          <Tab label="Subastas Abiertas" {...a11yProps(1)} />
          <Tab label="Proximas Subastas" {...a11yProps(2)} />
          <Tab label="Subastas Cerradas" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
          <h1>Bases de la Subasta</h1>
        <Bases />

      </TabPanel>

      <TabPanel value={value} index={1}>
        <h1>Bienvenido a la Subasta</h1>
        <SubastaStyled>
          {subastasActual.map((subastaactual) => (
            <ItemProgramacion key={subastaactual.id} {...subastaactual} />

          ))}
          <ImageList className="subasta-item" cols={4}>
            <ImageListItem key="Subheader" sx={{ width: "100%", height: 450 }} cols={4} >
              {/* <ListSubheader component="div">Padrillos</ListSubheader> */}

            </ImageListItem>
            {subastas.map((subasta) => (
              <ItemSubasta key={subasta.id} {...subasta} />



            ))}

          </ImageList>

        </SubastaStyled>

      </TabPanel>

      <TabPanel value={value} index={2}>
        <h1>Proximas Subastas</h1>

        <SubastaStyled >
          {subastasProximas.map((subastaproxima) => (
            <ItemProgramacion key={subastaproxima.id} {...subastaproxima} />
          ))}
        </SubastaStyled>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <h1>Subastas Cerradas</h1>

        <SubastaStyled >
          {subastasCerradas.map((subastacerrada) => (
            <ItemProgramacion key={subastacerrada.id} {...subastacerrada} />
          ))}
        </SubastaStyled>

      </TabPanel>

    </Box>

  );
};

export default Subasta;

