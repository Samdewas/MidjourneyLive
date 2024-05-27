import React from 'react'
import { Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet'

const Refund = () => {
    return (
        <>
          <Helmet>
            <title>Refund Policy | Mid Journey</title>
           <meta name="description" content="Explore our innovative AI technology worry-free, with easy returns if you're not completely satisfied. Experience creativity with confidence!"></meta>
       
            </Helmet>
        <section className='privacy-policy'>
            <Container className='pt-5'>
                <h1>Refund Policy </h1>

                <p>At DreamVibe AI Studio, we strive to ensure the utmost satisfaction of our users with every subscription purchase. We understand that circumstances may arise where a refund is necessary, and thus, we offer a refund policy tailored to accommodate such situations. </p>

                <h4>Refunds for Subscriptions</h4>

                <ol>
                    <li>Refunds for subscription purchases are eligible within three (3) days from the original date of purchase.</li>
                    <li>To initiate a refund request, users must contact our customer support team within the specified timeframe.</li>
                    <li>It's essential to note that specific conditions may apply to the refund process. Users are encouraged to thoroughly review our detailed refund policy to understand the eligibility criteria and any associated terms and conditions.</li>
                    <li>Refunds will be issued based on the original payment method used for the subscription purchase.</li>
                    <li>After the refund is processed, users may experience varying processing times depending on their financial institution.</li>
                </ol>


                <h4>Exclusions and Additional Information </h4>

                <ol>
                    <li>Refunds may not be available for subscription purchases made outside of the specified three-day window.</li>
                    <li>DreamVibe AI Studio reserves the right to refuse refund requests that do not meet the eligibility criteria outlined in our refund policy.</li>
                    <li>Users are responsible for ensuring compliance with our refund policy and understanding any limitations or exceptions that may apply.</li>
                    <li>Our refund policy is subject to change at any time without prior notice. Any updates or modifications will be reflected on this page.</li>
                </ol>

                <h4>Contact Us </h4>

                <p>If you have any questions or concerns regarding our refund policy, please don't hesitate to contact our customer support team. We are here to assist you and ensure a seamless experience with our services. </p>

                <p>Thank you for choosing DreamVibe AI Studio. We appreciate your trust and support. </p>
                <p>If you have any questions about Refund Policy, You can contact us:</p>
                <p>By email: <a class="text-dark" href="mailto:support@midjourneyfree.ai">support@midjourneyfree.ai</a></p>
            </Container>
        </section>
        </>
    )
}

export default Refund