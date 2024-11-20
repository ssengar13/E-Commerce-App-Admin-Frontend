import React from 'react';
import CustomInput from '../components/CustomInput';

const Forgotpassword = () => {
    return (
        <div className='py-5' style={{ background: "#ffd333", minHeight: "100vh" }}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='my-5 bg-white rounded-3 mx-auto p-4'
                style={{ "width": '600px' }}>
                <h3 className='text-center title'>Forgot Password</h3>
                <p className='text-center fs-8'>
                    Please Enter your Registered Email to get Reset Password Mail.
                </p>
                <form action="">
                    <CustomInput type='text' label='Email Address' id='email' />
                    <button
                        className='border-0 px-3 py-2 text-white w-100 fw-bold'
                        style={{ background: "#ffd333" }}
                        type='submit'>
                        Send Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Forgotpassword;
