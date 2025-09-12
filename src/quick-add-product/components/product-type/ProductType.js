import * as Icons from '../product-types-icons'

export const ProductType = ({productType, selected, onChange}) => {

	let className = 'nfd-quick-add-product__type';
	if ( productType.premiumData ) {
		className += ' locked';
	} else if ( selected ) {
		className += ' selected';
	}

	const icon = (productType.key.charAt(0).toUpperCase() + productType.key.slice(1)) + 'Icon';
	const IconComponent = Icons[icon];

	return (
		<div key={productType.key} className={className}>
			<label htmlFor={"product-type-" + productType.key}>
				<span className="nfd-quick-add-product__type-check">
					<input type="radio" value={productType.key} id={"product-type-" + productType.key} name="product-type" onChange={onChange} checked={selected}/>
					<span></span>
				</span>
				<span className="nfd-quick-add-product__type-icon">
					<IconComponent />
				</span>
				<span className="nfd-quick-add-product__type-data">
					<span className="nfd-quick-add-product__type-title">{productType.title}</span>
					<span className="nfd-quick-add-product__type-description">{productType.description}</span>
				</span>
			</label>
		</div>
	)
}