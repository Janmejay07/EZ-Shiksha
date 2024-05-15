import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import img1 from '../../assests/images/unnamed.webp';


const footerQuickLinks = [
  {
    display: "Home",
    url: "#",
  },
  {
    display: "About US",
    url: "#",
  },

  {
    display: "Blog",
    url: "#",
  },
];

const footerInfoLinks = [
  {
    display: "Privacy Policy",
    url: "#",
  },
  {
    display: "Membership",
    url: "#",
  },

  {
    display: "Purchases Guide",
    url: "#",
  },

  {
    display: "Terms of Service",
    url: "#",
  },
];

const Footer = () => {
  return (
    <footer className="bg-primary py-20">
      <Container>
        <Row>
          <Col lg="3" md="6" className="mb-8">
            <h2 className="flex items-center gap-1 text-2xl font-poppins text-white mb-6">
              <img src={img1} className="w-20 object-contain" alt="" /> EzShiksha.
            </h2>

            <div>
              <p className="text-black font-andada font-medium leading-6 mb-2">© 2024 EzShiksha</p>
              <p className="text-black font-andada font-medium leading-6 mb-4">All rights reserved.</p>
              <p className="flex items-center gap-2">
                <a href="facebook.com" className="no-underline hover:opacity-80 transition-opacity">
                  <i className="ri-facebook-line text-white text-xl"></i>
                </a>
                <a href="instagram.com" className="no-underline hover:opacity-80 transition-opacity">
                  <i className="ri-instagram-line text-white text-xl"></i>
                </a>
                <a href="linkedin.com" className="no-underline hover:opacity-80 transition-opacity">
                  <i className="ri-linkedin-line text-white text-xl"></i>
                </a>
                <a href="twitter.com" className="no-underline hover:opacity-80 transition-opacity">
                  <i className="ri-twitter-line text-white text-xl"></i>
                </a>
              </p>
            </div>
          </Col>

          <Col lg="3" md="6" className="mb-8">
            <h6 className="text-lg font-poppins font-semibold text-white mb-4">Explore</h6>
            <ListGroup className="list-none p-0">
              {footerQuickLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 bg-transparent mb-2">
                  <a href={item.url} className="no-underline text-black font-andada hover:text-white transition-colors">
                    {item.display}
                  </a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6" className="mb-8">
            <h6 className="text-lg font-poppins font-semibold text-white mb-4">Information</h6>
            <ListGroup className="list-none p-0">
              {footerInfoLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 bg-transparent mb-2">
                  <a href={item.url} className="no-underline text-black font-andada hover:text-white transition-colors">
                    {item.display}
                  </a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6">
            <h6 className="text-lg font-poppins font-semibold text-white mb-6">Get in Touch</h6>
            <div>
              <p className="text-black font-andada font-normal leading-6 mb-2">Address: Greater Noida, India</p>
              <p className="text-black font-andada font-normal leading-6 mb-2">Phone: +88 0123456789</p>
              <p className="text-black font-andada font-normal leading-6">Email: example@gmail.com</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
