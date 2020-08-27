import axios from 'axios';

const baseURL = {
    medicalURL: 'https://medical.suixingkang.com/api/',
    userURL: 'https://user.suixingkang.com/api/',
    tradeURL: 'https://trade.suixingkang.com/api/'
};

const miniIndustryIndex3 = function(data) {
    return axios.post(baseURL.medicalURL + 'v30/pageshow/miniIndustryIndex3', data)
};
const poster = function(data) {
    return axios.post(baseURL.medicalURL + 'v30/marketing/getMarketingPosterList', data)
}
export {
    miniIndustryIndex3,
    poster
}