import React, { useState } from 'react'
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import { isDesktop, isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom'

const Faq = () => {
    const accordionItems = [
        {
            eventKey: "0",
            header: "What is Mid Journey Free?",
            body: "Mid Journey Free is a website that provides a platform for accessing DALL-E-generated images for free in our free plan. It allows you to generate AI-powered images on the spot without you having to log in every time you need to generate one."
        },
        {
            eventKey: "1",
            header: "How does Mid Journey Free work?",
            body: "Mid Journey Free utilizes OpenAI DALL-E, a powerful AI model, to generate unique and high-quality images. Users can access the website and easily generate and download these DALL-E-generated images for their projects. You can insert a prompt and generate an image as per your liking."
        },
        {
            eventKey: "2",
            header: "Are Dall-E Generated Images On Mid Journey Free Really Cost-Effective?",
            body: "Mid Journey Free is budget-friendly because it uses smart technology to create images without wasting resources. It manages computer resources cleverly, uses efficient image-making methods, and takes advantage of cost-friendly cloud services. This combination of strategic measures ensures that Mid Journey Free provides an affordable yet powerful solution for turning ideas into excellent visuals using the OpenAI API."
        },
        {
            eventKey: "3",
            header: "Can I use the DALL-E 2, DALL-E 3, generated images from Mid Journey Free for commercial purposes?",
            body: "Yes, you are allowed to use the DALL-E-generated images from Mid Journey Free for both personal and commercial projects."
        },
        // {
        //     eventKey: "4",
        //     header: "Is there a limit on the number of images I can generate per day?",
        //     body: "Depending on the plan you select, there will be a monthly limit on the number of images that can be generated. Our free plan allows for 5 image generations per month, while the Gold plan supports image generation of up to 1000 images. If you choose the Platinum plan, you will be able to generate up to 3000 images per month."
        // },
        // {
        //     eventKey: "5",
        //     header: "What types of prompts can I use to generate images?",
        //     body: "You can use a variety of prompts to instruct Mid Journey Free in generating images. The more detailed and specific your prompt, the better the results. Experiment with different prompts to achieve the desired output."
        // },
        {
            eventKey: "6",
            header: "Is there a refund policy?",
            body: "You get a 3-day money-back guarantee on all plans. Submit your request via our contact form, and we will refund the payment made if the request is made within 3 days after the sign-up."
        },
        {
            eventKey: "7",
            header: "Can I cancel my subscription at any time?",
            body: "It's easy to cancel your subscription anytime from your account settings. Please note that the cancellation will take effect at the end of your current billing cycle."
        },
        {
            eventKey: "8",
            header: "Can I modify or edit the  DALL-E 2, DALL-E 3 generated images on Mid Journey Free?",
            body: "Yes, once you have received a DALL-E-generated image from Mid Journey Free, you have the freedom to modify and edit it according to your requirements. Feel free to customize and enhance the Dall-E images to suit your project's needs by re-entering the prompt and making a few modifications to your text."
        },
        {
            eventKey: "9",
            header: "How frequently can you generate  DALL-E 2, DALL-E 3 generated images on Mid Journey Free?",
            body: "Mid Journey Free allows you limitless access to generating Dall-e images. You just have to enter a prompt and the images will be generated."
        },
        {
            eventKey: "10",
            header: "What image formats are available for download on Mid Journey Free?",
            body: "Mid Journey Free primarily offers DALL-E 2, DALL-E 3 generated images in the PNG format, ensuring high-quality and transparent backgrounds. This format allows for easy integration into various design projects"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const handleAccordionClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <section className="faq mt-5">
            <div className="container">
                <Row>
                    <Col md={4}>
                        <div className='faqTitle'>
                            <h2>Frequently Asked Questions</h2>
                            <p>Find answers to common queries quickly and easily in our comprehensive FAQ section.</p>
                            {isDesktop ? <Link to='/faq' className='theme-btn'>View All</Link> : ' '}
                        </div>
                    </Col>
                    <Col md={8}>
                        {/* <Accordion defaultActiveKey='0' flush>
                            {accordionItems.map((item, index) => (
                                <Accordion.Item eventKey={item.eventKey}
                                    className={activeIndex === index ? 'active' : ''}
                                    onClick={() => handleAccordionClick(index)}>
                                    <Accordion.Header>{item.header}</Accordion.Header>
                                    <Accordion.Body eventKey={item.eventKey}>
                                    {item.body}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                           
                        </Accordion> */}

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
                        </Accordion>
                        {isMobile ? <div className='m-auto d-table pt-5'><Link to='/faq' className='theme-btn px-5 py-3'>View All</Link></div> : ' '}

                    </Col>
                </Row>



            </div>
        </section>
    )
}

export default Faq