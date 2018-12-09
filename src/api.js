
const URLS = {
    checkout: 'http://localhost:8080/api/checkouts/:checkoutId',
    coupon: 'http://localhost:8080/api/checkouts/:checkoutId?couponId=',
};

const doFetch = (url, type = 'get') => {
    return fetch(url, { method: type })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                } else {
                    console.log('Network response was not ok.');
                }
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
}

export const fetchCheckout = (checkoutId = '') => {
    const url = URLS.checkout.replace(':checkoutId', checkoutId);
    return doFetch(url);
};

export const fetchCoupon = (checkoutId, couponId) => {
    const url = URLS.coupon.replace(':checkoutId', checkoutId) + couponId;
    return doFetch(url);
};

export const confirmCheckout = (checkoutId = '') => {
    const url = URLS.checkout.replace(':checkoutId', checkoutId);
    return doFetch(url, 'post');
};