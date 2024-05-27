import React from 'react';
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Faq = ({ FaqSec }) => {
  return (
    <div className="custom_max_container">
      <div className="custom_min_container">
        <div className="faq-section my-md-5 mt-0 py-5" ref={FaqSec}>
          <h2 className="text-center fw-bold mb-5">Frequently Asked Questions</h2>

          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is Midjourney Free, and what sets it apart from Midjourney?</Accordion.Header>
              <Accordion.Body>
              Midjourney Free is an AI photo generator that creates AI artwork, just like its counterpart Midjourney. However, what sets Midjourney Free apart is its stability and reliability. While Midjourney can sometimes face overcrowding issues, Midjourney Free offers a more stable user experience. With Midjourney Free, users can effortlessly convert textual descriptions into visual creations, making it a great choice for those looking to create stunning AI artwork.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>What Makes Midjourney free a better option for generating AI images?</Accordion.Header>
              <Accordion.Body>
              Midjourney Free provides up to five free image generations per day. If you wish to generate more images, you can upgrade to a paid plan that offers up to 3000 image generations per day, depending on the plan you choose. While Midjourney Free charges a <Link to='/pricing'>nominal fee</Link> and provides access to over 1000 images, Midjourney is more expensive and offers no free trial.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>How To Use Midjourney Free? </Accordion.Header>
              <Accordion.Body>To generate your AI-generated artwork, enter your prompt in the input box on the right and wait for approximately one minute. Once the image is generated, you can download the high-definition version for free, and you will have full ownership rights to the artwork.</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>What art styles can I create with Midjourney?  </Accordion.Header>
              <Accordion.Body>Midjourney Free offers support for a vast array of artistic styles, including but not limited to oil paintings, anime, pixel art, sketches, watercolor, comics, graffiti, mosaic, stained glass, and abstract art.</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Is Midjourney Free related to Midjourney.com?</Accordion.Header>
              <Accordion.Body>Please note that Midjourney Free and midjourney.com are not related services, and Midjourney Free cannot be used on Discord as all our services are exclusively delivered through our website.</Accordion.Body>
            </Accordion.Item>

            {/* <Accordion.Item eventKey="6">
                <Accordion.Header>Are there any attribution requirements for using Midjourney Free 2 AI-generated images from ?</Accordion.Header>
                <Accordion.Body>No, there are no specific attribution requirements for using Midjourney Free 2 generated images from Mid Journey. However, it is always appreciated if you can credit Mid Journey as the source of the images.</Accordion.Body>
            </Accordion.Item> */}

            {/* <Accordion.Item eventKey="7">
              <Accordion.Header>How frequently can you generate Midjourney Free 2 generated images on Mid Journey?</Accordion.Header>
              <Accordion.Body>Mid Journey allows you limitless access to generating Midjourney Free images. You just have to enter a prompt and the images will be generated.</Accordion.Body>
            </Accordion.Item> */}
            {/* <Accordion.Item eventKey="8">
              <Accordion.Header>What image formats are available for download on Mid Journey?</Accordion.Header>
              <Accordion.Body>Mid Journey primarily offers Midjourney Free 2 generated images in the PNG format, ensuring high-quality and transparent backgrounds. This format allows for easy integration into various design projects</Accordion.Body>
            </Accordion.Item> */}
            {/* <Accordion.Item eventKey="9">
                <Accordion.Header>Can I provide feedback or suggestions for improving Mid Journey's services? </Accordion.Header>
                <Accordion.Body>Yes, Mid Journey appreciates user feedback and suggestions to enhance its services. You can provide feedback or suggestions through the website's contact or feedback form. Your input helps improve the user experience for everyone.</Accordion.Body>
            </Accordion.Item> */}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Faq;
