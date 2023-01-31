import { store } from '../store';
import { authHeader, handleResponse } from '../helpers';
import Fetch from '../helpers/Fetch';

export const subastaService = {
  obtenerSubasta,
  filtrarSubasta,
  obtenerSubastaSlider
};


function obtenerSubasta() {
  let subastaArray = [
    {id:1, nombre: "Agente",codigo: "101", imagen :"https://3.bp.blogspot.com/-OXd22pi2f5k/VEXi5TWJ0fI/AAAAAAAAAkU/KrnR_tv4ZLk/s1600/coronelgivens11.jpg", precio:700.00, precio:450.00, placa:"LTF 101", propietario:"Sr. LUIS TORRES FIGUEROA - LIMA", padre:"GENNA", madre:"ACARI - CEB", info:"MADRILLA COMPROBADA. EDAD: 1 AÑOS"},
    {id:2, nombre: "Ares",info:"Padre 02",  codigo: "102", imagen :"https://2.bp.blogspot.com/-JYhXdDR7lv4/VEXi6ewQtBI/AAAAAAAAAkg/JQNgZAEyd8s/s1600/coronelgivens15.jpg", precio:450.00, placa:"LTF 102", propietario:"Sr. LUIS TORRES FIGUEROA - LIMA", padre:"4820 (HNA. RAYOVAC)", madre:"ACARI - CEB", info:"MADRILLA COMPROBADA. EDAD: 2.5 AÑOS"},
    {id:3, nombre: "Coronel",info:"Padre 03",  codigo: "103", imagen :"https://4.bp.blogspot.com/-rHGmlX2j_D0/VEXoTjfGhpI/AAAAAAAAAlo/FjNK2ziH-To/s1600/mcleanHatch10.jpg", precio:280.00, placa:"LTF 103", propietario:"Sr. LUIS TORRES FIGUEROA - LIMA", padre:"FUNEBRERO - CEB", madre:"LTF 6633", info:"EDAD: 2 AÑOS"},
    {id:4, nombre: "Dinamita",info:"Padre 04",  codigo: "104", imagen :"https://4.bp.blogspot.com/-i6ZL9Btu0bc/VEXolATnmdI/AAAAAAAAAl4/f0bV8vrwcF8/s1600/mcleanHatch9.jpg", precio:300.00, placa:"LTF 104", propietario:"Sr. LUIS TORRES FIGUEROA - LIMA", padre:"GENNA", madre:"LTF 6678", info:"EDAD: 6 MESES"},

    {id:5, nombre: "Fortune",info:"Padre 05",  codigo: "105", imagen :"https://3.bp.blogspot.com/-25qvvd48Tr4/VEXpOTNDWHI/AAAAAAAAAmY/1_IaqzjK0q4/s1600/leiperhatch2.jpg", precio:560.00, placa:"LTF 105", propietario:"Sr. LUIS TORRES FIGUEROA - LIMA", padre:"ACARI - CEB", madre:"LTF 4519", info:"MADRILLA COMPROBADA. EDAD: 2.5 AÑOS"},
    {id:6, nombre: "Intimo",info:"Padre 06",  codigo: "106", imagen :"https://3.bp.blogspot.com/-kjn-4iZWQdM/VEXpFJcNMUI/AAAAAAAAAmQ/vWMwRSTRgEQ/s1600/leiper20.jpg", precio:680.00, placa:"LTF 106", propietario:"Sr. LUIS TORRES FIGUEROA - LIMA", padre:"FUNEBRERO - CEB", madre:"3848 - GMG", info:"MADRILLA TUERTA OJO IZQUIERDO, EDAD: 2 AÑOS"},
    {id:7, nombre: "Grillo",info:"Padre 07",  codigo: "107", imagen :"https://3.bp.blogspot.com/-QCPiBeOs01w/VEXo7Oljj8I/AAAAAAAAAmI/QehguRYo4-g/s1600/leiper16.jpg", precio:620.00, placa:"LTF 107", propietario:"Sr. LUIS TORRES FIGUEROA - LIMA", padre:"ACARI - CEB", madre:"LTF 4500", info:"MADRILLA COMPROBADA. EDAD: 2 AÑOS"}
  ]

  const subasta = Promise.resolve(subastaArray );
  return subasta;
}

function filtrarSubasta() {
  let subastaArray = [
    {id:1, nombre: "Agente",codigo: "101", imagen :"https://3.bp.blogspot.com/-OXd22pi2f5k/VEXi5TWJ0fI/AAAAAAAAAkU/KrnR_tv4ZLk/s1600/coronelgivens11.jpg", precio:700.00, precio:450.00, placa:"LTF 101", propietario:"Sr. LUIS TORRES FIGUEROA - LIMA", padre:"GENNA", madre:"ACARI - CEB", info:"MADRILLA COMPROBADA. EDAD: 1 AÑOS"},
  ]

  const subasta = Promise.resolve(subastaArray );
  return subasta;
}


function obtenerSubastaSlider() {


  const imagesCarousel = [
    {id:1, codigo: "101", imagen :"https://3.bp.blogspot.com/-OXd22pi2f5k/VEXi5TWJ0fI/AAAAAAAAAkU/KrnR_tv4ZLk/s1600/coronelgivens11.jpg", titulo:"Ejemplar"},
    {id:2, codigo: "101", imagen :"http://subasta.galpon-legado.amigosgallerosunidos.com/images/subasta/animal26_2.jpg", titulo:"Jerarquia"}
]  

  const subasta = Promise.resolve(imagesCarousel );
  return subasta;
}
