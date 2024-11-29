import React, { useEffect } from 'react'
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice';
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
        sorter: (a, b) => a.title.length - b.title.length,
    },
    {
        title: "Price",
        dataIndex: "price",
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: "Brand",
        dataIndex: "brand",
        sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
        title: "Category",
        dataIndex: "category",
        sorter: (a, b) => a.category.length - b.category.length,
    },
    {
        title: "Description",
        dataIndex: "description",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const ProductList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, []);

    const productState = useSelector((state) => state.product.products);
    const data1 = [];
    for (let i = 0; i < productState.length; i++) {
        data1.push({
            key: i + 1,
            title: productState[i].title,
            price: `${productState[i].price}`,
            brand: productState[i].brand,
            category: productState[i].category,
            description: productState[i].description,
            action: <>
                <Link to="/"><BiEdit className='fs-4 text-success' /></Link>
                <Link to="/"><MdDelete className='fs-4 ms-3 text-danger' /></Link>
            </>
        });
    }

    return (
        <div>
            <h3 className="mb-4 title">Products List</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default ProductList