import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useFormik } from "formik";
import { createBlogCategory, resetState } from '../features/blogCategory/blogCategorySlice';

let schema = yup.object().shape({
    title: yup.string().required("Blog Category name is Required"),
});

const AddBlogCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newBlogCategory = useSelector((state) => state.blogcategory);
    const { isSuccess, isError, isLoading, createdBlogCategory } = newBlogCategory;
    useEffect(() => {
        if (isSuccess && createdBlogCategory
        ) {
            toast.success('Blog Category Name Added Successfully!');
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
            dispatch(createBlogCategory(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
                navigate("/admin/blog-category-list")
            }, 1000);
        },
    });
    return (
        <div>
            <h3 className='mb-4 title'>Add Blog Category</h3>
            <div className=''>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput type='text' label='Enter Blog Category' val={formik.values.title} name='title' onCh={formik.handleChange('title')} onBlr={formik.handleBlur('title')} />
                    <div className="error">{
                        formik.touched.title && formik.errors.title
                    }</div>
                    <button className='btn btn-success mt-3 border-0 rounded-3' type='submit'>Add Blog Category</button>
                </form>
            </div>
        </div>
    )
}

export default AddBlogCategory