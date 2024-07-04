import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../Assets/img/new/logo.svg'
import insta from '../../Assets/img/insta.png'
import pinterest from '../../Assets/img/pinterest.png'
import arrow from '../../Assets/img/Frame.svg'
import { Col } from 'react-bootstrap';
const Footer = () => {
    const path_name = useSelector(state => state.persistedReducer.home.path_name);

    return (
        <>{path_name?.pathname?.includes('/user') || path_name?.pathname == '/login' || path_name?.pathname == '/password/reset' || path_name?.pathname == '/password/resetpassword' || path_name?.pathname == "/registration" ? " " :
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <Col md={7} xs={12}>
                            <div className="col_inner">
                                <div className="brand-logo">
                                    <Link to="/" rel="nofollow">
                                        <img width={300} height={45}
                                            src={logo}
                                            alt="Midjourney free" />
                                    </Link>
                                </div>
                                <div className='footerEmail'>
                                    <Link to='mailto:support@midjourneyfree.ai'>
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1742 3.75C22.8505 3.75 24.463 4.4125 25.6492 5.60125C26.8367 6.7875 27.5005 8.3875 27.5005 10.0625V19.9375C27.5005 23.425 24.663 26.25 21.1742 26.25H8.82549C5.33674 26.25 2.50049 23.425 2.50049 19.9375V10.0625C2.50049 6.575 5.32424 3.75 8.82549 3.75H21.1742ZM23.163 11.925L23.263 11.825C23.5617 11.4625 23.5617 10.9375 23.2492 10.575C23.0755 10.3887 22.8367 10.275 22.588 10.25C22.3255 10.2362 22.0755 10.325 21.8867 10.5L16.2505 15C15.5255 15.6013 14.4867 15.6013 13.7505 15L8.12549 10.5C7.73674 10.2125 7.19924 10.25 6.87549 10.5875C6.53799 10.925 6.50049 11.4625 6.78674 11.8375L6.95049 12L12.638 16.4375C13.338 16.9875 14.1867 17.2875 15.0755 17.2875C15.9617 17.2875 16.8255 16.9875 17.5242 16.4375L23.163 11.925Z" fill="white" />
                                        </svg>
                                        support@midjourneyfree.ai</Link>
                                </div>
                                <ul className="footer-social">
                                    <li><Link target='_blank' to="https://www.instagram.com//" rel="nofollow">
                                        <img src={insta} alt='insta' />
                                    </Link>
                                    </li>
                                    <li><Link target='_blank' to="https://in.pinterest.com//" rel="nofollow">
                                        <img src={pinterest} alt='pinterest' />
                                    </Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>

                        <div className="col p-0">
                            <div className="col_inner">
                                {/* <h4>Company</h4> */}
                                <ul>
                                    <li><Link to="/about-us">About Us <img src={arrow} width={26} height={26} alt='Midjourney free' /></Link></li>
                                    <li><Link to="/contact-us">Contact Us <img src={arrow} width={26} height={26} alt='Midjourney free' /></Link></li>
                                    <li><Link to="/pricing">Pricing Plans <img src={arrow} width={26} height={26} alt='Midjourney free' /></Link></li>
                                    <li><Link to="/blogs">Blogs&nbsp; <img src={arrow} width={26} height={26} alt='Midjourney free' /></Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col p-0">
                            <div className="col_inner">
                                {/* <h4>Company</h4> */}
                                <ul>
                                    <li><Link to="/terms-condition">Terms of Use <img src={arrow} width={26} height={26} alt='arrow' /></Link></li>
                                    <li><Link to="/privacy-policy">Privacy Policy <img src={arrow} width={26} height={26} alt='arrow' /></Link></li>
                                    <li><Link to="/refund-policy">Refund & Cancellation <img src={arrow} width={26} height={26} alt='arrow' /></Link></li>
                                    <li><Link to="/faq">FAQ&nbsp;<img src={arrow} width={26} height={26} alt='arrow' /></Link></li>
                                </ul>
                            </div>
                        </div>


                        {/* <div className="col">
                            <div className="col_inner">
                                <h4>Support</h4>
                                <ul>
                                    <li><Link to="/contact-us">Contact Us</Link></li>
                                    <li><Link to="/contact-us">Report Issue</Link></li>
                                    <li><Link to="mailto:support@midjourneyfree.ai">support@midjourneyfree.ai&nbsp;
                                        <svg className="inline-block" width="14" height="14" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M22 2H13V4H18.5858L10.2929 12.2929C9.90237 12.6834 9.90237 13.3166 10.2929 13.7071C10.6834 14.0976 11.3166 14.0976 11.7071 13.7071L20 5.41421V11H22V2Z"
                                                fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M6.90036 5.04616C7.39907 5.00096 8.04698 5 9 5C9.55228 5 10 4.55229 10 4C10 3.44772 9.55228 3 9 3L8.95396 3C8.05849 2.99998 7.31952 2.99997 6.71983 3.05432C6.09615 3.11085 5.52564 3.23242 5 3.5359C4.39192 3.88697 3.88697 4.39192 3.5359 5C3.23242 5.52564 3.11085 6.09615 3.05432 6.71983C2.99997 7.31953 2.99998 8.05851 3 8.95399V14.0705C2.99996 15.4247 2.99993 16.5413 3.11875 17.4251C3.24349 18.3529 3.51546 19.1723 4.17157 19.8284C4.82768 20.4845 5.64711 20.7565 6.57494 20.8813C7.4587 21.0001 8.57532 21 9.92945 21H15.046C15.9415 21 16.6805 21 17.2802 20.9457C17.9039 20.8892 18.4744 20.7676 19 20.4641C19.6081 20.113 20.113 19.6081 20.4641 19C20.7676 18.4744 20.8891 17.9039 20.9457 17.2802C21 16.6805 21 15.9415 21 15.046L21 15C21 14.4477 20.5523 14 20 14C19.4477 14 19 14.4477 19 15C19 15.953 18.999 16.6009 18.9538 17.0996C18.9099 17.5846 18.8305 17.8295 18.732 18C18.5565 18.304 18.304 18.5565 18 18.7321C17.8295 18.8305 17.5846 18.9099 17.0996 18.9538C16.6009 18.999 15.953 19 15 19H10C8.55752 19 7.57625 18.9979 6.84143 18.8991C6.13538 18.8042 5.80836 18.6368 5.58579 18.4142C5.36321 18.1916 5.19584 17.8646 5.10092 17.1586C5.00212 16.4237 5 15.4425 5 14V9C5 8.04698 5.00096 7.39908 5.04616 6.90036C5.09011 6.41539 5.1695 6.17051 5.26795 6C5.44348 5.69596 5.69596 5.44349 6 5.26795C6.17051 5.16951 6.41539 5.09011 6.90036 5.04616Z"
                                                fill="currentColor"></path>
                                        </svg>
                                    </Link></li>
                                </ul>
                            </div>
                        </div> */}

                    </div>

                    <p className="copyright">Copyright 2024 DreamVibe AI Studio, All Rights Reserved.</p>
                </div>
            </footer>
        }
        </>
    )
}

export default Footer