import React, { useEffect, useState } from 'react';

const WebPage = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const obtenerContenidoHTML = async () => {
      try {
        const response = await fetch('web.html');
        const html = await response.text();
        setHtmlContent(html);
      } catch (error) {
        console.error('Error al obtener el contenido HTML:', error);
      }
    };

    obtenerContenidoHTML();
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
  );
}

export default WebPage;