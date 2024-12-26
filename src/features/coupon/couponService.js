import axios from 'axios';
import { config } from '../../utils/axiosconfig';
import { base_url } from '../../utils/base_url';

const getCoupons = async () => {
    const response = await axios.get(`${base_url}coupon/`);
    return response.data;
};

const createCoupon = async (coupon) => {
    const response = await axios.post(`${base_url}coupon/`, coupon, config);
    return response.data;
};

const couponService = {
    getCoupons,
    createCoupon,
};

export default couponService;
