import apiFetch from '@wordpress/api-fetch';

export const saveStoreInfo = async ( data ) => {
	const response = await apiFetch(
		{
			path: '/newfold-ecommerce/v1/store-info',
			method: 'POST',
			data: data
		} );

	// Update store info with the response
	Object.keys( data ).forEach( key => {
		if ( key in data && response[ key ] ) {
			NFDStoreInfo.data[ key ] = response[ key ];
		}
	} );

	return response;
}