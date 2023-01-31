import React from 'react';
import Slider from 'infinite-react-carousel';

import './Slider.css';

const ItemCarousel = ({ images }) => {
	return (
		<section className='slider'>
			
			
			<Slider className='slider__content'>
				{images.map((image) => (
					<div key={image.id} >
						<img src={image.imagen} alt={image.titulo} />
						{/* <p className='slider-description'>{image.title}</p> */}
					</div>
				))}
			</Slider>
		</section>
	)
}

export default ItemCarousel
