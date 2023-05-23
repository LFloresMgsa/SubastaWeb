import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player'
import { eventoService } from '../services/evento.service';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import './css/Video.css';
import { storage } from "../storage.js";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function Videoteca() {
  const [videos, setVideos] = useState([]);
  const [contenido, setContenido] = useState('');

  const obtenerVideos = async () => {
    let _body = { Accion: "BUSCARTODOS", Emp_cCodigo: storage.GetStorage("Emp_cCodigo") }


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
      <div >

        <ImageList cols={1} >
          {videos.map(video => (

            <Paper
              sx={{
                p: 1,
                margin: 2,
                maxWidth: 'auto',
                width: 'auto',
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}

            >

              <div>
                <br></br>
                <h2>{video.Lgt_cTitulo}</h2>
                <br></br>
              </div>

              <div >
                <ReactPlayer
                  
                  url={video.Lgt_cURL}
                  controls
                  loop


                />
              </div>
              <div>
                <br></br>
                <h3>Contenido: </h3>
                <TextField
                  label=""
                  multiline

                  value={video.Lgt_cComentario}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    "& fieldset": { border: 'none' },
                  }}
                />



              </div>
            </Paper>
          ))}

        </ImageList>

      </div>

    </div>
  );
}

export default Videoteca;