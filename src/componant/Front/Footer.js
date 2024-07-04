import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Logo from '../../Assets/img/new/logo.svg';
import { Link } from 'react-router-dom';
import { BsYoutube } from 'react-icons/bs';
import { FaPinterestP, FaFacebookF } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Footer = () => {
  const path_name = useSelector(state => state.persistedReducer.home.path_name);
  return (

    <>{path_name?.pathname?.includes('/user') || path_name?.pathname == '/login' || path_name?.pathname == '/password/reset' || path_name?.pathname == '/password/resetpassword' || path_name?.pathname == "/registration" ? " " :
      <footer className="footer">
        <div className="custom_max_container">
          <div className="custom_min_container">
            <Container fluid>
              <Row className="align-items-center">
                <Col xl={3} lg={3}>
                  <div className="Logo text-lg-start text-center mb-lg-0 mb-3">
                    <Link className="text-decoration-none" to={'/'}>
                      <img src={Logo} alt="Midjourney free" />
                    </Link>

                    {/* <h6>Address</h6>
                  <p>
                    108, Lala Lajpat Rai Marg
                    <br />
                    Dewas Madhya Pradesh, 455001, India
                  </p> */}

                    <h6>E-mail</h6>
                    <a href="mailto:support@midjourneyfree.ai"> support@midjourneyfree.ai</a>

                    {/* <h6>Phone</h6>
                  <a href="tel:+1 (917) 767-7248">(+91) 9589929599</a> */}
                  </div>
                </Col>
                <Col xl={6} lg={6}>
                  <ul className="list-unstyled d-flex justify-content-center m-lg-0 mb-4 flex-md-unwrap flex-wrap">

                    <li>
                      <Link to="/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="/terms-and-condition">Terms & Conditions</Link>
                    </li>

                    <li>
                      <Link to="/refund-policy">Refund Policy</Link>
                    </li>
                    <li>
                      <Link to="/pricing-policy">Pricing Policy</Link>
                    </li>


                    <li>
                      <Link to="/contact-us">Contact Us</Link>
                    </li>
                  </ul>
                </Col>
                <Col xl={3} lg={3}>
                  <ul className="social-media list-unstyled d-flex justify-content-lg-end justify-content-center m-0">
                    <li>
                      <a href="#" target="_blank">
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <BsYoutube />
                      </a>
                    </li>
                    {/* <li><a href="#" target='_blank'><BsInstagram /></a></li> */}
                    <li>
                      <a href="" target="_blank">
                        <FaPinterestP />
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>

              <div className="copyright">
                <p>© Copyright 2024 DreamVibe Ai Studio. All Rights Reserved.</p>
              </div>
            </Container>
          </div>
        </div>
      </footer>
    }
    </>
  );
};

export default Footer;
