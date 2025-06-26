import { TextField } from "@newfold/ui-component-library";
import { useState } from 'react';

export const PriceField = ({id, label, ...props}) => {

	const [price, setPrice] = useState('');

	const validatePrice = (event) => {
		const currentValue = event.target.value;

		const regex = new RegExp('[^-0-9%\\' + quickAddProduct.decimalSeparator + ']+', 'gi');
		const decimalRegex = new RegExp('\\' + quickAddProduct.decimalSeparator + '+', 'gi');

		const newValue = currentValue
			.replace( regex, '' )
			.replace( decimalRegex, quickAddProduct.decimalSeparator );

		setPrice(newValue);
	}

	return (
		<TextField id={id} onChange={validatePrice} label={label} value={price} {...props} />
	);
}