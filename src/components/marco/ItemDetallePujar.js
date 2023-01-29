import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

const ItemDetallePujar = (props) => {

  const history = useHistory();

  const handleVerDetalle = () => {

    const data = { codigo: `${props.codigo}` };

    console.log("handleVerDetalle");
    history.push({
      pathname: '/SubastaDetalle',
      search: `?data=${JSON.stringify(data)}`
    });
  }

  return (
    <div>
      <Button onClick={handleVerDetalle}>Pujar</Button>
    </div>
  );
};

export default ItemDetallePujar;
