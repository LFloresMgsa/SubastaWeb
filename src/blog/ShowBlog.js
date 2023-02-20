import React, { Fragment, useState, useEffect } from 'react';
import axios from "axios";
import Fetch from '../helpers/Fetch';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const URI = 'http://localhost:5000/api/catalogo'

const CompShowBlogs = (props) => {

  const history = useHistory();
  const [data, setData] = useState([]);
  const [dataDelete, setDataDelete] = useState([]);


  useEffect(() => {
    obtenerCatalogos();
  }, []);


  // procedimiento para CONSULTA un catalogo con SP MySQL
  const obtenerCatalogos = async () => {
    try {
      const response = await fetch(URI + '/sp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Accion: "BUSCARTODOS", Emp_cCodigo: "015", Cab_cCatalogo: "000008" })
      });
      const json = await response.json();
      setData(json[0]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  // procedimiento para ELIMINAR un catalogo con SP MySQL
  const eliminaCatalogo = async (Emp_cCodigo, Cab_cCatalogo) => {
    try {
      const response = await fetch(URI + '/sp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Accion: "ELIMINAR", Emp_cCodigo: Emp_cCodigo, Cab_cCatalogo: Cab_cCatalogo })
      });
      const json = await response.json();
      setDataDelete(json[0]);

    } catch (error) {
      setError(error);
    } finally {
      obtenerCatalogos();
      setLoading(false);
    }
  }

  // procedimiento para EDITAR un catalogo con SP MySQL
  const editarCatalogo = (Emp_cCodigo, Cab_cCatalogo) => {
    history.push({
      pathname: `/editar/${Emp_cCodigo}/${Cab_cCatalogo}`,
      state: { props }
    });
  }

  // procedimiento para CREAR un catalogo con SP MySQL
  const crearCatalogo = () => {
    history.push({
      pathname: '/crear',
      state: { props }
    });
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>

          {/*  <Button variant="contained" size="small" color="primary" onClick={handleCrear}>Crear</Button> */}
          <button onClick={() => crearCatalogo()} >Crear</button>

          <table className='table'>
            <thead className='table-primary'>
              <tr>
                <th>Cab_cCatalogo</th>
                <th>Emp_cCodigo</th>

                <th>Cab_cDescripcion</th>
                <th>Propietario</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.Cab_cCatalogo}>
                  <td> {item.Emp_cCodigo} </td>
                  <td> {item.Cab_cDescripcion} </td>
                  <td> {item.Propietario} </td>
                  <td>
                    <button onClick={() => editarCatalogo(item.Emp_cCodigo, item.Cab_cCatalogo)} >Editar</button>
                    <button onClick={() => eliminaCatalogo(item.Emp_cCodigo, item.Cab_cCatalogo)} >Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CompShowBlogs