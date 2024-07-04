import React from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
// import Aboutimg from '../Assets/images/aboutimg.svg';
import blogImg from '../static_pages/blog/assets_blog/img/blog1.jpg'
import blogImg2 from '../static_pages/blog/assets_blog/img/blog2.jpg'
import blogImg3 from '../static_pages/blog/assets_blog/img/blog3.jpg'
import { Link } from 'react-router-dom';
const Blogs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
        <Helmet>
        <meta charSet="utf-8" />
        <link rel="alternate" to=" https://www.midjourneyfree.ai/about-us/" hreflang="en-us" />
        <title>Explore about Midjourney Free | Blogs</title>
        <meta name="keywords"
    content="Midjourney AI, Midjourney AI Free, blogs, ai image generator, ai images, image generator ai, ai image generator free, best ai image generator, ai image generator online"></meta>
        <meta name="description" content="Know more about Midjourney Free AI, a transformative AI tool that lets you turn your imagination into images. Explore and dive into creativity with Midjourney Free."></meta>
      </Helmet>
      <Container>
        <Row className="align-items-center mt-4">

          <Col lg={4}>
          <div className='blog_lists'> 
          <img alt="midjourney free" src={blogImg} />
          <h2> A designers guide to midjourney free ai</h2>
        <Link
         to="/blog/a-designers-guide-to-midjourney-free-ai"> Read More</Link>
         

          </div>
          </Col>
          
           <Col lg={4}>
          <div className='blog_lists'> 
          <img alt="midjourney" src={blogImg2} />
          <h2> Text-to-image ai generator module</h2>
          <Link
         to="/blog/text-to-image-ai-generator-module"> Read More</Link>
      

          </div>
          </Col>

          <Col lg={4}>
          <div className='blog_lists'> 
          <img alt="midjourney ai"  src={blogImg3} />
          <h2> AI demystified exploring the possibilities</h2>
          <Link
         to="/blog/ai-demystified-exploring-the-possibilities"> Read More</Link>
    

          </div>
          </Col>

       
        </Row>
        
      </Container>
    </div >
  );
};

export default Blogs;
