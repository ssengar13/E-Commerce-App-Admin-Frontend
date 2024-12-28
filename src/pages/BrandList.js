import React, { useEffect, useState } from 'react'
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, getBrands } from '../features/brand/brandSlice';
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
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

const BrandList = () => {
    const [open, setOpen] = useState(false);
    const [brandId, setBrandId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setBrandId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };
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
                <Link to={`/admin/brand/${brandState[i]._id}`} className='fs-4 text-success'><BiEdit /></Link>
                <button className='bg-transparent border-0 fs-4 ms-3 text-danger' onClick={() => showModal(brandState[i]._id)}><MdDelete /></button>
            </>
        });
    }
    const deleteBrandHandler = (e) => {
        dispatch(deleteBrand(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getBrands())
        }, 100)
    };
    return (
        <div>
            <h3 className="mb-4 title">Brands</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal hideModal={hideModal} open={open} performAction={() => deleteBrandHandler(brandId)} title='Are you sure you want to delete this brand?' />
        </div>
    )
}

export default BrandList