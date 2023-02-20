import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
const URI = 'http://localhost:5000/api/catalogo'

const CompEditaCatalogo = (props) => {
    const history = useHistory()
    const [data, setData] = useState([])
    const [error, setError] = useState([])
    const [loading, setLoading] = useState([])

    const [Lgt_cCategoria, setCategoria] = useState('')
    const [Lgt_cGrupo, setGrupo] = useState('')
    const [Lgt_cClase, setClase] = useState('')
    const [Lgt_cFamilia, setFamilia] = useState('')

    const [Cab_cDescripcion, setDescripcion] = useState('')
    const [Propietario, setPropietario] = useState('')
    const [Padre, setPadre] = useState('')
    const [Madre, setMadre] = useState('')
    const [Info, setInfo] = useState('')
    const [Placa, setPlaca] = useState('')


    const { Emp_cCodigo } = useParams()
    const { Cab_cCatalogo } = useParams()


    useEffect(() => {

        obtenerCatalogos()
    }, [])



    // procedimiento para CONSULTA un catalogo con SP MySQL
    const obtenerCatalogos = async () => {
        try {
            const response = await fetch(URI + '/sp/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Accion: "BUSCARREGISTRO", Emp_cCodigo: Emp_cCodigo, Cab_cCatalogo: Cab_cCatalogo })
            });
            const json = await response.json();
            setData(json[0]);

            json[0].map((item) => (
                setCategoria(item.Lgt_cCategoria),
                setGrupo(item.Lgt_cGrupo),
                setClase(item.Lgt_cClase),
                setFamilia(item.Lgt_cFamilia),
                setDescripcion(item.Cab_cDescripcion),
                setPropietario(item.Propietario),
                setPadre(item.Padre),
                setMadre(item.Madre),
                setInfo(item.Info),
                setPlaca(item.Placa)
            ))

        } catch (error) {
            setError(error);
        } finally {

        }
    }


    // procedimiento para EDITAR un catalogo con SP MySQL
    const editarCatalogo = async (e) => {
        try {
            e.preventDefault()
            const response = await fetch(URI + '/sp/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Accion: "EDITAR", Emp_cCodigo: Emp_cCodigo, Lgt_cCategoria: Lgt_cCategoria, Lgt_cGrupo: Lgt_cGrupo, Lgt_cClase: Lgt_cClase, Lgt_cFamilia: Lgt_cFamilia, Cab_cCatalogo: Cab_cCatalogo, Cab_cDescripcion: Cab_cDescripcion, Propietario: Propietario, Padre: Padre, Madre: Madre, Info: Info, Placa: Placa })
            });
            const json = await response.json();
            setData(json[0]);

        } catch (error) {
            setError(error);
        } finally {

            history.push({
                pathname: '/catalogo'

            });

            setLoading(false);
        }
    }

    return (
        <div>
            <h3>Editar CATALOGO</h3>
            <form onSubmit={editarCatalogo}>

                <div className='mb-3'>
                    <label className='form-label'>Categoria</label>
                    <input
                        value={Lgt_cCategoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Grupo</label>
                    <textarea
                        value={Lgt_cGrupo}
                        onChange={(e) => setGrupo(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Clase</label>
                    <textarea
                        value={Lgt_cClase}
                        onChange={(e) => setClase(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Familia</label>
                    <textarea
                        value={Lgt_cFamilia}
                        onChange={(e) => setFamilia(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Descripcion</label>
                    <textarea
                        value={Cab_cDescripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Propietario</label>
                    <textarea
                        value={Propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Padre</label>
                    <textarea
                        value={Padre}
                        onChange={(e) => setPadre(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Madre</label>
                    <textarea
                        value={Madre}
                        onChange={(e) => setMadre(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Info</label>
                    <textarea
                        value={Info}
                        onChange={(e) => setInfo(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Placa</label>
                    <textarea
                        value={Placa}
                        onChange={(e) => setPlaca(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>

                <button type="submit" className="btn btn-primary">Actualizar</button>
            </form>
        </div>
    )

}

export default CompEditaCatalogo