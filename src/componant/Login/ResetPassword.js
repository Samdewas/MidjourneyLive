import axios from 'axios';
import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import swal from 'sweetalert';
import { base_url } from '../../Store/constant';
import logo from '../../Assets/img/new/logo.svg'

const ResetPassword = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const handleforgotpassword = (e) => {
        e.preventDefault();
        var data = {
            token:searchParams.get("token"),
            password: password,
            confirmpassword: confirmpassword
        }
        axios.post(base_url + '/resetPassword', data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status == 200) {
                    setPassword("");
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
                    <h2 className='title font-Figtree text-center text-24 font-bold text-color-14 dark:text-white mb-3'>Reset your password</h2>
                    {/* <p className='tnc-link mt-2 mb-3'>We will send you an password to reset your password.</p> */}
                    <div className='form-div'>
                        <form onSubmit={handleforgotpassword}>
                            <div className='form-group'>
                                <label>New Password</label>
                                <input 
                                 className='form-control'
                                 type='password'
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 placeholder='********'
                                 required
                                />
                            </div>
                            <div className='form-group'>
                                <label>Confirm Password</label>
                                <input 
                                 className='form-control'
                                 type='password'
                                 value={confirmpassword}
                                 onChange={(e) => setConfirmpassword(e.target.value)}
                                 placeholder='********'
                                 required
                                />
                            </div>
                            
                            <button type='submit' className='signIn-btn'>Continue</button>
                            {/* <p className='registration-link'> <Link to='/login'>Back to sign in</Link></p> */}
                        </form>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default ResetPassword