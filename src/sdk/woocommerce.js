import apiFetch from "@wordpress/api-fetch"

const Endpoints = {
    ORDERS: '/wc/v3/orders'
}

export const WooCommerceSdk = {
    async orders(filter) {
        return apiFetch({
            path: `${Endpoints.ORDERS}`
        })
    }
}