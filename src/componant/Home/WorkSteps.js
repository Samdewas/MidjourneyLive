import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import step1 from '../../Assets/img/step1.webp'
import step2 from '../../Assets/img/step2.png'
import step3 from '../../Assets/img/step3.png'
const WorkSteps = () => {
    return (
        <section className='WorkSteps'>
            <Container>
                <h2>Turn Your Ideas Into Visual Artwork With Mid Journey Free</h2>
                <Tabs
                    defaultActiveKey="home"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="Text to Image ">
                        <Row className='justify-content-center align-items-center pt-3'>
                            <Col md={8}>
                                <img width={800} height={400} className='img-fluid' src={step1} alt='Text to Image ' />
                            </Col>
                            <Col md={4}>
                                <div className='textBox ps-5'>
                                    <h3>Text to Image </h3>
                                    <p>A text-to-image generator converts written descriptions
                                        into visual images using AI. It's a powerful tool for artists,
                                        designers, and content creators to quickly bring ideas
                                        to life.</p>
                                </div>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="profile" title="Image to Image ">
                        <Row className='justify-content-center align-items-center pt-3'>
                            <Col md={8}>
                                <img width={800} height={400} src={step2} alt='Image to Image ' />
                            </Col>
                            <Col md={4}>
                                <div className='textBox ps-5'>
                                    <h3>Image to Image </h3>
                                    <p>An image-to-image AI generator transforms input images into
                                        enhanced or altered versions using advanced machine learning
                                        algorithms, offering versatile applications in visual editing and
                                        content creation.</p>
                                </div>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="contact" title="Upscale Your Image">
                        <Row className='justify-content-center align-items-center pt-3'>
                            <Col md={8}>
                                <img width={800} height={400} src={step3} alt='Upscale Your Image' />
                            </Col>
                            <Col md={4}>
                                <div className='textBox ps-5'>
                                    <h3>Upscale Your Image</h3>
                                    <p>An image upscale tool doubles image size while preserving
                                        quality, enhancing details, and improving resolution. It's
                                        ideal for improving visuals without compromising clarity
                                        or sharpness.</p>
                                </div>
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>
            </Container>
        </section>
    )
}

export default WorkSteps