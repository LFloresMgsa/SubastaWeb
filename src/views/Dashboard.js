import React from 'react';
import styled from "styled-components";

import GlobalStyles from './GlobalStyles.jsx';
import ImageSlider from './SliderBackground.js'


import image1 from "../assets/images/slide_1.jpeg";
import image2 from "../assets/images/slide_2.jpeg";
import image3 from "../assets/images/slide_3.jpeg";
import image4 from "../assets/images/slide_4.jpeg";
import image5 from "../assets/images/slide_5.jpeg";
import image6 from "../assets/images/slide_6.jpeg";
import image7 from "../assets/images/slide_7.jpeg";

const sliderData = [
  {
    heading: "Slide One",
    desc: "This is the description of slide one Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quos quas, voluptatum nesciunt illum exercitationem.",
  },
  {
    heading: "Slide Two",
    desc: "This is the description of slide two Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quos quas, voluptatum nesciunt illum exercitationem.",
  },
  {
    heading: "Slide Three",
    desc: "This is the description of slide three Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quos quas, voluptatum nesciunt illum exercitationem.",
  },
];


const Dashboard = () => {

  return (
    <>
      <GlobalStyles />
      <div>
        <ImageSlider images={[image1, image2, image3, image4, image5, image6, image7]} data={sliderData}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#fff",
              fontSize: "30px"
              
            }}
          >
            <h1>Galpon Legado</h1>
            
          </div>
        </ImageSlider>
      </div>
    </>
  );

};

export default Dashboard;
