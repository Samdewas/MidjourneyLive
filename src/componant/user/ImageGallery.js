import React, { useEffect, useRef, useState } from 'react'
import { Col, Button, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../../Assets/css/imagegallery.css'
import Modal from 'react-bootstrap/Modal';
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { base_url } from '../../Store/constant';
import swal from 'sweetalert';
import PrivateRoute from '../comman/Privaterouter';
import Skeleton from 'react-loading-skeleton';
import { Helmet } from 'react-helmet';
import moment from 'moment/moment';
import { isMobileOnly } from 'react-device-detect';
import { FacebookIcon, FacebookShareButton, FacebookShareCount, InstapaperIcon, InstapaperShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'

const Imagegallery = () => {
    const [showSocialshare, setShowSocialshare] = useState(false)
    const [show, setShow] = useState("");
    const [loader, setLoader] = useState(true);

    const handleClose = () => setShow("");
    const handleShow = (val) => setShow(val);

    const navigate = useNavigate();
    const userData = useSelector(state => state.persistedReducer.home.userData);
    const [userImageData, setUserImageData] = useState([]);
    const [page, setPage] = useState(1);
    const handleUserImages = () => {
        axios.get(base_url + '/user/getUserImages?page=' + page, { headers: { "Authorization": `Bearer ${userData?.token}` } })
            .then(response => {
                if (response.status == 200) {
                    const merged = userImageData.concat(response?.data?.data?.data?.data)
                    setUserImageData(merged);
                    setLoader(false)
                } else {
                    setLoader(false)
                    swal(response.data.msg, "", "error")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
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
                    let data = userImageData?.filter(val => val.id != id);
                    setUserImageData(data);
                    swal("Delete Successfully !", "", "success")
                } else {
                    swal(response.data.msg, "", "error")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        handleUserImages();
    }, [page])

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
                <title> Image Gallery | Mid Journey</title>
            </Helmet>
            <section className='main-container-dashboard'>
                <div className='Image-gallery-page'>
                    <div className='Image-gallery-top'>
                        <div className='text'>

                            <p className='Image-gallery-desc'>All your generated images using Mid Journey AI in one place Images available for 30 days download soon.</p>
                        </div>
                        <Link className='theme-btn' to='/user/image-generator' > Generate Image</Link>
                    </div>
                    <div className='Image-gallery-filter'>

                    </div>

                    <div className='Image-gallery-mainBox'>
                        {loader ? [...Array(10)].map(val => <div className='ImgGCol skeLatn' style={{ cursor: 'pointer' }}>
                            <Skeleton height={300} /></div>) : userImageData?.length ? userImageData?.map((data) =>
                            <div className='ImgGCol' style={{ cursor: 'pointer' }}>

                                <p className='contentBoxDesc topbtn'>{data?.promt.length > 100 ? data?.promt.substring(0, 100) + '...' : data?.promt}</p>
                                <div className='Image-gallery-over-btns'>
                                    <div className='rightBtns'>
                                        <Link to={data.original_name?.replace("/thumb/", "/images/")} download>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={
                                                    <Tooltip>
                                                        Download
                                                    </Tooltip>
                                                }
                                            >
                                                <span>

                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17.203 12.9089C17.203 12.6873 17.3812 12.5079 17.6015 12.5079C17.8217 12.5079 18 12.6872 18 12.9089V16.5989C18 16.8199 17.8218 17 17.6015 17H1.39852C1.17826 17 1 16.8206 1 16.5989V12.9089C1 12.6873 1.17824 12.5079 1.39852 12.5079C1.61878 12.5079 1.79704 12.6872 1.79704 12.9089V16.1979H17.2029L17.203 12.9089ZM9.10122 10.9738V1.40106C9.10122 1.17939 9.27946 1 9.49974 1C9.72002 1 9.89826 1.17938 9.89826 1.40106V10.9738L13.5784 7.27019C13.7343 7.11331 13.9858 7.11331 14.1423 7.27019C14.2982 7.42706 14.2982 7.68012 14.1423 7.83698L9.78167 12.2254C9.62578 12.3823 9.37433 12.3823 9.21778 12.2254L4.85712 7.83698C4.70124 7.68011 4.70124 7.42705 4.85712 7.27019C5.013 7.11331 5.26445 7.11331 5.42101 7.27019L9.10122 10.9738Z" fill="#137a83" stroke="#137a83" />
                                                    </svg>
                                                    Download
                                                </span>
                                            </OverlayTrigger>

                                        </Link>
                                    </div>
                                    <div className='leftBtns' >
                                        <Link to="#" onClick={() => deleteUserImages(data.id)}>
                                            <OverlayTrigger
                                                placement='bottom'
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
                                <p className='Image-gallery-title'>{data.prompt}</p>
                                <div className='overlay001' onClick={() => handleShow(data)}></div>
                            </div>
                        ) : "No Result Found!"}



                    </div>
                    <div className='text-center mt-4 mb-4'>
                        {userImageData?.length == page * 20 ?
                            <button variant='fill' onClick={() => setPage(page + 1)} className='mt-4 m-auto theme-btn'>View More</button>
                            : ""}
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
                                    <img style={{ width: '100%' }} src={show?.original_name?.replaceAll("/thumb/", "/images/")} alt='midjourney' />

                                </div>
                            </Col>
                            <Col md={6}>
                                <div className='content-box ps-3'>
                                    <h3 className='contentBoxTitle mt-2'>{show?.promt}</h3>
                                    <p className='contentBoxCopy' onClick={() => { navigator.clipboard.writeText(show?.promt); alert("copied!") }}>Prompt <svg className="text-color-29 dark:text-color-F3" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                        {show?.created_at ? <li> Date <br /> <b>{moment(show?.created_at).format('MMMM Do YYYY, h:mm:ss a')}</b></li> : ""}

                                    </ul>
                                    <ul className='btns-group'>
                                        <Link className='theme-btn d-inline-block me-3' to={show?.original_name?.replace("/thumb/", "/images/")} download>
                                            <svg className='d-inline' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.25C9.41421 2.25 9.75 2.58579 9.75 3V10.1893L12.2197 7.71967C12.5126 7.42678 12.9874 7.42678 13.2803 7.71967C13.5732 8.01256 13.5732 8.48744 13.2803 8.78033L9.53033 12.5303C9.23744 12.8232 8.76256 12.8232 8.46967 12.5303L4.71967 8.78033C4.42678 8.48744 4.42678 8.01256 4.71967 7.71967C5.01256 7.42678 5.48744 7.42678 5.78033 7.71967L8.25 10.1893V3C8.25 2.58579 8.58579 2.25 9 2.25ZM3 12C3.41421 12 3.75 12.3358 3.75 12.75V14.25C3.75 14.4489 3.82902 14.6397 3.96967 14.7803C4.11032 14.921 4.30109 15 4.5 15H13.5C13.6989 15 13.8897 14.921 14.0303 14.7803C14.171 14.6397 14.25 14.4489 14.25 14.25V12.75C14.25 12.3358 14.5858 12 15 12C15.4142 12 15.75 12.3358 15.75 12.75V14.25C15.75 14.8467 15.5129 15.419 15.091 15.841C14.669 16.2629 14.0967 16.5 13.5 16.5H4.5C3.90326 16.5 3.33097 16.2629 2.90901 15.841C2.48705 15.419 2.25 14.8467 2.25 14.25V12.75C2.25 12.3358 2.58579 12 3 12Z" fill="#137a83"></path>
                                            </svg> Download</Link>

                                        {/* <button>
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                                                <path d="M13.1251 1.875C12.7806 1.87487 12.4407 1.95381 12.1316 2.10576C11.8225 2.25771 11.5524 2.4786 11.3421 2.75141C11.1318 3.02422 10.987 3.34167 10.9188 3.67929C10.8505 4.01691 10.8607 4.36569 10.9486 4.69875C10.8942 4.71023 10.8419 4.72969 10.7933 4.7565L8.72555 5.88375L6.09605 7.3875C6.06973 7.40247 6.04465 7.41952 6.02105 7.4385C5.65524 7.22216 5.23563 7.11386 4.81081 7.12612C4.38599 7.13838 3.97333 7.27071 3.62061 7.50779C3.26788 7.74487 2.98951 8.077 2.81773 8.46573C2.64594 8.85446 2.58777 9.2839 2.64994 9.70432C2.71211 10.1247 2.89208 10.519 3.16902 10.8413C3.44596 11.1637 3.80854 11.4011 4.21479 11.5259C4.62103 11.6508 5.05433 11.658 5.46452 11.5468C5.87471 11.4356 6.24501 11.2105 6.53255 10.8975L8.72705 12.1178L10.9426 13.326C10.8084 13.857 10.8726 14.4186 11.1229 14.9057C11.3733 15.3928 11.7927 15.7718 12.3026 15.9717C12.8124 16.1717 13.3777 16.1788 13.8924 15.9918C14.4071 15.8048 14.836 15.4364 15.0986 14.9558C15.3611 14.4752 15.4394 13.9154 15.3187 13.3812C15.198 12.847 14.8866 12.3752 14.443 12.0542C13.9993 11.7331 13.4537 11.5849 12.9086 11.6374C12.3635 11.6898 11.8562 11.9393 11.4818 12.339L9.27155 11.133L7.06205 9.906C7.19649 9.34903 7.1139 8.76178 6.83105 8.2635L9.27455 6.867L11.3318 5.74425C11.3807 5.71775 11.4255 5.68413 11.4646 5.6445C11.7172 5.92044 12.0347 6.12902 12.3883 6.25135C12.7419 6.37368 13.1204 6.40589 13.4896 6.34509C13.8588 6.28428 14.207 6.13237 14.5027 5.9031C14.7984 5.67383 15.0322 5.37445 15.183 5.03204C15.3339 4.68963 15.3969 4.31502 15.3665 3.9421C15.3361 3.56919 15.2132 3.20974 15.0088 2.8963C14.8045 2.58286 14.5253 2.32532 14.1963 2.147C13.8674 1.96867 13.4992 1.87518 13.1251 1.875Z" fill="currentColor"></path>

                                            </svg> Share</button> */}

                                        <button onClick={() => deleteUserImages(show.id)}><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2.25C6 1.83579 6.33579 1.5 6.75 1.5H11.25C11.6642 1.5 12 1.83579 12 2.25C12 2.66421 11.6642 3 11.25 3H6.75C6.33579 3 6 2.66421 6 2.25ZM3.74418 3.75H2.25C1.83579 3.75 1.5 4.08579 1.5 4.5C1.5 4.91421 1.83579 5.25 2.25 5.25H3.04834L3.52961 12.4691C3.56737 13.0357 3.59862 13.5045 3.65465 13.8862C3.71299 14.2835 3.80554 14.6466 3.99832 14.985C4.29842 15.5118 4.75109 15.9353 5.29667 16.1997C5.64714 16.3695 6.0156 16.4377 6.41594 16.4695C6.80046 16.5 7.27037 16.5 7.8382 16.5H10.1618C10.7296 16.5 11.1995 16.5 11.5841 16.4695C11.9844 16.4377 12.3529 16.3695 12.7033 16.1997C13.2489 15.9353 13.7016 15.5118 14.0017 14.985C14.1945 14.6466 14.287 14.2835 14.3453 13.8862C14.4014 13.5045 14.4326 13.0356 14.4704 12.469L14.9517 5.25H15.75C16.1642 5.25 16.5 4.91421 16.5 4.5C16.5 4.08579 16.1642 3.75 15.75 3.75H14.2558C14.2514 3.74996 14.2471 3.74996 14.2427 3.75H3.75731C3.75294 3.74996 3.74857 3.74996 3.74418 3.75ZM13.4483 5.25H4.55166L5.0243 12.3396C5.06455 12.9433 5.09238 13.3525 5.13874 13.6683C5.18377 13.9749 5.23878 14.1321 5.30166 14.2425C5.45171 14.5059 5.67804 14.7176 5.95083 14.8498C6.06513 14.9052 6.22564 14.9497 6.53464 14.9742C6.85277 14.9995 7.26289 15 7.86799 15H10.132C10.7371 15 11.1472 14.9995 11.4654 14.9742C11.7744 14.9497 11.9349 14.9052 12.0492 14.8498C12.322 14.7176 12.5483 14.5059 12.6983 14.2425C12.7612 14.1321 12.8162 13.9749 12.8613 13.6683C12.9076 13.3525 12.9354 12.9433 12.9757 12.3396L13.4483 5.25ZM7.5 7.125C7.91421 7.125 8.25 7.46079 8.25 7.875V11.625C8.25 12.0392 7.91421 12.375 7.5 12.375C7.08579 12.375 6.75 12.0392 6.75 11.625V7.875C6.75 7.46079 7.08579 7.125 7.5 7.125ZM10.5 7.125C10.9142 7.125 11.25 7.46079 11.25 7.875V11.625C11.25 12.0392 10.9142 12.375 10.5 12.375C10.0858 12.375 9.75 12.0392 9.75 11.625V7.875C9.75 7.46079 10.0858 7.125 10.5 7.125Z" fill="currentColor"></path>

                                        </svg>  Delete</button>

                                        <div className='socialShareIcons d-inline position-relative' ref={wrapperRef}>
                                            <button className='socialShareIconBtn' onClick={() => setShowSocialshare(!showSocialshare)}>
                                                <svg fill="#248790" height="18px" width="18px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 481.6 481.6">
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

export default Imagegallery