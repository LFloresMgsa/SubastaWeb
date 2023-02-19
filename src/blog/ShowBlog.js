import React, { Fragment, useState, useEffect } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const URI = 'http://localhost:5000/api/catalogo'

const CompShowBlogs = (props) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();


//LUIS: como se puede hacer para que llame al SP con url: http://localhost:5000/api/catalogo/listar
//      donde el parametro de entrada es un JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(URI);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  
  // procedimiento para eliminar un catalogo

  // LUIS: consultar como se puede ejecutar el DELETE cuando los parametros "empresa y catalogo" deben ser enviados como JSON al API
  // en este ejemplo esta como parametro pero creo que no debe ser asi ya que el API solicita un JSON como parametros

  const deleteCatalogo = async (empresa, catalogo) => {
    await axios.delete(`${URI}${empresa}${catalogo}`)
    getBlogs()
  }



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
      */ 
  /*
      const handleEditar = (id) => {
          history.push({
              pathname: `/Update/${id}`,
              state: {props }
          });
      }   

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

  /*   
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
              {// LUIS: como se debe asociar los datos obtenidos por el API a la tabla, que se esta llenando con la funcion : fetchData
              
                data.map(item  => (
                <tr key={item.Cab_cCatalogo}>
                  <td> {item.Emp_cCodigo} </td>
                  <td> {item.Cab_cDescripcion} </td>
                  <td> {item.Propietario} </td>
                  <td>

                    {
                      /*{ <Link to={`/Update/${blog.Cab_cCatalogo}`} >Editar</Link> }*/


                      // LUIS: como se debe enviar los parametros  item.Emp_cCodigo y item.Cab_cCatalogo como JSON al api delete
                      // a la funcion deleteCatalogo
                      <button onClick={() => deleteCatalogo(item.Cab_cCatalogo)} >Eliminar</button> 
                      }

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