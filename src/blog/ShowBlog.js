import React, { Fragment, useState, useEffect } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const URI = 'http://localhost:8000/blogs/'

const CompShowBlogs = (props) => {

    const history = useHistory();    
    const [blogs, setBlog] = useState([])
    useEffect(() => {
        getBlogs()
    }, [])


    const handleCrear = () => {
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
    }  

    // procedimiento para mostrar todos los blogs
    const getBlogs = async () => {
        const res = await axios.get(URI)
        setBlog(res.data)

    }

    // procedimiento para eliminar un blog
    const deleteBlog = async (id) => {
        await axios.delete(`${URI}${id}`)
        getBlogs()
    }

    return (
        <div className='container'>
        <div className='row'>
          <div className='col'>
            
            <Button variant="contained" size="small" color="primary" onClick={handleCrear}>Crear</Button>
  
            <table className='table'>
              <thead className='table-primary'>
                <tr>
                <th>Id</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td> {blog.id} </td>
                    <td> {blog.title} </td>
                    <td> {blog.content} </td>
                    <td>
                     {/* <Button variant="contained" size="small" color="primary" onClick={handleEditar(blog.id)}>Editar</Button>  */}
                      <Link to={`/Update/${blog.id}`} >Editar</Link>
                      <button onClick={() => deleteBlog(blog.id)} >Eliminar</button>
                      
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