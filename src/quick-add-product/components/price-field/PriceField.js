import { TextField } from "@newfold/ui-component-library";
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from "../../functions";

const PriceField = ({id, label, onChange, name='', required = false}) => {

	const [price, setPrice] = useState('');

	useEffect(() => {
		if ( typeof onChange === "function" ) {
			onChange( price );
		}
	}, [price]);

	const validatePrice = (event) => {
		setPrice( formatNumber( event.target.value ) );
	}

	return (
		<TextField
			id={id}
			name={name || id}
			label={label}
			required={required}
			labelRequiredIndicator={required}
			onChange={validatePrice}
			value={price}
		/>
	);
}

PriceField.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	name: PropTypes.string,
	required: PropTypes.bool
}

export default PriceField;