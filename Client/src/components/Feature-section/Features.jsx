import React from "react";
import { Container, Row, Col } from "reactstrap";

const FeatureData = [
  {
    title: "Quick Learning",
    desc: "Accelerate your learning with EzShiksha's intuitive tools. From instant math solutions to concise notes, mastering concepts has never been quicker.",
    icon: "ri-draft-line",
  },

  {
    title: "All Time Support",
    desc: "Count on EzShiksha for round-the-clock assistance. Our platform is here to support you whenever you need help, ensuring continuous learning.",
    icon: "ri-discuss-line",
  },

  {
    title: "Certification",
    desc: "EzShiksha offers certification upon completion, validating your mastery of subjects and enhancing your credentials for future endeavors. Boost your career today!",
    icon: "ri-contacts-book-line",
  },
];

const Features = () => {
  return (
    <section className="py-20">
      <Container>
        <Row>
          {FeatureData.map((item, index) => (
            <Col lg="4" md="6" key={index}>
              <div className="text-center px-4">
                <h2 className="mb-3 text-primary">
                  <i className={`${item.icon} text-5xl`}></i>
                </h2>
                <h6 className="text-xl font-poppins font-semibold text-secondary mb-3">{item.title}</h6>
                <p className="text-[#596b65] text-base leading-9 font-andada">{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
