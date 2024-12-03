import React, { useEffect } from 'react'
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getBlogsCategory } from '../features/blogCategory/blogCategorySlice';
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom"
const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Title",
        dataIndex: "title",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const BlogCategoryList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBlogsCategory());
    }, []);

    const blogCategoryState = useSelector((state) => state.blogcategory.blogcategories);
    const data1 = [];
    for (let i = 0; i < blogCategoryState.length; i++) {
        data1.push({
            key: i + 1,
            title: blogCategoryState[i].title,
            action: <>
                <Link to="/"><BiEdit className='fs-4 text-success' /></Link>
                <Link to="/"><MdDelete className='fs-4 ms-3 text-danger' /></Link>
            </>
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Blogs Categories</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default BlogCategoryList
