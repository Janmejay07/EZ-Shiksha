import React from "react";
import { Container, Row, Col } from "reactstrap";

const Company = () => {
  return (
    <section className="py-20">
      <Container>
        <Row>
          <Col lg="2" md="3" sm="4" xs="6">
            <h3 className="flex items-center gap-1 text-secondary text-xl font-poppins font-semibold">
              <i className="ri-vimeo-line text-primary"></i> Vimeo
            </h3>
          </Col>

          <Col lg="2" md="3" sm="4" xs="6">
            <h3 className="flex items-center gap-1 text-secondary text-xl font-poppins font-semibold">
              <i className="ri-pinterest-line text-primary"></i> Pinterest
            </h3>
          </Col>

          <Col lg="2" md="3" sm="4" xs="6">
            <h3 className="flex items-center gap-1 text-secondary text-xl font-poppins font-semibold">
              <i className="ri-dribbble-line text-primary"></i> Dribble
            </h3>
          </Col>

          <Col lg="2" md="3" sm="4" xs="6">
            <h3 className="flex items-center gap-1 text-secondary text-xl font-poppins font-semibold">
              <i className="ri-apple-fill text-primary"></i> Apple
            </h3>
          </Col>

          <Col lg="2" md="3" sm="4" xs="6">
            <h3 className="flex items-center gap-1 text-secondary text-xl font-poppins font-semibold">
              <i className="ri-finder-fill text-primary"></i> Finder
            </h3>
          </Col>

          <Col lg="2" md="3" sm="4" xs="6">
            <h2 className="flex items-center gap-1 text-secondary text-xl font-poppins font-semibold">
              <i className="ri-google-fill text-primary"></i> Google
            </h2>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Company;
