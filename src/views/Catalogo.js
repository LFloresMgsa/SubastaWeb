import React, { Fragment, useState, useEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const URI = 'http://localhost:8000/blogs/'



const Catalogo = () => {


  const history = useHistory();

  const handleCrear = () => {
      history.push({
          pathname: '/Create',
          state: { props }
      });
  }
  
  
  const [blogs, setBlog] = useState([])
  useEffect(() => {
      getBlogs()
  }, [])

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
                <th>Title</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td> {blog.title} </td>
                  <td> {blog.content} </td>
                  <td>
                    <Link to={`/edit/${blog.id}`} >Editar</Link>
                    <button onClick={() => deleteBlog(blog.id)} >Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
