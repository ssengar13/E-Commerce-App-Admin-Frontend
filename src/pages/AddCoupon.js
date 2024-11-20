import React from 'react'
import CustomInput from '../components/CustomInput'

const AddCoupon = () => {
    return (
        <div>
            <h3 className='mb-4 title'>Add Coupon</h3>
            <div className=''>
                <form action="">
                    <CustomInput type='text' label='Enter Coupon Name' />
                    <button className='btn btn-success mt-3 border-0 rounded-3' type='submit'>Add Coupon</button>
                </form>
            </div>
        </div>
    )
}

export default AddCoupon