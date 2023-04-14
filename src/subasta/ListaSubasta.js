import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { signingRequestService } from '../services/api.helper'




  // procedimiento para CONSULTA un catalogo con SP MySQL
  function obtenerEventoActivo  ()  {

    const history = useHistory();
    const [data, setData] = useState([]);

    try {
      let _body = { Accion: "EVENTOABIERTO", Emp_cCodigo: "015", Pan_cAnio:"2023" }
       signingRequestService.ejecutaSPSubasta(_body).then(
        (res) => {
          setData(res[0]);
        },
        (error) => {
          console.log(error)
          setError(error);
        }
      )
    } finally {
      setLoading(false);
      
    }

    return  data;
  }

  // procedimiento para CONSULTA un catalogo con SP MySQL
  const obtenerEventoCerrada   = async () =>   {

    const history = useHistory();
    const [data, setData] = useState([]);
    
    try {
      let _body = { Accion: "EVENTOCERRADO", Emp_cCodigo: "015", Pan_cAnio:"2023" }
      await signingRequestService.ejecutaSPSubasta(_body).then(
        (res) => {
          setData(res[0]);
        },
        (error) => {
          console.log(error)
          setError(error);
        }
      )
    } finally {
      setLoading(false);
      
    }

    //return  res[0];

    const eventoactual= Promise.resolve(res[0]  );
    return eventoactual;

  }


export const CompListaEventoService = {
  obtenerEventoActivo,
  obtenerEventoCerrada,
  
};