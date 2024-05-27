import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { base_url } from "../../../Store/constant";
import axios from "axios";
import swal from "sweetalert";
import { credit_count, plan_details, user } from "../../../Reducer/homeReducer";
import moment from "moment";

const Subscription = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.persistedReducer.home.userData);
  const planDetails = useSelector(
    (state) => state.persistedReducer.home.plan_details
  );
  const creditCount = useSelector(
    (state) => state.persistedReducer.home.credit_count
  );
  const credit_per =
    planDetails?.price_plan_id == 2
      ? (1000 - creditCount) / (1000 / 100)
      : planDetails?.price_plan_id == 3
      ? (3000 - creditCount) / (3000 / 100)
      : (5 - creditCount) / (5 / 100);

  const handleCancel_Subs = (e) => {
    swal({
      title: "Are you sure?",
      text: "Do you really want to cancel your subscription ?",
      icon: "info",
      buttons: ["Yes","No"],
      dangerMode: true,
    }).then(function (isConfirm) {
      if (isConfirm) {
        axios
          .post(base_url + "/user/cancelSubscription", "", {
            headers: { Authorization: `Bearer ${userData?.token}` },
          })
          .then((response) => {
            if (response.status == 200) {
              userdata();
              swal(
                "Your subscription has been successfully canceled!",
                "",
                "success"
              );
            } else {
              swal(response.data.msg, "", "error");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
  return planDetails != null ? (
    <div className="Subscription">
      <h3 className="title">Subscription</h3>
      <hr />

      <Row className="mt-4 mb-4">
        <Col md={6}>
          <div className="bg-color-F6 dark:bg-color-3A rounded-xl lg:p-6 p-4 w-full xl:w-full details-body 8xl:w-[71.2%]">
            <div className="d-flex justify-between items-center">
              <p className="text-color-14 dark:text-white text-24 font-Figtree font-semibold">
                Current Plan :
                <span className="heading-3"> {planDetails?.plan_name} </span>
                {/* <span className="text-sm text-color-14 dark:text-white">
                  {" "}
                  ({planDetails?.status})
                </span> */}
              </p>
            </div>
            <p className="mt-2 text-color-14 dark:text-white font-Figtree font-normal text-15"></p>

            <div className="Imagemidjurny">
              <p className="text-color-14 dark:text-white text-15 font-medium font-Figtree mt-6">
                Image
              </p>
              <div className="relative h-2 w-full bg-white dark:bg-color-3A rounded-[25px] border border-color-DF dark:border-color-47 mt-3">
                <div
                  className="progress-fill absolute h-2 rounded-[60px]"
                  style={{ width: `${credit_per}%` }}
                ></div>
              </div>
              <div className="d-flex justify-between items-center mt-3 text-12 font-Figtree text-color-14 dark:text-white font-normal">
                <p>
                  Credits Used:
                  {planDetails?.price_plan_id == 2
                    ? 1000 - creditCount
                    : planDetails?.price_plan_id == 3
                    ? 3000 - creditCount
                    : 5 - creditCount}
                  /
                  {planDetails?.price_plan_id == 2
                    ? 1000
                    : planDetails?.price_plan_id == 3
                    ? 3000
                    : 5}
                </p>
                <p>{credit_per?.toFixed(0)}%</p>
              </div>
            </div>

            {/* <div className="Imageresolutionmidjurny">
              <p className="text-color-14 dark:text-white text-15 font-medium font-Figtree mt-6">
                Max Image Resolution : 1024x1024
              </p>
            </div> */}
          </div>
        </Col>
        <Col md={6}>
          <div className="bg-color-F6 dark:bg-color-3A lg:p-6 p-4 ltr:!pr-0 rounded-xl upgrade-plan-card 9xl:w-[34.9%] 8xl:w-[42%] w-full d-flex flex-col justify-between rtl:pl-2">
            <div>
              <p className="text-color-14 dark:text-white text-20 lg:pr-6 pr-4 font-Figtree font-semibold any-sub-p">
                Running out of credits too soon?
              </p>
              <p className="mt-3 text-color-14 dark:text-white font-Figtree font-normal text-14 pr-5">
                Upgrade to our more featured plan for more credits and benefits.
              </p>
            </div>
            <div className="d-flex mt-[26px] justify-start gap-5 flex-wrap">
              <Link
                to="/pricing"
                className="font-Figtree magic-bg h-max upgrade-plan w-max rounded-full text-16 text-white font-semibold py-3 px-[25px] whitespace-nowrap mr-2"
              >
                Renew Plan
              </Link>
              <Link
                to="/pricing"
                className="font-Figtree magic-bg w-max rounded-full text-16 text-white font-semibold py-3 px-[25px]"
              >
                All Plan
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      {planDetails?.status == "Cancel" ? <div className="Subscription">
      <h3 className="title">Subscription</h3>
      <hr />
      <h2 className="mt-4 mb-2">You do not have any subscription</h2>
      <p className="mb-4">
        Subscribe to our more featured plan for more credits and benefits.
      </p>
      <Link className="mt-4 theme-btn " to="/pricing">
        All Plan
      </Link>
    </div> :<div>
        <h3 className="title">Billing and Payment</h3>
        <hr />

        <Row className="mt-3 ">
          <Col md={8}>
            <div className="bg-color-F6 dark:bg-color-3A rounded-xl p-6 8xl:w-[66.5%] subscription-profile-card">
              {/* <div className="d-flex items-center justify-between">
                            <div>
                                <p className="font-Figtree text-color-14 dark:text-white text-20 font-semibold">
                                    Emily Turner</p>
                                <p className="font-Figtree text-15 text-color-89 font-medium pt-2">
                                    dallefree0@gmail.com</p>
                            </div>
                            <img width={67} height={67} className="rounded-full pr-0.5" src="https://www.MidJourneyfree.com/public/dist/img/avatarUser.png" alt="Image1" />
                        </div> */}
              <div className="mt-2 d-flex flex-wrap items-center 3xl:gap-10 gap-4 justify-start 6xl:w-[500px] 4xl:w-[450px] xl:w-[400px]">
                <div>
                  <p className="font-normal text-13 font-Figtree text-color-14 dark:text-white">
                    Billing Price
                  </p>
                  <p className="font-semibold text-16 font-Figtree text-color-14 dark:text-white pt-1">
                    {planDetails?.price_plan_id == 1
                      ? "$0"
                      : planDetails?.price_plan_id == 2
                      ? "$7"
                      : "$10"}
                  </p>
                </div>
                <div>
                  <p className="font-normal text-13 font-Figtree text-color-14 dark:text-white">
                    Billing Cycle
                  </p>
                  <p className="font-semibold text-16 font-Figtree text-color-14 dark:text-white pt-1">
                    {planDetails?.billing_cycle}
                  </p>
                </div>
                <div>
                  <p className="font-normal text-13 font-Figtree text-color-14 dark:text-white">
                    Payment Status
                  </p>
                  <p className="font-semibold text-16 font-Figtree text-color-14 dark:text-white pt-1">
                    {planDetails?.payment_status}
                  </p>
                </div>
                <div>
                  <p className="font-normal text-13 font-Figtree text-color-14 dark:text-white">
                    Next Billing Date
                  </p>
                  <p className="font-semibold text-16 font-Figtree text-color-14 dark:text-white pt-1">
                    {moment(planDetails?.next_billing_date).format('MMMM Do YYYY')}
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <div className="mt-10">
          <h3 className="title">Unsubscribe</h3>
          <hr />
          <div className="pt-6 pb-24">
            <p className="text-color-14 dark:text-white font-normal font-Figtree text-15">
              Cancelling your subscription will not cause you to lose your
              current existing credits and plan benefits. But you can subscribe
              again anytime and get to keep all your saved documents and
              history.
            </p>
            <div className="btns-group mt-4">
              <button
                onClick={handleCancel_Subs}
                title=""
                className="theme-btn"
              >
                Cancel Subscription
              </button>
            </div>

            {/* <div className="modal index-modal  absolute z-50 top-0 left-0 right-0 w-full h-full">
                            <div className="modal-overlay fixed z-10 top-0 right-0 left-0 w-full h-full">
                            </div>
                            <div className="modal-wrapper modal-wrapper modal-transition fixed inset-0 z-10">
                                <div className="modal-body d-flex h-full justify-center p-4 text-center items-center sm:p-0">
                                    <div className="modal-content modal-transition rounded-xl py-6 md:px-[54px] bg-white dark:bg-color-3A px-8">
                                        <p className="text-color-14 font-semibold text-20 font-Figtree dark:text-white text-center">Cancel Subscription?</p>
                                        <p className="font-Figtree text-color-14 dark:text-white text-15 font-normal mt-3 text-center md:w-[332px]">
                                            You will not lose any of your existing credits or plan benefits.
                                        </p>
                                        <div className="d-flex justify-center items-center mt-7 gap-[16px]">
                                            <Link to="/" className="font-Figtree text-color-14 dark:text-white font-semibold xs:text-15 text-14 py-[11px] xs:px-[42px] px-[30px] border border-color-89 dark:border-color-47 bg-color-F6 dark:bg-color-47 rounded-xl modal-toggle">Not Really</Link>
                                            <Link to="/" className="font-Figtree text-white font-semibold xs:text-15 text-14 py-[11px] xs:px-[30px] px-5 bg-color-DFF rounded-xl">Yes, Cancel</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
          </div>
        </div>
      </div>}
    </div>
  ) : (
    <div className="Subscription">
      <h3 className="title">Subscription</h3>
      <hr />
      <h2 className="mt-4 mb-2">You do not have any subscription</h2>
      <p className="mb-4">
        Subscribe to our more featured plan for more credits and benefits.
      </p>
      <Link className="mt-4 theme-btn " to="/pricing">
        All Plan
      </Link>
    </div>
  );
};

export default Subscription;
