import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { base_url } from '../../Store/constant';
import logo from '../../Assets/img/new/logo.svg'

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const handleforgotpassword = (e) => {
        e.preventDefault();
        var data = {
            email: email
        }
        axios.post(base_url + '/forgotPassword', data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status == 200) {
                    setEmail("");
                    swal(response.data.msg, "", "success");
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
                    <h2 className='title font-Figtree text-center text-24 font-bold text-color-14 dark:text-white'>Reset your password</h2>
                    <p className='tnc-link mt-2 mb-3'>We will send you an email to reset your password.</p>
                    <div className='form-div'>
                        <form onSubmit={handleforgotpassword}>
                            <div className='form-group'>
                                <label>Email Address</label>
                                <input 
                                 className='form-control'
                                 type='email'
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 placeholder='Email Address'
                                 required
                                />
                            </div>
                            
                            <button type='submit' className='signIn-btn'>Continue</button>
                            <p className='registration-link'> <Link to='/login'>Back to sign in</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default ForgetPassword