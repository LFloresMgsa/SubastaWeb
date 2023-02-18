import React, { Fragment, useState, useEffect } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const URI = 'http://localhost:5000/api/catalogo'

const CompShowBlogs = (props) => {

  const history = useHistory();
  const [catalogos, setCatalogo] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCatalogos();
  }, []);


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
  const getCatalogos = async () => {
    try {
      const response = await axios.get(URI);
      setCatalogo(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

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
              {catalogos.map((catalogo) => (
                <tr key={catalogo.Cab_cCatalogo}>
                  <td> {catalogo.Emp_cCodigo} </td>
                  <td> {catalogo.Cab_cDescripcion} </td>
                  <td> {catalogo.Propietario} </td>
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