import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice'
import { getProductsCategory } from '../features/productCategory/productCategorySlice';
import { getColors } from '../features/color/colorSlice';
import Multiselect from 'react-widgets/Multiselect';
import "react-widgets/styles.css";

let schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    price: yup.number().required("Price is Required"),
    brand: yup.string().required("Brand is Required"),
    category: yup.string().required("Category is Required"),
    color: yup.array().required("Colors are  Required"),
    quantity: yup.number().required("Quantity are  Required"),
});

const AddProduct = () => {
    const dispatch = useDispatch();
    const [color, setColor] = useState([]);
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getProductsCategory());
        dispatch(getColors());
        formik.values.color = color;
    }, []);
    const brandState = useSelector((state) => state.brand.brands);
    const productCategoryState = useSelector((state) => state.category.categories);
    const colorState = useSelector((state) => state.color.colors);
    const colors = []
    colorState.forEach(i => {
        colors.push({
            _id: i._id,
            color: i.title,
        })
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: "",
            brand: "",
            category: "",
            color: "",
            quantity: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            alert(JSON.stringify(values));
        },
    });
    const [desc, setDesc] = useState();
    const handleDesc = (e) => {
        setDesc(e);
    }
    return (
        <div>
            <h3 className='mb-4 title'>Add Product</h3>
            <div className=''>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput type='text' label='Enter Product Title Name' val={formik.values.title} name='title' onCh={formik.handleChange('title')} onBlr={formik.handleBlur('title')} />
                    <div className="error">{
                        formik.touched.title && formik.errors.title
                    }</div>
                    <div className='mb-3 mt-3'>
                        <ReactQuill theme="snow" value={formik.values.description} name='description' onChange={formik.handleChange('description')} />
                        <div className="error">{
                            formik.touched.description && formik.errors.description
                        }</div>
                    </div>
                    <CustomInput type='number' label='Enter Product Price' val={formik.values.price} name='price' onCh={formik.handleChange('price')} onBlr={formik.handleBlur('price')} />
                    <div className="error">{
                        formik.touched.price && formik.errors.price
                    }</div>
                    <select value={formik.values.brand} name='brand' onChange={formik.handleChange('brand')} onBlur={formik.handleBlur('brand')} className='form-control mt-3 py-3 form-select'>
                        <option value="">Select Brand</option>
                        {brandState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>{i.title}</option>
                            )
                        })}
                    </select>
                    <div className="error">{
                        formik.touched.brand && formik.errors.brand
                    }</div>
                    <select value={formik.values.category} name='category' onChange={formik.handleChange('category')} onBlur={formik.handleBlur('category')} id="" className='form-control mt-3 py-3 form-select'>
                        <option value="">Select Category</option>
                        {productCategoryState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>{i.title}</option>
                            )
                        })}
                    </select>
                    <div className="error">{
                        formik.touched.category && formik.errors.category
                    }</div>
                    <Multiselect
                        name="color"
                        className='mt-3'
                        dataKey="id"
                        textField="color"
                        data={colors}
                        onChange={(e) => setColor(e)}
                    />
                    <div className="error">{
                        formik.touched.color && formik.errors.color
                    }</div>
                    <CustomInput type='number' label='Enter Quantity' val={formik.values.quantity} name='quantity' onCh={formik.handleChange('quantity')} onBlr={formik.handleBlur('quantity')} />
                    <div className="error">{
                        formik.touched.quantity && formik.errors.quantity
                    }</div>
                    <button className='btn btn-success mt-3 border-0 rounded-3' type='submit'>Add Product</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct