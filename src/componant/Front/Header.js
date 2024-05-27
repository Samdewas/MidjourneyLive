import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import Logo from '../../Assets/img/new/logo.svg';
import dollaricon from '../../Assets/img/new/dollar.svg';
import usr from '../../Assets/img/new/usr.svg';
import '../../Assets/css/Header.css';
// import { ResultContext } from '../Context/ResultContext';
// import Searchbar from './Searchbar';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Container, Dropdown } from 'react-bootstrap';
// import LoginRegisterModal from './LoginRegisterModal';
import { FaUser } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';
// import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';

const Header = ({ handleFaq, handleHowItWork }) => {
  // const { openModal, onCloseModal, onOpenModal } = useContext(ResultContext);
  // const { isLogin, setMyLoginVal, myLoginVal } = useContext(AuthContext)
  // const { pathname } = useLocation();
  // const { setUserPrompt, generateImage } = useContext(ResultContext);
  const [showHeader, setShowHeader] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const onChangeValue = searchParams.get('search') || '';
  const [show, setShow] = useState(false);
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };

  // useEffect(() => {
  //   setUserPrompt(onChangeValue);
  //   searchParams.get(window.location.search);
  //   if (onChangeValue) {
  //     generateImage(onChangeValue);
  //   }


  // }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const threshold = 100;

    scrollPosition > threshold ? setShowHeader(true) : setShowHeader(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  // const handleLogout = () => {
  //   window.location.reload()
  //   localStorage.setItem(
  //     'isLogin',
  //     JSON.stringify(false),
  //   );
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('isLogin');
  //   toast.success("Logout succesfully")
  // }

  return (
    <div className='custom_max_container header_fixed'>
      <div>

        <Navbar
          className='custom_min_container'
        // expand="lg"
        // className={`Header ${showHeader && 'stickyHeader'} ${pathname === '/' ? 'is-Home' : ''
        //   }`}
        >
          <Container fluid className="w-100 d-flex p-0">
            <div className="logo">
              <Link to={'/'}>
                <img src={Logo} alt="Midjourney free" />

              </Link>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <NavBar handleFaq={handleFaq} handleHowItWork={handleHowItWork} />
            </Navbar.Collapse>




            <><span className='cred_title'><img className='dolar_icon' src={dollaricon} /> Credits : {localStorage.getItem("credit")}</span>
              <Dropdown
                className="account-text"
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
                show={show}
              >
                <Dropdown.Toggle className="" id="dropdown-basic">
                  <img className='after_login' src={usr} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item >{JSON.parse(localStorage.getItem("user"))?.full_name}</Dropdown.Item>

                  <Dropdown.Divider />
                  <Dropdown.Item >
                    <span><GoSignOut /> Sign out</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown></>

            <Link
              className="btn-green"

            >
              Sign in
            </Link>

          </Container>
        </Navbar>

        <div className="Header result-header px-md-4 px-3">
          <div className="logo">
            <Link to={'/'}>
              <img src={Logo} alt="Midjourney free" />

            </Link>
          </div>

          {/* <div className="result-searchbar">
              <Searchbar />
            </div> */}

          {/* <NavBar/> */}
          {/* <div className="account-avatar" onClick={onOpenModal}>
              <Link>AI</Link>
            </div> */}
        </div>

        {/* <LoginRegisterModal openModal={openModal} onCloseModal={onCloseModal} /> */}
      </div>
    </div>
  );
};

export default Header;
