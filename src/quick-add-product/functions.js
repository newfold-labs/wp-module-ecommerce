
import apiFetch from "@wordpress/api-fetch";

export const createProduct = async (data) => {
	return await apiFetch(
		{
			path: '/newfold-ecommerce/v1/product',
			method: 'POST',
			data: data
		});
}

export const fetchCategories = async () => {
	let categories = [];

	try {
		categories = await apiFetch(
			{
				path: '/wc/v3/products/categories',
				method: 'GET'
			});

		categories = categories?.map(prepareCategoryObject)

	} catch (error) {
		console.error(error);
	}

	return categories;
}

export const prepareCategoryObject = (category) => {
	return {
		id: category?.id || 0,
		slug: category?.slug || '',
		name: category.name
	}
}

export const formatNumber = number => {

	let formattedNumber = number.replace(
		new RegExp('[^0-9\\' + quickAddProduct.money.decimalSeparator + ']+', 'gi'),
		''
	);

	// Keep only the first decimal separator.
	let dotIndex = formattedNumber.indexOf('.');

	if ( -1 !== dotIndex ) {

		// Decimal separator could not be the first char.
		if ( 0 === dotIndex ) {
			formattedNumber = formattedNumber.replace( new RegExp('[\\' + quickAddProduct.money.decimalSeparator + ']+', 'gi'), '' );
		} else {
			// Include first decimal separator.
			++dotIndex;

			formattedNumber =
				formattedNumber.slice( 0, dotIndex ) +
				formattedNumber.slice( dotIndex, dotIndex + quickAddProduct.money.decimals ).replace( new RegExp('[\\' + quickAddProduct.money.decimalSeparator + ']+', 'gi'), '' );
		}
	}

	return formattedNumber;
}

export const formatPrice = price => {
	return decodeEntities( accounting.formatMoney( price, {
		symbol:    quickAddProduct.money.currencySymbol,
		decimal:   quickAddProduct.money.decimalSeparator,
		thousand:  quickAddProduct.money.thousandSeparator,
		precision: quickAddProduct.money.decimals,
	} ) );
}

export const decodeEntities = encodedString => {
	const tmp = document.createElement( 'DIV' );
	tmp.innerHTML = encodedString;
	return tmp.textContent || tmp.innerText || '';
}