import React from 'react';
import Slider from 'infinite-react-carousel';

import './Slider.css';

const ItemCarousel = ({ images }) => {
	return (
		<section className='slider'>
			
			<h1  >Imagenes</h1>
			<Slider className='slider__content'>
				{images.map((image) => (
					<div key={image.id} className='slider__content--item'>
						<img src={image.imagen} alt={image.titulo} />
						{/* <p className='slider-description'>{image.title}</p> */}
					</div>
				))}
			</Slider>
		</section>
	)
}

export default ItemCarousel
