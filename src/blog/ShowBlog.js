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
  const history = useHistory();


//LUIS: como se puede hacer para que llame al SP con url: http://localhost:5000/api/catalogo/listar
//      donde el parametro de entrada es un JSON
  useEffect(() => {
    const fetchData = async () => {
<<<<<<< HEAD
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
=======
      try {
        
        const response = await axios.get(URI);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
>>>>>>> 5311c2e851d9a10d11c15a744613eb6ccc747c95
    };

    fetchData();
  }, []);

<<<<<<< HEAD
  const history = useHistory();
=======

  
  // procedimiento para eliminar un catalogo

  // LUIS: consultar como se puede ejecutar el DELETE cuando los parametros "empresa y catalogo" deben ser enviados como JSON al API
  // en este ejemplo esta como parametro pero creo que no debe ser asi ya que el API solicita un JSON como parametros

  const deleteCatalogo = async (empresa, catalogo) => {
    await axios.delete(`${URI}${empresa}${catalogo}`)
    getBlogs()
  }



>>>>>>> 5311c2e851d9a10d11c15a744613eb6ccc747c95
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
<<<<<<< HEAD
              {data.map((item)  => (
=======
              {// LUIS: como se debe asociar los datos obtenidos por el API a la tabla, que se esta llenando con la funcion : fetchData
              
                data.map(item  => (
>>>>>>> 5311c2e851d9a10d11c15a744613eb6ccc747c95
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