import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getCoupons = async () => {
    const response = await axios.get(`${base_url}coupon/`);
    return response.data;
};

const couponService = {
    getCoupons,
};

export default couponService;