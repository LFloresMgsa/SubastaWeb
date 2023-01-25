import { store } from '../store';
import { authHeader, handleResponse } from '../helpers';
import Fetch from '../helpers/Fetch';

export const subastaproximaService = {
  obtenerSubastaproxima,
};


function obtenerSubastaproxima() {
  let subastaproximaArray = [
    {id:1,inicio: "01/02/2023", fin:"03/02/2023",descripcion:"Primera semana de febrero "},
    {id:2,inicio: "08/02/2023", fin:"10/02/2023",descripcion:"Segunda semana de febrero "},
    {id:3,inicio: "15/02/2023", fin:"17/02/2023",descripcion:"Tercera semana de febrero "},
    {id:4,inicio: "22/02/2023", fin:"24/02/2023",descripcion:"Cuarta semana de febrero "},
  ]

  const subastaproxima = Promise.resolve(subastaproximaArray );
  return subastaproxima;
}



