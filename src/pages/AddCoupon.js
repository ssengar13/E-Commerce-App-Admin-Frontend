import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useFormik } from "formik";
import { createCoupon, resetState } from '../features/coupon/couponSlice';


let schema = yup.object().shape({
    name: yup.string().required("Coupon Name is Required"),
    expiry: yup.date().required("Coupon Expiry is Required"),
    discount: yup.number().required("Coupon Discount is Required"),
});

const AddCoupon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newCoupon = useSelector((state) => state.coupon);
    const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;
    useEffect(() => {
        if (isSuccess && createdCoupon
        ) {
            toast.success('Coupon Added Successfully!');
        }
        if (isError) {
            toast.error('Something Went Wrong');
        }
    }, [isSuccess, isError, isLoading]);

    const formik = useFormik({
        initialValues: {
            name: "",
            expiry: "",
            discount: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createCoupon(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
                navigate("/admin/coupon-list")
            }, 1000);
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>Add Coupon</h3>
            <div className=''>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput type='text' id='name' label='Enter Coupon Name' val={formik.values.name} name='name' onCh={formik.handleChange('name')} onBlr={formik.handleBlur('name')} />
                    <div className="error">{
                        formik.touched.name && formik.errors.name
                    }</div>
                    <CustomInput type='date' id='expiry' label='Enter Expiry Date' val={formik.values.expiry} name='expiry' onCh={formik.handleChange('expiry')} onBlr={formik.handleBlur('expiry')} />
                    <div className="error">{
                        formik.touched.expiry && formik.errors.expiry
                    }</div>
                    <CustomInput type='number' id='discount' label='Enter Discount' val={formik.values.discount} name='discount' onCh={formik.handleChange('discount')} onBlr={formik.handleBlur('discount')} />
                    <div className="error">{
                        formik.touched.discount && formik.errors.discount
                    }</div>
                    <button className='btn btn-success mt-3 border-0 rounded-3' type='submit'>Add Coupon</button>
                </form>
            </div>
        </div>
    )
}

export default AddCoupon