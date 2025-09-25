import {Title} from "@newfold/ui-component-library";
import {_x} from "@wordpress/i18n"
import {useEffect, useState} from "react";
import {ProductType} from "../product-type";
import {ProductTypesAction} from "./ProductTypesAction";

export const ProductTypes = ({onSelect = undefined}) => {

	const [selectedType, setSelectedType] = useState(null);

	useEffect(() => {
		if (selectedType === null) {
			setSelectedType( quickAddProduct.productTypes[0].key );
		}
	}, [selectedType]);

	const handleChange = (ev) => {
		setSelectedType(ev.target.value);
	}

	const handleProductSelect = (ev) => {
		ev.preventDefault();
		// Get product type.
		const productType = quickAddProduct.productTypes.find( type => selectedType === type.key );

		// If product type has redirect flag set, do it!
		if ( productType.redirect ) {
			window.location.replace( ev.target.href );
			return false;
		}

		// If not premium data proceed with modal.
		productType.premiumData || onSelect?.(selectedType)
	}

	return (
		<div id="nfd-quick-add-product__type-select">
			<Title as="h2" size="2">
				{_x( 'What are you planning to sell or offer?', 'Select product section title', 'wp-module-ecommerce')}
			</Title>
			<p>
				{_x('Pick one or more options based on the type of product or service you want to offer your customers.', 'Select product section description', 'wp-module-ecommerce')}
			</p>
			<div className="nfd-quick-add-product__types">
				{
					quickAddProduct.productTypes.map( productType => (
						<ProductType key={productType.key} productType={productType} selected={selectedType === productType.key} onChange={handleChange} />
					))
				}
			</div>
			<ProductTypesAction productType={selectedType} onClick={handleProductSelect} />
		</div>
	)
}