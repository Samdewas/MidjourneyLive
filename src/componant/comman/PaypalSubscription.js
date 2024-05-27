import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalSubscription = ({ plan_id, handleSubmit }) => {
    const createSubscription = (data, actions) => {
        return actions.subscription.create({
            plan_id: plan_id,
        });
    };

    const onApprove = (data, actions) => {
        // Handle successful subscription approval
        handleSubmit(data);
    };

    return (
        // <PayPalScriptProvider options={{ 'client-id': 'AUJFv29-apwRn0toyu8JsHC3O7U8BiiD2ayWJB0dZDztCngxrb7CFS_3GnxH16fJZ8h0CljGp2ynd-hP', "vault": true }}>
        <PayPalScriptProvider options={{ 'client-id': 'AWp-SzVwksQS4cHna5Oe1ly1mQJA4-yw6mpCg7pferCVtE6f9BW9ihgxEHBBjtk6dLy02gYteiCdWiPX', "vault": true }}>
            <PayPalButtons createSubscription={createSubscription} onApprove={onApprove} />
        </PayPalScriptProvider>
    );
};

export default PayPalSubscription;