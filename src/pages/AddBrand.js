import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useFormik } from "formik";
import { createBrand } from '../features/brand/brandSlice';


let schema = yup.object().shape({
    title: yup.string().required("Brand name is Required"),
});

const AddBrand = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newBrand = useSelector((state) => state.brand);
    const { isSuccess, isError, isLoading, createdBrand } = newBrand;
    useEffect(() => {
        if (isSuccess && createdBrand
        ) {
            toast.success('Brand Name Added Successfully!');
        }
        if (isError) {
            toast.error('Something Went Wrong');
        }
    }, [isSuccess, isError, isLoading]);

    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createBrand(values));
            formik.resetForm();
            setTimeout(() => {
                navigate("/admin/brand-list")
            }, 1000);
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>Add Brand</h3>
            <div className=''>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput type='text' label='Enter Brand Name' val={formik.values.title} name='title' onCh={formik.handleChange('title')} onBlr={formik.handleBlur('title')} />
                    <div className="error">{
                        formik.touched.title && formik.errors.title
                    }</div>
                    <button className='btn btn-success mt-3 border-0 rounded-3' type='submit'>Add Brand</button>
                </form>
            </div>
        </div>
    )
}

export default AddBrand