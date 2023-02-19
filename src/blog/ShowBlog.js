import React, { Fragment, useState, useEffect } from 'react';
import axios from "axios";
import Fetch from '../helpers/Fetch';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const URI = 'http://localhost:5000/api/catalogo'

const CompShowBlogs = (props) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/catalogo/listar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Aquí debes incluir el objeto JSON que se utilizará como parámetro de entrada del API
            "Accion":"BUSCAR_REGISTRO",
            "Emp_cCodigo":"015",
            "Lgt_cCategoria":"",
            "Lgt_cGrupo":"",
            "Lgt_cClase":"",
            "Lgt_cFamilia":"",
            "Cab_cCatalogo":"000009",
            "Cab_cDescripcion":"",
            "Propietario":"",
            "Padre":"",
            "Madre":"",
            "Info":"",
            "Placa":""
        })
      });
      const json = await response.json();
      setData(json);
    };

    fetchData();
  }, []);

  const history = useHistory();
/*   const [catalogos, setCatalogo] = useState([])


  useEffect(() => {
    getCatalogos();
  }, []); */


  /*     const handleCrear = () => {
          history.push({
              pathname: '/Create',
              state: {props }
          });
      }    
  
      const handleEditar = (id) => {
          history.push({
              pathname: `/Update/${id}`,
              state: {props }
          });
      }   */

  // procedimiento para mostrar todos los blogs
/*   const getCatalogos = async () => {
    try {
      const response = await axios.get(URI);
      setCatalogo(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  } */

  /*     // procedimiento para eliminar un blog
      const deleteBlog = async (id) => {
          await axios.delete(`${URI}${id}`)
          getBlogs()
      } */

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>

          {/*  <Button variant="contained" size="small" color="primary" onClick={handleCrear}>Crear</Button> */}

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
              {data.map((item)  => (
                <tr key={item.Cab_cCatalogo}>
                  <td> {item.Emp_cCodigo} </td>
                  <td> {item.Cab_cDescripcion} </td>
                  <td> {item.Propietario} </td>
                  <td>

                    {/*                       <Link to={`/Update/${blog.Cab_cCatalogo}`} >Editar</Link>
                      <button onClick={() => deleteBlog(blog.Cab_cCatalogo)} >Eliminar</button> */}

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