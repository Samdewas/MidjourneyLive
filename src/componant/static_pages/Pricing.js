import React, { useEffect, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import "../../Assets/css/pricing.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { base_url } from "../../Store/constant";
import swal from "sweetalert";
import PayPalSubscription from "../comman/PaypalSubscription";
import { Link, useNavigate } from "react-router-dom";
import { credit_count, plan_details, user } from "../../Reducer/homeReducer";
import Skeleton from "react-loading-skeleton";
import RazorpaySubscriptionButton from "../Razorpay";
import Paypal from "../comman/Paypal";
import { Helmet } from "react-helmet";
const Pricing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.persistedReducer.home.userData);
  const [currency, setCurrency] = useState("USD");
  const [onetime, setOnetime] = useState(false);
  const [showBillingType, setShowBillingType] = useState("month");
  const [pricingdata, setPricingdata] = useState([]);
  const [loader, setLoader] = useState(true);
  const handlePricing = () => {
    axios
      .get(base_url + "/getPlans?currency=" + currency, {
        headers: { Authorization: `Bearer ${userData?.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setPricingdata(response?.data?.data);
        } else {
          setLoader(false);
          swal(response.data.msg, "", "error");
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  // useEffect(() => {
  //   fetch("https://ipinfo.io/json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.country == "IN") {
  //         setCurrency("INR");
  //       }
  //       // Extract country information from the response
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching IP information:", error);
  //     });
  // }, []);

  useEffect(() => {
    handlePricing();
  }, []);

  const handlePurchase = (plan_id, count, data) => {
    const req = {
      plan_id: plan_id,
      payment_response: data,
      plan_type: onetime ? "credit" : "subscription",
    };
    axios
      .post(base_url + "/user/assignPlanToUser", req, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData?.token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          userdata();
          swal(response.data.msg, "", "success");
          if (plan_id == 1) {
            navigate("/user/dashboard");
          } else {
            navigate("/user/thank-you");
          }
        } else {
          swal(response.data.msg, "", "error");
        }
      })
      .catch((error) => {
        swal(error.response.data.msg, "", "error");
      });
  };
  const userdata = () => {
    axios
      .get(base_url + "/user", {
        headers: { Authorization: `Bearer ${userData?.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          dispatch(
            credit_count(
              response.data.data.plan_details?.credit_count == null
                ? 0
                : response.data.data.plan_details?.credit_count
            )
          );
          dispatch(plan_details(response.data.data.plan_details));
        } else {
          swal(response.data.msg, "", "error");
        }
      })
      .catch((error) => {
        swal(error.response.data.msg, "", "info");
      });
  };
  return (
    <>
    <Helmet>
        <title>Pricing | Mid Journey Free</title>
        <meta name="description" content="Explore Mid Journey Free pricing page for transparent and accessible information on our offerings. Discover the best plan for your needs with clear pricing details and features."></meta>
        <link rel="canonical" to= "https://MidJourneyfree.com/pricing"/>
        <script src="https://www.paypal.com/sdk/js?client-id=AZ5e8vcidN92xFcUhs-033fP7DRqrsczTZwiwEfCTnckczXtresOHYh7sliWRFJ8-Qwtn1ZSMTP_i-F-&currency=USD&intent=subscription"></script>
      </Helmet>
      <section className="pricing_page">
        <Container className="pt-5">
          <div className="heading text-center mb-2 pb-2">
            <h1 className="mb-3">Choose your plan</h1>
            <h3>
              Our billing cycle is recurring, but you can cancel anytime <br />
              hassle-free or you can take advantage of credits for on-demand use
            </h3>
          </div>

          {/* <div class="toggle">
            <label>Annually </label>
            <div class="toggle-btn">
              <input type="checkbox" class="checkbox" id="checkbox" />
              <label class="sub" id="sub" for="checkbox">
                <div class="circle"></div>
              </label>
            </div>
             <label> Monthly</label> 
          </div> */}
         {!loader ? <><div className="billing-type-btns">
            <div className="offernote">
              Pay annually and <span>Save up to 17%</span>{" "}
            </div>
            <button
              onClick={() => {setShowBillingType("month"); setOnetime(false)}}
              className={showBillingType === "month" ? "active" : " "}
            >
              Monthly
            </button>
            <button
              onClick={() => {
                setShowBillingType("year");
                setOnetime(true);
              }}
              className={showBillingType === "year" ? "active" : " "}
            >
              Yearly
            </button>
          </div>
          {/* <div className="billing-type-btns currency_converter mb-4">
            <button
              onClick={() => setCurrency("USD")}
              className={currency === "USD" ? "active" : " "}
            >
              USD
            </button>
            <button
              onClick={() => setCurrency("INR")}
              className={currency === "INR" ? "active" : " "}
            >
              INR
            </button>
          </div> */}
          
            <div className="currency_converter">
              <button
              disabled={showBillingType === "year"}
                onClick={() => setOnetime(false)}
                className={onetime ? "" : "active"}
              >
                <span></span> Subscription
              </button>
              <button
                onClick={() => setOnetime(true)}
                className={onetime ? "active" : " "}
              >
                <span></span> Credit
              </button>
            </div> </> :
                    <> <div className="currency_converter"> <Skeleton width={200} height={40} /></div>
                     <div className="currency_converter"> <Skeleton width={200} height={40} /></div></>
                    }
          
          {loader ? (
            <div class="cards">
              {[0, 1, 2].map((index) => (
                <div class="card" key={index}>
                  <ul>
                    <li class="pack">
                      <Skeleton width={200} height={40} />{" "}
                    </li>
                    <li id="basic" class="price">
                      {" "}
                      <Skeleton width={130} height={50} />
                      <span className="billed-yearly">
                        <Skeleton width={130} height={30} />
                      </span>
                      <span className="billed-yearly">
                        <Skeleton width={130} height={30} />
                      </span>
                    </li>
                    <p>
                      <Skeleton className="mb-2 mt-4" height={30} />
                    </p>
                    <p>
                      <Skeleton className="mb-2" height={30} />
                    </p>
                    <p>
                      <Skeleton className="mb-2" height={30} />
                    </p>
                    <p>
                      <Skeleton className="mb-2" height={30} />
                    </p>
                    <p>
                      <Skeleton className="mb-2" height={30} />
                    </p>
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div class="cards">
              <div class="card">
                <ul>
                  <li class="pack">{pricingdata[0]?.title} </li>
                  <li id="basic" class="price">
                    {currency == "INR"
                      ? `₹${(pricingdata[0]?.price * 82)?.toFixed(0)}`
                      : `$${pricingdata[0]?.price}`}{" "}
                    <span className="month_price">/Mo</span>{" "}
                    <span className="billed-yearly">{onetime ? "One Time" : "Billed Monthly"}</span>
                  </li>

                  <div
                    className="all_features"
                    dangerouslySetInnerHTML={{
                      __html: pricingdata[0]?.features,
                    }}
                  />
                  <li>
                    {userData?.is_login ? (
                      <button
                        class="btn"
                        onClick={() =>
                          handlePurchase(pricingdata[0]?.id, 5, null)
                        }
                      >
                        Use For Free
                      </button>
                    ) : (
                      <Link to="/login" class="btn">
                        Use For Free
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
              <div class="card active">
                <ul>
                  <li class="pack">
                    {pricingdata[1]?.title}
                    <span className="most-popular">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 1024 1024"
                        class="w-[16px] mr-1 fill-orange-400"
                        preserveAspectRatio="none"
                      >
                        <path
                          fill="evenodd"
                          clip-rule="evenodd"
                          d="M512.001097 1023.963431a508.744285 508.744285 0 0 1-362.030508-149.931826 508.744285 508.744285 0 0 1-149.931826-362.030508 508.561442 508.561442 0 0 1 149.931826-362.030508 508.707717 508.707717 0 0 1 362.030508-149.931826 508.561442 508.561442 0 0 1 362.030508 149.931826 508.561442 508.561442 0 0 1 149.931826 362.030508 508.707717 508.707717 0 0 1-149.931826 362.030508 508.561442 508.561442 0 0 1-362.030508 149.931826zM379.841677 254.447474a12.872196 12.872196 0 0 0-6.436098 1.7553 13.164746 13.164746 0 0 0-6.289823 13.530433l39.969631 191.181363a12.835627 12.835627 0 0 1-6.180116 14.18867L231.847994 572.814909a12.543077 12.543077 0 0 0-6.180117 13.786414 12.689352 12.689352 0 0 0 11.446015 9.873559l193.814313 20.259081a14.152102 14.152102 0 0 1 11.701996 10.531797l40.481593 190.779107a12.945333 12.945333 0 0 0 11.190034 9.946696h1.170199a13.311021 13.311021 0 0 0 11.957978-7.496591l79.134749-178.126323a13.347589 13.347589 0 0 1 12.104252-7.82571h1.316475l194.18 20.405356a10.056403 10.056403 0 0 0 1.462749 0 12.543077 12.543077 0 0 0 11.519153-7.569729 12.76249 12.76249 0 0 0-3.291187-14.627496l-152.345363-137.388749 83.047604-186.939389a12.46994 12.46994 0 0 0-3.035205-13.64014 12.46994 12.46994 0 0 0-8.813066-3.656873 13.311021 13.311021 0 0 0-5.119623 1.023924l-168.911002 97.6751a12.835627 12.835627 0 0 1-6.509235 1.755299 13.201314 13.201314 0 0 1-9.032478-3.656874l-144.885341-130.40412a12.835627 12.835627 0 0 0-8.337672-3.035205z"
                        ></path>
                      </svg>{" "}
                      most popular
                    </span>
                  </li>
                  <li id="professional" class="price">
                    {currency == "INR"
                      ? showBillingType === "year"
                        ? `₹${(
                            (pricingdata[3]?.price) *
                            82
                          )?.toFixed(0)}`
                        : `₹${(
                            (pricingdata[1]?.price ) *
                            82
                          )?.toFixed(0)}`
                      : showBillingType === "year"
                      ? `$${pricingdata[3]?.price}`
                      : `$${onetime ? pricingdata[1]?.price + 3 :pricingdata[1]?.price}`}{" "}
                    <span className="month_price">
                      {showBillingType === "year" ? "/Year" : "/Mo "}
                    </span>{" "}
                    {onetime ?<span className="billed-yearly">
                     One Time
                    </span> : 
                    <span className="billed-yearly">
                    Billed{" "}
                    {showBillingType === "year" ? "Yearly" : "Monthly "}
                  </span>}
                  </li>

                  {/* <RazorpaySubscriptionButton id={"pl_NlnbFfciOpYOk7"} /> */}

                  <div
                    className="all_features"
                    dangerouslySetInnerHTML={{
                      __html:
                        showBillingType === "year"
                          ? pricingdata[3]?.features
                          : pricingdata[1]?.features,
                    }}
                  />

                  <li>
                    {userData?.is_login ? (
                      onetime ? (
                        showBillingType === "year" ? (
                          <Paypal
                            plan="3"
                            handleSubmit={(data) =>
                              handlePurchase(pricingdata[3]?.id, 12000, data)
                            }
                          />
                        ) : (
                          <Paypal
                            plan="1"
                            handleSubmit={(data) =>
                              handlePurchase(pricingdata[1]?.id, 1000, data)
                            }
                          />
                        )
                      ) : showBillingType === "year" ? (
                        <PayPalSubscription
                          plan_id={"P-2EM414583K3113725MX6VWKI"}
                          handleSubmit={(data) =>
                            handlePurchase(pricingdata[3]?.id, 12000, data)
                          }
                        />
                      ) : (
                        <PayPalSubscription
                          plan_id={"P-7HD915425V266700EMX6VBPQ"}
                          handleSubmit={(data) =>
                            handlePurchase(pricingdata[1]?.id, 1000, data)
                          }
                        />
                      )
                    ) : (
                      <Link to="/login" class="btn">
                        Buy Now
                      </Link>
                    )}

                    {/* } */}
                  </li>
                </ul>
              </div>
              <div class="card">
                <ul>
                  <li class="pack">
                    {pricingdata[2]?.title}
                    <span className="most-popular">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 1024 1024"
                        class="w-[16px] mr-1 fill-orange-400"
                        preserveAspectRatio="none"
                      >
                        <path
                          fill="evenodd"
                          clip-rule="evenodd"
                          d="M512.001097 1023.963431a508.744285 508.744285 0 0 1-362.030508-149.931826 508.744285 508.744285 0 0 1-149.931826-362.030508 508.561442 508.561442 0 0 1 149.931826-362.030508 508.707717 508.707717 0 0 1 362.030508-149.931826 508.561442 508.561442 0 0 1 362.030508 149.931826 508.561442 508.561442 0 0 1 149.931826 362.030508 508.707717 508.707717 0 0 1-149.931826 362.030508 508.561442 508.561442 0 0 1-362.030508 149.931826zM379.841677 254.447474a12.872196 12.872196 0 0 0-6.436098 1.7553 13.164746 13.164746 0 0 0-6.289823 13.530433l39.969631 191.181363a12.835627 12.835627 0 0 1-6.180116 14.18867L231.847994 572.814909a12.543077 12.543077 0 0 0-6.180117 13.786414 12.689352 12.689352 0 0 0 11.446015 9.873559l193.814313 20.259081a14.152102 14.152102 0 0 1 11.701996 10.531797l40.481593 190.779107a12.945333 12.945333 0 0 0 11.190034 9.946696h1.170199a13.311021 13.311021 0 0 0 11.957978-7.496591l79.134749-178.126323a13.347589 13.347589 0 0 1 12.104252-7.82571h1.316475l194.18 20.405356a10.056403 10.056403 0 0 0 1.462749 0 12.543077 12.543077 0 0 0 11.519153-7.569729 12.76249 12.76249 0 0 0-3.291187-14.627496l-152.345363-137.388749 83.047604-186.939389a12.46994 12.46994 0 0 0-3.035205-13.64014 12.46994 12.46994 0 0 0-8.813066-3.656873 13.311021 13.311021 0 0 0-5.119623 1.023924l-168.911002 97.6751a12.835627 12.835627 0 0 1-6.509235 1.755299 13.201314 13.201314 0 0 1-9.032478-3.656874l-144.885341-130.40412a12.835627 12.835627 0 0 0-8.337672-3.035205z"
                        ></path>
                      </svg>{" "}
                      best valued
                    </span>
                  </li>
                  <li id="master" class="price">
                    {currency == "INR"
                      ? showBillingType === "year"
                        ? `₹${(
                            (pricingdata[4]?.price) *
                            82
                          )?.toFixed(0)}`
                        : `₹${(
                            (pricingdata[2]?.price) *
                            82
                          )?.toFixed(0)}`
                      : showBillingType === "year"
                      ? `$${pricingdata[4]?.price}`
                      : `$${onetime ? pricingdata[2]?.price + 5 :pricingdata[2]?.price}`}{" "}
                    <span className="month_price">
                      {showBillingType === "year" ? "/Year" : "/Mo "}
                    </span>{" "}
                    {onetime ?<span className="billed-yearly">
                     One Time
                    </span> : <span className="billed-yearly">
                      Billed{" "}
                      {showBillingType === "year" ? "Yearly" : "Monthly "}
                    </span>
}
                  </li>

                  <div
                    className="all_features"
                    dangerouslySetInnerHTML={{
                      __html:
                        showBillingType === "year"
                          ? pricingdata[4]?.features
                          : pricingdata[2]?.features,
                    }}
                  />
                  <li>
                    {userData?.is_login ? (
                      onetime ? (
                        showBillingType === "year" ? (
                          <Paypal
                            plan="4"
                            handleSubmit={(data) =>
                              handlePurchase(pricingdata[4]?.id, 36000, data)
                            }
                          />
                        ) : (
                          <Paypal
                            plan="2"
                            handleSubmit={(data) =>
                              handlePurchase(pricingdata[2]?.id, 3000, data)
                            }
                          />
                        )
                      ) : showBillingType === "year" ? (
                        <PayPalSubscription
                          plan_id={"P-73T350943S8912410MX6VXBA"}
                          handleSubmit={(data) =>
                            handlePurchase(pricingdata[4]?.id, 36000, data)
                          }
                        />
                      ) : (
                        <PayPalSubscription
                          plan_id={"P-2NF048249J429300YMX6VCSQ"}
                          handleSubmit={(data) =>
                            handlePurchase(pricingdata[2]?.id, 3000, data)
                          }
                        />
                      )
                    ) : (
                      <Link to="/login" class="btn">
                        Buy Now
                      </Link>
                    )}
                    {/* } */}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </Container>
      </section>

      <Container>
        <div className="pricing_faq mb-5">
          <div className="faq-section py-5">
            <h2 className="text-center mb-5">Frequently Asked Questions</h2>

            <Accordion defaultActiveKey="0">
              <Row className="justify-content-center">
                <Col md={10}>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      Can I cancel my subscription at any time?
                    </Accordion.Header>
                    <Accordion.Body>
                      It's easy to cancel your subscription anytime from your
                      account settings. Please note that the cancellation will
                      take effect at the end of your current billing cycle.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      How is billing processed for subscription plans?
                    </Accordion.Header>
                    <Accordion.Body>
                      Billing is processed on a recurring basis and one time
                      credit according to your chosen billing cycle (monthly or
                      annually). You'll receive notifications and invoices to
                      keep you informed about upcoming payments.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      Is there a refund policy?
                    </Accordion.Header>
                    <Accordion.Body>
                      You get a 3-day money-back guarantee on all plans. Submit
                      your request via our{" "}
                      <Link to={"/contact-us"}>
                        <u>
                          <b>contact form</b>
                        </u>
                      </Link>
                      , and we will refund the payment made if the request is
                      made within 3 days after the sign-up.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      Which payment methods do you accept?
                    </Accordion.Header>
                    <Accordion.Body>
                      We offer the convenience of PayPal for all your payments.
                      PayPal allows you to make secure transactions using major
                      credit cards and well-known digital wallets, such as Apple
                      Pay and Google Pay. If you have any questions about
                      payments.
                    </Accordion.Body>
                  </Accordion.Item>
                
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>
                      Is there a commitment period for subscription plans?
                    </Accordion.Header>
                    <Accordion.Body>
                      Our subscription plans are flexible, and you can choose
                      between monthly or annual billing cycles. There's no
                      long-term commitment, allowing you to adjust your plan
                      based on your evolving requirements.
                      <Link to="mailto:support@midjourneyfree.ai">
                        support@midjourneyfree.ai
                      </Link>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="5">
                    <Accordion.Header>
                      Is the checkout process secure?
                    </Accordion.Header>
                    <Accordion.Body>
                      Absolutely, our payment processing is handled by PayPal,
                      one of the leading and most trusted payment providers
                      worldwide. Rest assured that your payments are processed
                      securely and with confidence.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="6">
                    <Accordion.Header>
                      What happens if I exceed the limits of my chosen plan?
                    </Accordion.Header>
                    <Accordion.Body>
                      You will not be able to exceed the allocated number of
                      generations provided. Once you consume all of them, your
                      account will be downgraded to a free plan.
                    </Accordion.Body>
                  </Accordion.Item>
                  {/* <Accordion.Item eventKey="7">
                    <Accordion.Header>Are there any hidden fees?</Accordion.Header>
                    <Accordion.Body>
                      No, there are no hidden fees. Our pricing is transparent
                      and clear-cut. You only pay for the services and features
                      you select, with no extra or concealed costs.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="8">
                    <Accordion.Header>
                      How is my personal information protected on the dashboard?
                    </Accordion.Header>
                    <Accordion.Body>
                      We take the security and privacy of your personal
                      information seriously. Our platform employs
                      industry-standard encryption protocols to secure data
                      transmission, and access to secure authentication methods
                      often protect your dashboard.
                    </Accordion.Body>
                  </Accordion.Item> */}
                </Col>
              </Row>
            </Accordion>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Pricing;
