import React from 'react'
import { useEffect } from 'react'
import { Container, Col, Row } from 'react-bootstrap';

const Privacypolicy = () => {

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }, [])
      
  return (
    <div className='privacy-policy py-5'>
      <Container>
          <Row>

          <Col lg={10}>

          
      <h1 className='mt-5'>Midjourney Free AI Image Generator - Pricing Policy</h1>

<p>Welcome to Midjourney Free, your go-to destination for cutting-edge AI-powered image generation. Our pricing policy is designed to offer flexible and scalable options for users of our SaaS application. Please review the details below to understand the pricing structure and available features.</p>

<h3>Free Trial Period:</h3>

<p>We offer a <strong>7-day free trial</strong> for all new users. During this period, you can explore the capabilities of our AI Image Generator without any financial commitment.</p>

<h3 className='mt-5'>Basic Free Plan:</h3>

<ul>
  <li>
    <strong>AI Image Generation:</strong>
    <ul>
      <li>Access to our powerful AI algorithms for image creation.</li>
      <li>Generate a limited number of high-quality images per month.</li>
    </ul>
  </li>
  <li>
    <strong>Basic Resolution:</strong>
    <ul>
      <li>Images will be generated at a standard resolution.</li>
    </ul>
  </li>
  <li>
    <strong>Support:</strong>
    <ul>
      <li>Basic email support during business hours.</li>
    </ul>
  </li>
</ul>

<h3 className='mt-5'>Premium Plans:</h3>

<h4>Pro and Max:</h4>

<ul>
  <li>
    <strong>Enhanced AI Capabilities:</strong>
    <ul>
      <li>Unlimited access to advanced AI image generation features.</li>
      <li>Priority access to new features and updates.</li>
    </ul>
  </li>
  <li>
    <strong>High-Resolution Images:</strong>
    <ul>
      <li>Generate images at higher resolutions for sharper details.</li>
    </ul>
  </li>
  <li>
    <strong>Priority Support:</strong>
    <ul>
      <li>Expedited email support for prompt issue resolution.</li>
    </ul>
  </li>
  <li>
    <strong>No Watermark:</strong>
    <ul>
      <li>Your generated images will be watermark-free.</li>
    </ul>
  </li>
</ul>



<h3 className='mt-5'>Pay-As-You-Go Option:</h3>

<p>For users with fluctuating usage patterns, we offer a pay-as-you-go option. This allows you to pay only for the images generated beyond the limits of your chosen plan.</p>

<h3 className='mt-5'>Additional Notes:</h3>

<ul>
  <li>
    <strong>Data Security:</strong>
    <ul>
      <li>We prioritize the security and privacy of your data. Our platform adheres to industry-standard security practices.</li>
    </ul>
  </li>
  <li>
    <strong>Billing Cycle:</strong>
    <ul>
      <li>All plans are billed on a monthly basis. with additional cost savings.</li>
    </ul>
  </li>
  <li>
    <strong>Cancellation Policy:</strong>
    <ul>
      <li>You can cancel your subscription at any time. Cancellations take effect at the end of the billing cycle.</li>
    </ul>
  </li>

  <li>
    <strong>Refund Policy:</strong>
    <ul>
      <li>Our refund policy varies based on the service and subscription plan. For specific details regarding refunds, please refer to our Terms of Service or contact our support team.</li>
    </ul>
  </li>


  
</ul>

<p>Thank you for choosing Midjourney Free AI Image Generator. We are excited to be part of your creative journey!</p>
      </Col>    
</Row>
      </Container>
    </div>
  )
}

export default Privacypolicy