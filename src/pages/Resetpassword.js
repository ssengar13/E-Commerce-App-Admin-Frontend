import React from 'react';
import CustomInput from '../components/CustomInput';

const Resetpassword = () => {
    return (
        <div className='py-5' style={{ background: "#ffd333", minHeight: "100vh" }}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='my-5 bg-white rounded-3 mx-auto p-4' style={{ "width": '600px' }}>
                <h3 className='text-center'>Reset Password</h3>
                <p className='text-center fs-8'>
                    Please Enter your new Password.
                </p>
                <form action="">
                    <CustomInput type='password' label='New Password' id='password' />
                    <CustomInput type='password' label='Confirm Password' id='confirm-password' />
                    <button
                        className='border-0 px-3 py-2 text-white w-100 fw-bold'
                        style={{ background: "#ffd333" }}
                        type='submit'>
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Resetpassword;
