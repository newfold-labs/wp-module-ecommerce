import apiFetch from '@wordpress/api-fetch';

export const saveStoreInfo = async ( data ) => {
	const response = await apiFetch(
		{
			path: '/newfold-ecommerce/v1/store-info',
			method: 'POST',
			data: data
		} );

	Object.keys( data ).forEach( key => {
		if ( key in data && response[ key ] ) {
			storeInfo.data[ key ] = data[ key ];
		}
	} );

	return response;
}