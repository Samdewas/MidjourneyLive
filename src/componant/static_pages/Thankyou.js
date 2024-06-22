import React from 'react'
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../../Assets/css/about.css'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
// import Aboutimg from "../Assets/images/aboutimg.svg";
const Thankyou = () => {

  useEffect(() => {
    window.scrollTo(0, 0)

  window.gtag('event', 'conversion', {
      'send_to': 'AW-16593298659/F_pbCPnOx50ZEJ_25Pgp',
      'value': 7,
      'currency': 'USD',
      'transaction_id': ''
  });



  }, [])

  return (
    <div className='about-page'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Thank You | Mid Journey</title>
        <meta name="description" content="Experience your creative spirit with prompt AI-generated images. With Mid Journey you can generate limitless images through Mid Journey AI image generator"></meta>
        <link rel="canonical" to= {window.location.href} />
      </Helmet>
      <Container className='pt-5'>
        <Row className='align-items-center mt-10'>
          <Col lg={12}>

           <div><h1 className='text-center mt-5'> 🤝 Thank you for subscribing to Mid Journey AI. </h1></div>

          </Col>

         
            </Row>
            
          </Container>
        </div>
        )
}

        export default Thankyou