
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from '@wordpress/url';

export const createProduct = async (data) => {
	return await apiFetch(
		{
			path: '/newfold-ecommerce/v1/product',
			method: 'POST',
			data: data
		});
}