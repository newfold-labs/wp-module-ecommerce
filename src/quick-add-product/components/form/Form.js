
import { useState, useRef } from "react";
import { __ } from "@wordpress/i18n";
import { TextField, TextareaField, Button, Spinner } from "@newfold/ui-component-library";
import { PriceField } from "../price-field";
import { CategoriesField } from "../categories-field";
import { ImageField } from "../image-field";
import { createProduct } from "../../functions";
import { FormResponse } from "../form-response";

export const Form = () => {

	const formRef = useRef();
	const [submitResponse, setSubmitResponse] = useState(null);
	const [loading, setLoading] = useState(false);

	const formSubmit = async (ev) => {
		ev.preventDefault();

		setLoading(true);

		const formData = new FormData(formRef.current);

		try {
			const product = await createProduct( Object.fromEntries(formData.entries()) );
			setSubmitResponse( product );
		} catch (error) {
			console.error(error);
		}

		setLoading(false);
	}

	if ( submitResponse ) {
		return (
			<FormResponse product={submitResponse} resetFormCallback={() => setSubmitResponse(null)} />
		)
	}

	return (
		<>
			<form ref={formRef} method="POST" id="nfd-quick-add-product__form" onSubmit={formSubmit}>
				<div className="nfd-quick-add-product__form-field nfd-my-4">
					<TextField
						id="product-name"
						name="name"
						label={__('Product Name', 'wp-module-ecommerce')}
						onChange={(e) => console.log(e.target.value)}
					/>
				</div>
				<div className="nfd-quick-add-product__form-field nfd-my-4">
					<TextareaField
						id="product-description"
						name="short_description"
						label={__('Description', 'wp-module-ecommerce')}
					/>
				</div>
				<div className="nfd-quick-add-product__form-field nfd-my-4">
					<PriceField
						id="product-price"
						name="regular_price"
						label={__('Price', 'wp-module-ecommerce')}
					/>
				</div>
				<div className="nfd-quick-add-product__form-field nfd-my-4">
					<CategoriesField
						id="product-categories"
						name="categories"
						label={__('Categories', 'wp-module-ecommerce')}
					/>
				</div>
				<div className="nfd-quick-add-product__form-field nfd-my-4">
					<ImageField
						id="product-image"
						name="featured_image"
						label={__('Image', 'wp-module-ecommerce')}
					/>
				</div>
				<div className="nfd-quick-add-product__form-submit nfd-my-4">
					<Button type="submit">{__('Add product', 'wp-module-ecommerce')}</Button>
				</div>
				{loading && <Spinner />}
			</form>
		</>
	)
}
