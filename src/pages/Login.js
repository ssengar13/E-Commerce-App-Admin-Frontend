import React from 'react'
import CustomInput from '../components/CustomInput'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='py-5' style={{ "background": "#ffd333", "minHeight": "100vh " }}>
            <br />
            <br />
            <br />
            <br />
            <div className='my-5 bg-white rounded-3 mx-auto p-4' style={{ "width": '600px' }}>
                <h3 className='text-center title'>Login</h3>
                <p className='text-center'>Login to your Account to Continue.</p>
                <form action="">
                    <CustomInput type='text' label='Email Address' id='email' />
                    <CustomInput type='password' label='Password' id='password' />
                    <div className='text-end'>
                        <Link to='/forgot-password'>Forgot Password?</Link>
                    </div>
                    <Link to='/admin' className='border-0 mt-4 px-3 py-2 text-white w-100 fw-bold text-center text-decoration-none fs-6' style={{ "background": "#ffd333" }} type='submit'>Login</Link>
                </form>
            </div>
        </div>
    )
}

export default Login
