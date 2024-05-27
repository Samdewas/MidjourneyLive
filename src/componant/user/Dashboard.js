import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { base_url } from '../../Store/constant'
import { useSelector } from 'react-redux'
import swal from 'sweetalert'
import PrivateRoute from '../comman/Privaterouter';
import Modal from 'react-bootstrap/Modal';
import Skeleton from 'react-loading-skeleton'
import { isDesktop, isMobile, isMobileOnly } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import { FacebookIcon, FacebookShareButton, FacebookShareCount, InstapaperIcon, InstapaperShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'

const Dashboard = () => {
    const [showSocialshare, setShowSocialshare] = useState(false)
    const navigate = useNavigate();
    const userData = useSelector(state => state.persistedReducer.home.userData);
    const creditCount = useSelector(state => state.persistedReducer.home.credit_count);
    const [userImageData, setUserImageData] = useState([]);
    const [loader, setLoader] = useState(true);

    const handleUserImages = (e) => {
        axios.get(base_url + '/user/getUserImages', { headers: { "Authorization": `Bearer ${userData?.token}` } })
            .then(response => {
                if (response.status == 200) {
                    setLoader(false)
                    setUserImageData(response.data.data.data);
                } else {
                    setLoader(false)
                    swal(response.data.msg, "", "error")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        handleUserImages();
    }, [])
    const [show, setShow] = useState("");

    const handleClose = () => setShow("");
    const handleShow = (val) => setShow(val);
    const deleteUserImages = (id) => {
        axios.post(base_url + '/user/deleteUserImage', { image_id: id }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${userData?.token}`
            }
        })
            .then(response => {
                if (response.status == 200) {
                    handleClose();
                    handleUserImages();
                    swal("Delete Successfully !", "", "success")
                } else {
                    swal(response.data.msg, "", "error")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


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
                <title> Dashboard | Mid Journey</title>
            </Helmet>
            <section className='main-container-dashboard'>
                <div className='dashboard-page'>
                    <div className='dashboard-page-inner'>
                        <div className='top-title-box'>
                            <div className='txt-box-top'>
                                <h3 className='subtitle'>Welcome to Mid Journey AI</h3>
                                {/* <h3 className='title'>Mid Journey Supercharge Your Creativity Now !</h3> */}
                            </div>
                            {/* {isDesktop ? <button className='theme-btn' onClick={() => navigate("/user/image-generator")}> Generate New</button> : ' '} */}

                        </div>

                        <Row>
                            <Col lg={3} md={4}>
                                <div className='total-imgs creditcount'>
                                    <div className='icon-box'>


                                        <svg width="47" height="43" viewBox="0 0 47 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M34.3765 5.47452C31.1713 5.47452 28.5731 8.08541 28.5731 11.3063C28.5731 14.5271 31.1713 17.1411 34.3765 17.1411C37.5847 17.1411 40.1828 14.5271 40.1828 11.3063C40.1828 8.08541 37.5847 5.47452 34.3765 5.47452ZM15.2519 14.6553V14.6614H15.2306C14.8664 14.6614 14.5386 14.8261 14.317 15.0854L4.80797 24.641C4.59247 24.8606 4.45892 25.1626 4.45285 25.4951L4.44678 37.2284C4.44678 37.5578 4.58033 37.875 4.811 38.1098C5.04471 38.3416 5.36037 38.4728 5.68817 38.4728H41.3126C41.9985 38.4728 42.554 37.9146 42.554 37.2283V31.7535C42.554 31.421 42.4235 31.1191 42.2141 30.8964L31.548 20.1695C31.3265 19.9499 31.0199 19.8127 30.683 19.8127V19.8157H30.6769L30.6739 19.8188H30.6648C30.3006 19.8188 29.9697 19.9835 29.7481 20.2397L25.5322 24.4793L16.1172 15.0119C15.8956 14.7923 15.5888 14.6553 15.2519 14.6553ZM43.2849 2.49494C43.9648 2.49799 44.5141 3.05309 44.5171 3.73627V39.2602C44.5141 39.9434 43.9647 40.4985 43.2849 40.5016H3.71482C3.03494 40.4985 2.48559 39.9434 2.48256 39.2602V3.73627C2.4856 3.05306 3.03497 2.49798 3.71482 2.49494H43.2849ZM43.2788 0H3.72118C1.67244 0 0.0121991 1.65314 0 3.71191V39.285C0.0121408 41.3438 1.67236 42.997 3.72118 43H43.2788C45.3276 42.997 46.9878 41.3438 47 39.285V3.71191C46.9879 1.65314 45.3276 0 43.2788 0Z" fill="#137A83" />
                                        </svg>


                                    </div>
                                    <div>
                                        <Link to='/user/image-gallery' className='count'>{userImageData?.total}</Link>
                                        <div className='left'>
                                            {/* <span className='subtitle'>Number of</span><br /> */}
                                            <Link to='/user/image-gallery' className='title'>Images Generated  <span>From Text</span></Link>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            {/* <Col md={3}>
                                <div className='total-imgs'>
                                    <div className='icon-box'></div>
                                    <div>
                                        <Link to='/user/image-gallery' className='count'>{userImageData?.total}</Link>
                                        <div className='left'>
                                            <span className='subtitle'>Number of</span><br />
                                            <Link to='/user/image-gallery' className='title'>Images Generated <br /> From Image</Link>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className='total-imgs'>
                                    <div className='icon-box'></div>
                                    <div>
                                        <Link to='/user/image-gallery' className='count'>{userImageData?.total}</Link>
                                        <div className='left'>
                                            <span className='subtitle'>Number of</span><br />
                                            <Link to='/user/image-gallery' className='title'>Images Generated <br /> From Upscale</Link>
                                        </div>
                                    </div>
                                </div>
                            </Col> */}
                            <Col lg={3} md={4}>
                                {/* <div className='total-imgs creditcount'> */}
                                <div className='total-imgs creditcount'>
                                    <div className='icon-box'>

                                        <svg width="51" height="40" viewBox="0 0 51 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M27.5542 0.00291274C16.4239 0.00291274 4.44946 3.38575 4.44946 10.8249V17.1722C1.88663 18.915 0.520752 21.1009 0.520752 23.5313V23.6072V30.3435C0.520752 36.9796 12.4952 40 23.6255 40C34.7559 40 46.7303 36.9794 46.7303 30.3435V23.5946V23.531V23.3425C49.156 21.8763 50.659 19.9841 50.659 17.6342V10.822C50.659 3.38322 38.6846 0 27.5542 0V0.00291274ZM6.33689 15.4708C7.02719 16.2419 7.89126 16.937 8.88749 17.5564V21.4851C7.28907 20.4129 6.33689 19.1278 6.33689 17.6445V15.4708ZM6.98308 22.3689C11.0807 25.7273 19.5403 27.2939 27.5543 27.2939C30.7365 27.2939 33.9899 27.0442 37.0178 26.5351C34.034 27.7198 29.5057 28.672 23.6335 28.672C12.1334 28.672 6.20041 25.0689 6.20041 23.5341C6.20041 23.2844 6.42071 22.8634 6.97637 22.3689L6.98308 22.3689ZM10.7674 22.5255V18.565C11.5629 18.9346 12.4221 19.2724 13.318 19.5808V23.5046C12.3976 23.2109 11.5385 22.8902 10.7674 22.5329V22.5255ZM15.1979 24.0309V20.1511C16.0253 20.3714 16.8771 20.5722 17.7485 20.7411V24.5768C16.8648 24.4128 16.0131 24.2316 15.1979 24.0309ZM19.6333 24.8754V21.0666C20.4729 21.1988 21.3247 21.3041 22.1839 21.3873V25.1716C21.3199 25.0909 20.468 24.9954 19.6333 24.8779V24.8754ZM24.0638 25.3136V21.5415C24.9157 21.5978 25.7675 21.6296 26.6144 21.6492V25.4164C25.7626 25.4042 24.9107 25.3674 24.0638 25.316V25.3136ZM28.4944 25.4139V21.6468C29.3462 21.6345 30.1981 21.5978 31.045 21.5391V25.3111C30.198 25.3601 29.3413 25.3919 28.4944 25.4115V25.4139ZM32.9322 25.1692V21.3848C33.7914 21.2967 34.6432 21.1915 35.4828 21.0642V24.8729C34.6506 24.9929 33.7914 25.0859 32.9322 25.1667V25.1692ZM4.96349 34.194C3.36506 33.1219 2.41288 31.8368 2.41288 30.3534V28.1528C3.08846 28.9043 3.94276 29.6068 4.96349 30.2457V34.1989V34.194ZM9.394 36.2061C8.4736 35.9123 7.61448 35.5917 6.8434 35.2343V31.2492C7.63403 31.6189 8.47855 31.9566 9.394 32.27V36.2061ZM13.8245 37.2757C12.9408 37.1117 12.089 36.9306 11.2739 36.7299V32.8329C12.089 33.0532 12.9409 33.254 13.8245 33.4278V37.2757ZM18.2624 37.8779C17.3983 37.7971 16.5464 37.7017 15.7118 37.5842V33.7558C16.5587 33.888 17.4105 33.9932 18.2624 34.0813V37.8779ZM22.6929 38.1153C21.841 38.1031 20.9892 38.0664 20.1423 38.015V34.2306C20.9941 34.2869 21.846 34.3188 22.6929 34.3384V38.1177V38.1153ZM27.1234 38.0223C26.2764 38.0713 25.4247 38.1031 24.5728 38.1227V34.3433C25.4198 34.3311 26.2716 34.2944 27.1234 34.2356V38.0223ZM31.5588 37.5842C30.7266 37.7041 29.8674 37.8045 29.0082 37.8779V34.0862C29.8796 33.9981 30.7388 33.8929 31.5588 33.7656V37.5842ZM35.9893 36.7323C35.1693 36.9379 34.315 37.1215 33.4387 37.2782V33.4302C34.3224 33.254 35.1742 33.0533 35.9893 32.8354V36.7323ZM40.4198 35.2343C39.6439 35.5916 38.7896 35.9172 37.8692 36.2061V32.27C38.7847 31.9567 39.6365 31.6189 40.4198 31.2493V35.2343ZM32.3299 31.7315C30.9641 31.9812 29.5027 32.1696 27.9924 32.2945C25.0796 32.5319 22.1838 32.5319 19.2834 32.2945C17.8294 32.1745 16.3706 31.9812 14.941 31.7315C11.6757 31.1489 8.8435 30.2335 6.71889 29.0878L6.37375 28.8945C3.75948 27.3915 2.42543 25.6046 2.41321 23.5754V23.5387C2.41321 21.9843 3.20384 20.5695 4.7386 19.3162C4.94421 19.9306 5.25753 20.5009 5.67123 21.0394C4.59416 22.0283 4.32984 22.9193 4.32984 23.5387C4.32984 26.9289 12.087 30.5564 23.6428 30.5564C33.4046 30.5564 40.2612 27.9617 42.2728 25.2985C43.1638 25.017 44.0033 24.7037 44.7866 24.3585C44.4733 26.0622 43.1711 27.5847 40.902 28.8943C38.7577 30.1354 35.7959 31.1121 32.3346 31.7338L32.3299 31.7315ZM37.3626 24.574V20.7383C38.234 20.5621 39.0932 20.3687 39.9132 20.1484V24.0282C39.0932 24.2338 38.2389 24.4174 37.3626 24.574ZM41.7931 23.497V19.5732C42.6963 19.2721 43.5482 18.9343 44.3437 18.5573V22.5179C43.5678 22.8752 42.7135 23.2008 41.7931 23.4896V23.497ZM44.8553 30.3461C44.8553 31.8319 43.9031 33.1171 42.3047 34.1867V30.2335C43.3254 29.5947 44.1846 28.8921 44.8553 28.1407V30.3461ZM48.7791 17.6442C48.7791 19.13 47.8269 20.4151 46.2285 21.4848V17.5561C47.2321 16.9368 48.0889 16.2391 48.7791 15.4706V17.6442ZM27.5543 19.7737C17.2636 19.7737 6.32943 16.6406 6.32943 10.8316C6.32943 5.02269 17.2636 1.8895 27.5543 1.8895C37.8449 1.8895 48.7791 5.02269 48.7791 10.8316C48.7791 16.6406 37.8449 19.7737 27.5543 19.7737Z" fill="#137A83" />
                                            <path d="M27.5542 3.80219C16.0053 3.80219 8.24814 7.43718 8.24814 10.8274C8.24814 14.2177 16.0053 17.8527 27.5542 17.8527C39.1032 17.8527 46.8603 14.2177 46.8603 10.8274C46.8603 7.43718 39.1032 3.80219 27.5542 3.80219ZM27.5542 15.9778C16.0542 15.9778 10.1281 12.3673 10.1281 10.8325C10.1281 9.29773 16.0566 5.68724 27.5542 5.68724C39.0543 5.68724 44.9804 9.29773 44.9804 10.8325C44.9804 12.3673 39.0518 15.9778 27.5542 15.9778Z" fill="#137A83" />
                                            <path d="M31.096 10.0611C30.582 9.85552 29.6616 9.69886 28.2884 9.56668V8.73933C28.8024 8.83969 28.9958 8.989 29.0643 9.10894C29.0961 9.1579 29.1525 9.18482 29.2087 9.18482L31.4582 9.08446C31.5072 9.08446 31.5586 9.05264 31.5904 9.00858C31.6149 8.96452 31.6149 8.90822 31.5904 8.85927C31.4142 8.52147 31.0397 8.26445 30.4302 8.07597C29.8916 7.90707 29.1695 7.79936 28.2932 7.7553V7.61088C28.2932 7.52277 28.2246 7.45422 28.1365 7.45422H26.8465C26.7584 7.45422 26.6899 7.52277 26.6899 7.61088V7.7553C25.7304 7.79936 24.9421 7.9242 24.3473 8.13717C23.6717 8.38194 23.3266 8.70016 23.3266 9.10162C23.3266 9.50309 23.6326 9.80904 24.2347 10.0611C24.7683 10.2814 25.5957 10.4503 26.6923 10.5629V11.4711C26.4549 11.4221 26.2419 11.3511 26.0412 11.2654C25.8086 11.1651 25.6593 11.0451 25.5785 10.9203C25.5467 10.8713 25.4904 10.8444 25.4415 10.8444L23.1234 10.9252C23.0745 10.9252 23.023 10.957 22.9986 11.0011C22.9741 11.0451 22.9668 11.1014 22.9912 11.1504C23.1846 11.5763 23.6301 11.9092 24.3131 12.1344C24.9324 12.34 25.7352 12.4673 26.6997 12.5163V12.9055C26.6997 12.9936 26.7682 13.0621 26.8563 13.0621H28.1463C28.2344 13.0621 28.303 12.9936 28.303 12.9055V12.504C29.3996 12.4404 30.2759 12.2911 30.9099 12.0536C31.6247 11.7844 31.982 11.4343 31.982 11.006C31.982 10.6168 31.6883 10.3034 31.1106 10.0782L31.096 10.0611ZM26.6826 9.37822C26.4011 9.32927 26.1881 9.27052 26.0437 9.20198C25.8871 9.1261 25.8504 9.0698 25.8504 9.05266C25.8504 9.02819 25.8944 8.95965 26.0707 8.88377C26.2273 8.81523 26.4329 8.75893 26.6851 8.71976V9.37823L26.6826 9.37822ZM29.1598 11.334C28.9346 11.4221 28.6408 11.4833 28.2884 11.5152V10.7074C28.7143 10.7563 29.0276 10.82 29.221 10.9007C29.3776 10.9644 29.478 11.0378 29.478 11.0941C29.478 11.1626 29.3581 11.2581 29.1573 11.3315L29.1598 11.334Z" fill="#137A83" />
                                        </svg>

                                    </div>
                                    <div>
                                        <Link to='/user/image-gallery' className='count'>{creditCount}</Link>
                                        <div className='left'>
                                            <span className='title'>Number of <span>Credit Counts Left</span> </span>
                                            {/* <Link to='/user/image-gallery' className='title'>Credit Counts</Link> */}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {/* {isMobile ? <div className='d-table m-auto mt-5'><button className='theme-btn' onClick={() => navigate("/user/image-generator")}> Generate New</button></div> : ' '} */}

                        <div className='last-created-img mt-4'>
                            <h3 className='title d-flex justify-content-between align-items-center'>Last Generated Images <Link to='/user/image-gallery' variant='none' style={{ display: 'inline-block' }} className=' theme-btn-link'>View All</Link></h3>
                            <Row>
                                <Col md={12}>
                                    <div className='Image-gallery-mainBox'>
                                        {loader ? [...Array(8)].map(val => <div className='ImgGCol skeLatn' style={{ cursor: 'pointer' }}><Skeleton height={300} /></div>) : userImageData?.data?.length ? userImageData?.data?.slice(0, 8).map((data) =>
                                            <div className='ImgGCol' style={{ cursor: 'pointer' }} >
                                                <p onClick={() => handleShow(data)} className='contentBoxDesc topbtn'>{data?.promt.length > 100 ? data?.promt.substring(0, 100) + '...' : data?.promt}</p>
                                                <div className='Image-gallery-over-btns'>
                                                    <div className='rightBtns'>
                                                        <Link target="_blank" to={data.original_name?.replace("/thumb/", "/images/")} download>
                                                            <span>
                                                                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M17.203 12.9089C17.203 12.6873 17.3812 12.5079 17.6015 12.5079C17.8217 12.5079 18 12.6872 18 12.9089V16.5989C18 16.8199 17.8218 17 17.6015 17H1.39852C1.17826 17 1 16.8206 1 16.5989V12.9089C1 12.6873 1.17824 12.5079 1.39852 12.5079C1.61878 12.5079 1.79704 12.6872 1.79704 12.9089V16.1979H17.2029L17.203 12.9089ZM9.10122 10.9738V1.40106C9.10122 1.17939 9.27946 1 9.49974 1C9.72002 1 9.89826 1.17938 9.89826 1.40106V10.9738L13.5784 7.27019C13.7343 7.11331 13.9858 7.11331 14.1423 7.27019C14.2982 7.42706 14.2982 7.68012 14.1423 7.83698L9.78167 12.2254C9.62578 12.3823 9.37433 12.3823 9.21778 12.2254L4.85712 7.83698C4.70124 7.68011 4.70124 7.42705 4.85712 7.27019C5.013 7.11331 5.26445 7.11331 5.42101 7.27019L9.10122 10.9738Z" fill="#137a83" stroke="#137a83" />
                                                                </svg>
                                                                Download
                                                            </span>
                                                        </Link>
                                                    </div>
                                                    <div className='leftBtns' >
                                                        <Link to="#" onClick={() => deleteUserImages(data.id)}>
                                                            <OverlayTrigger
                                                                placement='top'
                                                                overlay={
                                                                    <Tooltip>
                                                                        Delete
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 1.25C5 0.835786 5.33579 0.5 5.75 0.5H10.25C10.6642 0.5 11 0.835786 11 1.25C11 1.66421 10.6642 2 10.25 2H5.75C5.33579 2 5 1.66421 5 1.25ZM2.74418 2.75H1.25C0.835786 2.75 0.5 3.08579 0.5 3.5C0.5 3.91421 0.835786 4.25 1.25 4.25H2.04834L2.52961 11.4691C2.56737 12.0357 2.59862 12.5045 2.65465 12.8862C2.71299 13.2835 2.80554 13.6466 2.99832 13.985C3.29842 14.5118 3.75109 14.9353 4.29667 15.1997C4.64714 15.3695 5.0156 15.4377 5.41594 15.4695C5.80046 15.5 6.27037 15.5 6.8382 15.5H9.1618C9.72963 15.5 10.1995 15.5 10.5841 15.4695C10.9844 15.4377 11.3529 15.3695 11.7033 15.1997C12.2489 14.9353 12.7016 14.5118 13.0017 13.985C13.1945 13.6466 13.287 13.2835 13.3453 12.8862C13.4014 12.5045 13.4326 12.0356 13.4704 11.469L13.9517 4.25H14.75C15.1642 4.25 15.5 3.91421 15.5 3.5C15.5 3.08579 15.1642 2.75 14.75 2.75H13.2558C13.2514 2.74996 13.2471 2.74996 13.2427 2.75H2.75731C2.75294 2.74996 2.74857 2.74996 2.74418 2.75ZM12.4483 4.25H3.55166L4.0243 11.3396C4.06455 11.9433 4.09238 12.3525 4.13874 12.6683C4.18377 12.9749 4.23878 13.1321 4.30166 13.2425C4.45171 13.5059 4.67804 13.7176 4.95083 13.8498C5.06513 13.9052 5.22564 13.9497 5.53464 13.9742C5.85277 13.9995 6.26289 14 6.86799 14H9.13201C9.73711 14 10.1472 13.9995 10.4654 13.9742C10.7744 13.9497 10.9349 13.9052 11.0492 13.8498C11.322 13.7176 11.5483 13.5059 11.6983 13.2425C11.7612 13.1321 11.8162 12.9749 11.8613 12.6683C11.9076 12.3525 11.9354 11.9433 11.9757 11.3396L12.4483 4.25ZM6.5 6.125C6.91421 6.125 7.25 6.46079 7.25 6.875V10.625C7.25 11.0392 6.91421 11.375 6.5 11.375C6.08579 11.375 5.75 11.0392 5.75 10.625V6.875C5.75 6.46079 6.08579 6.125 6.5 6.125ZM9.5 6.125C9.91421 6.125 10.25 6.46079 10.25 6.875V10.625C10.25 11.0392 9.91421 11.375 9.5 11.375C9.08579 11.375 8.75 11.0392 8.75 10.625V6.875C8.75 6.46079 9.08579 6.125 9.5 6.125Z" fill="#137a83"></path>
                                                                </svg>
                                                            </OverlayTrigger>
                                                        </Link>
                                                    </div>

                                                    <div className='leftBtns' >
                                                        <Link to="#" onClick={() => handleShow(data)}>
                                                            <OverlayTrigger
                                                                placement='top'
                                                                overlay={
                                                                    <Tooltip>
                                                                        View
                                                                    </Tooltip>
                                                                }
                                                            >

                                                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.09756 8C6.09756 10.1333 7.8439 11.8691 10 11.8691C12.1463 11.8691 13.8927 10.1333 13.8927 8C13.8927 5.85697 12.1463 4.12121 10 4.12121C7.8439 4.12121 6.09756 5.85697 6.09756 8ZM15.7366 2.04606C17.4439 3.36485 18.8976 5.29455 19.9415 7.70909C20.0195 7.89333 20.0195 8.10667 19.9415 8.28121C17.8537 13.1103 14.1366 16 10 16H9.99024C5.86341 16 2.14634 13.1103 0.0585366 8.28121C-0.0195122 8.10667 -0.0195122 7.89333 0.0585366 7.70909C2.14634 2.88 5.86341 0 9.99024 0H10C12.0683 0 14.0293 0.717576 15.7366 2.04606ZM10.0012 10.4124C11.3378 10.4124 12.4304 9.32635 12.4304 7.99787C12.4304 6.65968 11.3378 5.57362 10.0012 5.57362C9.8841 5.57362 9.76702 5.58332 9.65971 5.60272C9.62068 6.66938 8.74263 7.52272 7.65971 7.52272H7.61093C7.58166 7.67787 7.56215 7.83302 7.56215 7.99787C7.56215 9.32635 8.65483 10.4124 10.0012 10.4124Z" fill="#137a83" />
                                                                </svg>

                                                            </OverlayTrigger>
                                                        </Link>
                                                    </div>

                                                </div>
                                                <div className='ImgGCol-inner' onClick={() => handleShow(data)}><img src={data.original_name} alt={data.prompt} /></div>
                                                <p className='Image-gallery-title' onClick={() => handleShow(data)}>{data.prompt}</p>
                                                <div className='overlay001' onClick={() => handleShow(data)}></div>
                                            </div>
                                        ) : "No Result Found!"}

                                    </div>

                                </Col>
                            </Row>

                            <div className='d-block mt-4 mb-4 pt-4 text-center'><Link className='mt-4 m-auto theme-btn' to='/user/image-gallery' variant='none'>View All</Link></div>

                        </div>
                    </div>
                </div>
                <Modal show={show != "" ? true : false} onHide={handleClose} size='lg' className='imgDetailBox' centered>
                    {/* <Modal.Header closeButton></Modal.Header> */}
                    <Modal.Body>
                        <div onClick={handleClose} className='closeBtnBox'>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00749 3.00773C3.41754 2.59768 4.08236 2.59768 4.49241 3.00773L8.99995 7.51527L13.5075 3.00773C13.9175 2.59768 14.5824 2.59768 14.9924 3.00773C15.4025 3.41778 15.4025 4.08261 14.9924 4.49266L10.4849 9.0002L14.9924 13.5077C15.4025 13.9178 15.4025 14.5826 14.9924 14.9927C14.5824 15.4027 13.9175 15.4027 13.5075 14.9927L8.99995 10.4851L4.49241 14.9927C4.08236 15.4027 3.41754 15.4027 3.00749 14.9927C2.59744 14.5826 2.59744 13.9178 3.00749 13.5077L7.51503 9.0002L3.00749 4.49266C2.59744 4.08261 2.59744 3.41778 3.00749 3.00773Z" fill="#898989"></path>

                            </svg>
                        </div>

                        <Row>
                            <Col md={6} className='p-0'>
                                <div className='img-box'>
                                    <img src={show?.original_name?.replaceAll("/thumb/", "/images/")} alt='midjourney' />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className='content-box ps-3'>
                                    <h3 className='contentBoxTitle mt-2'>{show?.promt}</h3>
                                    <p className='contentBoxCopy' onClick={() => { navigator.clipboard.writeText(show?.promt); swal("copied!", "", "success") }}>Prompt <svg className="text-color-29 dark:text-color-F3" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_8188_5495)">
                                            <path d="M12 0.75H3C2.175 0.75 1.5 1.425 1.5 2.25V12.75H3V2.25H12V0.75ZM14.25 3.75H6C5.175 3.75 4.5 4.425 4.5 5.25V15.75C4.5 16.575 5.175 17.25 6 17.25H14.25C15.075 17.25 15.75 16.575 15.75 15.75V5.25C15.75 4.425 15.075 3.75 14.25 3.75ZM14.25 15.75H6V5.25H14.25V15.75Z" fill="currentColor"></path>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_8188_5495">
                                                <rect width="18" height="18" fill="white"></rect>
                                            </clipPath>
                                        </defs>
                                    </svg> </p>
                                    <p className='contentBoxDesc'>{show?.promt}</p>
                                    <ul className='contentBoxContent'>
                                        {show?.art_style ? <li> Style <br /> <b>{show?.art_style}</b></li> : ""}
                                        {show?.lighting_style ? <li> Lighting Effects <br /> <b>{show?.lighting_style}</b></li> : ""}
                                        {show?.size ? <li> Resolution <br /> <b>{show?.size}</b></li> : ""}
                                        {show?.created_at ? <li> Date <br /> <b>{show?.created_at?.slice(0, 10)}</b></li> : ""}
                                    </ul>
                                    <ul className='btns-group'>
                                        <Link target="_blank" className='theme-btn d-inline-block me-3 border' to={show?.original_name?.replace("/thumb/", "/images/")} download>
                                            <svg className='d-inline' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.25C9.41421 2.25 9.75 2.58579 9.75 3V10.1893L12.2197 7.71967C12.5126 7.42678 12.9874 7.42678 13.2803 7.71967C13.5732 8.01256 13.5732 8.48744 13.2803 8.78033L9.53033 12.5303C9.23744 12.8232 8.76256 12.8232 8.46967 12.5303L4.71967 8.78033C4.42678 8.48744 4.42678 8.01256 4.71967 7.71967C5.01256 7.42678 5.48744 7.42678 5.78033 7.71967L8.25 10.1893V3C8.25 2.58579 8.58579 2.25 9 2.25ZM3 12C3.41421 12 3.75 12.3358 3.75 12.75V14.25C3.75 14.4489 3.82902 14.6397 3.96967 14.7803C4.11032 14.921 4.30109 15 4.5 15H13.5C13.6989 15 13.8897 14.921 14.0303 14.7803C14.171 14.6397 14.25 14.4489 14.25 14.25V12.75C14.25 12.3358 14.5858 12 15 12C15.4142 12 15.75 12.3358 15.75 12.75V14.25C15.75 14.8467 15.5129 15.419 15.091 15.841C14.669 16.2629 14.0967 16.5 13.5 16.5H4.5C3.90326 16.5 3.33097 16.2629 2.90901 15.841C2.48705 15.419 2.25 14.8467 2.25 14.25V12.75C2.25 12.3358 2.58579 12 3 12Z" fill="#137a83"></path>
                                            </svg> Download</Link>


                                        {/* <button>
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                                                <path d="M13.1251 1.875C12.7806 1.87487 12.4407 1.95381 12.1316 2.10576C11.8225 2.25771 11.5524 2.4786 11.3421 2.75141C11.1318 3.02422 10.987 3.34167 10.9188 3.67929C10.8505 4.01691 10.8607 4.36569 10.9486 4.69875C10.8942 4.71023 10.8419 4.72969 10.7933 4.7565L8.72555 5.88375L6.09605 7.3875C6.06973 7.40247 6.04465 7.41952 6.02105 7.4385C5.65524 7.22216 5.23563 7.11386 4.81081 7.12612C4.38599 7.13838 3.97333 7.27071 3.62061 7.50779C3.26788 7.74487 2.98951 8.077 2.81773 8.46573C2.64594 8.85446 2.58777 9.2839 2.64994 9.70432C2.71211 10.1247 2.89208 10.519 3.16902 10.8413C3.44596 11.1637 3.80854 11.4011 4.21479 11.5259C4.62103 11.6508 5.05433 11.658 5.46452 11.5468C5.87471 11.4356 6.24501 11.2105 6.53255 10.8975L8.72705 12.1178L10.9426 13.326C10.8084 13.857 10.8726 14.4186 11.1229 14.9057C11.3733 15.3928 11.7927 15.7718 12.3026 15.9717C12.8124 16.1717 13.3777 16.1788 13.8924 15.9918C14.4071 15.8048 14.836 15.4364 15.0986 14.9558C15.3611 14.4752 15.4394 13.9154 15.3187 13.3812C15.198 12.847 14.8866 12.3752 14.443 12.0542C13.9993 11.7331 13.4537 11.5849 12.9086 11.6374C12.3635 11.6898 11.8562 11.9393 11.4818 12.339L9.27155 11.133L7.06205 9.906C7.19649 9.34903 7.1139 8.76178 6.83105 8.2635L9.27455 6.867L11.3318 5.74425C11.3807 5.71775 11.4255 5.68413 11.4646 5.6445C11.7172 5.92044 12.0347 6.12902 12.3883 6.25135C12.7419 6.37368 13.1204 6.40589 13.4896 6.34509C13.8588 6.28428 14.207 6.13237 14.5027 5.9031C14.7984 5.67383 15.0322 5.37445 15.183 5.03204C15.3339 4.68963 15.3969 4.31502 15.3665 3.9421C15.3361 3.56919 15.2132 3.20974 15.0088 2.8963C14.8045 2.58286 14.5253 2.32532 14.1963 2.147C13.8674 1.96867 13.4992 1.87518 13.1251 1.875Z" fill="currentColor"></path>

                                            </svg> Share</button> */}


                                        <button onClick={() => deleteUserImages(show.id)}>
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2.25C6 1.83579 6.33579 1.5 6.75 1.5H11.25C11.6642 1.5 12 1.83579 12 2.25C12 2.66421 11.6642 3 11.25 3H6.75C6.33579 3 6 2.66421 6 2.25ZM3.74418 3.75H2.25C1.83579 3.75 1.5 4.08579 1.5 4.5C1.5 4.91421 1.83579 5.25 2.25 5.25H3.04834L3.52961 12.4691C3.56737 13.0357 3.59862 13.5045 3.65465 13.8862C3.71299 14.2835 3.80554 14.6466 3.99832 14.985C4.29842 15.5118 4.75109 15.9353 5.29667 16.1997C5.64714 16.3695 6.0156 16.4377 6.41594 16.4695C6.80046 16.5 7.27037 16.5 7.8382 16.5H10.1618C10.7296 16.5 11.1995 16.5 11.5841 16.4695C11.9844 16.4377 12.3529 16.3695 12.7033 16.1997C13.2489 15.9353 13.7016 15.5118 14.0017 14.985C14.1945 14.6466 14.287 14.2835 14.3453 13.8862C14.4014 13.5045 14.4326 13.0356 14.4704 12.469L14.9517 5.25H15.75C16.1642 5.25 16.5 4.91421 16.5 4.5C16.5 4.08579 16.1642 3.75 15.75 3.75H14.2558C14.2514 3.74996 14.2471 3.74996 14.2427 3.75H3.75731C3.75294 3.74996 3.74857 3.74996 3.74418 3.75ZM13.4483 5.25H4.55166L5.0243 12.3396C5.06455 12.9433 5.09238 13.3525 5.13874 13.6683C5.18377 13.9749 5.23878 14.1321 5.30166 14.2425C5.45171 14.5059 5.67804 14.7176 5.95083 14.8498C6.06513 14.9052 6.22564 14.9497 6.53464 14.9742C6.85277 14.9995 7.26289 15 7.86799 15H10.132C10.7371 15 11.1472 14.9995 11.4654 14.9742C11.7744 14.9497 11.9349 14.9052 12.0492 14.8498C12.322 14.7176 12.5483 14.5059 12.6983 14.2425C12.7612 14.1321 12.8162 13.9749 12.8613 13.6683C12.9076 13.3525 12.9354 12.9433 12.9757 12.3396L13.4483 5.25ZM7.5 7.125C7.91421 7.125 8.25 7.46079 8.25 7.875V11.625C8.25 12.0392 7.91421 12.375 7.5 12.375C7.08579 12.375 6.75 12.0392 6.75 11.625V7.875C6.75 7.46079 7.08579 7.125 7.5 7.125ZM10.5 7.125C10.9142 7.125 11.25 7.46079 11.25 7.875V11.625C11.25 12.0392 10.9142 12.375 10.5 12.375C10.0858 12.375 9.75 12.0392 9.75 11.625V7.875C9.75 7.46079 10.0858 7.125 10.5 7.125Z" fill="currentColor"></path>
                                            </svg>  Delete</button>


                                        <div className='socialShareIcons d-inline position-relative' ref={wrapperRef}>
                                            <button className='socialShareIconBtn' onClick={() => setShowSocialshare(!showSocialshare)}>
                                                <svg fill="#137a83" height="18px" width="18px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 481.6 481.6">
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
                                                <div className='socialShareIconBox' >
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
                                        </div>

                                    </ul >
                                </div >
                            </Col >
                        </Row >
                    </Modal.Body>
                </Modal>
            </section>
        </>
    )
}

export default Dashboard