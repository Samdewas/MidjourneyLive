import React from 'react'
import PrivateRoute from '../comman/Privaterouter';
import Contactus from '../static_pages/ContactUs';
import { Helmet } from 'react-helmet';
const HelpCenter = () => {
  return (
    <>
    <PrivateRoute />
    <Helmet>
            <title> Help Center | Mid Journey</title>
            </Helmet>
      <section className="main-container-dashboard pt-0">
        <div style={{maxWidth: '800px', margin:'auto'}}>
        <Contactus/>
        </div>
      </section>
    </>
  )
}

export default HelpCenter