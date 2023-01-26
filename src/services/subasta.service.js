import { store } from '../store';
import { authHeader, handleResponse } from '../helpers';
import Fetch from '../helpers/Fetch';

export const subastaService = {
  obtenerSubasta,
};



function obtenerSubasta() {
  let subastaArray = [
    {id:1, nombre: "Agente",info:"Padre 01", codigo: "101", imagen :"https://3.bp.blogspot.com/-OXd22pi2f5k/VEXi5TWJ0fI/AAAAAAAAAkU/KrnR_tv4ZLk/s1600/coronelgivens11.jpg", precio:700.00},
    {id:2, nombre: "Ares",info:"Padre 02",  codigo: "102", imagen :"https://2.bp.blogspot.com/-JYhXdDR7lv4/VEXi6ewQtBI/AAAAAAAAAkg/JQNgZAEyd8s/s1600/coronelgivens15.jpg", precio:450.00},
    {id:3, nombre: "Coronel",info:"Padre 03",  codigo: "103", imagen :"https://4.bp.blogspot.com/-rHGmlX2j_D0/VEXoTjfGhpI/AAAAAAAAAlo/FjNK2ziH-To/s1600/mcleanHatch10.jpg", precio:280.00},
    {id:4, nombre: "Dinamita",info:"Padre 04",  codigo: "104", imagen :"https://4.bp.blogspot.com/-i6ZL9Btu0bc/VEXolATnmdI/AAAAAAAAAl4/f0bV8vrwcF8/s1600/mcleanHatch9.jpg", precio:300.00},

    {id:5, nombre: "Fortune",info:"Padre 05",  codigo: "105", imagen :"https://3.bp.blogspot.com/-25qvvd48Tr4/VEXpOTNDWHI/AAAAAAAAAmY/1_IaqzjK0q4/s1600/leiperhatch2.jpg", precio:560.00},
    {id:6, nombre: "Intimo",info:"Padre 06",  codigo: "106", imagen :"https://3.bp.blogspot.com/-kjn-4iZWQdM/VEXpFJcNMUI/AAAAAAAAAmQ/vWMwRSTRgEQ/s1600/leiper20.jpg", precio:680.00},
    {id:7, nombre: "Grillo",info:"Padre 07",  codigo: "107", imagen :"https://3.bp.blogspot.com/-QCPiBeOs01w/VEXo7Oljj8I/AAAAAAAAAmI/QehguRYo4-g/s1600/leiper16.jpg", precio:620.00}

  ]

  const subasta = Promise.resolve(subastaArray );
  return subasta;
}



