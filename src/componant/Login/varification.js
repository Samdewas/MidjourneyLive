import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import { base_url } from '../../Store/constant';
import logo from '../../Assets/img/new/logo.svg'

const Verification = ({email, handleshow, resendotp}) => {

    const navigate = useNavigate();
    const [otp, setOtp] = useState('');

    const handleverify = (e) => {
        e.preventDefault();
        var data = {
            email:email,
            otp: otp
        }
        axios.post(base_url + '/verifyOTP', data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status == 200) {
                    setOtp("");
                    swal(response.data.msg, "", "success");
                    handleshow();
                    navigate("/login")
                } else {
                    swal(response.data.msg)
                }
            })
            .catch((error) => {
                swal(error.response.data.msg,"","error");
            });

    }
  return (
    <section className='login_page'>
            <div className='container'>
                <Link to='/'><img style={{ margin: 'auto'}} width={200} height={40}
                                        src={logo} alt="MidJourneyfree" /></Link>

                <div className='loginBox'>
                    <h2 className='title font-Figtree text-center text-24 font-bold text-color-14 dark:text-white'>Verify OTP</h2>
                    <p className='tnc-link mt-2 mb-3'>We will send you an email to verify your one time password (OTP).</p>
                    <div className='form-div'>
                        <form onSubmit={handleverify}>
                            <div className='form-group'>
                                <label>OTP</label>
                                <input 
                                 className='form-control'
                                 type='text'
                                 value={otp}
                                 onChange={(e) => setOtp(e.target.value)}
                                 placeholder='OTP'
                                 required
                                />
                            </div>
                            <p className='registration-link resendotp' onClick={resendotp}>resendOTP</p>
                            <button type='submit' className='signIn-btn bg-black'>Continue</button>
                            <p className='registration-link'> <Link onClick={handleshow} to='/login'>Back to sign in</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Verification