import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useFormik } from "formik";
import { createBrand, getBrand, resetState, updateBrand } from '../features/brand/brandSlice';


let schema = yup.object().shape({
    title: yup.string().required("Brand name is Required"),
});

const AddBrand = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getBrandId = location.pathname.split("/")[3];  //this will return an array and in that array in 3rd index we will get pur ID.
    const newBrand = useSelector((state) => state.brand);
    const { isSuccess, isError, isLoading, createdBrand, brandName, updatedBrand } = newBrand;
    useEffect(() => {
        if (getBrandId !== undefined) {
            dispatch(getBrand(getBrandId));
            formik.values.title = brandName;
        } else {
            dispatch(resetState());
        }
    }, [getBrandId]);
    useEffect(() => {
        if (isSuccess && createdBrand
        ) {
            toast.success('Brand Name Added Successfully!');
        }
        if (isSuccess && updatedBrand
        ) {
            toast.success('Brand Name Successfully Updated!');
        }
        if (isError) {
            toast.error('Something Went Wrong');
        }
    }, [isSuccess, isError, isLoading]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: brandName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getBrandId !== undefined) {
                const data = { id: getBrandId, brandData: values }
                dispatch(updateBrand(data));
            } else {
                dispatch(createBrand(values));
            }
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
                navigate("/admin/brand-list")
            }, 500);
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>{getBrandId !== undefined ? "Edit" : "Add"} Brand</h3>
            <div className=''>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput type='text' label='Enter Brand Name' val={formik.values.title} name='title' onCh={formik.handleChange('title')} onBlr={formik.handleBlur('title')} />
                    <div className="error">{
                        formik.touched.title && formik.errors.title
                    }</div>
                    <button className='btn btn-success mt-3 border-0 rounded-3' type='submit'>{getBrandId !== undefined ? "Edit" : "Add"} Brand</button>
                </form>
            </div>
        </div>
    )
}

export default AddBrand