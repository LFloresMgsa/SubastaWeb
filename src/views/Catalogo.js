import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CompShowBlogs from '../blog/ShowBlog';

const Catalogo = () => {

  const history = useHistory();

  return (
    <div >
      <CompShowBlogs />
    </div>
  );
};

export default Catalogo;
