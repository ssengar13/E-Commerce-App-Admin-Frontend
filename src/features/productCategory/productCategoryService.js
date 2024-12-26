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

const productCategoryService = {
    getProductsCategory,
    createProductCategory,
};

export default productCategoryService;