import React, { useState, useRef } from 'react'
import '../../Assets/css/midjurney.css';
// import { ResultContext } from './Context/ResultContext';
// import Searchbar from './Searchbar';
// import Faq from './Faq';
import Faq from '../Home/Faq';
import step1 from '../../Assets/img/new/1Step.svg';
import step2 from '../../Assets/img/new/2Step.svg';
import step3 from '../../Assets/img/new/3Step.svg';
import line from '../../Assets/img/new/line.svg';
import point from '../../Assets/img/new/point.svg';
import aiImage from '../../Assets/img/new/ai-img.png';

import img1 from '../../Assets/img/new/1.png';
import img2 from '../../Assets/img/new/2.png';
import img3 from '../../Assets/img/new/3.png';
import img4 from '../../Assets/img/new/4.png';
import img5 from '../../Assets/img/new/5.png';
import img6 from '../../Assets/img/new/6.png';
import img7 from '../../Assets/img/new/7.png';
import img8 from '../../Assets/img/new/8.png';
import img9 from '../../Assets/img/new/9.png';
import img10 from '../../Assets/img/new/10.png';
import img11 from '../../Assets/img/new/11.png';
import img12 from '../../Assets/img/new/12.png';
import search from '../../Assets/img/search.svg'
import Icon1 from '../../Assets/img/new/save.png';
import Icon2 from '../../Assets/img/new/picture.png';
import Icon3 from '../../Assets/img/new/back-in-time.png';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MidHome = ({ HowItWorkSec, FaqSec }) => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const handleGenerate = () => {
    navigate("/user/image-generator/" + prompt)
}
  // const { value, setUserPrompt, imageDataNew, isloading, iframe, setIframe } = useContext(ResultContext);
  const inputRef = useRef(null);
  const howItsWork = useRef();

  // useEffect(() => {
  //   setUserPrompt('');
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <>
      <section className="home_main_banner">
        <div className="custom_max_container">
          <div className="banner-text">
            <div>
              <h1 className="title-color mb-3"><span className="title-white">Convert Text Into Images With</span>
                <br /> Midjourney Free AI
              </h1>
              <p>
                Experience the power of AI-generated art with <b>Midjourney AI</b>. <br />
                From textual prompts to visually striking images in a matter of seconds. <br />
              </p>
              {/* <Searchbar inputRef={inputRef} /> */}
              <form onSubmit={handleGenerate} className="search-generate-form">
                        <div className="search-generate">
                            <img src={search} alt="Search" />
                            <input required value={prompt} onChange={(e) => setPrompt(e.target.value)} type="text" placeholder="Every Beautiful Image Was Once Just An Idea In Someone's Head. Convert Your Idea Into Visual Art Today!" />
                            <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="17" viewBox="0 0 21 17" fill="#137A83"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.2106 7.44548L16.4472 5.72147C16.2668 5.31459 15.9397 4.98741 15.5286 4.81123L13.8675 4.09814C13.7375 4.03941 13.7333 3.85485 13.8675 3.79612L15.5579 3.05786C15.969 2.87749 16.292 2.5545 16.4724 2.14343L17.2106 0.448783C17.2694 0.318749 17.4539 0.318749 17.5127 0.448783L18.2509 2.14343C18.4313 2.5545 18.7543 2.87749 19.1654 3.05786L20.86 3.79612C20.99 3.85485 20.99 4.03941 20.86 4.09814L19.1654 4.8364C18.7543 5.01677 18.4313 5.33976 18.2509 5.75083L17.5127 7.44548C17.4539 7.57551 17.2694 7.57551 17.2106 7.44548ZM7.59649 12.3744L5.05453 11.2795C4.85319 11.1915 4.85319 10.9062 5.05453 10.8181L7.64263 9.68977C8.26764 9.41712 8.7668 8.91795 9.03946 8.29295L10.1678 5.70484C10.2559 5.5035 10.5411 5.5035 10.6292 5.70484L11.7576 8.29295C12.0302 8.91795 12.5294 9.41712 13.1544 9.68977L15.7425 10.8181C15.9439 10.9062 15.9439 11.1915 15.7425 11.2795L13.1544 12.4079C12.5294 12.6806 12.0302 13.1797 11.7576 13.8047L10.625 16.397C10.5369 16.5984 10.2517 16.5984 10.1636 16.397L8.99751 13.7586C8.72066 13.1336 8.2173 12.6386 7.5923 12.366L7.59649 12.3744ZM3.50657 0.352542C1.56985 0.352542 -0.000167915 1.92256 -0.000168 3.85928C-0.000168085 5.796 1.56985 7.36602 3.50657 7.36602C5.44328 7.36602 7.0133 5.796 7.0133 3.85928C7.0133 1.92256 5.44328 0.352542 3.50657 0.352542Z" fill="#137A83"></path></svg> Generate</button>
                        </div>
                    </form>
            </div>
          </div>

          <div className="photobanner">
            <img className="first" src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
            <img src={img4} alt="" />
            <img src={img5} alt="" />
            <img src={img6} alt="" />
            <img src={img7} alt="" />
            <img src={img8} alt="" />
            <img src={img9} alt="" />
            <img src={img10} alt="" />
            <img src={img11} alt="" />
            <img src={img12} alt="" />
          </div>
        </div>
      </section>

      <section className='aboutHome image_generate_steps'>
        <Container>
          <h2 className='title'>What Is Midjourney</h2>
          <p>
            Midjourney is an AI image generator, enabling users to transform their textual prompts into visually striking images. The platform simplifies generating images by automating text conversion into images, making it accessible to everyone, regardless of their artistic skills.</p>
          <p>
            Imagine you want to describe a sunny day at the beach. With Midjourney, you just type in your description, and it magically turns it into a colorful beach scene. You don't need to worry about drawing or painting – Midjourney does all the hard work for you.
          </p>
        </Container>
      </section>

      <section className="image_generate_steps">
        <div className="custom_min_container">
          <h2 className="title">Steps To Generate The Perfect Images Using Midjourney Free</h2>
          <p className="subtitle">Here’s the simple three steps to generate the image.</p>
          <div className="steps_box">
            <div className="inner_box">
              <img className="img-fluid" src={step1} alt="" />
              <p className="title">Think Of A Prompt</p>
              <p className="text">Provide a brief description of the image you want, including the desired style and keywords such as 3D, anime, Art Deco, Minimalism, Bauhaus, etc.</p>
            </div>
            <div className="inner_box img-arrow">
              <img className="img-fluid" src={line} alt="" />
            </div>
            <div className="inner_box">
              <img className="img-fluid" src={step2} alt="" />
              <p className="title">Wait While We Generate Your Image</p>
              <p className="text">After submitting the prompt, your text will be converted to an image. You can make adjustments to the image as you please</p>
            </div>
            <div className="inner_box img-arrow">
              <img className="img-fluid" src={line} alt="" />
            </div>
            <div className="inner_box">
              <img className="img-fluid" src={step3} alt="" />
              <p className="title">Download Your Image</p>
              <p className="text">Click on the input field to download or save your high-quality image easily</p>
            </div>
          </div>
        </div>
      </section>

      <section className="Creative_image_tools">
        <div className="custom_min_container">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="text-box">
                  <h3 className="maintitle">What Set’s Us Apart</h3>
                  <p className="text">Not only does the AI content production service deliver speedy results, but the quality of the generated content is also high.</p>
                  <ul className="Creative_image_tools_list">
                    <li>
                      <img src={Icon1} alt="" className="img-fluid" />
                      <div className="inner-box">
                        <p className="title">Easy and Efficient</p>
                        <p className="txt">Midjourney Free simplifies generating images by automating text conversion into images.</p>
                      </div>
                    </li>
                    <li>
                      <img src={Icon2} alt="" className="img-fluid" />
                      <div className="inner-box">
                        <p className="title">High-Quality Images</p>
                        <p className="txt">The images generated by Midjourney Free are of high quality, ensuring that the final output meets the user's expectations.</p>
                      </div>
                    </li>
                    <li>
                      <img src={Icon3} alt="" className="img-fluid" />
                      <div className="inner-box">
                        <p className="title">Saves Time</p>
                        <p className="txt">The AI-powered tool generates visually striking images in a matter of seconds, saving users a lot of time and effort.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="img-box">
                  <img src={aiImage} alt="" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Faq FaqSec={FaqSec} /> */}
      <Faq/>
    </>
    
  );
};

export default MidHome;
