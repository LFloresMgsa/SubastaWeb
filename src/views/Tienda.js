import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ItemProgramacionTienda from '../components/marco/ItemProgramacionTienda';
import Bases from '../components/marco/Bases';
import Button from '@mui/material/Button';
import { eventoService } from '../services/evento.service';


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

const Tienda = (props) => {
  const [value, setValue] = React.useState(0);

  const [tiendaActual, setTiendaActual] = React.useState([]);



  const obtenerTiendaActual = async () => {
    let _body = { Accion: "TIENDAABIERTA", Emp_cCodigo: "015", Pan_cAnio: "2023" }


    return await eventoService.obtenerEventosCab(_body).then(
      (res) => {
        setTiendaActual(res[0]);
      },
      (error) => {
        console.log(error);
      }
    );


  };


  useEffect(() => {

    obtenerTiendaActual();

  }, []);

  return (

    <Box sx={{ width: '100%' }}>
 

      <TabPanel value={value} index={0}>
        <h1>Tienda Virtual</h1>

        <SubastaStyled>
          {tiendaActual.map((tiendaactual, index) => (
            <ItemProgramacionTienda key={index} {...tiendaactual}  IndicePanel="0"/>

          ))}


        </SubastaStyled>

      </TabPanel>

    

    </Box>

  );
};

export default Tienda;

