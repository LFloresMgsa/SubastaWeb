import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ItemProgramacionTienda from '../components/tienda/ItemProgramacionTienda';
import { eventoService } from '../services/evento.service';

import { Header } from '../components/tienda/Header';




const Tienda = (props) => {

  const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);


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

      <Header
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />

      <Box sx={{ width: '100%' }}>
        <h1>Tienda</h1>

        {tiendaActual.map((item, index) => (
          <ItemProgramacionTienda key={index} {...item} IndicePanel="0" 
          
          alltiendas={item}

          allProducts={allProducts}
          setAllProducts={setAllProducts}
          total={total}
          setTotal={setTotal}
          countProducts={countProducts}
          setCountProducts={setCountProducts}/>

        ))}
      </Box>
    </div>
  );
};

export default Tienda;

