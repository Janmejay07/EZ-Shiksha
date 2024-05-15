import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import heroImg from "../../assests/images/2204_w037_n003_308b_p1_308.jpg";
import { Contextfirst } from "../..";



const HeroSection = () => {

  const {user} = useContext(Contextfirst);

  return (
    <section className="py-20 bg-gradient-to-r from-blue-100">
      <h5 className="absolute h-8 w-52 right-24 top-28 overflow-hidden text-secondary font-poppins font-medium">
        Welcome, {user}
      </h5>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="pt-20">
              <h2 className="mb-6 text-4xl font-poppins font-semibold leading-[55px] text-secondary">
                Ascend Academically
                <FontAwesomeIcon icon={faRocket} style={{color: "#74C0FC"}} className="ml-2"/>
                <br /> Elevate Your Learning <br /> Journey and Excel in Studies
              </h2>
              <p className="mb-8 text-black font-andada text-base leading-9">
                Simplify academics with ease. Upload math problems or text, receive instant solutions or paraphrased notes. Enjoy spell check, grammar correction, and text extraction from images. Streamline your learning experience today.
              </p>
            </div>
            <div className="flex w-full justify-start mb-3">
              <Link to={"/divein"}>
                <button className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity w-full max-w-[500px]">
                  Dive In
                </button>
              </Link>
            </div>
          </Col>

          <Col lg="6" md="6">
            <img src={heroImg} alt="" className="w-full h-full rounded-2xl object-cover" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
