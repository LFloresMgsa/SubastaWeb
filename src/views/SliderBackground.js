import React, { useState, useEffect } from "react";
import styled from "styled-components";

const IndicatorWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  top: 15px;
  left: 15px;
`;

const Dot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background-color: white;
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
  margin: 5px;
  transition: 750ms all ease-in-out;
`;

const Indicator = ({ currentSlide, amountSlides, nextSlide }) => {
  return (
    <IndicatorWrapper>
      {Array(amountSlides)
        .fill(1)
        .map((_, i) => (
          <Dot
            key={i}
            isActive={currentSlide === i}
            onClick={() => nextSlide(i)}
          />
        ))}
    </IndicatorWrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
  position: relative;
`;

const Slide = styled.div`
  height: 100%;
  width: 100vw;
  flex-shrink: 0;
  background-position: center;
  background-size: cover;
  transition: 750ms all ease-in-out;
`;

const ChildrenWrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  text-shadow: 0 0 0.5rem rgb(9, 9, 34);
  transform: translate(-50%, -50%);
`;

const ImageTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 100px;
  color: #fff;
  text-shadow: 0 0 0.5rem rgb(9, 9, 34);
	font-size: 2rem;
	font-weight: bold;
  text-align: left;
  transform: translate(-50%, -50%);
`;

const ImageContent = styled.div`
  position: absolute;
  top: 60%;
  left: 350px;
  color: #fff;
  text-shadow: 0 0 0.5rem rgb(9, 9, 34);
	font-size: 1.5rem;
	
	text-align: left;
  transform: translate(-50%, -50%);
`;

const Gradient = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ImageSlider = ({
  images = [],
  autoPlay = true,
  autoPlayTime = 6000,
  children,
  data = [],
  ...props
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  function nextSlide(slideIndex = currentSlide + 1) {
    const newSlideIndex = slideIndex >= images.length ? 0 : slideIndex;

    setCurrentSlide(newSlideIndex);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, autoPlayTime);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <Wrapper {...props}>
      {images.map((imageUrl, index) => (
        <Slide
          key={index}
          style={{
            backgroundImage: `url(${imageUrl})`,
            marginLeft: index === 0 ? `-${currentSlide * 100}%` : undefined,
          }}
        >
        </Slide>

      ))}

      <Gradient />
      <Indicator
        currentSlide={currentSlide}
        amountSlides={images.length}
        nextSlide={nextSlide}
      />
      <ChildrenWrapper>{children}</ChildrenWrapper>
      <ImageTitle>Titulo</ImageTitle>
      <ImageContent><ol>
        <li>Conduce hasta el final de la calle</li>
        <li>Gira a la derecha</li>
        <li>Sigue derecho por las dos primeras glorietas</li>
        <li>Gira a la izquierda en la tercer glorieta</li>
        <li>El colegio está a tu derecha, 300 metros más adelante</li>
      </ol>
      </ImageContent>

    </Wrapper>
  );
};

export default ImageSlider;