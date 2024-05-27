import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

export default function Paypal({ plan, handleSubmit }) {
    const paypal = useRef();

    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        while (paypal.current.firstChild) {
            paypal.current.removeChild(
                paypal.current.firstChild
            );
        }
        window.paypal
            .Buttons({
                style: {
                    layout: 'horizontal'
                },
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            "amount": {
                                "currency_code": "USD",
                                "value": plan == "1" ? "10" : plan == "2" ? "15" : plan == "3" ? "100" : "150"
                            }
                        }],
                        application_context: {
                            shipping_preference: "NO_SHIPPING"
                        }
                    });
                },
                onApprove: async (data, actions) => {
                    setLoader(true)
                    return await actions.order.capture()
                        .then((res) => {
                            handleSubmit(res)
                            // axios.post(base_url + '/order/success', res, {
                            //     headers: postHeader
                            // })
                            //     .then(response => {
                            //         if (response.data.status == 1) {
                            //             setLoader(false)
                            //             history.push(`/ordersuccess/${response.data.data.order_id}/${response.data.data.order_no}/${response.data.data.txn_id}`)
                            //             dispatch(cartlengthvalue(0))
                            //             sessionStorage.removeItem("bw-checkoutdata")
                            //         } else {
                            //             setLoader(false)
                            //             console.log(response.message);
                            //         }
                            //     })
                            //     .catch(err => {
                            //         setLoader(false)
                            //         console.log(err)
                            //     })
                        })

                },
                onError: (err) => {
                    setLoader(false)
                    alert(err);
                },
            })
            .render(paypal.current);
    }, [plan]);

    return (
        <>
            <div>
                <div ref={paypal}></div>
            </div>
            {/* <Modal show={loader}>
            <Loader/>
        </Modal> */}
        </>
    );
}