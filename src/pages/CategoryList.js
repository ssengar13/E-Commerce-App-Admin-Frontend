import React, { useEffect, useState } from 'react'
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductCategory, getProductsCategory } from '../features/productCategory/productCategorySlice';
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom"
import CustomModal from '../components/CustomModal';

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

const CategoryList = () => {
    const [open, setOpen] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setCategoryId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductsCategory());
    }, []);

    const categoryState = useSelector((state) => state.category.categories);
    const data1 = [];
    for (let i = 0; i < categoryState.length; i++) {
        data1.push({
            key: i + 1,
            title: categoryState[i].title,
            action: <>
                <Link to={`/admin/category/${categoryState[i]._id}`}><BiEdit className='fs-4 text-success' /></Link>
                <button className='bg-transparent border-0 fs-4 ms-3 text-danger' onClick={() => showModal(categoryState[i]._id)} ><MdDelete /></button>
            </>
        });
    }
    const deleteCategoryHandler = (e) => {
        dispatch(deleteProductCategory(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getProductsCategory())
        }, 100)
    };
    return (
        <div>
            <h3 className="mb-4 title">Product Category</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal hideModal={hideModal} open={open} performAction={() => deleteCategoryHandler(categoryId)} title='Are you sure you want to delete this Category?' />

        </div>
    )
}

export default CategoryList