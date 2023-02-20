import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const URI = 'http://localhost:5000/api/catalogo'

const CompListaCatalogo = (props) => {

  const history = useHistory();
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState([]);
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
          <button variant="contained" size="small" color="primary"  onClick={() => crearCatalogo()} >Crear</button>

          <table className='table'>
            <thead className='table-primary'>
              <tr>
                <th>Empresa</th>
                <th>Categoria</th>
                <th>Grupo</th>
                <th>Clase</th>
                <th>Familia</th>
                <th>Catalogo</th>
                <th>Descripcion</th>
                <th>Propietario</th>
                <th>Padre</th>
                <th>Madre</th>
                <th>Info</th>
                <th>Placa</th>
                <th>Proceso</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.Cab_cCatalogo}>
                  <td> {item.Emp_cCodigo} </td>
                  <td> {item.Lgt_cCategoria} </td>
                  <td> {item.Lgt_cGrupo} </td>
                  <td> {item.Lgt_cClase} </td>
                  <td> {item.Lgt_cFamilia} </td>
                  <td> {item.Cab_cCatalogo} </td>
                  <td> {item.Cab_cDescripcion} </td>
                  <td> {item.Propietario} </td>
                  <td> {item.Padre} </td>
                  <td> {item.Madre} </td>
                  <td> {item.Info} </td>
                  <td> {item.Placa} </td>
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

export default CompListaCatalogo