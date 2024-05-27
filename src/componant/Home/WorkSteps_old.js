import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const WorkSteps = () => {
    return (
        <section className="about-img-generater">
                <Container fluid>
                    <Row>
                        <Col md={5}>
                            {/* <div className="col"> */}
                            <div className="img-genrater-first">
                                <h4 className="sub-title">IMAGE GENERATOR</h4>
                                <h3 className="title">Turn Your Ideas Into Visual Artwork With Mid Journey Free</h3>
                                <p className="txt">Witness your ideas turn into incredible AI images with Mid Journey Free. Create unique
                                    images with
                                    simple textual prompts and communicate your ideas creatively.</p>
                                <ul className="list">
                                    <li><svg xmlns="http://www.w3.org/2000/svg" width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M13.88 1.17017C14.2755 1.56567 14.2755 2.20798 13.88 2.60349L5.77995 10.7035C5.38444 11.099 4.74214 11.099 4.34663 10.7035L0.296631 6.65349C-0.0988769 6.25798 -0.0988769 5.61567 0.296631 5.22017C0.692139 4.82466 1.33444 4.82466 1.72995 5.22017L5.06487 8.55192L12.4498 1.17017C12.8453 0.774658 13.4876 0.774658 13.8831 1.17017H13.88Z" fill="currentColor"></path></svg>
                                        Multiple variations Available</li>
                                    <li><svg xmlns="http://www.w3.org/2000/svg" width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M13.88 1.17017C14.2755 1.56567 14.2755 2.20798 13.88 2.60349L5.77995 10.7035C5.38444 11.099 4.74214 11.099 4.34663 10.7035L0.296631 6.65349C-0.0988769 6.25798 -0.0988769 5.61567 0.296631 5.22017C0.692139 4.82466 1.33444 4.82466 1.72995 5.22017L5.06487 8.55192L12.4498 1.17017C12.8453 0.774658 13.4876 0.774658 13.8831 1.17017H13.88Z" fill="currentColor"></path></svg>
                                        Royalty-Free Commercial Use</li>
                                    <li><svg xmlns="http://www.w3.org/2000/svg" width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M13.88 1.17017C14.2755 1.56567 14.2755 2.20798 13.88 2.60349L5.77995 10.7035C5.38444 11.099 4.74214 11.099 4.34663 10.7035L0.296631 6.65349C-0.0988769 6.25798 -0.0988769 5.61567 0.296631 5.22017C0.692139 4.82466 1.33444 4.82466 1.72995 5.22017L5.06487 8.55192L12.4498 1.17017C12.8453 0.774658 13.4876 0.774658 13.8831 1.17017H13.88Z" fill="currentColor"></path></svg>
                                        Free Of Watermark</li>
                                </ul>
                                <Link to='/login' className="btn">Started Now</Link>
                            </div>
                            {/* </div> */}
                        </Col>
                        <Col md={4}>
                            <div className="img-gen-h-slider">
                                <section className="slider_container">
                                    <section className="slider">
                                        <div className="slide one">
                                            <img src="https://webnetny.s3.us-west-2.amazonaws.com/wp-ftt/dl/gen-1.webp" alt="" />
                                        </div>
                                        <div className="slide two">
                                            <img src="https://webnetny.s3.us-west-2.amazonaws.com/wp-ftt/dl/gen-2.webp" alt="" />
                                        </div>
                                        <div className="slide three">
                                            <img src="https://webnetny.s3.us-west-2.amazonaws.com/wp-ftt/dl/gen-3.webp" alt="" />
                                        </div>
                                        <div className="slide four">
                                            <img src="https://webnetny.s3.us-west-2.amazonaws.com/wp-ftt/dl/gen-4.webp" alt="" />
                                        </div>
                                        <div className="slide four">
                                            <img src="https://webnetny.s3.us-west-2.amazonaws.com/wp-ftt/dl/gen-5.webp" alt="" />
                                        </div>
                                    </section>
                                </section>
                            </div>
                        </Col>
                        <Col md={3}>
                            <marquee direction="up" scrollamount="7" className="img-gen-v-slider">
                                <img src="https://webnetny.s3.us-west-2.amazonaws.com/wp-ftt/dl/gen-6.webp" alt="" />
                                <img src="https://webnetny.s3.us-west-2.amazonaws.com/wp-ftt/dl/gen-7.webp" alt="" />
                                <img src="https://webnetny.s3.us-west-2.amazonaws.com/wp-ftt/dl/gen-8.webp" alt="" />
                                <img src="https://webnetny.s3.us-west-2.amazonaws.com/wp-ftt/dl/gen-9.webp" alt="" />
                                <img src="https://webnetny.s3.us-west-2.amazonaws.com/wp-ftt/dl/gen-10.webp" alt="" />
                                <img src="https://webnetny.s3.us-west-2.amazonaws.com/wp-ftt/dl/gen-11.webp" alt="" />
                                <img src="https://webnetny.s3.us-west-2.amazonaws.com/wp-ftt/dl/gen-12.webp" alt="" />
                                <img src="https://webnetny.s3.us-west-2.amazonaws.com/wp-ftt/dl/gen-13.webp" alt="" />
                                <img src="https://webnetny.s3.us-west-2.amazonaws.com/wp-ftt/dl/gen-14.webp" alt="" />
                                <img src="https://webnetny.s3.us-west-2.amazonaws.com/wp-ftt/dl/gen-1.webp" alt="" />
                            </marquee>
                        </Col>
                    </Row>


                  
                </Container>
            </section>
    )
}

export default WorkSteps