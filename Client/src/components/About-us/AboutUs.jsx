import React from "react";
import { Container, Row, Col } from "reactstrap";
import aboutImg from "../../assests/images/about-us.png";
import CountUp from "react-countup";

const AboutUs = () => {
  return (
    <section className="py-20">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div>
              <img src={aboutImg} alt="" className="w-full rounded-2xl" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="pl-12">
              <h2 className="text-4xl font-poppins font-semibold text-secondary mb-6">About Us</h2>
              <p className="text-[#596b65] text-base leading-9 font-andada mb-8">
                Revolutionizing education with cutting-edge tech. Instant solutions for math, concise notes from paragraphs, and effortless text extraction from images. Personalized chatbot assistance coming soon. Join the revolution!
              </p>

              <div className="grid grid-cols-2 gap-12">
                <div>
                  <span className="text-3xl font-semibold text-secondary block mb-2">
                    <CountUp start={0} end={25} duration={2} suffix="K" />
                  </span>
                  <p className="text-secondary text-base font-medium">Completed Projects</p>
                </div>

                <div>
                  <span className="text-3xl font-semibold text-secondary block mb-2">
                    <CountUp start={0} end={12} duration={2} suffix="M" />
                  </span>
                  <p className="text-secondary text-base font-medium">Patient Around World</p>
                </div>

                <div>
                  <span className="text-3xl font-semibold text-secondary block mb-2">
                    <CountUp start={0} end={95} duration={2} suffix="M" />
                  </span>
                  <p className="text-secondary text-base font-medium">Ideas Raised Funds</p>
                </div>

                <div>
                  <span className="text-3xl font-semibold text-secondary block mb-2">
                    <CountUp start={0} end={5} duration={2} suffix="K" />
                  </span>
                  <p className="text-secondary text-base font-medium">Categories Served</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
