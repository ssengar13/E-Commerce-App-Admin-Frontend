import React, { useEffect } from 'react'
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
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

const BrandList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBrands());
    }, []);

    const brandState = useSelector((state) => state.brand.brands);
    const data1 = [];
    for (let i = 0; i < brandState.length; i++) {
        data1.push({
            key: i + 1,
            title: brandState[i].title,
            action: <>
                <Link to="/"><BiEdit className='fs-4 text-success' /></Link>
                <Link to="/"><MdDelete className='fs-4 ms-3 text-danger' /></Link>
            </>
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Brands</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default BrandList