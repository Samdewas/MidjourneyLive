import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet';
import search from '../../Assets/img/search.svg'
import img1 from '../../Assets/img/img1.svg'
import img2 from '../../Assets/img/img2.svg'
import img3 from '../../Assets/img/img3.svg'
import Slider from './Slider';
import WorkSteps from './WorkSteps';
import Testimonial from './Testimonial';
import Faq from './Faq';
import LazyLoad from 'react-lazy-load';
import { useMediaQuery } from 'react-responsive';
import { isDesktop } from 'react-device-detect';
const Home = () => {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState("");
    const handleGenerate = () => {
        navigate("/user/image-generator/" + prompt)
    }
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1366px)'
      })
      const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' })
    return (
        <>
            <Helmet>
            <title>Mid Journey Free AI Image Generator | Powered by Dall-E</title>
        <meta name="description" content="Midjourney Free: Your gateway to effortless image generation. Convert your
imagination, create stunning visuals, and bring your ideas to life with our AI image generator."></meta>
<meta name="keywords"
    content="midjourney free, midjourney, ai image generator, midjourney ai, ai photo generator, ai generated images, free ai image generator, ai image generator free, mid journey, generate ai images, midjourney ai free, midjourneyfree"></meta>
         <link rel="alternate" to="https://www.midjourneyfree.ai/" hreflang="en-us" />
        <link rel="canonical" to= "https://MidJourneyfree.com" />
            </Helmet>
          
            <section className="main-banner">
            {/* <LazyLoad height={isDesktopOrLaptop ? 578 : isTabletOrMobile? 407 : 587} threshold={0.95}> */}
                <div className="main-banner-inner">
                    <h2 className="top-sub-heading">Empower Your Creativity with</h2>
                    <h1 className="top-main-heading">DALL-E</h1>
                    <span className="empower-sub">POWERED BY DREAMVIBE AI</span>
                    <p className="top-sub-head">Bring your ideas to life with Mid Journey Free. Think of a textual prompt <br /> and 
                        convert it into visual images for your dream project
                    </p>
                    <form onSubmit={handleGenerate} className="search-generate-form">
                        <div className="search-generate">
                            <img src={search} alt="" />
                            <input required value={prompt} onChange={(e) => setPrompt(e.target.value)} type="text" placeholder="Describe what you want to see" />
                            <button type="submit">Generate</button>
                        </div>
                    </form>
                    {/* <div className="mouse-btn">
                        <div className="mouse"></div>
                    </div> */}
                </div>
                {/* </LazyLoad> */}
            </section>

            <Slider />

            <section className="How-to-gen-img">
                <div className="container">
                    <h3 className="title">How to Generate Image</h3>
                    <p className="txt">Here’s the easy steps to get Image you want.</p>
                    <div className="row">
                        <div className="col">
                            <div className="box">
                                <img width={400} height={307} src={img1} alt="text to image" />
                                <p className="step">Enter Your Prompt</p>
                                <p className="dec">Click on the input field and <br />enter your prompt text.</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="box">
                                <img width={400} height={307} src={img2} alt="image generator" />
                                <p className="step">Review and Refine</p>
                                <p className="dec">Evaluate the generated image and <br /> refine your prompt if needed.</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="box">
                                <img width={400} height={307} src={img3} alt="midjourney" />
                                <p className="step">Download the Image</p>
                                <p className="dec">Use the provided option to save <br /> the image to your device.</p>
                            </div>
                        </div>
                    </div>
                </div>

               
            </section>

            <WorkSteps />

            {/* <Testimonial /> */}

            <Faq />


            {/* <section className="newslatter">
                <div className="container">
                    <span className="sub-title">LATEST NEWS</span>
                    <h3>Stay Updated With <br /> Our Activities</h31>
                    <p>Subscribe to our newsletters and stay updated about our <br /> activities and much more. No spam, we
                        promise.</p>
                    <form action="">
                        <input type="text" placeholder="Email address" />
                        <button>Subscribe</button>
                    </form>
                </div>
            </section> */}
        </>
    )
}

export default Home