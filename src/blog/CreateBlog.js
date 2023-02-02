import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { id } from 'date-fns/locale';

const URI = 'http://localhost:8000/blogs/'

const CompCreateBlog = (props) => {

    const history = useHistory();


    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')


    //procedimiento guardar
    const store = async (e) => {
        e.preventDefault()
        await axios.post(URI, { id: id, title: title, content: content })
        history.push({
            pathname: '/Catalogo'

        });
    }

    return (
        <div>
            <h3>Create POST</h3>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Id</label>
                    <input
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        type="number"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        type="text"
                        className='form-control'
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Store</button>
            </form>
        </div>
    )
}

export default CompCreateBlog