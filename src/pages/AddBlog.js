import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { InboxOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone'
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBlogsCategory } from '../features/blogCategory/blogCategorySlice';
import { createBlog, resetState } from '../features/blog/blogSlice';


let schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    category: yup.string().required("Category is Required"),
});

const AddBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);

    useEffect(() => {
        dispatch(getBlogsCategory());
    }, []);

    const blogCategoryState = useSelector((state) => state.blogcategory.blogcategories);
    const imageState = useSelector((state) => state.upload.images);
    const newBlog = useSelector((state) => state.blog);
    const { isSuccess, isError, isLoading, createdBlog } = newBlog;
    useEffect(() => {
        if (isSuccess && createdBlog) {
            toast.success('Blog Added Successfully!');
        }
        if (isError) {
            toast.error('Something Went Wrong');
        }
    }, [isSuccess, isError, isLoading]);

    const img = [];
    imageState.forEach(i => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });
    useEffect(() => {
        formik.values.images = img;
    }, [img])

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            category: "",
            images: [],
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createBlog(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
                navigate("/admin/blog-list")
            }, 1000);
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>Add Blog</h3>
            <div className=''>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className='mt-4'>
                        <CustomInput type='text' label='Enter Blog Title' val={formik.values.title} name='title' onCh={formik.handleChange('title')} onBlr={formik.handleBlur('title')} />
                        <div className="error">{
                            formik.touched.title && formik.errors.title
                        }</div>
                    </div>
                    <select value={formik.values.category} name='category' onChange={formik.handleChange('category')} onBlur={formik.handleBlur('category')} id="" className='form-control mt-3 py-3 form-select'>
                        <option value="">Select Category</option>
                        {blogCategoryState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>{i.title}</option>
                            )
                        })}
                    </select>
                    <div className="error">{
                        formik.touched.category && formik.errors.category
                    }</div>
                    <div className='mb-3 mt-3'>
                        <ReactQuill theme="snow" value={formik.values.description} name='description' onChange={formik.handleChange('description')} />
                        <div className="error">{
                            formik.touched.description && formik.errors.description
                        }</div>
                    </div>
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
                    <button type='submit' className='btn btn-success border-0 rounded-3 mt-4'>Add Blog</button>
                </form>
            </div>
        </div>
    )
}

export default AddBlog