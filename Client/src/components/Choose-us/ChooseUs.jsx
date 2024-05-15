import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";

import chooseImg from "../../assests/images/why-choose-us.png";

import ReactPlayer from "react-player";

const ChooseUs = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <section className="py-20">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="pr-12">
              <h2 className="text-4xl font-poppins font-semibold text-secondary mb-6">Why Choose Us</h2>
              <p className="text-[#596b65] text-base leading-9 font-andada">
                Choose EzShiksha for innovative solutions revolutionizing education. With instant math solutions, concise note generation, and effortless text extraction from images, learning has never been easier. Our commitment to accessibility and personalized assistance ensures a seamless educational journey. Join us in shaping the future of learning.
              </p>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="relative top-0 left-0 w-full h-full z-[777]">
              {showVideo ? (
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=qFp27TR4Yew"
                  controls
                  width="100%"
                  height="350px"
                />
              ) : (
                <img src={chooseImg} alt="" className="w-full rounded-2xl" />
              )}

              {!showVideo && (
                <span 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-[7777] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => setShowVideo(!showVideo)}
                >
                  <i className="ri-play-circle-line text-primary text-3xl p-2"></i>
                </span>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ChooseUs;
