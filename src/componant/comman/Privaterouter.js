import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const PrivateRoute = () => {
    const navigate = useNavigate();
    const userData = useSelector(state => state.persistedReducer.home.userData);
    useEffect(()=>{
        if(userData?.is_login == undefined){
            swal("Please Login First!")
            navigate("/login");
        }
    },[])

    return null;
}

export default PrivateRoute