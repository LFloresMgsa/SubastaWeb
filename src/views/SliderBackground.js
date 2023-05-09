import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const sliderData = [
  {
    id: 0,
    title: "Slide One",
    content: "This is the description of slide one Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quos quas, voluptatum nesciunt illum exercitationem.",
  },
  {
    id: 1,
    title: "Slide Two",
    content: "This is the description of slide two Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quos quas, voluptatum nesciunt illum exercitationem.",
  },
  {
    id: 2,
    title: "Slide Three",
    content: "Three - This is the description of slide three Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quos quas, voluptatum nesciunt illum exercitationem.",
  },
  {
    id: 3,
    title: "Slide Four",
    content: "Four - is the description of slide three Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quos quas, voluptatum nesciunt illum exercitationem.",
  },
  {
    id: 4,
    title: "Slide Five",
    content: "Five - This is the description of slide three Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quos quas, voluptatum nesciunt illum exercitationem.",
  },
  {
    id: 5,
    title: "Slide Six",
    content: "Six - This is the description of slide three Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quos quas, voluptatum nesciunt illum exercitationem.",
  },
  {
    id: 6,
    title: "Slide Seven",
    content: "Seven - This is the description of slide three Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quos quas, voluptatum nesciunt illum exercitationem.",
  },
];

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
  top: 60%;
  left: 50%;
  color: #fff;
  text-shadow: 0 0 0.5rem rgb(9, 9, 34);
	font-size: 2rem;
	font-weight: bold;
  text-align: left;
  transform: translate(-50%, -50%);
`;

const ImageContent = styled.div`
  position: absolute;
  left: 50%;
  color: #fff;
  text-shadow: 0 0 0.5rem rgb(9, 9, 34);
	font-size: 1.5rem;
	font-weight: normal;
	text-align: center;
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

const ImageSlider = ({
  images = [],
  autoPlay = true,
  autoPlayTime = 4000,
  children,
  data = [],
  ...props
}) => {
  const [currentSlide, setCurrentSlide] = useState(-2);
  const [currentInfo, setCurrentInfo] = useState([]);


  function nextSlide(slideIndex = currentSlide + 1) {
    const newSlideIndex = slideIndex >= images.length ? 0 : slideIndex;

    let filtro = data.filter(item => item.Lgt_nIndice == newSlideIndex)


    setCurrentInfo(filtro);

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
      {currentInfo.map(item => (
        <table >
          <tbody>
            <tr>
              <td>
                <ImageTitle>{item.Lgt_cTitulo}</ImageTitle>
              </td>
            </tr>
            <tr>
              <td>
                <ImageContent><ol>
                  <li>{item.Lgt_cComentario}</li>
                </ol>
                </ImageContent>
              </td>
            </tr>
          </tbody>
        </table>
      ))}


    </Wrapper>
  );
};

export default ImageSlider;