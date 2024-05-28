import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Spinner,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
// import ImageGallery from "react-image-gallery";
// import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css'
import { useDispatch, useSelector } from "react-redux";
import { credit_count, generatedData } from "../../Reducer/homeReducer";
import { base_url, dalleActive } from "../../Store/constant";
import axios from "axios";
import swal from "sweetalert";
import Loader from "../comman/PreLoader";
import view_eye from "../../Assets/img/view-eye.svg";
import PrivateRoute from "../comman/Privaterouter";
import FormData from "form-data";
import textIcon from "../../Assets/img/text.svg";
import imgIcon from "../../Assets/img/img.svg";
import imgscale from "../../Assets/img/upscales.svg";
import download from "../../Assets/img/download.svg";
import generateimg from "../../Assets/img/loader.gif";
import { Helmet } from "react-helmet";
import { isMobileOnly } from "react-device-detect";
import { FacebookIcon, FacebookShareButton, FacebookShareCount, InstapaperIcon, InstapaperShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'
const ImageGenerator = () => {
  const [showSocialshare, setShowSocialshare] = useState(false)
  const { prompt } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const generateddata = useSelector(
    (state) => state.persistedReducer.home.generateddata
  );
  const creditCount = useSelector(
    (state) => state.persistedReducer.home.credit_count
  );
  const userData = useSelector((state) => state.persistedReducer.home.userData);
  const [show, setShow] = React.useState(false);
  const [imageprompt, setImageprompt] = React.useState(
    prompt?.length ? prompt : ""
  );
  const [variation, setVariation] = React.useState(1);
  const [resolution, setResolution] = React.useState("1024x1024");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrlPre, setImageUrlPre] = useState("");
  const [effect, setEffect] = React.useState("Normal");
  const [style, setStyle] = React.useState("");
  const [height, setHeight] = React.useState(0);
  const [loader, setLoader] = React.useState(false);
  const [generatedimages, setGeneratedimages] = React.useState([]);

  const fileChosen = (event) => {
    fileToDataUrl(event, (src, height) => {
      setImageUrlPre(src);
      setHeight(height);
    });
    setImageUrl(event.target.files[0]);
  };

  const fileToDataUrl = (event, callback) => {
    if (!event.target.files.length) return;

    let file = event.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const height = reader.naturalHeight;
      callback(e.target.result, height);
    };
  };

  const handleResolutionChange = (e) => {
    setResolution(e.target.value);
  };

  const handleClose = () => setShow("");
  const [is_India, setIs_India] = useState("");
  useEffect(() => {
    fetch("https://ipinfo.io/json")
      .then((response) => response.json())
      .then((data) => {
        if (data.country == "IN") {
          setIs_India(true);
        }
        // Extract country information from the response
      })
      .catch((error) => {
        console.error("Error fetching IP information:", error);
      });
  }, []);

  const textToImageOpenAi = async (e) => {
    e.preventDefault();
    if (creditCount < variation) {
      swal("Insufficient credits please upgrade your plan ! ");
      navigate("/pricing");
    } else {
      dispatch(generatedData([]));
      setLoader(true);
      const path = "https://api.openai.com/v1/images/generations";
      const headers = {
        "Content-Type": "application/json",
         "Authorization": "",
      };
      const body = {
        prompt: imageprompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
        model: "dall-e-3",
        quality: "hd",
      };
      const response = await fetch(path, {
        headers,
        method: "POST",
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const res = await response.json();
        setLoader(false);
        console.log(res?.error?.message);
        textToImage(e);
        return;
      }
      const responseJSON = await response.json();
      console.log(responseJSON.data[0]);
      let imagesArr = generatedimages;
      responseJSON.data.forEach((image, index) => {
        imagesArr.push(`data:image/png;base64,${image.b64_json}`);
      });
      setGeneratedimages(imagesArr);
      if (imagesArr?.length == variation) {
        const newdata = {
          prompt: imageprompt,
          images: imagesArr,
          resolution: resolution,
          style: style,
          effect: effect,
        };
        handleUploadImage(newdata, variation);
        dispatch(generatedData(newdata));
        setLoader(false);
      } else {
        textToImageOpenAi(e);
      }
    }
  };
  const textToImage = async (e) => {
    e.preventDefault();
    if (creditCount < variation) {
      swal("Insufficient credits please upgrade your plan ! ");
      navigate("/pricing");
    } else {
      dispatch(generatedData([]));
      setLoader(true);
      const path =
        "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData?.stability_key}`,
      };
      const body = {
        steps: 50,
        width: Number(resolution.split("x")[0]),
        height: Number(resolution.split("x")[1]),
        seed: 0,
        cfg_scale: 20,
        samples: Number(variation),
        text_prompts: [
          {
            text: imageprompt,
            weight: 1,
          },
          {
            text: "blurry, bad, blurred, cartoon, cartoonish, vector, illustration, animation, face, male, female",
            weight: -1,
          },
        ],
      };
      if (style != "") {
        body.style_preset = style;
      }
      const response = await fetch(path, {
        headers,
        method: "POST",
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const res = await response.json();
        swal(
          "Error",
          res.message?.replaceAll("stable-diffusion-xl", "Mid Journey"),
          "error"
        );
        setLoader(false);
        console.log(`Non-200 response: ${await res}`);
        return;
      }
      const responseJSON = await response.json();
      let imagesArr = [];
      responseJSON.artifacts.forEach((image, index) => {
        imagesArr.push(`data:image/png;base64,${image.base64}`);
      });
      const newdata = {
        prompt: imageprompt,
        images: imagesArr,
        resolution: resolution,
        style: style,
        effect: effect,
      };
      handleUploadImage(newdata, variation);
      dispatch(generatedData(newdata));
      setLoader(false);
    }
  };
  const imageToImage = async (e) => {
    e.preventDefault();
    if (creditCount < variation) {
      swal("Insufficient credits please upgrade your plan !");
      navigate("/pricing");
    } else {
      dispatch(generatedData([]));
      setLoader(true);
      const formData = new FormData();
      formData.append("init_image", imageUrl);
      formData.append("init_image_mode", "IMAGE_STRENGTH");
      formData.append("image_strength", 0.35);
      formData.append("steps", 50);
      formData.append("seed", 0);
      formData.append("cfg_scale", 20);
      formData.append("samples", variation);
      formData.append("text_prompts[0][text]", imageprompt);
      formData.append("text_prompts[0][weight]", 1);
      formData.append(
        "text_prompts[1][text]",
        "blurry, bad, blurred, cartoon, cartoonish, vector, illustration, animation, face, male, female"
      );
      formData.append("text_prompts[1][weight]", -1);

      if (style != "") {
        formData.append("style_preset", style);
      }
      const path =
        "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image";
      const headers = {
        Authorization: `Bearer ${userData?.stability_key}`,
      };

      const response = await fetch(path, {
        headers,
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const res = await response.json();
        swal(
          "Error",
          res.message?.replaceAll("stable-diffusion-xl", "Mid Journey"),
          "error"
        );
        setLoader(false);
        console.log(`Non-200 response: ${await res}`);
        return;
      }
      const responseJSON = await response.json();
      let imagesArr = [];
      responseJSON.artifacts.forEach((image, index) => {
        imagesArr.push(`data:image/png;base64,${image.base64}`);
      });
      const newdata = {
        prompt: imageprompt,
        images: imagesArr,
        resolution: resolution,
        style: style,
        effect: effect,
      };
      handleUploadImage(newdata, variation);
      dispatch(generatedData(newdata));
      setLoader(false);
    }
  };
  const Upscale = async (e) => {
    e.preventDefault();
    if (creditCount < variation) {
      swal("Insufficient credits please upgrade your plan !");
      navigate("/pricing");
    } else {
      dispatch(generatedData([]));
      setLoader(true);
      const formData = new FormData();
      formData.append("image", imageUrl);
      formData.append("height", height);

      const path =
        "https://api.stability.ai/v1/generation/esrgan-v1-x2plus/image-to-image/upscale";
      const headers = {
        Authorization: `Bearer ${userData?.stability_key}`,
      };

      const response = await fetch(path, {
        headers,
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const res = await response.json();
        swal(
          "Error",
          res.message?.replaceAll("stable-diffusion-xl", "Mid Journey"),
          "error"
        );
        setLoader(false);
        console.log(`Non-200 response: ${await res}`);
        return;
      }

      const responseJSON = await response.json();
      let imagesArr = [];
      responseJSON.artifacts.forEach((image, index) => {
        imagesArr.push(`data:image/png;base64,${image.base64}`);
      });
      const newdata = {
        prompt: imageprompt == "" ? "Upscale" : imageprompt,
        images: imagesArr,
        resolution: resolution,
        style: style,
        effect: effect,
      };
      handleUploadImage(newdata, variation);
      dispatch(generatedData(newdata));
      setLoader(false);
    }
  };

  const handleUploadImage = (data, variation) => {
    dispatch(credit_count(Number(creditCount) - Number(variation)));
    axios
      .post(base_url + "/user/uploadImage", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData?.token}`,
        },
      })
      .then((response) => {
        if (response.data.status == true) {
          setGeneratedimages([]);
          dispatch(credit_count(response.data.data.credit_count));
        } else {
          swal(response.data.msg, "", "error");
        }
      })
      .catch((error) => {
        swal(error.response.data.msg, "", "error");
      });
  };

  const clearall = () => {
    setImageUrl("");
    setImageprompt("");
    setVariation(1);
    setResolution("1024x1024");
    setEffect("Normal");
    setStyle("");
    setImageUrlPre("");
  };

  const TabTitleWithImage = ({ title, image }) => (
    <div
      onClick={clearall}
      className="d-flex align-items-center justify-content-center"
    >
      <img
        width={16}
        // style={{ opacity: "0.7" }}
        src={image}
        alt="Tab Icon"
        className="tab-image d-inline me-2"
      />
      <span>{title}</span>
    </div>
  );


  function useOutsideAlerter(ref) {
    useEffect(() => {

      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSocialshare(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <>
      <PrivateRoute />
      <Helmet>
        <title> Image Generator | Mid Journey</title>
      </Helmet>
      <section className="main-container-dashboard">
        <Row className="m-0 h-100">
          <Col lg={4} className="ps-0">
            <div className="imgGenraterForm">
              {/* <h2 className="title">Generate Image like never before!</h2>
              <p className="note">
                <span>Note:</span> Image generation on Mid Journey is subject to
                subscriptions and credits. Choose what works best for you and
                start generating images today.
              </p> */}
              <Tabs
                defaultActiveKey="text"
                id="justify-tab-example"
                className="mb-3 img-gen-tabs"
                justify
              >
                <Tab
                  eventKey="text"
                  title={
                    <TabTitleWithImage title="From Text" image={textIcon} />
                  }
                >
                  {/* <div className="creditBalance">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_4514_3509)">
                        <path
                          d="M13.9714 7.00665C13.8679 6.84578 13.6901 6.75015 13.5 6.75015H9.56255V0.562738C9.56255 0.297241 9.37693 0.0677446 9.11706 0.0126204C8.85269 -0.0436289 8.59394 0.0924942 8.48594 0.334366L3.986 10.4592C3.90838 10.6325 3.92525 10.835 4.02875 10.9936C4.13225 11.1533 4.31 11.2501 4.50012 11.2501H8.43757V17.4375C8.43757 17.703 8.62319 17.9325 8.88306 17.9876C8.92244 17.9955 8.96181 18 9.00006 18C9.21831 18 9.42193 17.8729 9.51418 17.6659L14.0141 7.54102C14.0906 7.36664 14.076 7.1664 13.9714 7.00665Z"
                          fill="url(#paint0_linear_4514_3509)"
                        ></path>
                      </g>
                      <defs>
                        <linearGradient
                          id="paint0_linear_4514_3509"
                          x1="10.5204"
                          y1="15.7845"
                          x2="2.32033"
                          y2="5.3758"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stop-color="#E60C84"></stop>
                          <stop offset="1" stop-color="#FFCF4B"></stop>
                        </linearGradient>
                        <clipPath id="clip0_4514_3509">
                          <rect width="18" height="18" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                    Credits Balance: <b>{creditCount}</b> images left
                  </div> */}
                  <Form
                    onSubmit={
                      ((creditCount > 975 && creditCount <= 1000) ||
                        (creditCount > 2925 && creditCount <= 3000)) &&
                        resolution == "1024x1024" && !is_India &&
                        dalleActive
                        ? textToImageOpenAi
                        : textToImage
                    }
                  >
                    <Form.Group className="mb-3">
                      <Form.Label className="require">Image Prompt</Form.Label>
                      <Form.Control
                        as="textarea"
                        required
                        rows={3}
                        onChange={(e) => setImageprompt(e.target.value)}
                        value={imageprompt}
                        placeholder="Briefly explain the image you want to generate for you..."
                      />
                    </Form.Group>

                    <Row>
                      <Col md={5} className="pe-0">
                        <Form.Group className="mb-3">
                          <Form.Label>Number of Images</Form.Label>
                          <Form.Select
                            onChange={(e) => setVariation(e.target.value)}
                            value={variation}
                            aria-label="Default select example"
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      {/* <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Resolution</Form.Label>
                                                    <Form.Select onChange={(e) => setResolution(e.target.value)} value={resolution} aria-label="Default select example">
                                                        <option value="1024x1024">1024x1024</option>
                                                        <option value="1152x896">1152x896</option>
                                                        <option value="1216x832">1216x832</option>
                                                        <option value="1344x768">1344x768</option>
                                                        <option value="1536x640">1536x640</option>
                                                        <option value="640x1536">640x1536</option>
                                                        <option value="768x1344">768x1344</option>
                                                        <option value="832x1216">832x1216</option>
                                                        <option value="896x1152">896x1152</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col> */}
                      <Col md={7}>
                        <Form.Group className="mb-3">
                          <Form.Label>Image Style</Form.Label>
                          <Form.Select
                            onChange={(e) => setStyle(e.target.value)}
                            value={style}
                            aria-label="Default select example"
                          >
                            <option value=""> None </option>
                            <option value="analog-film"> Analog-film </option>
                            <option value="anime"> Anime </option>
                            <option value="cinematic"> Cinematic </option>
                            <option value="comic-book"> Comic-book </option>
                            <option value="digital-art"> Digital-art </option>
                            <option value="enhance"> enhance </option>
                            <option value="fantasy-art"> Fantasy-art </option>
                            <option value="isometric"> Isometric </option>
                            <option value="line-ar"> Line-ar </option>
                            <option value="low-poly"> Low-poly </option>
                            <option value="modeling-compound">
                              {" "}
                              Modeling-compound{" "}
                            </option>
                            <option value="neon-punk"> Neon-punk </option>
                            <option value="origami"> Origami </option>
                            <option value="photographic"> Photographic </option>
                            <option value="pixel-art"> Pixel-art </option>
                            <option value="3d-model"> 3d-model </option>
                            <option value="tile-texture"> Tile-texture </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Orientation</Form.Label>
                          <div className="NumImages">
                            <div className="NumImagesInner">
                              <input
                                name="resolution"
                                checked={resolution === "1024x1024"}
                                value={"1024x1024"}
                                onChange={handleResolutionChange}
                                type="radio"
                                id="radio2"
                                style={{
                                  width: "0px",
                                  height: "0px",
                                  opacity: "0",
                                }}
                              />
                              <label for="radio2" class="btn btn-secondary">
                                <span className="s-box"></span> Square
                              </label>
                              <span>1024 x 1024</span>
                            </div>
                            <div className="NumImagesInner">
                              <input
                                name="resolution"
                                checked={resolution === "1344x768"}
                                value={"1344x768"}
                                onChange={handleResolutionChange}
                                type="radio"
                                id="radio"
                                style={{
                                  width: "0px",
                                  height: "0px",
                                  opacity: "0",
                                }}
                              />
                              <label for="radio" class="btn btn-secondary">
                                <span className="h-box"></span> Horizontal
                              </label>
                              <span>1344 x 768</span>
                            </div>
                            <div className="NumImagesInner">
                              <input
                                name="resolution"
                                checked={resolution === "832x1216"}
                                value={"832x1216"}
                                onChange={handleResolutionChange}
                                type="radio"
                                id="radio1"
                                style={{
                                  width: "0px",
                                  height: "0px",
                                  opacity: "0",
                                }}
                              />
                              <label for="radio1" class="btn btn-secondary">
                                <span className="v-box"></span> Vertical
                              </label>
                              <span>832 x 1216</span>
                            </div>

                            <div className="NumImagesInner">
                              <input
                                name="resolution"
                                checked={resolution === "1536x640"}
                                value={"1536x640"}
                                onChange={handleResolutionChange}
                                type="radio"
                                id="radio3"
                                style={{
                                  width: "0px",
                                  height: "0px",
                                  opacity: "0",
                                }}
                              />
                              <label for="radio3" class="btn btn-secondary">
                                <span className="p-box"></span> Panoramic
                              </label>
                              <span>1536 x 640</span>
                            </div>
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button type="submit" variant="none" className="theme-btn">
                      <svg
                        width="14"
                        height="18"
                        className="d-inline me-2"
                        viewBox="0 0 14 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.0886 6.37423L9.16995 4.24123C9.09603 4.07228 8.85668 4.07228 8.78277 4.24123L7.83594 6.41295C7.60715 6.9374 7.1883 7.35626 6.66384 7.58504L4.49212 8.53187C4.32317 8.60579 4.32317 8.84514 4.49212 8.91905L6.66384 9.86588C7.1883 10.0947 7.60715 10.5135 7.83594 11.038L8.78277 13.2097C8.85668 13.3786 9.09603 13.3786 9.16995 13.2097L10.1168 11.038C10.3456 10.5135 10.7644 10.0947 11.2889 9.86588L13.4641 8.91553C13.6331 8.84162 13.6331 8.60227 13.4641 8.52835L11.2502 7.54985C10.7257 7.31754 10.3104 6.89516 10.0816 6.37071L10.0886 6.37423Z"
                          fill="#137a83"
                        />
                        <path
                          d="M5.95283 14.4417L4.50619 13.8011C4.16477 13.6497 3.89023 13.3752 3.74239 13.0302L3.14403 11.6364C3.09475 11.5273 2.93988 11.5238 2.8906 11.6364L2.27112 13.0549C2.11977 13.3998 1.84874 13.6708 1.5038 13.8222L0.0817976 14.4417C-0.0273166 14.4909 -0.0273166 14.6458 0.0817976 14.6951L1.5038 15.3146C1.84874 15.4659 2.11977 15.737 2.27112 16.0819L2.8906 17.5039C2.93988 17.613 3.09475 17.613 3.14403 17.5039L3.76351 16.0819C3.91487 15.737 4.18589 15.4659 4.53083 15.3146L5.95283 14.6951C6.06195 14.6458 6.06195 14.4909 5.95283 14.4417Z"
                          fill="#137a83"
                        />
                        <path
                          d="M2.94367 -9.53674e-07C1.31854 -9.53674e-07 0.00111675 1.31743 0.00111675 2.94256C0.00111675 4.56769 1.31854 5.88511 2.94367 5.88511C4.5688 5.88511 5.88623 4.56769 5.88623 2.94256C5.88623 1.31743 4.5688 -9.53674e-07 2.94367 -9.53674e-07Z"
                          fill="#137a83"
                        />
                      </svg>
                      Generate
                      {loader ? (
                        <img className="gen_loader" src={generateimg} />
                      ) : (
                        ""
                      )}{" "}
                    </Button>
                  </Form>
                </Tab>
                <Tab
                  eventKey="image"
                  title={
                    <TabTitleWithImage title="From Image" image={imgIcon} />
                  }
                >
                  {/* <div className="creditBalance">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_5419_1957)">
                        <path
                          d="M12.419 6.22813C12.327 6.08513 12.169 6.00014 12 6.00014H8.50006V0.500211C8.50006 0.264215 8.33506 0.0602174 8.10407 0.0112181C7.86907 -0.0387812 7.63907 0.0822171 7.54307 0.297214L3.54313 9.29709C3.47413 9.45109 3.48913 9.63109 3.58113 9.77208C3.67313 9.91408 3.83112 10.0001 4.00012 10.0001H7.50007V15.5C7.50007 15.736 7.66507 15.94 7.89607 15.989C7.93107 15.996 7.96607 16 8.00007 16C8.19407 16 8.37506 15.887 8.45706 15.703L12.457 6.70313C12.525 6.54813 12.512 6.37013 12.419 6.22813Z"
                          fill="url(#paint0_linear_5419_1957)"
                        ></path>
                      </g>
                      <defs>
                        <linearGradient
                          id="paint0_linear_5419_1957"
                          x1="9.35152"
                          y1="14.0307"
                          x2="2.06253"
                          y2="4.77849"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stop-color="#E60C84"></stop>
                          <stop offset="1" stop-color="#FFCF4B"></stop>
                        </linearGradient>
                        <clipPath id="clip0_5419_1957">
                          <rect width="16" height="16" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                    Credits Balance: <b>{creditCount}</b> images left
                  </div> */}
                  <Form onSubmit={imageToImage}>
                    <Form.Group className="mb-3">
                      <Form.Label className="require">Image</Form.Label>
                      <label htmlFor="logo" className="d-block">
                        <div className="p-4 w-full h-48 rounded bg-gray-100 border border-gray-200 d-flex items-center justify-center overflow-hidden">
                          {imageUrl ? (
                            <img
                              src={imageUrlPre}
                              alt="Preview"
                              className=" object-cover"
                              width={200}
                            />
                          ) : (
                            <div className="text-gray-300 d-flex flex-col items-center">
                              <svg
                                style={{ opacity: "0.3" }}
                                width="80px"
                                height="80px"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.5152 7C18.9718 7 17.5496 7.83679 16.8 9.18602L15.5145 11.5H11.75C8.57436 11.5 6 14.0744 6 17.25V34.25C6 37.4256 8.57436 40 11.75 40H22.9963C22.6642 39.2037 22.4091 38.3672 22.2402 37.5H11.75C9.95507 37.5 8.5 36.0449 8.5 34.25V17.25C8.5 15.4551 9.95507 14 11.75 14H16.9855L18.9854 10.4001C19.2941 9.84456 19.8797 9.5 20.5152 9.5H27.4848C28.1203 9.5 28.7059 9.84456 29.0146 10.4001L31.0145 14H36.25C38.0449 14 39.5 15.4551 39.5 17.25V22.7999C40.3823 23.1255 41.2196 23.544 42 24.0436V17.25C42 14.0744 39.4256 11.5 36.25 11.5H32.4855L31.2 9.18602C30.4504 7.83679 29.0282 7 27.4848 7H20.5152Z"
                                  fill="#212121"
                                />
                                <path
                                  d="M24 17C27.5278 17 30.5222 19.2834 31.586 22.4529C30.7711 22.6741 29.988 22.9726 29.2451 23.34C28.5411 21.1138 26.459 19.5 24 19.5C20.9624 19.5 18.5 21.9624 18.5 25C18.5 27.6415 20.3622 29.8481 22.8454 30.3786C22.5516 31.151 22.3292 31.9587 22.1865 32.7936C18.6418 31.972 16 28.7945 16 25C16 20.5817 19.5817 17 24 17Z"
                                  fill="#212121"
                                />
                                <path
                                  d="M46 35C46 41.0751 41.0751 46 35 46C28.9249 46 24 41.0751 24 35C24 28.9249 28.9249 24 35 24C41.0751 24 46 28.9249 46 35ZM36 29C36 28.4477 35.5523 28 35 28C34.4477 28 34 28.4477 34 29V34H29C28.4477 34 28 34.4477 28 35C28 35.5523 28.4477 36 29 36H34V41C34 41.5523 34.4477 42 35 42C35.5523 42 36 41.5523 36 41V36H41C41.5523 36 42 35.5523 42 35C42 34.4477 41.5523 34 41 34H36V29Z"
                                  fill="#212121"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </label>

                      <div className="d-none">
                        <input
                          type="file"
                          name="logo"
                          id="logo"
                          className="w-full cursor-pointer"
                          onChange={fileChosen}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="require">Image Prompt</Form.Label>
                      <Form.Control
                        as="textarea"
                        required
                        rows={3}
                        onChange={(e) => setImageprompt(e.target.value)}
                        value={imageprompt}
                        placeholder="Briefly explain the image you want to generate for you..."
                      />
                    </Form.Group>
                    <Row>
                      <Col md={5}>
                        <Form.Group className="mb-3">
                          <Form.Label>Number of Images</Form.Label>
                          <Form.Select
                            onChange={(e) => setVariation(e.target.value)}
                            value={variation}
                            aria-label="Default select example"
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={7}>
                        <Form.Group className="mb-3">
                          <Form.Label>Image Style</Form.Label>
                          <Form.Select
                            onChange={(e) => setStyle(e.target.value)}
                            value={style}
                            aria-label="Default select example"
                          >
                            <option value=""> None </option>
                            <option value="analog-film"> Analog-film </option>
                            <option value="anime"> Anime </option>
                            <option value="cinematic"> Cinematic </option>
                            <option value="comic-book"> Comic-book </option>
                            <option value="digital-art"> Digital-art </option>
                            <option value="enhance"> enhance </option>
                            <option value="fantasy-art"> Fantasy-art </option>
                            <option value="isometric"> Isometric </option>
                            <option value="line-ar"> Line-ar </option>
                            <option value="low-poly"> Low-poly </option>
                            <option value="modeling-compound">
                              {" "}
                              Modeling-compound{" "}
                            </option>
                            <option value="neon-punk"> Neon-punk </option>
                            <option value="origami"> Origami </option>
                            <option value="photographic"> Photographic </option>
                            <option value="pixel-art"> Pixel-art </option>
                            <option value="3d-model"> 3d-model </option>
                            <option value="tile-texture"> Tile-texture </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button type="submit" variant="none" className="theme-btn">
                      <svg
                        width="14"
                        height="18"
                        className="d-inline me-2"
                        viewBox="0 0 14 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.0886 6.37423L9.16995 4.24123C9.09603 4.07228 8.85668 4.07228 8.78277 4.24123L7.83594 6.41295C7.60715 6.9374 7.1883 7.35626 6.66384 7.58504L4.49212 8.53187C4.32317 8.60579 4.32317 8.84514 4.49212 8.91905L6.66384 9.86588C7.1883 10.0947 7.60715 10.5135 7.83594 11.038L8.78277 13.2097C8.85668 13.3786 9.09603 13.3786 9.16995 13.2097L10.1168 11.038C10.3456 10.5135 10.7644 10.0947 11.2889 9.86588L13.4641 8.91553C13.6331 8.84162 13.6331 8.60227 13.4641 8.52835L11.2502 7.54985C10.7257 7.31754 10.3104 6.89516 10.0816 6.37071L10.0886 6.37423Z"
                          fill="white"
                        />
                        <path
                          d="M5.95283 14.4417L4.50619 13.8011C4.16477 13.6497 3.89023 13.3752 3.74239 13.0302L3.14403 11.6364C3.09475 11.5273 2.93988 11.5238 2.8906 11.6364L2.27112 13.0549C2.11977 13.3998 1.84874 13.6708 1.5038 13.8222L0.0817976 14.4417C-0.0273166 14.4909 -0.0273166 14.6458 0.0817976 14.6951L1.5038 15.3146C1.84874 15.4659 2.11977 15.737 2.27112 16.0819L2.8906 17.5039C2.93988 17.613 3.09475 17.613 3.14403 17.5039L3.76351 16.0819C3.91487 15.737 4.18589 15.4659 4.53083 15.3146L5.95283 14.6951C6.06195 14.6458 6.06195 14.4909 5.95283 14.4417Z"
                          fill="white"
                        />
                        <path
                          d="M2.94367 -9.53674e-07C1.31854 -9.53674e-07 0.00111675 1.31743 0.00111675 2.94256C0.00111675 4.56769 1.31854 5.88511 2.94367 5.88511C4.5688 5.88511 5.88623 4.56769 5.88623 2.94256C5.88623 1.31743 4.5688 -9.53674e-07 2.94367 -9.53674e-07Z"
                          fill="white"
                        />
                      </svg>
                      Generate{" "}
                      {loader ? (
                        <img className="gen_loader" src={generateimg} />
                      ) : (
                        ""
                      )}{" "}
                    </Button>
                    {/* <Button type="submit" variant='none' className='theme-btn'>Generate {loader ?
                                            <img className='gen_loader' src={generateimg} />
                                            : ""
                                        }</Button> */}
                  </Form>
                </Tab>
                <Tab
                  eventKey="upscale"
                  title={<TabTitleWithImage title="Upscale" image={imgscale} />}
                >
                  {/* <div className="creditBalance">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_5419_1957)">
                        <path
                          d="M12.419 6.22813C12.327 6.08513 12.169 6.00014 12 6.00014H8.50006V0.500211C8.50006 0.264215 8.33506 0.0602174 8.10407 0.0112181C7.86907 -0.0387812 7.63907 0.0822171 7.54307 0.297214L3.54313 9.29709C3.47413 9.45109 3.48913 9.63109 3.58113 9.77208C3.67313 9.91408 3.83112 10.0001 4.00012 10.0001H7.50007V15.5C7.50007 15.736 7.66507 15.94 7.89607 15.989C7.93107 15.996 7.96607 16 8.00007 16C8.19407 16 8.37506 15.887 8.45706 15.703L12.457 6.70313C12.525 6.54813 12.512 6.37013 12.419 6.22813Z"
                          fill="url(#paint0_linear_5419_1957)"
                        ></path>
                      </g>
                      <defs>
                        <linearGradient
                          id="paint0_linear_5419_1957"
                          x1="9.35152"
                          y1="14.0307"
                          x2="2.06253"
                          y2="4.77849"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stop-color="#E60C84"></stop>
                          <stop offset="1" stop-color="#FFCF4B"></stop>
                        </linearGradient>
                        <clipPath id="clip0_5419_1957">
                          <rect width="16" height="16" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                    Credits Balance: <b>{creditCount}</b> images left
                  </div> */}

                  <Form onSubmit={Upscale}>
                    <Form.Group className="mb-3">
                      <Form.Label className="require">
                        Image : Increase the size of your images by 2x
                      </Form.Label>
                      <label htmlFor="logo" className="d-block">
                        <div className="p-4 w-full h-48 rounded bg-gray-100 border border-gray-200 d-flex items-center justify-center overflow-hidden">
                          {imageUrl ? (
                            <img
                              src={imageUrlPre}
                              alt="Preview"
                              className=" object-cover"
                              width={200}
                            />
                          ) : (
                            <div className="text-gray-300 d-flex flex-col items-center">
                              <svg
                                style={{ opacity: "0.3" }}
                                width="80px"
                                height="80px"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.5152 7C18.9718 7 17.5496 7.83679 16.8 9.18602L15.5145 11.5H11.75C8.57436 11.5 6 14.0744 6 17.25V34.25C6 37.4256 8.57436 40 11.75 40H22.9963C22.6642 39.2037 22.4091 38.3672 22.2402 37.5H11.75C9.95507 37.5 8.5 36.0449 8.5 34.25V17.25C8.5 15.4551 9.95507 14 11.75 14H16.9855L18.9854 10.4001C19.2941 9.84456 19.8797 9.5 20.5152 9.5H27.4848C28.1203 9.5 28.7059 9.84456 29.0146 10.4001L31.0145 14H36.25C38.0449 14 39.5 15.4551 39.5 17.25V22.7999C40.3823 23.1255 41.2196 23.544 42 24.0436V17.25C42 14.0744 39.4256 11.5 36.25 11.5H32.4855L31.2 9.18602C30.4504 7.83679 29.0282 7 27.4848 7H20.5152Z"
                                  fill="#212121"
                                />
                                <path
                                  d="M24 17C27.5278 17 30.5222 19.2834 31.586 22.4529C30.7711 22.6741 29.988 22.9726 29.2451 23.34C28.5411 21.1138 26.459 19.5 24 19.5C20.9624 19.5 18.5 21.9624 18.5 25C18.5 27.6415 20.3622 29.8481 22.8454 30.3786C22.5516 31.151 22.3292 31.9587 22.1865 32.7936C18.6418 31.972 16 28.7945 16 25C16 20.5817 19.5817 17 24 17Z"
                                  fill="#212121"
                                />
                                <path
                                  d="M46 35C46 41.0751 41.0751 46 35 46C28.9249 46 24 41.0751 24 35C24 28.9249 28.9249 24 35 24C41.0751 24 46 28.9249 46 35ZM36 29C36 28.4477 35.5523 28 35 28C34.4477 28 34 28.4477 34 29V34H29C28.4477 34 28 34.4477 28 35C28 35.5523 28.4477 36 29 36H34V41C34 41.5523 34.4477 42 35 42C35.5523 42 36 41.5523 36 41V36H41C41.5523 36 42 35.5523 42 35C42 34.4477 41.5523 34 41 34H36V29Z"
                                  fill="#212121"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </label>

                      <div className="d-none">
                        <input
                          type="file"
                          name="logo"
                          id="logo"
                          className="w-full cursor-pointer"
                          onChange={fileChosen}
                        />
                      </div>
                    </Form.Group>
                    {/* <Form.Group className="mb-3">
                      <Form.Label className="require">Image Prompt</Form.Label>
                      <Form.Control
                        as="textarea"
                        required
                        rows={3}
                        onChange={(e) => setImageprompt(e.target.value)}
                        value={imageprompt}
                        placeholder="Briefly explain the image you want to generate for you..."
                      />
                    </Form.Group>
                    <Row>
                      <Col md={5}>
                        <Form.Group className="mb-3">
                          <Form.Label>Number of Images</Form.Label>
                          <Form.Select
                            onChange={(e) => setVariation(e.target.value)}
                            value={variation}
                            aria-label="Default select example"
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={7}>
                        <Form.Group className="mb-3">
                          <Form.Label>Image Style</Form.Label>
                          <Form.Select
                            onChange={(e) => setStyle(e.target.value)}
                            value={style}
                            aria-label="Default select example"
                          >
                            <option value=""> None </option>
                            <option value="analog-film"> Analog-film </option>
                            <option value="anime"> Anime </option>
                            <option value="cinematic"> Cinematic </option>
                            <option value="comic-book"> Comic-book </option>
                            <option value="digital-art"> Digital-art </option>
                            <option value="enhance"> enhance </option>
                            <option value="fantasy-art"> Fantasy-art </option>
                            <option value="isometric"> Isometric </option>
                            <option value="line-ar"> Line-ar </option>
                            <option value="low-poly"> Low-poly </option>
                            <option value="modeling-compound">
                              {" "}
                              Modeling-compound{" "}
                            </option>
                            <option value="neon-punk"> Neon-punk </option>
                            <option value="origami"> Origami </option>
                            <option value="photographic"> Photographic </option>
                            <option value="pixel-art"> Pixel-art </option>
                            <option value="3d-model"> 3d-model </option>
                            <option value="tile-texture"> Tile-texture </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row> */}
                    <Button type="submit" variant="none" className="theme-btn">
                      <svg
                        width="14"
                        height="18"
                        className="d-inline me-2"
                        viewBox="0 0 14 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.0886 6.37423L9.16995 4.24123C9.09603 4.07228 8.85668 4.07228 8.78277 4.24123L7.83594 6.41295C7.60715 6.9374 7.1883 7.35626 6.66384 7.58504L4.49212 8.53187C4.32317 8.60579 4.32317 8.84514 4.49212 8.91905L6.66384 9.86588C7.1883 10.0947 7.60715 10.5135 7.83594 11.038L8.78277 13.2097C8.85668 13.3786 9.09603 13.3786 9.16995 13.2097L10.1168 11.038C10.3456 10.5135 10.7644 10.0947 11.2889 9.86588L13.4641 8.91553C13.6331 8.84162 13.6331 8.60227 13.4641 8.52835L11.2502 7.54985C10.7257 7.31754 10.3104 6.89516 10.0816 6.37071L10.0886 6.37423Z"
                          fill="white"
                        />
                        <path
                          d="M5.95283 14.4417L4.50619 13.8011C4.16477 13.6497 3.89023 13.3752 3.74239 13.0302L3.14403 11.6364C3.09475 11.5273 2.93988 11.5238 2.8906 11.6364L2.27112 13.0549C2.11977 13.3998 1.84874 13.6708 1.5038 13.8222L0.0817976 14.4417C-0.0273166 14.4909 -0.0273166 14.6458 0.0817976 14.6951L1.5038 15.3146C1.84874 15.4659 2.11977 15.737 2.27112 16.0819L2.8906 17.5039C2.93988 17.613 3.09475 17.613 3.14403 17.5039L3.76351 16.0819C3.91487 15.737 4.18589 15.4659 4.53083 15.3146L5.95283 14.6951C6.06195 14.6458 6.06195 14.4909 5.95283 14.4417Z"
                          fill="white"
                        />
                        <path
                          d="M2.94367 -9.53674e-07C1.31854 -9.53674e-07 0.00111675 1.31743 0.00111675 2.94256C0.00111675 4.56769 1.31854 5.88511 2.94367 5.88511C4.5688 5.88511 5.88623 4.56769 5.88623 2.94256C5.88623 1.31743 4.5688 -9.53674e-07 2.94367 -9.53674e-07Z"
                          fill="white"
                        />
                      </svg>
                      Generate{" "}
                      {loader ? (
                        <img className="gen_loader" src={generateimg} />
                      ) : (
                        ""
                      )}{" "}
                    </Button>
                    {/* <Button type="submit" variant='none' className='theme-btn'>Generate {loader ?
                                            <img className='gen_loader' src={generateimg} />
                                            : ""
                                        }</Button> */}
                  </Form>
                </Tab>
              </Tabs>
            </div>
          </Col>
          <Col lg={8}>
            <div className="genaretedImages">
              <h2>
                Generated Images
                {/* <Link to="/user/image-gallery">
                  <svg
                    className="neg-transition-scale"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M16.875 9C16.875 11.0886 16.0453 13.0916 14.5685 14.5685C13.0916 16.0453 11.0886 16.875 9 16.875C6.91142 16.875 4.90838 16.0453 3.43153 14.5685C1.95469 13.0916 1.125 11.0886 1.125 9C1.125 8.85082 1.18426 8.70775 1.28975 8.60226C1.39524 8.49677 1.53832 8.4375 1.6875 8.4375C1.83668 8.4375 1.97976 8.49677 2.08525 8.60226C2.19074 8.70775 2.25 8.85082 2.25 9C2.24775 10.5064 2.74871 11.9704 3.67338 13.1596C4.59805 14.3489 5.89344 15.1952 7.35394 15.5642C8.81444 15.9333 10.3564 15.8039 11.735 15.1967C13.1136 14.5895 14.2499 13.5393 14.9635 12.2126C15.6772 10.886 15.9273 9.35898 15.6741 7.87399C15.4209 6.38901 14.679 5.03113 13.5661 4.01589C12.4532 3.00065 11.0331 2.38621 9.53116 2.2701C8.02923 2.15399 6.53155 2.54287 5.27584 3.375H5.625C5.77418 3.375 5.91726 3.43427 6.02275 3.53976C6.12824 3.64525 6.1875 3.78832 6.1875 3.9375C6.1875 4.08669 6.12824 4.22976 6.02275 4.33525C5.91726 4.44074 5.77418 4.5 5.625 4.5H3.9375C3.86362 4.50005 3.79046 4.48553 3.72219 4.45727C3.65393 4.42902 3.5919 4.38759 3.53966 4.33535C3.48742 4.2831 3.44599 4.22108 3.41773 4.15281C3.38948 4.08455 3.37496 4.01138 3.375 3.9375V2.25C3.375 2.10082 3.43426 1.95775 3.53975 1.85226C3.64524 1.74677 3.78832 1.6875 3.9375 1.6875C4.08668 1.6875 4.22976 1.74677 4.33525 1.85226C4.44074 1.95775 4.5 2.10082 4.5 2.25V2.53908C5.68056 1.71625 7.06407 1.2327 8.50017 1.141C9.93627 1.0493 11.37 1.35295 12.6457 2.01895C13.9213 2.68495 14.99 3.68783 15.7356 4.91861C16.4813 6.14938 16.8753 7.56098 16.875 9ZM14.0625 9C14.0625 10.0013 13.7656 10.9801 13.2093 11.8126C12.653 12.6451 11.8624 13.294 10.9373 13.6771C10.0123 14.0603 8.99438 14.1606 8.01236 13.9652C7.03033 13.7699 6.12827 13.2877 5.42027 12.5797C4.71227 11.8717 4.23011 10.9697 4.03477 9.98765C3.83944 9.00562 3.93969 7.98772 4.32286 7.06267C4.70603 6.13762 5.3549 5.34696 6.18743 4.79069C7.01995 4.23441 7.99873 3.9375 9 3.9375C10.3422 3.93897 11.629 4.47281 12.5781 5.42189C13.5272 6.37098 14.061 7.6578 14.0625 9ZM10.9995 9.657L9.5625 8.69898V6.1875C9.5625 6.03832 9.50324 5.89525 9.39775 5.78976C9.29226 5.68427 9.14918 5.625 9 5.625C8.85082 5.625 8.70774 5.68427 8.60225 5.78976C8.49676 5.89525 8.4375 6.03832 8.4375 6.1875V9C8.43752 9.0926 8.46039 9.18376 8.50409 9.2654C8.54778 9.34704 8.61095 9.41663 8.68799 9.468L10.3755 10.593C10.4996 10.674 10.6507 10.7028 10.7959 10.673C10.9411 10.6432 11.0687 10.5573 11.151 10.434C11.2332 10.3107 11.2634 10.1598 11.235 10.0143C11.2067 9.86885 11.122 9.74043 10.9995 9.657Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Image History
                </Link> */}
              </h2>
              {/* <hr /> */}
              {generateddata?.images ? (
                " "
              ) : (
                <p className="text-center desc">
                  Select options related to your need and write down briefly
                  about the image that you want to generate. Your generated
                  image will appear here.
                </p>
              )}

              <div className="">
                <Row className="mt-3">
                  {generateddata?.images
                    ? generateddata?.images?.map((val, index) => (
                      <Col md={6} className="mb-4">
                        <div className="genrated-images">
                          <div
                            className="overlay"
                            onClick={() => setShow(index + 1)}
                          >
                            <img src={val} alt="midjourney" />
                          </div>
                          <div className="img-icons">
                            <OverlayTrigger
                              placement='top'
                              overlay={
                                <Tooltip>
                                  View
                                </Tooltip>
                              }
                            >
                              <img
                                onClick={() => setShow(index + 1)}
                                style={{ cursor: "pointer" }}
                                src={view_eye}
                                alt=""
                              />
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement='top'
                              overlay={
                                <Tooltip>
                                  Download
                                </Tooltip>
                              }
                            >
                              <Link to={generateddata?.images[index]} download>
                                <img
                                  className="w-[18px] h-[18px]"
                                  src={download}
                                  alt=""
                                />
                              </Link>
                            </OverlayTrigger>
                          </div>
                        </div>
                      </Col>
                    ))
                    : ""}
                  {loader ? (
                    <div className="mt-5">
                      <Loader />
                    </div>
                  ) : (
                    ""
                  )}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </section>

      <Modal
        show={show != "" ? true : false}
        onHide={handleClose}
        size="lg"
        className="imgDetailBox"
        centered
      >
        {generateddata?.images?.length ? (
          <Modal.Body>
            <div onClick={handleClose} className="closeBtnBox">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.00749 3.00773C3.41754 2.59768 4.08236 2.59768 4.49241 3.00773L8.99995 7.51527L13.5075 3.00773C13.9175 2.59768 14.5824 2.59768 14.9924 3.00773C15.4025 3.41778 15.4025 4.08261 14.9924 4.49266L10.4849 9.0002L14.9924 13.5077C15.4025 13.9178 15.4025 14.5826 14.9924 14.9927C14.5824 15.4027 13.9175 15.4027 13.5075 14.9927L8.99995 10.4851L4.49241 14.9927C4.08236 15.4027 3.41754 15.4027 3.00749 14.9927C2.59744 14.5826 2.59744 13.9178 3.00749 13.5077L7.51503 9.0002L3.00749 4.49266C2.59744 4.08261 2.59744 3.41778 3.00749 3.00773Z"
                  fill="#898989"
                ></path>
              </svg>
            </div>

            <Row>
              <Col md={6} className="p-0">
                <div className="img-box">
                  <img
                    src={generateddata?.images[show - 1]}
                    alt="midjourneyfree"
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="content-box ps-3">
                  <h3 className="contentBoxTitle mt-2">
                    {generateddata?.prompt}
                  </h3>
                  <p
                    className="contentBoxCopy"
                    onClick={() => {
                      navigator.clipboard.writeText(generateddata?.prompt);
                      alert("copied!");
                    }}
                  >
                    Prompt{" "}
                    <svg
                      className="text-color-29 dark:text-color-F3"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_8188_5495)">
                        <path
                          d="M12 0.75H3C2.175 0.75 1.5 1.425 1.5 2.25V12.75H3V2.25H12V0.75ZM14.25 3.75H6C5.175 3.75 4.5 4.425 4.5 5.25V15.75C4.5 16.575 5.175 17.25 6 17.25H14.25C15.075 17.25 15.75 16.575 15.75 15.75V5.25C15.75 4.425 15.075 3.75 14.25 3.75ZM14.25 15.75H6V5.25H14.25V15.75Z"
                          fill="currentColor"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_8188_5495">
                          <rect width="18" height="18" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>{" "}
                  </p>
                  <p className="contentBoxDesc">{generateddata?.prompt}</p>
                  <ul className="contentBoxContent">
                    {generateddata?.style ? (
                      <li>
                        {" "}
                        Style <br /> <b>{generateddata?.style}</b>
                      </li>
                    ) : (
                      ""
                    )}
                    {generateddata?.effect ? (
                      <li>
                        {" "}
                        Lighting Effects <br /> <b>{generateddata?.effect}</b>
                      </li>
                    ) : (
                      ""
                    )}
                    {generateddata?.resolution ? (
                      <li>
                        {" "}
                        Resolution <br /> <b>{generateddata?.resolution}</b>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                  <ul className="btns-group mt-4">
                    <Link
                      className="theme-btn d-inline-block me-3 border"
                      to={generateddata?.images[show - 1]}
                      download
                    >
                      <svg
                        className="d-inline"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9 2.25C9.41421 2.25 9.75 2.58579 9.75 3V10.1893L12.2197 7.71967C12.5126 7.42678 12.9874 7.42678 13.2803 7.71967C13.5732 8.01256 13.5732 8.48744 13.2803 8.78033L9.53033 12.5303C9.23744 12.8232 8.76256 12.8232 8.46967 12.5303L4.71967 8.78033C4.42678 8.48744 4.42678 8.01256 4.71967 7.71967C5.01256 7.42678 5.48744 7.42678 5.78033 7.71967L8.25 10.1893V3C8.25 2.58579 8.58579 2.25 9 2.25ZM3 12C3.41421 12 3.75 12.3358 3.75 12.75V14.25C3.75 14.4489 3.82902 14.6397 3.96967 14.7803C4.11032 14.921 4.30109 15 4.5 15H13.5C13.6989 15 13.8897 14.921 14.0303 14.7803C14.171 14.6397 14.25 14.4489 14.25 14.25V12.75C14.25 12.3358 14.5858 12 15 12C15.4142 12 15.75 12.3358 15.75 12.75V14.25C15.75 14.8467 15.5129 15.419 15.091 15.841C14.669 16.2629 14.0967 16.5 13.5 16.5H4.5C3.90326 16.5 3.33097 16.2629 2.90901 15.841C2.48705 15.419 2.25 14.8467 2.25 14.25V12.75C2.25 12.3358 2.58579 12 3 12Z"
                          fill="#137a83"
                        ></path>
                      </svg>{" "}
                      Download
                    </Link>

                    {/* <div className='socialShareIcons d-inline position-relative' ref={wrapperRef}>
                      <button className='socialShareIconBtn' onClick={() => setShowSocialshare(!showSocialshare)}>
                        <svg fill="#000000" height="18px" width="18px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 481.6 481.6">
                          <g>
                            <path d="M381.6,309.4c-27.7,0-52.4,13.2-68.2,33.6l-132.3-73.9c3.1-8.9,4.8-18.5,4.8-28.4c0-10-1.7-19.5-4.9-28.5l132.2-73.8
		c15.7,20.5,40.5,33.8,68.3,33.8c47.4,0,86.1-38.6,86.1-86.1S429,0,381.5,0s-86.1,38.6-86.1,86.1c0,10,1.7,19.6,4.9,28.5
		l-132.1,73.8c-15.7-20.6-40.5-33.8-68.3-33.8c-47.4,0-86.1,38.6-86.1,86.1s38.7,86.1,86.2,86.1c27.8,0,52.6-13.3,68.4-33.9
		l132.2,73.9c-3.2,9-5,18.7-5,28.7c0,47.4,38.6,86.1,86.1,86.1s86.1-38.6,86.1-86.1S429.1,309.4,381.6,309.4z M381.6,27.1
		c32.6,0,59.1,26.5,59.1,59.1s-26.5,59.1-59.1,59.1s-59.1-26.5-59.1-59.1S349.1,27.1,381.6,27.1z M100,299.8
		c-32.6,0-59.1-26.5-59.1-59.1s26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1S132.5,299.8,100,299.8z M381.6,454.5
		c-32.6,0-59.1-26.5-59.1-59.1c0-32.6,26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1C440.7,428,414.2,454.5,381.6,454.5z"/>
                          </g>
                        </svg> {isMobileOnly ? '' : 'Share'}
                      </button>
                      {showSocialshare == true ?
                        <div className='socialShareIconBox'>
                          <FacebookShareButton url={show?.original_name?.replaceAll("/thumb/", "/images/")} >
                            <FacebookIcon size={25} round={true} />
                          </FacebookShareButton>
                          <WhatsappShareButton url={show?.original_name?.replaceAll("/thumb/", "/images/")} >
                            <WhatsappIcon size={25} round={true} />
                          </WhatsappShareButton>
                          <InstapaperShareButton url={show?.original_name?.replaceAll("/thumb/", "/images/")} >
                            <InstapaperIcon size={25} round={true} />
                          </InstapaperShareButton>
                          <LinkedinShareButton url={show?.original_name?.replaceAll("/thumb/", "/images/")} >
                            <LinkedinIcon size={25} round={true} />
                          </LinkedinShareButton>
                          <TwitterShareButton url={show?.original_name?.replaceAll("/thumb/", "/images/")} >
                            <TwitterIcon size={25} round={true} />
                          </TwitterShareButton>
                        </div> : ''}
                    </div> */}

                    {/* <button>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                                            <path d="M13.1251 1.875C12.7806 1.87487 12.4407 1.95381 12.1316 2.10576C11.8225 2.25771 11.5524 2.4786 11.3421 2.75141C11.1318 3.02422 10.987 3.34167 10.9188 3.67929C10.8505 4.01691 10.8607 4.36569 10.9486 4.69875C10.8942 4.71023 10.8419 4.72969 10.7933 4.7565L8.72555 5.88375L6.09605 7.3875C6.06973 7.40247 6.04465 7.41952 6.02105 7.4385C5.65524 7.22216 5.23563 7.11386 4.81081 7.12612C4.38599 7.13838 3.97333 7.27071 3.62061 7.50779C3.26788 7.74487 2.98951 8.077 2.81773 8.46573C2.64594 8.85446 2.58777 9.2839 2.64994 9.70432C2.71211 10.1247 2.89208 10.519 3.16902 10.8413C3.44596 11.1637 3.80854 11.4011 4.21479 11.5259C4.62103 11.6508 5.05433 11.658 5.46452 11.5468C5.87471 11.4356 6.24501 11.2105 6.53255 10.8975L8.72705 12.1178L10.9426 13.326C10.8084 13.857 10.8726 14.4186 11.1229 14.9057C11.3733 15.3928 11.7927 15.7718 12.3026 15.9717C12.8124 16.1717 13.3777 16.1788 13.8924 15.9918C14.4071 15.8048 14.836 15.4364 15.0986 14.9558C15.3611 14.4752 15.4394 13.9154 15.3187 13.3812C15.198 12.847 14.8866 12.3752 14.443 12.0542C13.9993 11.7331 13.4537 11.5849 12.9086 11.6374C12.3635 11.6898 11.8562 11.9393 11.4818 12.339L9.27155 11.133L7.06205 9.906C7.19649 9.34903 7.1139 8.76178 6.83105 8.2635L9.27455 6.867L11.3318 5.74425C11.3807 5.71775 11.4255 5.68413 11.4646 5.6445C11.7172 5.92044 12.0347 6.12902 12.3883 6.25135C12.7419 6.37368 13.1204 6.40589 13.4896 6.34509C13.8588 6.28428 14.207 6.13237 14.5027 5.9031C14.7984 5.67383 15.0322 5.37445 15.183 5.03204C15.3339 4.68963 15.3969 4.31502 15.3665 3.9421C15.3361 3.56919 15.2132 3.20974 15.0088 2.8963C14.8045 2.58286 14.5253 2.32532 14.1963 2.147C13.8674 1.96867 13.4992 1.87518 13.1251 1.875Z" fill="currentColor"></path>

                                        </svg> Share</button> */}

                    {/* <button><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2.25C6 1.83579 6.33579 1.5 6.75 1.5H11.25C11.6642 1.5 12 1.83579 12 2.25C12 2.66421 11.6642 3 11.25 3H6.75C6.33579 3 6 2.66421 6 2.25ZM3.74418 3.75H2.25C1.83579 3.75 1.5 4.08579 1.5 4.5C1.5 4.91421 1.83579 5.25 2.25 5.25H3.04834L3.52961 12.4691C3.56737 13.0357 3.59862 13.5045 3.65465 13.8862C3.71299 14.2835 3.80554 14.6466 3.99832 14.985C4.29842 15.5118 4.75109 15.9353 5.29667 16.1997C5.64714 16.3695 6.0156 16.4377 6.41594 16.4695C6.80046 16.5 7.27037 16.5 7.8382 16.5H10.1618C10.7296 16.5 11.1995 16.5 11.5841 16.4695C11.9844 16.4377 12.3529 16.3695 12.7033 16.1997C13.2489 15.9353 13.7016 15.5118 14.0017 14.985C14.1945 14.6466 14.287 14.2835 14.3453 13.8862C14.4014 13.5045 14.4326 13.0356 14.4704 12.469L14.9517 5.25H15.75C16.1642 5.25 16.5 4.91421 16.5 4.5C16.5 4.08579 16.1642 3.75 15.75 3.75H14.2558C14.2514 3.74996 14.2471 3.74996 14.2427 3.75H3.75731C3.75294 3.74996 3.74857 3.74996 3.74418 3.75ZM13.4483 5.25H4.55166L5.0243 12.3396C5.06455 12.9433 5.09238 13.3525 5.13874 13.6683C5.18377 13.9749 5.23878 14.1321 5.30166 14.2425C5.45171 14.5059 5.67804 14.7176 5.95083 14.8498C6.06513 14.9052 6.22564 14.9497 6.53464 14.9742C6.85277 14.9995 7.26289 15 7.86799 15H10.132C10.7371 15 11.1472 14.9995 11.4654 14.9742C11.7744 14.9497 11.9349 14.9052 12.0492 14.8498C12.322 14.7176 12.5483 14.5059 12.6983 14.2425C12.7612 14.1321 12.8162 13.9749 12.8613 13.6683C12.9076 13.3525 12.9354 12.9433 12.9757 12.3396L13.4483 5.25ZM7.5 7.125C7.91421 7.125 8.25 7.46079 8.25 7.875V11.625C8.25 12.0392 7.91421 12.375 7.5 12.375C7.08579 12.375 6.75 12.0392 6.75 11.625V7.875C6.75 7.46079 7.08579 7.125 7.5 7.125ZM10.5 7.125C10.9142 7.125 11.25 7.46079 11.25 7.875V11.625C11.25 12.0392 10.9142 12.375 10.5 12.375C10.0858 12.375 9.75 12.0392 9.75 11.625V7.875C9.75 7.46079 10.0858 7.125 10.5 7.125Z" fill="currentColor"></path>

                                    </svg>  Delete</button> */}
                  </ul>
                </div>
              </Col>
            </Row>
          </Modal.Body>
        ) : (
          ""
        )}
      </Modal>
    </>
  );
};

export default ImageGenerator;
