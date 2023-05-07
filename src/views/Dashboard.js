import React from 'react';


import GlobalStyles from './GlobalStyles.jsx';
import ImageSlider from './SliderBackground.js'


import image1 from "../assets/images/slide_1.jpeg";
import image2 from "../assets/images/slide_2.jpeg";
import image3 from "../assets/images/slide_3.jpeg";
import image4 from "../assets/images/slide_4.jpeg";
import image5 from "../assets/images/slide_5.jpeg";
import image6 from "../assets/images/slide_6.jpeg";
import image7 from "../assets/images/slide_7.jpeg";

const Dashboard = () => {

  return (
    <>
      <GlobalStyles />
      <div>
        <ImageSlider images={[image1, image2, image3, image4, image5, image6, image7]}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <h1>React.js Image Slider</h1>
            <p>Nulla vitae elit libero, a pharetra augue.</p>
          </div>
        </ImageSlider>
      </div>
    </>
  );

};

export default Dashboard;
