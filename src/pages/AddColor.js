import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useFormik } from "formik";
import { createColor } from '../features/color/colorSlice';

let schema = yup.object().shape({
    title: yup.string().required("Color is Required"),
});

const AddColor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newColor = useSelector((state) => state.color);
    const { isSuccess, isError, isLoading, createdColor } = newColor;
    useEffect(() => {
        if (isSuccess && createdColor
        ) {
            toast.success('Color Added Successfully!');
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
            dispatch(createColor(values));
            formik.resetForm();
            setTimeout(() => {
                navigate("/admin/color-list")
            }, 1000);
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>Add Colors</h3>
            <div className=''>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput type='color' label='Select Color' val={formik.values.title} name='title' onCh={formik.handleChange('title')} onBlr={formik.handleBlur('title')} />
                    <div className="error">{
                        formik.touched.title && formik.errors.title
                    }</div>
                    <button className='btn btn-success mt-3 border-0 rounded-3' type='submit'>Add Color</button>
                </form>
            </div>
        </div>
    )
}

export default AddColor