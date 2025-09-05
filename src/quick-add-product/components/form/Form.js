
import { useState } from "react";
import { _x, sprintf } from "@wordpress/i18n";
import {TextField, TextareaField, Button, Title} from "@newfold/ui-component-library";
import { PriceField } from "../price-field";
import { CategoriesField } from "../categories-field";
import { ImageField } from "../image-field";
import { createProduct, decodeEntities } from "../../functions";
import { FormResponse } from "./FormResponse"
import { FormPreview } from "./FormPreview";

export const Form = ({hasPreview = false, showTitle = false, title = ''}) => {

	const [formData, setFormData] = useState({});
	const [submitResponse, setSubmitResponse] = useState(null);
	const [loading, setLoading] = useState(false);

	const formSubmit = async (ev) => {
		ev.preventDefault();

		let event = 'nfd-submit-quick-add-product',
			eventData = {};

		setLoading(true);

		try {
			const product = await createProduct( formData );

			event += '-success';
			eventData = {
				detail: product,
			}

			setSubmitResponse( product );
		} catch (error) {
			console.error(error);

			event += '-error';
			eventData = {
				detail: error,
			};
		}

		setLoading(false);

		// Dispatch event.
		window.dispatchEvent( new CustomEvent( event, eventData ) );
	}

	const updateFormData = (key, value) => {
		setFormData( oldData => ({
			...oldData,
			[key]: value
		}))
	}

	const resetForm = () => {
		setFormData({});
		setSubmitResponse(null);
	}

	if ( submitResponse ) {
		return (
			<FormResponse product={submitResponse} resetFormCallback={resetForm} />
		)
	}

	return (
		<>
			<div id="nfd-quick-add-product__form-wrapper">
				<div className="nfd-quick-add-product__form">
					{ showTitle && <Title as="h2" size="2">{ title || _x( 'Quick Add Product', 'Quick add product modal title', 'wp-module-ecommerce')}</Title>}
					<form method="POST" onSubmit={formSubmit}>
						<div className="nfd-quick-add-product__form-field">
							<TextField
								id="product-name"
								name="name"
								label={_x('Product Name', 'Quick Add Product form field label.', 'wp-module-ecommerce')}
								required={true}
								labelRequiredIndicator={true}
								onChange={(e) => updateFormData('name', e.target.value)}
							/>
						</div>
						<div className="nfd-quick-add-product__form-field">
							<PriceField
								id="product-price"
								name="regular_price"
								label={decodeEntities(sprintf(_x('Price (%s)', 'Quick Add Product form field label. %s is the currency symbol.', 'wp-module-ecommerce'), quickAddProduct.money.currencySymbol))}
								required={true}
								onChange={(price) => updateFormData('regular_price', price)}
							/>
						</div>
						<div className="nfd-quick-add-product__form-field">
							<TextareaField
								id="product-description"
								name="short_description"
								label={_x('Description', 'Quick Add Product form field label.', 'wp-module-ecommerce')}
								rows={4}
								onChange={(e) => updateFormData('short_description', e.target.value)}
							/>
						</div>
						<div className="nfd-quick-add-product__form-field">
							<CategoriesField
								id="product-categories"
								name="categories"
								label={_x('Categories', 'Quick Add Product form field label.', 'wp-module-ecommerce')}
								onChange={(categories) => updateFormData('categories', categories)}
							/>
						</div>
						<div className="nfd-quick-add-product__form-field">
							<ImageField
								id="product-image"
								name="images"
								label={_x('Image', 'Quick Add Product form field label.', 'wp-module-ecommerce')}
								onChange={(images) => updateFormData('images', images)}
							/>
						</div>
						<div className="nfd-quick-add-product__form-submit">
							<Button
								type="submit"
								disabled={loading || ! ( formData?.name && formData?.regular_price )}
							>
								{_x('Add product', 'Quick Add Product form submit button label', 'wp-module-ecommerce')}
							</Button>
						</div>
					</form>
				</div>
				{hasPreview && <FormPreview data={formData} />}
			</div>
		</>
	)
}
