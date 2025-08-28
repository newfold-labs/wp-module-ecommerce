import apiFetch from "@wordpress/api-fetch";

export const saveStoreInfo = async (data) => {
	return await apiFetch(
		{
			path: '/newfold-ecommerce/v1/store-info',
			method: 'POST',
			data: data
		});
}