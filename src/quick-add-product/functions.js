
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