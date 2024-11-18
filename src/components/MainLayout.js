import React, { useState } from 'react';
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineMenuUnfold, AiOutlineMenuFold, AiOutlineBgColors } from "react-icons/ai";
import { SiProducthunt, SiBrandfolder } from "react-icons/si";
import { LiaBlogSolid } from "react-icons/lia";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { TbHelpSquareFilled } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { LuUsers2 } from "react-icons/lu";
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ "width": "400px" }} >
                <div className="demo-logo-vertical">
                    <h2 className='text-white py-3 text-center fs-4 fw-bolder mb-0'>
                        <span className='sm-logo'><PiShoppingCartSimpleFill /></span>
                        <span className='lg-logo'>Amazify.</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    style={{ "margin-top": "20px" }}
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        if (key === 'signout') {

                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <AiOutlineDashboard className='fs-5' />,
                            label: 'Dashboard',
                        },
                        {
                            key: 'customers',
                            icon: <LuUsers2 className='fs-5' />,
                            label: 'Customers',
                        },
                        {
                            key: 'catalog',
                            icon: <AiOutlineShoppingCart className='fs-5' />,
                            label: 'Catalog',
                            children: [
                                {
                                    key: 'product',
                                    icon: <SiProducthunt className='fs-5' />,
                                    label: 'Add Product',
                                },
                                {
                                    key: 'product-list',
                                    icon: <SiProducthunt className='fs-5' />,
                                    label: 'Product List',
                                },
                                {
                                    key: 'brand',
                                    icon: <SiBrandfolder className='fs-5' />,
                                    label: 'Add Brand',
                                },
                                {
                                    key: 'brand-list',
                                    icon: <SiBrandfolder className='fs-5' />,
                                    label: 'Brand List',
                                },
                                {
                                    key: 'category',
                                    icon: <BiCategory className='fs-5' />,
                                    label: 'Add Category',
                                },
                                {
                                    key: 'category-list',
                                    icon: <BiCategory className='fs-5' />,
                                    label: 'Category List',
                                },
                                {
                                    key: 'color',
                                    icon: <AiOutlineBgColors className='fs-5' />,
                                    label: 'Add Color',
                                },
                                {
                                    key: 'color-list',
                                    icon: <AiOutlineBgColors className='fs-5' />,
                                    label: 'Color List',
                                },
                            ],
                        },
                        {
                            key: 'orders',
                            icon: <FaClipboardList className='fs-5' />,
                            label: 'Orders',
                        },
                        {
                            key: 'blog',
                            icon: <LiaBlogSolid className='fs-5' />,
                            label: 'Blogs',
                            children: [
                                {
                                    key: 'blog',
                                    icon: <LiaBlogSolid className='fs-5' />,
                                    label: 'Add Blog',
                                },
                                {
                                    key: 'blog-list',
                                    icon: <LiaBlogSolid className='fs-5' />,
                                    label: 'Blog List',
                                },
                                {
                                    key: 'blog-category',
                                    icon: <LiaBlogSolid className='fs-5' />,
                                    label: 'Add Blog Category',
                                },
                                {
                                    key: 'blog-category-list',
                                    icon: <LiaBlogSolid className='fs-5' />,
                                    label: 'Blog Category List',
                                },
                            ]
                        },
                        {
                            key: 'enquiry',
                            icon: <TbHelpSquareFilled className='fs-5' />,
                            label: 'Enquiry',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header className='d-flex justify-content-between ps-1 pe-4'
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <AiOutlineMenuUnfold className='fs-5' /> : <AiOutlineMenuFold className='fs-4' />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className='d-flex align-items-center gap-4'>
                        <div className='position-relative'>
                            <IoIosNotifications className='fs-3' />
                            <span className='badge bg-warning rounded-circle py-1 position-absolute'>3</span>
                        </div>
                        <div className='d-flex align-items-center gap-3'>
                            <div>
                                <img
                                    width={32}
                                    height={32}
                                    src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                                    alt=""
                                />
                            </div>
                            <div>
                                <h5 className='mb-0'>Sonal Sengar</h5>
                                <p className='mb-0'>sengarsonal13@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;