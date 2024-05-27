import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserHeader from '../user/UserHeader'
import SidebarNavbar from '../user/SidebarNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { credit_count, generatedData, user } from '../../Reducer/homeReducer'
import swal from 'sweetalert'
import { isDesktop, isMobile } from 'react-device-detect'
import logo from '../../Assets/img/new/logo.svg'
const Header = () => {

    const [isSticky, setSticky] = useState(false);
    const handleScroll = () => {
        setSticky(window.scrollY > 0);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const [showDropdown, setShowDropdown] = useState(false);
    
    const [showmobileMenu, setShowmobileMenu] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const path_name = useSelector(state => state.persistedReducer.home.path_name);
    const userData = useSelector(state => state.persistedReducer.home.userData);
    const Logout = () => {
        dispatch(user([]));
        dispatch(credit_count(0));
        dispatch(generatedData(null));
        navigate('/');
        swal("Logout Successfully!", "", "success");
    }

    const OutsideClickHandler = ({ children, onOutsideClick }) => {
        const wrapperRef = useRef(null);

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                    onOutsideClick();
                }
            };

            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [onOutsideClick]);

        return <div ref={wrapperRef}>{children}</div>;
    };

    const handleOutsideClick = () => {
        setShowmobileMenu(false);
    };

    return (
        <>
            {path_name?.pathname?.includes('/user') ? <UserHeader /> : (path_name?.pathname == '/login' || path_name?.pathname == '/password/reset' || path_name?.pathname == '/password/resetpassword' || path_name?.pathname == "/registration") ? "" :
                <>
                    {/* <p className='top_heighlights'>Great news! We've upgraded our platform with new technology and exciting features. Enjoy the update! For any inquiries, please contact us at <b>support@midjourneyfree.ai</b>.</p> */}
                    <header className={`header ${isSticky ? 'sticky' : ''}`} >
                        <div className="container">
                            <div className="brand-logo">
                                <Link to="/" rel="nofollow">
                                    <img style={{ filter: 'invert(1)' }} width={200} height={40}
                                        src={logo} alt="Midjourney free" />
                                </Link>
                            </div>
                            {isDesktop || showmobileMenu === true ?
                                <OutsideClickHandler onOutsideClick={handleOutsideClick}>
                                    <div className={isMobile ? showmobileMenu === true ? 'd-block navigation' : 'd-none' : "navigation"} id="myDIV">
                                        <ul>
                                            <li onClick={() => setShowmobileMenu(!showmobileMenu)}><Link activeClassName="active" to="/about-us">About Us</Link></li>
                                            <li onClick={() => setShowmobileMenu(!showmobileMenu)}><Link activeClassName="active" to="/pricing">Pricing</Link></li>
                                            {/* <li onClick={() => setShowmobileMenu(!showmobileMenu)}><Link to="#">Blogs</Link></li> */}
                                            <li onClick={() => setShowmobileMenu(!showmobileMenu)}><Link activeClassName="active" to="/privacy-policy">Privacy Policy</Link></li>
                                            <li onClick={() => setShowmobileMenu(!showmobileMenu)}><Link activeClassName="active" to="/contact-us">Contact Us</Link></li>

                                        </ul>
                                    </div>
                                </OutsideClickHandler>
                                : ' '}
                            <div>

                                {userData?.is_login ?
                                    <div className="mobile-hide dropdown admin-login">
                                        <Link to="#">
                                            {/* <img className="border" width="40" height="40"
                                                    src="https://www.dall-efree.com/public/uploads/20221010/f344eaaaa40173a23c693d1b4b24c794.png"
                                                    alt="" /> */}
                                            <span className='user-img front-account'>{userData?.user?.full_name[0]?.toUpperCase()}</span>
                                        </Link>
                                        <div className="submenu">
                                            <ul>
                                                <li>
                                                    <div className="profile">
                                                        {/* <img width="40" height="40"
                                                                src="https://www.dall-efree.com/public/uploads/20221010/f344eaaaa40173a23c693d1b4b24c794.png"
                                                                alt="" /> */}
                                                        <span className='user-img front-account'>{userData?.user?.full_name[0]?.toUpperCase()}</span>
                                                        <p>{userData?.user?.full_name} <span> {userData?.user?.email}</span></p>

                                                    </div>
                                                </li>
                                                <li><Link to="/user/dashboard">
                                                    <svg className="neg-transition-scale" width="16" height="16" viewBox="0 0 16 16"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_2465_1852)">
                                                            <path
                                                                d="M2 8.66667H7.33333V2H2V8.66667ZM2 14H7.33333V10H2V14ZM8.66667 14H14V7.33333H8.66667V14ZM8.66667 2V6H14V2H8.66667Z"
                                                                fill="currentColor"></path>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_2465_1852">
                                                                <rect width="16" height="16" fill="white"></rect>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Dashboard </Link>
                                                </li>
                                                {/* <li><Link to="#">
                                                    <svg className="neg-transition-scale" width="16" height="16" viewBox="0 0 16 16"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_2465_1858)">
                                                            <path
                                                                d="M12.7597 8.62667C12.7864 8.42667 12.7997 8.22001 12.7997 8.00001C12.7997 7.78667 12.7864 7.57334 12.7531 7.37334L14.1064 6.32001C14.2264 6.22667 14.2597 6.04667 14.1864 5.91334L12.9064 3.70001C12.8264 3.55334 12.6597 3.50667 12.5131 3.55334L10.9197 4.19334C10.5864 3.94001 10.2331 3.72667 9.83975 3.56667L9.59975 1.87334C9.57308 1.71334 9.43975 1.60001 9.27975 1.60001H6.71975C6.55975 1.60001 6.43308 1.71334 6.40641 1.87334L6.16641 3.56667C5.77308 3.72667 5.41308 3.94667 5.08641 4.19334L3.49308 3.55334C3.34641 3.50001 3.17975 3.55334 3.09975 3.70001L1.82641 5.91334C1.74641 6.05334 1.77308 6.22667 1.90641 6.32001L3.25975 7.37334C3.22641 7.57334 3.19975 7.79334 3.19975 8.00001C3.19975 8.20667 3.21308 8.42667 3.24641 8.62667L1.89308 9.68001C1.77308 9.77334 1.73975 9.95334 1.81308 10.0867L3.09308 12.3C3.17308 12.4467 3.33975 12.4933 3.48641 12.4467L5.07975 11.8067C5.41308 12.06 5.76641 12.2733 6.15975 12.4333L6.39975 14.1267C6.43308 14.2867 6.55975 14.4 6.71975 14.4H9.27975C9.43975 14.4 9.57308 14.2867 9.59308 14.1267L9.83308 12.4333C10.2264 12.2733 10.5864 12.06 10.9131 11.8067L12.5064 12.4467C12.6531 12.5 12.8197 12.4467 12.8997 12.3L14.1797 10.0867C14.2597 9.94001 14.2264 9.77334 14.0997 9.68001L12.7597 8.62667ZM7.99975 10.4C6.67975 10.4 5.59975 9.32001 5.59975 8.00001C5.59975 6.68001 6.67975 5.60001 7.99975 5.60001C9.31975 5.60001 10.3997 6.68001 10.3997 8.00001C10.3997 9.32001 9.31975 10.4 7.99975 10.4Z"
                                                                fill="currentColor"></path>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_2465_1858">
                                                                <rect width="16" height="16" fill="white"></rect>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Account Settings </Link>
                                                </li> */}
                                                <li onClick={() => Logout()}>
                                                    <span>
                                                        <svg className="neg-transition-scale" width="16" height="16" viewBox="0 0 16 16"
                                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M11 2.5C11 1.9475 10.5525 1.5 10 1.5H7.75C7.612 1.5 7.5 1.612 7.5 1.75V2.25C7.5 2.388 7.612 2.5 7.75 2.5H10V4.25C10 4.388 10.112 4.5 10.25 4.5H10.75C10.888 4.5 11 4.388 11 4.25V2.5Z"
                                                                fill="currentColor"></path>
                                                            <path
                                                                d="M10 11.75V13.5H7.75C7.612 13.5 7.5 13.612 7.5 13.75V14.25C7.5 14.388 7.612 14.5 7.75 14.5H10C10.5525 14.5 11 14.0525 11 13.5V11.75C11 11.612 10.888 11.5 10.75 11.5H10.25C10.112 11.5 10 11.612 10 11.75Z"
                                                                fill="currentColor"></path>
                                                            <path
                                                                d="M7.49992 8.49999C7.49992 8.63799 7.61192 8.74999 7.74992 8.74999H12.4999V10.323C12.4999 10.3885 12.5789 10.421 12.6249 10.375L14.9439 8.05599C14.9744 8.02549 14.9744 7.97549 14.9439 7.94499L12.6249 5.62499C12.5789 5.57899 12.4999 5.61149 12.4999 5.67699V7.24999H7.74992C7.61192 7.24999 7.49992 7.36199 7.49992 7.49999V8.49999Z"
                                                                fill="currentColor"></path>
                                                            <path
                                                                d="M1.39 2.427L6.146 1.0115C6.322 0.958998 6.5 1.088 6.5 1.268V14.7275C6.5 14.91 6.32 15.0405 6.1415 14.9875L1.39 13.573C1.1585 13.504 1 13.295 1 13.058V2.942C1 2.705 1.1585 2.496 1.39 2.427ZM4.5 8.5C4.5 8.7765 4.7235 9 5 9C5.2765 9 5.5 8.7765 5.5 8.5V7.5C5.5 7.224 5.2765 7 5 7C4.7235 7 4.5 7.224 4.5 7.5V8.5Z"
                                                                fill="currentColor"></path>
                                                        </svg>
                                                        Logout
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div> :
                                    <button className='loginbutton' onClick={() => navigate('/login', { state: { previousPage: window.location.pathname } })}>Login</ button>
                                }
                            </div>
                            <div className="mobile-toggle" >

                                <ul>


                                    {/* <li className="dropdown">
                                    <Link rel="nofollow" onclick="lang1()"><img width="18" height="18"
                                        src="https://www.dall-efree.com/public/datta-able/fonts/flag/flags/4x3/gb.svg" alt="" />
                                        <span>En</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13"
                                            fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M2.64645 4.64605C2.45118 4.84131 2.45118 5.15789 2.64645 5.35316L5.64645 8.35316C5.84171 8.54842 6.15829 8.54842 6.35355 8.35316L9.35355 5.35316C9.54882 5.15789 9.54882 4.84131 9.35355 4.64605C9.15829 4.45079 8.84171 4.45079 8.64645 4.64605L6 7.2925L3.35355 4.64605C3.15829 4.45079 2.84171 4.45079 2.64645 4.64605Z"
                                                fill="#000"></path>
                                        </svg>
                                    </Link>
                                    <div className="submenu" id="lang1">
                                        <ul>
                                            <li><Link to="#"><img width="18" height="18"
                                                src="https://www.dall-efree.com/public/datta-able/fonts/flag/flags/4x3/gb.svg"
                                                alt="" /> English </Link></li>
                                        </ul>
                                    </div>
                                </li> */}

                                    {userData?.is_login ?

                                        <li className="dropdown admin-login">
                                            {/* <img onClick={() => setShowDropdown(!showDropdown)} className="border" width="40" height="40"
                                            src="https://www.dall-efree.com/public/uploads/20221010/f344eaaaa40173a23c693d1b4b24c794.png"
                                            alt="" /> */}
                                            <span onClick={() => setShowDropdown(!showDropdown)} className='user-img front-account'>{userData?.user?.full_name[0]?.toUpperCase()}</span>
                                            {showDropdown === true ?
                                                <div className="submenu" id="login">
                                                    <ul>
                                                        <li>
                                                            <div className="profile">
                                                                {/* <img width="40" height="40"
                                                                src="https://www.dall-efree.com/public/uploads/20221010/f344eaaaa40173a23c693d1b4b24c794.png"
                                                                alt="" /> */}
                                                                <span className='user-img front-account'>{userData?.user?.full_name[0]?.toUpperCase()}</span>
                                                                <p>{userData?.user?.full_name} <span> {userData?.user?.email}</span></p>

                                                            </div>
                                                        </li>
                                                        {/* <li><Link to="#">
                                                    <svg className="neg-transition-scale" width="16" height="16" viewBox="0 0 16 16"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_2465_1852)">
                                                            <path
                                                                d="M2 8.66667H7.33333V2H2V8.66667ZM2 14H7.33333V10H2V14ZM8.66667 14H14V7.33333H8.66667V14ZM8.66667 2V6H14V2H8.66667Z"
                                                                fill="currentColor"></path>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_2465_1852">
                                                                <rect width="16" height="16" fill="white"></rect>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Admin Dashboard </Link>
                                                </li> */}
                                                        <li><Link to="/user/dashboard">
                                                            <svg className="neg-transition-scale" width="16" height="16" viewBox="0 0 16 16"
                                                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g clip-path="url(#clip0_2465_1852)">
                                                                    <path
                                                                        d="M2 8.66667H7.33333V2H2V8.66667ZM2 14H7.33333V10H2V14ZM8.66667 14H14V7.33333H8.66667V14ZM8.66667 2V6H14V2H8.66667Z"
                                                                        fill="currentColor"></path>
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_2465_1852">
                                                                        <rect width="16" height="16" fill="white"></rect>
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                            Dashboard </Link>
                                                        </li>
                                                        {/* <li><Link to="#">
                                                    <svg className="neg-transition-scale" width="16" height="16" viewBox="0 0 16 16"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_2465_1858)">
                                                            <path
                                                                d="M12.7597 8.62667C12.7864 8.42667 12.7997 8.22001 12.7997 8.00001C12.7997 7.78667 12.7864 7.57334 12.7531 7.37334L14.1064 6.32001C14.2264 6.22667 14.2597 6.04667 14.1864 5.91334L12.9064 3.70001C12.8264 3.55334 12.6597 3.50667 12.5131 3.55334L10.9197 4.19334C10.5864 3.94001 10.2331 3.72667 9.83975 3.56667L9.59975 1.87334C9.57308 1.71334 9.43975 1.60001 9.27975 1.60001H6.71975C6.55975 1.60001 6.43308 1.71334 6.40641 1.87334L6.16641 3.56667C5.77308 3.72667 5.41308 3.94667 5.08641 4.19334L3.49308 3.55334C3.34641 3.50001 3.17975 3.55334 3.09975 3.70001L1.82641 5.91334C1.74641 6.05334 1.77308 6.22667 1.90641 6.32001L3.25975 7.37334C3.22641 7.57334 3.19975 7.79334 3.19975 8.00001C3.19975 8.20667 3.21308 8.42667 3.24641 8.62667L1.89308 9.68001C1.77308 9.77334 1.73975 9.95334 1.81308 10.0867L3.09308 12.3C3.17308 12.4467 3.33975 12.4933 3.48641 12.4467L5.07975 11.8067C5.41308 12.06 5.76641 12.2733 6.15975 12.4333L6.39975 14.1267C6.43308 14.2867 6.55975 14.4 6.71975 14.4H9.27975C9.43975 14.4 9.57308 14.2867 9.59308 14.1267L9.83308 12.4333C10.2264 12.2733 10.5864 12.06 10.9131 11.8067L12.5064 12.4467C12.6531 12.5 12.8197 12.4467 12.8997 12.3L14.1797 10.0867C14.2597 9.94001 14.2264 9.77334 14.0997 9.68001L12.7597 8.62667ZM7.99975 10.4C6.67975 10.4 5.59975 9.32001 5.59975 8.00001C5.59975 6.68001 6.67975 5.60001 7.99975 5.60001C9.31975 5.60001 10.3997 6.68001 10.3997 8.00001C10.3997 9.32001 9.31975 10.4 7.99975 10.4Z"
                                                                fill="currentColor"></path>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_2465_1858">
                                                                <rect width="16" height="16" fill="white"></rect>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Account Settings </Link>
                                                </li> */}
                                                        <li onClick={Logout}>
                                                            <span>
                                                                <svg className="neg-transition-scale" width="16" height="16" viewBox="0 0 16 16"
                                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M11 2.5C11 1.9475 10.5525 1.5 10 1.5H7.75C7.612 1.5 7.5 1.612 7.5 1.75V2.25C7.5 2.388 7.612 2.5 7.75 2.5H10V4.25C10 4.388 10.112 4.5 10.25 4.5H10.75C10.888 4.5 11 4.388 11 4.25V2.5Z"
                                                                        fill="currentColor"></path>
                                                                    <path
                                                                        d="M10 11.75V13.5H7.75C7.612 13.5 7.5 13.612 7.5 13.75V14.25C7.5 14.388 7.612 14.5 7.75 14.5H10C10.5525 14.5 11 14.0525 11 13.5V11.75C11 11.612 10.888 11.5 10.75 11.5H10.25C10.112 11.5 10 11.612 10 11.75Z"
                                                                        fill="currentColor"></path>
                                                                    <path
                                                                        d="M7.49992 8.49999C7.49992 8.63799 7.61192 8.74999 7.74992 8.74999H12.4999V10.323C12.4999 10.3885 12.5789 10.421 12.6249 10.375L14.9439 8.05599C14.9744 8.02549 14.9744 7.97549 14.9439 7.94499L12.6249 5.62499C12.5789 5.57899 12.4999 5.61149 12.4999 5.67699V7.24999H7.74992C7.61192 7.24999 7.49992 7.36199 7.49992 7.49999V8.49999Z"
                                                                        fill="currentColor"></path>
                                                                    <path
                                                                        d="M1.39 2.427L6.146 1.0115C6.322 0.958998 6.5 1.088 6.5 1.268V14.7275C6.5 14.91 6.32 15.0405 6.1415 14.9875L1.39 13.573C1.1585 13.504 1 13.295 1 13.058V2.942C1 2.705 1.1585 2.496 1.39 2.427ZM4.5 8.5C4.5 8.7765 4.7235 9 5 9C5.2765 9 5.5 8.7765 5.5 8.5V7.5C5.5 7.224 5.2765 7 5 7C4.7235 7 4.5 7.224 4.5 7.5V8.5Z"
                                                                        fill="currentColor"></path>
                                                                </svg>
                                                                Logout
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div> : ' '}
                                        </li>

                                        : ' '}

                                    <li onClick={() => setShowmobileMenu(!showmobileMenu)}>
                                        <svg id="icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                                            fill="none" className="">
                                            <path d="M22 13H4M22 7H4M22 19H10" stroke="#000" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                        </svg>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </header>
                </>
            }
            {/* {path_name?.pathname?.includes('/user') ? <SidebarNavbar /> : ' '} */}
        </>
    )
}

export default Header