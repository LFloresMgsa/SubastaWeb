import { store } from '../store';
import { authHeader, handleResponse } from '../helpers';
import Fetch from '../helpers/Fetch';

export const subastaactualService = {
  obtenerSubastaactual,
  
};


function obtenerSubastaactual() {
  let subastaactualArray = [
    {id:1,inicio: "26/01/2023", fin:"29/01/2023",descripcion:"Cuarta semana de enero "},
  ]

  const subastaactual= Promise.resolve(subastaactualArray  );
  return subastaactual;
}



