import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useFormik } from "formik";
import { createProductCategory, resetState } from '../features/productCategory/productCategorySlice';

let schema = yup.object().shape({
    title: yup.string().required("Category name is Required"),
});

const AddCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newCategory = useSelector((state) => state.category);
    const { isSuccess, isError, isLoading, createdProductCategory } = newCategory;
    useEffect(() => {
        if (isSuccess && createdProductCategory
        ) {
            toast.success('Category Name Added Successfully!');
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
            dispatch(createProductCategory(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
                navigate("/admin/category-list")
            }, 1000);
        },
    });
    return (
        <div>
            <h3 className='mb-4 title'>Add Category</h3>
            <div className=''>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput type='text' label='Enter Category' val={formik.values.title} name='title' onCh={formik.handleChange('title')} onBlr={formik.handleBlur('title')} />
                    <div className="error">{
                        formik.touched.title && formik.errors.title
                    }</div>
                    <button className='btn btn-success mt-3 border-0 rounded-3' type='submit'>Add Category</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory