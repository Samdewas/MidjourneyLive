import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../../Assets/css/contactus.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { base_url } from "../../Store/constant";
import { Helmet } from "react-helmet";
const Contactus = () => {
  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      subject,
      message: msg,
    };
    axios
      .post(base_url + "/postContactus", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        if (response.status == 200) {
          swal(response.data.msg, "", "success");
          setEmail("");
          setName("");
          setSubject("");
          setMsg("");
        } else {
          return swal(response.data.msg, "", "error");
        }
      })
      .catch((error) => {
        swal(error.response.data.msg, "", "error");
      });
  };

  return (
    <>
     <Helmet>
        <title>Contact- Us | Mid Journey</title>
        <meta name="description" content="Contact Us - Mid Journey Free"></meta>
        <link rel="canonical" to= "https://MidJourneyfree.com/contact-us"/>
      </Helmet>
    <div className="contact-us pb-3">
      <Container className="pt-5 mt-5 mb-5">
        <div className="text-center">
          <h1>Contact Us</h1>
          <p>
            If you need any help regarding Mid Journey AI image generator service
            please get in touch with us <br /> our team will surely help you.
          </p>

          {/* <p>
            Email:{" "}
            <Link to="mailto:support@midjourneyfree.ai" className="text-dark">
              <b>support@midjourneyfree.ai</b>
            </Link>
          </p> */}
        </div>
        <Form onSubmit={handleFormSubmit} className="mt-5">
          <Row>




            <Col lg={12}>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Full Name"
                    />
                  </Form.Group>
                </Col>

                <Col lg={6}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Email"
                    />
                  </Form.Group>
                </Col>

                <Col lg={12}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Subject</Form.Label>
                    {/* <Form.Control
                      required
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Subject"
                    /> */}
                    <Form.Select className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)}>
                      <option value="Billing Inquiry">Billing Inquiry</option>
                      <option value="Image Generation Assistance">Image Generation Assistance</option>
                      <option value="Subscription Issue">Subscription Issue</option>
                      <option value="Account Access">Account Access</option>
                      <option value="Feedback/Suggestions">Feedback/Suggestions</option>
                      <option value="Report a Bug/Error">Report a Bug/Error</option>
                      <option value="Cancel Subscription">Cancel Subscription</option>
                      <option value="Request for Refund">Request for Refund</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col lg={12}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="Message"
                      rows={6}
                    />
                  </Form.Group>
                </Col>

                <Col lg={12} className="text-center mt-4">
                  <button type="submit" className="theme-btn">
                    Send Us
                  </button>
                </Col>
              </Row>
            </Col>

            {/* <Col lg={4}>
              <div className="bw_contact_address_box">
                <h3>Get in Touch</h3>
                <div className=" bw_contat_icon_inner">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                  </svg>
                  <div className="bw_add_box">
                    <h6>Address</h6>
                    <p>
                      108, Lala Lajpat Rai Marg
                      <br />
                      Dewas Madhya Pradesh, 455001, India
                    </p>
                  </div>
                </div>
                <div className=" bw_contat_icon_inner">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <div className="bw_add_box">
                    <h6>E-mail</h6>
                    <a href="mailto:support@midjourneyfree.ai"> support@midjourneyfree.ai</a>
                  </div>
                </div>

              </div>
            </Col> */}


          </Row>
        </Form>
      </Container>
    </div>
    </>
  );
};

export default Contactus;
