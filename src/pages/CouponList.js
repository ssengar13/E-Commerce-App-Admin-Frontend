import React, { useEffect } from 'react'
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom"
import { getCoupons } from '../features/coupon/couponSlice';

const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Expiry",
        dataIndex: "expiry",
    },
    {
        title: "Discount",
        dataIndex: "discount",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const CouponList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCoupons());
    }, []);

    const couponState = useSelector((state) => state.coupon.coupons);
    const data1 = [];
    for (let i = 0; i < couponState.length; i++) {
        data1.push({
            key: i + 1,
            name: couponState[i].name,
            expiry: new Date(couponState[i].expiry).toLocaleDateString(),
            discount: couponState[i].discount,
            action: <>
                <Link to="/"><BiEdit className='fs-4 text-success' /></Link>
                <Link to="/"><MdDelete className='fs-4 ms-3 text-danger' /></Link>
            </>
        });
    }
    return (
        <div>
            <h3 className="mb-4 title">Coupon List</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default CouponList
