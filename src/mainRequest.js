import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { location } from "./Reducer/homeReducer";
import { Helmet } from "react-helmet";

export default function MainRequest() {
  const routePath = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(location(routePath));
    GotoTop();
    GoogleAnalytics();
  }, [routePath]);

  //-------------------- go to top ---------------------
  const GotoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //------------------- google analytics ----------------------
  const GoogleAnalytics = () => {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-CJSPGZ65NW";
    script.async = true;
    document.body.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-CJSPGZ65NW", { page_path: window.location.pathname });
  };
 
  return null
}
