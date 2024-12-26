import axios from 'axios';
import { config } from '../../utils/axiosconfig';
import { base_url } from '../../utils/base_url';

const getBlogsCategory = async () => {
    const response = await axios.get(`${base_url}blogcategory/`);
    return response.data;
};

const createBlogCategory = async (blogCategory) => {
    const response = await axios.post(`${base_url}blogcategory/`, blogCategory, config);
    return response.data;
};

const blogCategoryService = {
    getBlogsCategory,
    createBlogCategory,
};

export default blogCategoryService;