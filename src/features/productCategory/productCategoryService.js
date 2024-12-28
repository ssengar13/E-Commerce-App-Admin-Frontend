import axios from 'axios';
import { config } from '../../utils/axiosconfig';
import { base_url } from '../../utils/base_url';

const getProductsCategory = async () => {
    const response = await axios.get(`${base_url}category/`);
    return response.data;
};

const createProductCategory = async (category) => {
    const response = await axios.post(`${base_url}category/`, category, config);
    return response.data;
};

const updateProductCategory = async (category) => {
    const response = await axios.put(`${base_url}category/${category.id}`, { title: category.categoryData.title }, config);
    return response.data;
};

const getProductCategory = async (id) => {
    const response = await axios.get(`${base_url}category/${id}`, config);
    return response.data;
};

const deleteProductCategory = async (id) => {
    const response = await axios.delete(`${base_url}category/${id}`, config);
    return response.data;
};

const productCategoryService = {
    getProductsCategory,
    createProductCategory,
    updateProductCategory,
    getProductCategory,
    deleteProductCategory,
};

export default productCategoryService;