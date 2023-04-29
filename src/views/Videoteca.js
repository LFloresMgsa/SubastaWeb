import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player'
import { eventoService } from '../services/evento.service';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';



const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function Videoteca() {
  const [videos, setVideos] = useState([]);
  const [contenido, setContenido] = useState('');

  const obtenerVideos = async () => {
    let _body = { Accion: "BUSCARTODOS", Emp_cCodigo: "015" }


    return await eventoService.obtenerVideos(_body).then(
      (res) => {
        setVideos(res[0]);
      },
      (error) => {
        console.log(error);
      }
    );


  };



  useEffect(() => {
    obtenerVideos();
  }, []);

  return (


    <div>
      <div>
        <h1>Videoteca</h1>
      </div>

      {videos.map(video => (

        <Paper
          sx={{
            p: 1,
            margin: 2,
            maxWidth: 'auto',
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >

          <div>
            <br></br>
            <h2>{video.Lgt_cTitulo}</h2>

          </div>

          <div style={{ width: '100', height: '100' }}>
            <ReactPlayer
              url={video.Lgt_cURL}
              controls
              loop

            />
          </div>
          <div>


            <TextField
              label=""
              multiline

              value={video.Lgt_cComentario}
              InputProps={{
                readOnly: true,
              }}
            />



          </div>
        </Paper>
      ))}


    </div>
  );
}

export default Videoteca;