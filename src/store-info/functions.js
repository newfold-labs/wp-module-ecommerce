import apiFetch from '@wordpress/api-fetch';

export const saveStoreInfo = async ( data ) => {
	const response = await apiFetch(
		{
			path: '/newfold-ecommerce/v1/store-info',
			method: 'POST',
			data: data
		} );

	// Update store info
	Object.keys( data ).forEach( key => {
		// if key is in data, and true in response, update NFDStoreInfo.data
		if ( key in data && response[ key ] ) {
			NFDStoreInfo.data[ key ] = data[ key ];
		}
	} );

	return response;
}