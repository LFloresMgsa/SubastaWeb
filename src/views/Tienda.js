import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ItemProgramacionTienda from '../components/marco/ItemProgramacionTienda';
import { eventoService } from '../services/evento.service';



const Tienda = (props) => {

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
    <div>
      <Box sx={{ width: '100%' }}>
        <h1>Tienda Virtual</h1>

        {tiendaActual.map((item, index) => (
          <ItemProgramacionTienda key={index} {...item} IndicePanel="0" />

        ))}
      </Box>
    </div>
  );
};

export default Tienda;

