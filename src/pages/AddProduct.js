import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice'
import { getProductsCategory } from '../features/productCategory/productCategorySlice';
import { getColors } from '../features/color/colorSlice';
import { Select } from 'antd';
import Dropzone from 'react-dropzone'
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { createProducts } from '../features/product/productSlice';
import { useNavigate } from 'react-router-dom';


let schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    price: yup.number().required("Price is Required"),
    brand: yup.string().required("Brand is Required"),
    category: yup.string().required("Category is Required"),
    tags: yup.string().required("Tag is Required"),
    color: yup.array().min(1, "Pick atleast one color").required("Colors are  Required"),
    quantity: yup.number().required("Quantity are  Required"),
});

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [color, setColor] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getProductsCategory());
        dispatch(getColors());
    }, []);

    const brandState = useSelector((state) => state.brand.brands);
    const productCategoryState = useSelector((state) => state.category.categories);
    const colorState = useSelector((state) => state.color.colors);
    const imageState = useSelector((state) => state.upload.images);
    const newProduct = useSelector((state) => state.product);
    const { isSuccess, isError, isLoading, createdProduct } = newProduct;
    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success('Product Added Successfully!');
        }
        if (isError) {
            toast.error('Something Went Wrong');
        }
    }, [isSuccess, isError, isLoading]);

    const coloropt = [];
    colorState.forEach(i => {
        coloropt.push({
            value: i._id,
            label: i.title,
        })
    });
    console.log(coloropt);


    const img = [];
    imageState.forEach(i => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });
    useEffect(() => {
        formik.values.color = color ? color : " ";
        formik.values.images = img;
    }, [color, img])

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: "",
            brand: "",
            category: "",
            tags: "",
            color: [],
            quantity: "",
            images: [],
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createProducts(values));
            formik.resetForm();
            setColor(null);
            setTimeout(() => {
                navigate("/admin/product-list")
            }, 1000);
        },
    });

    const handleColors = (e) => {
        setColor(e);
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

                    <select value={formik.values.tags} name='tags' onChange={formik.handleChange('tags')} onBlur={formik.handleBlur('tags')} id="" className='form-control mt-3 py-3 form-select'>
                        <option value="" disabled>Select Tags</option>
                        <option value="featured">Featured</option>
                        <option value="popular">Popular</option>
                        <option value="special">Special</option>
                    </select>
                    <div className="error">{
                        formik.touched.tags && formik.errors.tags
                    }</div>

                    <Select
                        mode="multiple"
                        allowClear
                        className="w-100 mt-4"
                        placeholder="Select Colors"
                        defaultValue={color}
                        onChange={(i) => handleColors(i)}
                        options={coloropt}
                    />

                    <div className="error">{
                        formik.touched.color && formik.errors.color
                    }</div>
                    <CustomInput type='number' label='Enter Quantity' val={formik.values.quantity} name='quantity' onCh={formik.handleChange('quantity')} onBlr={formik.handleBlur('quantity')} />
                    <div className="error">{
                        formik.touched.quantity && formik.errors.quantity
                    }</div>
                    <div className='mt-3 bg-white border-1 p-5 text-center'>
                        <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages mt-4 d-flex flex-wrap gap-3">
                        {imageState.map((i, j) => {
                            return (
                                <div key={j} className='position-relative'>
                                    <button type='button' onClick={() => dispatch(deleteImg(i.public_id))} className='position-absolute btn-close btn-sm' style={{ top: "10px", right: "10px" }}></button>
                                    <img src={i.url} alt="" width={200} height={200} />
                                </div>
                            );
                        })}

                    </div>
                    <button className='btn btn-success mt-3 border-0 rounded-3' type='submit'>Add Product</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct