import axios from "axios";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { base_url } from "../../Store/constant";
import { credit_count, plan_details, user } from "../../Reducer/homeReducer";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import logo from "../../Assets/img/new/logo.svg";
import { jwtDecode } from "jwt-decode";
import Verification from "../Login/varification";
import generateimg from "../../Assets/img/loader.gif";
import { Helmet } from "react-helmet";
const Registration = () => {
  const [loader, setLoader] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [c_password, setC_password] = React.useState("");
  const [showverification, setShowverification] = React.useState(false);

  const userData = useSelector((state) => state.persistedReducer.home.userData);
  useEffect(() => {
    if (userData?.is_login) {
      navigate("/");
    }
  }, []);

  const submitRegister = (e) => {
    e.preventDefault();
    
    if (password != c_password) {
      swal("Password & Confirm password does not match!");
    } else {
      setLoader(true);
      const data = {
        name: firstname + " " + lastname,
        email,
        password,
        confirm_password: password,
      };
      axios
        .post(base_url + "/signup", data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then(async (response) => {
          setLoader(false);
          if (response.status == 200) {
            setShowverification(true);
          } else {
            return swal(response.data.msg, "", "error");
          }
        })
        .catch((error) => {
          setLoader(false);
          swal(error.response.data.msg, "", "error");
        });
    }
  };
  const resendotp = () => {
    axios
      .post(
        base_url + "/resendOTP",
        { email },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          swal(response.data.msg, "", "success");
        } else {
          swal(response.data.msg);
        }
      })
      .catch((error) => {
        swal(error.response.data.msg, "", "error");
      });
  };

  const responseGoogle = (response) => {
    var info = jwtDecode(response.credential);

    const data = {
      name: info.name,
      google_id: info.sub,
      email: info.email,
      google_token: "",
      google_refresh_token: "",
      avatar: info.picture,
    };
    axios
      .post(base_url + "/googleLogin", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        if (response.status == 200) {
          swal(response.data.msg, "", "success");
          var userdata = {
            token: response.data.data.access_token,
            stability_key: response.data.data.stability_key,
            user: response.data.data.user,
            subscription: response.data.data.subcription_details,
            is_login: true,
          };
          dispatch(user(userdata));
          dispatch(
            credit_count(
              response.data.data.plan_details?.credit_count == null
                ? 0
                : response.data.data.plan_details?.credit_count
            )
          );
          dispatch(plan_details(response.data.data.plan_details));
          navigate(-1);
        } else {
          return swal(response.data.msg, "", "error");
        }
      })
      .catch((error) => {
        swal(error.response.data.msg, "", "error");
      });
  };
  const onFailure = (response) => {
    console.log("FAILED", response);
  };
  return (
    showverification ?   
    <Verification email={email} handleshow={()=> console.log("success")} resendotp={()=> resendotp()}/>
    :
    <>
   <Helmet>
        <title>Discover Mid Journey AI Register Now</title>
        <meta name="description" content="Join the creative revolution with Mid Journey Register now to access a world of endless imagination. Dive into a realm where your ideas come to life effortlessly. Start your journey today."></meta>
        <link rel="canonical" to= "https://MidJourneyfree.com/registration"/>
      </Helmet>
    <section className="login_page">
      <div className="container">
        {/* <Link to="/">
          <img
            style={{ margin: "auto" }}
            width={200}
            height={40}
            src={logo}
            alt="MidJourneyfree"
          />
        </Link> */}

        <div className="loginBox">
          <h2 className="title font-Figtree text-center text-24 font-bold text-color-14 dark:text-white">
            Create your account
          </h2>
        
          <div className="or-line">Register with your email</div>

          <div className="form-div mt-4">
            <form onSubmit={submitRegister}>
              <Row>
                <Col md={6}>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      className="form-control"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      required
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      className="form-control"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      required
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                </Col>
              </Row>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email Address"
                />
              </div>
              {/* <p className='forgetpassword '>Forgot Password?</p> */}
              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  className="form-control"
                  value={c_password}
                  onChange={(e) => setC_password(e.target.value)}
                  required
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
              <p className="tnc-link">
                By creating an account you agree to our{" "}
                <Link target="_blank" to={"/terms-condition"}>
                  {" "}
                  terms and conditions.
                </Link>
              </p>
              <button type="submit" className="signIn-btn">
                Register {loader ? (
                        <img className="gen_loader d-inline ms-2" src={generateimg} />
                      ) : (
                        ""
                      )}
              </button>
              <p className="registration-link">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </form>
          </div>

          
          <div className="google_signup_main">
            <GoogleLogin onSuccess={responseGoogle} onError={onFailure} />
          </div>

        </div>
      </div>
    </section>
    </>
  );
};

export default Registration;
