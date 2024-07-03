import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./componant/Footer/Footer";
import Header from "./componant/Header/Header";
// import Footer from "./componant/Front/Footer";
// import Header from "./componant/Front/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/css/style.css'
import './Assets/css/responsive.css'
import './Assets/css/font.css'
import Home from "./componant/Home/Home";
import Login from "./componant/Login/Login";
import Registration from "./componant/Registration/Registration";
import ForgetPassword from "./componant/Login/ForgetPassword";
import ImageGenerator from "./componant/user/ImageGenerator";
import Imagegallery from "./componant/user/ImageGallery";
import Dashboard from "./componant/user/Dashboard";
// import Subscriptions from "./componant/user/Subscriptions";
import { useSelector } from "react-redux";
import MainRequest from "./mainRequest";
import MyAccount from "./componant/user/MyAccount";
import Invoice from "./componant/user/my-account/Invoice";
import AboutUs from "./componant/static_pages/AboutUs";
import Pricing from "./componant/static_pages/Pricing";
import Contactus from "./componant/static_pages/ContactUs";
import Privacypolicy from "./componant/static_pages/PrivacyPolicy";
import TermsCondition from "./componant/static_pages/TermsAndConditions";
import 'react-loading-skeleton/dist/skeleton.css'
import { Faq } from "./componant/static_pages/Faq";
import ResetPassword from "./componant/Login/ResetPassword";
import Thankyou from "./componant/static_pages/Thankyou";
import Verification from "./componant/Login/varification";
import HelpCenter from "./componant/user/HelpCenter";
import MidHome from "./componant/Front/MidHome";
import Refund from "./componant/static_pages/Refund";
import Pricingpolicy from "./componant/static_pages/Pricingpolicy";
import A_Designers_Guide_To_Midjourney_Free_Ai from "./componant/static_pages/blog/A_Designers_Guide_To_Midjourney_Free_Ai";
import TexttoImageAIGeneratorModule from "./componant/static_pages/blog/TexttoImageAIGeneratorModule";
import Aidemystifiedexploring from "./componant/static_pages/blog/Aidemystifiedexploring";
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route index element={<Home />} /> */}
          <Route index element={<MidHome />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/verification" element={<Verification />} /> */}
          <Route path="/registration" element={<Registration />} />
          <Route path="/password/reset" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/user/image-generator/:prompt" element={<ImageGenerator />} />
          <Route path="/user/image-generator" element={<ImageGenerator />} />
          <Route path="/user/image-gallery" element={<Imagegallery />} />
          <Route path="/user/my-account" element={<MyAccount />} />
          <Route path="/user/help-center" element={<HelpCenter />} />
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/invoice" element={<Invoice />} />
          <Route path="/user/thank-you" element={<Thankyou />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact-us" element={<Contactus />} />
          <Route path="/privacy-policy" element={<Privacypolicy />} />
          <Route path="/refund-policy" element={<Refund />} />
          <Route path="/terms-condition" element={<TermsCondition />} />
          <Route path="/pricing-policy" element={<Pricingpolicy />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blog/a-designers-guide-to-midjourney-free-ai" element={<A_Designers_Guide_To_Midjourney_Free_Ai />} />
          <Route path="/blog/text-to-image-ai-generator-module" element={<TexttoImageAIGeneratorModule />} />
          <Route path="/blog/ai-demystified-exploring-the-possibilities" element={<Aidemystifiedexploring />} />
       
        </Routes>
        <MainRequest />
       <Footer />

      </BrowserRouter>

    </div>
  );
}

export default App;
