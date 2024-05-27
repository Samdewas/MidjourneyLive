import React from 'react'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Privacypolicy = () => {

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }, [])
      
  return (
    <>
     <Helmet>
        <title>Privacy Policy | Mid Journey Free</title>
        <meta name="description" content="Mid Journey Free's privacy policy ensures your data is protected and your privacy respected. Discover how we safeguard your information for a secure and worry-free experience."></meta>
        <link rel="canonical" to= "https://MidJourneyfree.com/privacy-policy"/>
      </Helmet>
    <div className='privacy-policy'>
      <Container className='pt-5'>
          <h1 className='mb-4'>Privacy Policy</h1>

          <p>
    <b>Privacy Policy for MidJourneyfree.com</b>
  </p>
  <p>
    <strong>California Consumer Privacy Act (“CCPA”)</strong>
  </p>
  <p>
    Under CCPA, Californian residents have the right to declare their
    preferences on the sale of data for advertising and marketing purposes. If
    you wish to change your preferences, click this link to launch our
    preference portal:
  </p>

  <div data-fuse-privacy-tool="">You are outside the CCPA jurisdiction.</div>
  <p>
    We use a third-party to provide monetisation technologies for our site. You
    can review their privacy and cookie policy here.
  </p>
  <p>
    If you require any more information or have any questions about our privacy
    policy, please feel free to contact us by email at support@midjourneyfree.ai
  </p>
  <p>
    At MidJourneyfree.com, the privacy of our visitors is of extreme importance to
    us. This privacy policy document outlines the types of personal information
    is received and collected by MidJourneyfree.com and how it is used.
  </p>
  <p>
    <b>Log Files</b>
     Like many other Web sites, MidJourneyfree.com makes use of log files. The
    information inside the log files includes internet protocol ( IP )
    addresses, type of browser, Internet Service Provider ( ISP ), date/time
    stamp, referring/exit pages, and number of clicks to analyze trends,
    administer the site, track user’s movement around the site, and gather
    demographic information. IP addresses, and other such information are not
    linked to any information that is personally identifiable.
  </p>
  <p>
    <b>Cookies and Web Beacons</b>
     MidJourneyfree.com does use cookies to store information about visitors
    preferences, record user-specific information on which pages the user access
    or visit, customize Web page content based on visitors browser type or other
    information that the visitor sends via their browser.
  </p>
  <p>
    <b>DoubleClick DART Cookie</b>
     .:: Google, as a third party vendor, uses cookies to serve ads on
    MidJourneyfree.com.
     .:: Google’s use of the DART cookie enables it to serve ads to users
    based on their visit to MidJourneyfree.com and other sites on the Internet.
     .:: Users may opt out of the use of the DART cookie by visiting the
    Google ad and content network privacy policy at the following URL –
    http://www.google.com/privacy_ads.html
  </p>
  <p>
    Some of our advertising partners may use cookies and web beacons on our
    site. Our advertising partners include …. Google Adsense.
  </p>
  <p>
    These third-party ad servers or ad networks use technology to the
    advertisements and links that appear on MidJourneyfree.com send directly to your
    browsers. They automatically receive your IP address when this occurs. Other
    technologies ( such as cookies, JavaScript, or Web Beacons ) may also be
    used by the third-party ad networks to measure the effectiveness of their
    advertisements and / or to personalize the advertising content that you see.
  </p>
  <p>
    MidJourneyfree.com has no access to or control over these cookies that are used
    by third-party advertisers.
  </p>
  <p>
    You should consult the respective privacy policies of these third-party ad
    servers for more detailed information on their practices as well as for
    instructions about how to opt-out of certain practices. MidJourneyfree.com’s
    privacy policy does not apply to, and we cannot control the activities of,
    such other advertisers or web sites.
  </p>
  <p>
    If you wish to disable cookies, you may do so through your individual
    browser options. More detailed information about cookie management with
    specific web browsers can be found at the browsers’ respective websites.
  </p>
<h4>Contact Us</h4>
<p>If you have any questions about this Privacy Policy, You can contact us:</p>
<p>By email: <Link to='mailto:support@midjourneyfree.ai' className='text-dark'>support@midjourneyfree.ai</Link></p>
<p> **Note : We are not affiliated with Midjourney </p>
<br />
      </Container>
    </div>
    </>
  )
}

export default Privacypolicy