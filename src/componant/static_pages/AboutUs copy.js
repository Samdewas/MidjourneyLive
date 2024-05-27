import React from 'react'
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../../Assets/css/about.css'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
// import Aboutimg from "../Assets/images/aboutimg.svg";
const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='about-page'>
      <Helmet>
        <title>About Us | Mid Journey Free</title>
        <meta name="description" content="Experience your creative spirit with prompt AI-generated images. With Mid Journey you can generate limitless images through Mid Journey AI image generator"></meta>
        <link rel="canonical" to= "https://MidJourneyfree.com/about-us"/>
      </Helmet>
      <Container className='pt-5'>
        <Row className='align-items-center'>
          <Col lg={6}>

            <div className='image-animate'>
              <div className='left'></div>
              <div className='middle'></div>
              <div className='right'></div>
            </div>

          </Col>

          <Col lg={6} className='ps-lg-5 ps-3 mb-4'>
            <div id="ih863"><h1>Mid Journey Free Your Gateway<br />
              to Creative Imagining</h1>



              <p>Welcome to Mid Journey Free, Powered by DreamVibe Ai Studio platform that empowers users to create images effortlessly through simple prompts.
              </p>

              <h2 className='abt_heading'> Our Vision </h2>

              <p>At Mid Journey Free, our vision is to provide a seamless and cost-effective solution for users to bring their ideas to life through captivating images. We understand the power of visual storytelling and its impact on your projects, and that's why we've built a platform that makes image creation accessible to everyone.
              </p>

              <h3 className='abt_heading'> Innovative Image Generation </h3>

              <p>Mid Journey Free is a platform Powered by DreamVibe Ai Studio that utilises of OpenAI's DALL-E 2 DALL-E 3, API to produce visually stunning images from simple prompts. Our platform combines various techniques to ensure that you get the best value for your investment. We understand that creativity should not be limited by high costs, and that's why we have created a solution that brings your imagination to life without putting a strain on your budget.
              </p>

              <h3 className='abt_heading'> Reasonable Plans for Every Need </h3>

              <p>At Mid Journey Free, we are proud to offer a variety of affordable plans that are customised to meet your specific needs. Whether you are a freelancer, a small business owner, or an individual with a passion for visual storytelling, we have a plan that will suit you. Our pricing is transparent, so there are no hidden fees or surprises. You'll know exactly what you're getting when you sign up with us.
              </p>


              <p>Join us at Mid Journey Free start creating your visual masterpieces today!</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12} className=' ps-3 mb-4'>

            <>
              <h2 class="abt_heading">Join Us</h2>
              <p>With over <strong>5000 +</strong>  happy customers and still counting, Whether you're an individual professional, students, content creator, startup, or an established enterprise, Mid Journey AI is your gateway to transformative creativity</p>

              <h2 className='abt_heading'> Privacy Is Our Priority </h2>

              <p>Your data is sacred to us. We understand the importance of privacy, and that's why every piece of data you create on Mid Journey Free remains exclusively yours. We take rigorous measures to safeguard your information, ensuring a secure and confidential environment for your creative endeavours.
              </p>

              <h2 className='abt_heading'> Fueling Your Dream Projects</h2>

              <p>At Mid Journey Free, we understand the immense impact that images can have on your creative projects. That's why we've created a platform that is dedicated to helping you express your ideas and bring your projects to life. Whether you're a marketer, designer, student, or simply a hobbyist, I designed our platform to inspire your imagination and turn your concepts into stunning visual experiences. We believe that everyone has a unique story to tell,
                and we're here to help you share yours with the world. to fuel your imagination and turn your ideas into captivating visual experiences.
              </p>

              {/* <h2 className='abt_heading'> On-Demand Creativity with Credits</h2>

<p>In our upcoming updates, Mid Journey Free will feature a Credit system, allowing users on-demand image generation. These credits provide flexibility, giving you control to create images whenever inspiration strikes. Stay tuned for a more empowering user experience!.
</p> */}

              <br />
              <p>If you have any questions You can contact us:</p>
              <p>By email: <Link to='mailto:support@midjourneyfree.ai'><b>support@midjourneyfree.ai</b></Link></p>
              <br />



            </>

          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AboutUs