import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getProductsCategory = async () => {
    const response = await axios.get(`${base_url}category/`);
    return response.data;
};

const productCategoryService = {
    getProductsCategory,
};

export default productCategoryService;