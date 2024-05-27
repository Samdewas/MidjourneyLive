import React, { useEffect, useState } from 'react'
import '../../Assets/css/userdashboard.css'
import { Container } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link, useNavigate } from 'react-router-dom';
import { credit_count, generatedData, user } from '../../Reducer/homeReducer';
import swal from 'sweetalert';
import avatarUser from '../../Assets/img/avatarUser.png'
import logo from '../../Assets/img/new/logo.svg'
import SidebarNavbar from './SidebarNavbar';
import { useDispatch, useSelector } from 'react-redux'
import { isDesktop, isMobile } from 'react-device-detect';

const UserHeader = () => {
    const path_name = useSelector(state => state.persistedReducer.home.path_name);
    const userData = useSelector(state => state.persistedReducer.home.userData);
    const [showmobileMenu, setShowmobileMenu] = useState(false);
    const [showmyAccount, setShowmyAccount] = useState(false);
    const handleClick = () => {
        setShowmobileMenu(!showmobileMenu);
    };

    //   useEffect(() => {

    //     const handleClickBody = () => {
    //         setShowmyAccount(!showmyAccount);
    //       };

    //     document.body.addEventListener('click', handleClickBody);
    //     return () => {
    //       document.body.removeEventListener('click', handleClickBody);
    //     };
    //   }, []);


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Logout = () => {
        dispatch(user([]));
        dispatch(credit_count(0));
        dispatch(generatedData(null));
        navigate('/');
        swal("Logout Successfully!", "", "success");
    }
    const usernameWithImage = ({ title, image }) => (
        <div>
            {/* <img src={image} alt="Tab Icon" className="tab-image" /> */}
            <span className='userimg'>{image}</span>
            <span className='username'>{title}</span>
        </div>
    );
    return (
        <>
            <section className='user_dashborad_header'>
                <Container fluid className='p-0'>

                    <div className='user_dashborad_header_inner'>
                        {isMobile ?
                            <span className='mobile-toggle-icon' onClick={() => setShowmobileMenu(!showmobileMenu)}>
                                <svg id="icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                                    fill="none" className="">
                                    <path d="M22 13H4M22 7H4M22 19H10" stroke="#fff" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                </svg>
                            </span> : ' '}
                        {isMobile ?
                            <Link to='/'><img className='dashborad-logo' width={200} height={40} alt='' src={logo} /></Link> :
                            <Link to='/user/dashboard' className='pageTitle'>
                                {/* <img className='dashborad-logo' width={200} height={40} alt='' src={logo} /> */}
                                {window.location.pathname === '/user/dashboard' ? 'Dashboard' :
                                    window.location.pathname === '/user/image-generator' ? 'Mid Journey Generator' :
                                        window.location.pathname === '/user/image-gallery' ? 'Gallery' :
                                            window.location.pathname === '/user/help-center' ? 'Help Center' :
                                                window.location.pathname === '/user/my-account' ? 'My Account'
                                                    : ' '}

                            </Link>}
                        <div className='user-info' onClick={() => setShowmyAccount(!showmyAccount)}>
                            {/* <img className='user-img' width={40} height={40} src={avatarUser} alt='' /> */}
                            {/* <DropdownButton id="dropdown-basic-button" title="User Name" >
                            <Dropdown.Item to="/user/my-account">My Account</Dropdown.Item>
                            <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
                        </DropdownButton> */}
                            <span className='user-img'>{userData?.user?.full_name[0]?.toUpperCase()}</span>
                            {/* <img  className='user-img' width={40} height={40} src={avatarUser} alt='' /> */}
                            <span className='uname'>{userData?.user?.full_name}</span>

                            <svg className='d-inline' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0001 18.3332C5.40008 18.3332 1.66675 14.5916 1.66675 9.9999C1.66675 5.3999 5.40008 1.66656 10.0001 1.66656C14.5917 1.66656 18.3334 5.3999 18.3334 9.9999C18.3334 14.5916 14.5917 18.3332 10.0001 18.3332ZM13.3334 8.3499C13.0834 8.10823 12.6917 8.10823 12.4501 8.35823L10.0001 10.8166L7.55008 8.35823C7.30841 8.10823 6.90841 8.10823 6.66675 8.3499C6.41675 8.5999 6.41675 8.99156 6.66675 9.23323L9.55841 12.1416C9.67508 12.2582 9.83341 12.3249 10.0001 12.3249C10.1667 12.3249 10.3251 12.2582 10.4417 12.1416L13.3334 9.23323C13.4584 9.11656 13.5167 8.95823 13.5167 8.7999C13.5167 8.63323 13.4584 8.4749 13.3334 8.3499Z" fill="#137a83" />
                            </svg>

                            {isDesktop || showmyAccount === true ?
                                <ul className='user-info-submenu'>
                                    <li><Link to='/user/my-account'>My Account</Link></li>
                                    <li><span onClick={() => Logout()}>Logout</span></li>
                                </ul>
                                : ' '}
                        </div>
                    </div>

                    {/* {isMobile ?
                        <Link to='/user/dashboard' className='pageTitle mobilePageTitle'>
                            {window.location.pathname === '/user/dashboard' ? 'Dashboard' :
                                window.location.pathname === '/user/image-generator' ? 'Mid Journey Generator' :
                                    window.location.pathname === '/user/image-gallery' ? 'Gallery' :
                                        window.location.pathname === '/user/help-center' ? 'Help Center' :
                                            window.location.pathname === '/user/my-account' ? 'My Account'
                                                : ' '}

                        </Link> : ' '} */}
                </Container>
            </section>
            {isDesktop || showmobileMenu === true ? path_name?.pathname?.includes('/user') ? <SidebarNavbar showmobileMenu={showmobileMenu} handleClick={handleClick} /> : ' ' : ' '}
        </>
    )
}

export default UserHeader