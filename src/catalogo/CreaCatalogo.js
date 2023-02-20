import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const URI = 'http://localhost:5000/api/catalogo'

const CompCreaCatalogo = (props) => {

    const history = useHistory();


    const [Emp_cCodigo, setEmpresa] = useState('')
    const [Lgt_cCategoria, setCategoria] = useState('')
    const [Lgt_cGrupo, setGrupo] = useState('')
    const [Lgt_cClase, setClase] = useState('')
    const [Lgt_cFamilia, setFamilia] = useState('')
    const [Cab_cCatalogo, setCatalogo] = useState('')
    const [Cab_cDescripcion, setDescripcion] = useState('')
    const [Propietario, setPropietario] = useState('')
    const [Padre, setPadre] = useState('')
    const [Madre, setMadre] = useState('')
    const [Info, setInfo] = useState('')
    const [Placa, setPlaca] = useState('')

    // procedimiento para INSERTAR un catalogo con SP MySQL
    const insertaCatalogo = async (e) => {
        try {
            e.preventDefault()
            const response = await fetch(URI + '/sp/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Accion: "INSERTAR", Emp_cCodigo: Emp_cCodigo, Lgt_cCategoria: Lgt_cCategoria, Lgt_cGrupo: Lgt_cGrupo, Lgt_cClase: Lgt_cClase, Lgt_cFamilia: Lgt_cFamilia, Cab_cCatalogo: Cab_cCatalogo, Cab_cDescripcion: Cab_cDescripcion, Propietario: Propietario, Padre: Padre, Madre: Madre, Info: Info, Placa: Placa })
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
            <h3>Crear CATALOGO</h3>
            <form onSubmit={insertaCatalogo}>
                <div>
                    <label className='form-label'>Empresa</label>
                    <input
                        value={Emp_cCodigo}
                        onChange={(e) => setEmpresa(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
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
                    <label className='form-label'>Catalogo</label>
                    <textarea
                        value={Cab_cCatalogo}
                        onChange={(e) => setCatalogo(e.target.value)}
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
                <button type='submit' className='btn btn-primary'>Grabar</button>
            </form>
        </div>
    )
}

export default CompCreaCatalogo