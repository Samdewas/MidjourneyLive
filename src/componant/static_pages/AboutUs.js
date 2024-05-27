import React from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
// import Aboutimg from '../Assets/images/aboutimg.svg';
import { Link } from 'react-router-dom';
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
        <Helmet>
        <meta charSet="utf-8" />
        <title>About Us | Mid Journey</title>
        <meta name="description" content="Experience your creative spirit with prompt AI-generated images. With Mid Journey you can generate limitless images through Midjourney Free AI image generator"></meta>
      </Helmet>
      <Container>
        <Row className="align-items-center mt-4">
          <Col lg={6}>
            <div className="image-animate">
              <div className="left"></div>
              <div className="middle"></div>
              <div className="right"></div>
            </div>
          </Col>

          <Col lg={6} className="ps-lg-5 ps-3 mb-4">
            <h1>
              Welcome to Midjourney Free Website
              <br />{' '}
            </h1>
            <p>Welcome to Midjourney Free, an innovative platform that offers a unique and efficient way to generate AI-powered images through text. Our platform is designed to cater to businesses and individuals who are always on the lookout for creative and visually appealing content. At Midjourney Free, we understand that creating images can be a time-consuming and expensive process. That's why we have developed an AI-powered platform that can generate high-quality images in seconds.</p>
            <p>
              Our platform is equipped with state-of-the-art algorithms that can produce AI generated images that are not only visually appealing but also highly relevant to the given text. We offer both subscription-based plans and a free plan, giving our users the flexibility to choose a plan that suits their needs. Our subscription-based plans come with a range of features, including the ability to generate up to 3000 images per month. On the other hand, our free plan allows users to generate up to 5 images per day.
            </p>
            <p>
              At Midjourney Free, we take pride in our commitment to providing our users with a seamless and user-friendly experience. Our platform is designed to be intuitive and easy to use, with a simple interface that makes it easy to generate images in just a few clicks. Whether you're a small business owner, a social media manager, or a content creator, Midjourney Free is the perfect platform. We invite you to explore our platform and discover the endless possibilities that our AI-generated images can offer.
            </p>

            

            {/* <h4>Join the Midjourney Free Community</h4>

            <p>Midjourney Free Website is not just a platform; it is a community of creators, entrepreneurs, and visionaries. We invite you to join us in our journey to redefine the way we approach AI-generated art. Are you ready to embark on your Midjourney? Sign up today and start converting your ideas into creative images.</p> */}
          </Col>
        </Row>
        <Row>
          <Col lg={12} className="ps-lg-5 ps-3 mb-4 mt-4">
            <>

            <h2>Why Choose Us?</h2>

            <p>
            Midjourney Free stands out as the go-to choice for individuals seeking an <Link to='/contact-us'>AI photo generator platform</Link> that combines affordability, flexibility, and functionality. Here's why you should choose Midjourney Free:
            </p>

            <ol>
              <li>Free Trial: We understand that trying out a new platform can be a big decision. That's why Midjourney Free offers a free trial, allowing users to explore the platform and its features before making any commitments. This risk-free trial period gives users the opportunity to test the waters, experiment with different features, and see firsthand how Midjourney can enhance their creative process.</li>
              <li>Variety of Plans: We believe that one size does not fit all when it comes to design tools. That's why Midjourney Free offers a variety of plans to cater to different needs and preferences. Whether you're a casual user looking for basic features or a professional designer in need of advanced tools, we have a plan that's right for you. Our customizable plans ensure that you only pay for the features you need, making Midjourney Free a cost-effective solution for creators of all kinds.</li>
              <li>Affordability: We believe that creativity should be accessible to everyone, regardless of budget constraints. That's why Midjourney Free is committed to offering affordable pricing options that fit within your budget. Our competitive pricing ensures that you can access powerful design tools without breaking the bank, making professional-looking designs within reach for individuals and businesses alike.</li>
            </ol>

              <h2>Join the Midjourney Free Community</h2>
              <p>Midjourney Free Website is not just a platform; it is a community of creators, entrepreneurs, and visionaries. We invite you to join us in our journey to redefine the way we approach AI-generated art. Are you ready to embark on your Midjourney? Sign up today and start converting your ideas into creative images.</p>

              <p>If you have any questions You can contact us:</p>
              <p>
                By email:{' '}
                <a href="mailto:support@midjourneyfree.ai" className="text-light">
                  support@midjourneyfree.ai
                </a>
              </p>
            </>
          </Col>
        </Row>
      </Container>
    </div >
  );
};

export default About;
