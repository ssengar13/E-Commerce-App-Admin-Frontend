import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getBlogsCategory = async () => {
    const response = await axios.get(`${base_url}blogcategory/`);
    return response.data;
};

const blogCategoryService = {
    getBlogsCategory,
};

export default blogCategoryService;