import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useFormik } from "formik";
import { createProductCategory, getProductCategory, resetState, updateProductCategory } from '../features/productCategory/productCategorySlice';

let schema = yup.object().shape({
    title: yup.string().required("Category name is Required"),
});

const AddCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getCategoryID = location.pathname.split("/")[3];  //this will return an array and in that array in 3rd index we will get pur ID.
    const newCategory = useSelector((state) => state.category);
    const { isSuccess, isError, isLoading, createdProductCategory, categoryName, updatedProductCategory } = newCategory;
    console.log(newCategory)
    useEffect(() => {
        if (getCategoryID !== undefined) {
            dispatch(getProductCategory(getCategoryID));
            formik.values.title = categoryName;
        } else {
            dispatch(resetState());
        }
    }, [getCategoryID]);
    useEffect(() => {
        if (isSuccess && createdProductCategory
        ) {
            toast.success('Category Name Added Successfully!');
        }
        if (isSuccess && updatedProductCategory
        ) {
            toast.success('Category Name Successfully Updated!');
        }
        if (isError) {
            toast.error('Something Went Wrong');
        }
    }, [isSuccess, isError, isLoading]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: categoryName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getCategoryID !== undefined) {
                const data = { id: getCategoryID, categoryData: values }
                console.log(data)
                dispatch(updateProductCategory(data));
            } else {
                dispatch(createProductCategory(values));
            }
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
                navigate("/admin/category-list")
            }, 500);
        },
    });
    return (
        <div>
            <h3 className='mb-4 title'>{getCategoryID !== undefined ? "Edit" : "Add"} Category</h3>
            <div className=''>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput type='text' label='Enter Category' val={formik.values.title} name='title' onCh={formik.handleChange('title')} onBlr={formik.handleBlur('title')} />
                    <div className="error">{
                        formik.touched.title && formik.errors.title
                    }</div>
                    <button className='btn btn-success mt-3 border-0 rounded-3' type='submit'>{getCategoryID !== undefined ? "Edit" : "Add"} Category</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory