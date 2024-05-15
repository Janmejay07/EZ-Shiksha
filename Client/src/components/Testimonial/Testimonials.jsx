import React from "react";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";

import img from "../../assests/images/testimonial01.png";

const Testimonials = () => {
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
  };
  return (
    <section className="py-20">
      <Container>
        <Row>
          <Col lg="10" md="12" className="m-auto">
            <div className="flex justify-between items-center">
              <div className="w-1/2">
                <img src={img} alt="" className="w-full rounded-2xl" />
              </div>

              <div className="w-1/2 pl-8">
                <h2 className="text-4xl font-poppins font-semibold text-secondary mb-6">Our Users Voice</h2>

                <Slider {...settings}>
                  <div>
                    <div>
                      <h6 className="text-xl font-poppins font-semibold text-secondary mb-3">
                        Excellent course of materials
                      </h6>
                      <p className="text-[#596b65] text-base leading-9 font-andada">
                        "EzShiksha transformed my study routine! Instant math solutions and concise notes saved me time and boosted my grades. Highly recommend!" - Sarah
                      </p>

                      <div className="mt-6">
                        <h6 className="text-lg font-poppins font-semibold text-secondary">Jhon Doe</h6>
                        <p className="text-[#596b65] text-base font-andada">California, United State</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <h6 className="text-xl font-poppins font-semibold text-secondary mb-3">
                        Excellent course of materials
                      </h6>
                      <p className="text-[#596b65] text-base leading-9 font-andada">
                        "EzShiksha's chatbot support is a game-changer! It guided me through tough concepts, making learning feel personalized and accessible. Truly indispensable!" - Rahul
                      </p>

                      <div className="mt-6">
                        <h6 className="text-lg font-poppins font-semibold text-secondary">Jhon Doe</h6>
                        <p className="text-[#596b65] text-base font-andada">Delhi, India</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <h6 className="text-xl font-poppins font-semibold text-secondary mb-3">
                        Excellent course of materials
                      </h6>
                      <p className="text-[#596b65] text-base leading-9 font-andada">
                        "EzShiksha's text extraction feature simplified my research. Now, I can easily access information from images, enhancing my study materials and academic performance. Absolutely invaluable!" - Maya
                      </p>

                      <div className="mt-6">
                        <h6 className="text-lg font-poppins font-semibold text-secondary">Jhon Doe</h6>
                        <p className="text-[#596b65] text-base font-andada">California, United State</p>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
