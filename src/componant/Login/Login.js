import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { base_url } from "../../Store/constant";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { credit_count, plan_details, user } from "../../Reducer/homeReducer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import logo from "../../Assets/img/new/logo.svg";
import { jwtDecode } from "jwt-decode";
import Verification from "./varification";
import generateimg from "../../Assets/img/loader.gif";
import { Helmet } from "react-helmet";
const Login = () => {
  const [loader, setLoader] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showverification, setShowverification] = useState(false);

  const userData = useSelector((state) => state.persistedReducer.home.userData);
  useEffect(() => {
    if (userData?.is_login) {
      navigate("/");
    }
  }, []);

  const handlesubmitlogin = (e) => {
    e.preventDefault();
    setLoader(true);
    axios
      .post(
        base_url + "/login",
        { email, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setLoader(false);
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
          setEmail("");
          setPassword("");
          if (location?.state?.previousPage == "/") {
            navigate("/user/dashboard");
          } else {
            navigate(-1);
          }
        } else {
          swal(response.data.msg, "", "error");
        }
      })
      .catch((error) => {
        setLoader(false);
        if (error.response.data.is_email_verified == false) {
          resendotp();
        } else {
          swal(error.response.data.msg, "", "info");
        }
      });
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
          setShowverification(true);
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
    console.log("google", info);

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
          setEmail("");
          setPassword("");
          if (location?.state?.previousPage == "/") {
            navigate("/user/dashboard");
          } else {
            navigate(-1);
          }
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
  return showverification ? (
    <Verification email={email} handleshow={() => setShowverification(false)} resendotp={()=> resendotp()} />
  ) : (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Access Your Mid Journey AI Account | Mid Journey</title>
        <meta name="description" content="Mid Journey by logging into your account. Dive into a world of imaginative possibilities and bring your ideas to life with ease. Sign in now and embark on your journey of limitless creativity."></meta>
        <link rel="canonical" to= "https://MidJourneyfree.com/login"/>
      </Helmet>
    <section className="login_page">
      <div className="container">
        <Link to="/">
          <img
            style={{ margin: "auto" }}
            width={200}
            height={40}
            src={logo}
            alt="MidJourneyfree"
          />
        </Link>

        <div className="loginBox">
          <h2 className="title font-Figtree text-center text-24 font-bold text-color-14 dark:text-white">
            Sign in to Mid Journey AI
          </h2>

          {/* <div className="or-line">Or sign in with your email</div> */}

          <div className="form-div mt-4">
            <form onSubmit={handlesubmitlogin}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                />
              </div>
              <Link to="/password/reset" className="forgetpassword ">
                Forgot Password?
              </Link>
              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="signIn-btn">
                Sign in {loader ? (
                        <img className="gen_loader d-inline ms-2" src={generateimg} />
                      ) : (
                        ""
                      )}
              </button>
              <p className="registration-link">
                Don’t have an account?{" "}
                <Link to="/registration">Register for free</Link>
              </p>
            </form>
          </div>

          {/* <div className="or-line mt-4">Or Sign in with Google</div> */}
          {/* <div className="google_signup_main">
            <GoogleLogin onSuccess={responseGoogle} onError={onFailure} />
          </div> */}
        </div>
      </div>
    </section>
    </>
  );
};

export default Login;
