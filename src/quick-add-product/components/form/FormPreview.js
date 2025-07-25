import {decodeEntities, formatPrice} from "../../functions";
import {Button} from "@newfold/ui-component-library";
import placeholderImage from "../../images/placeholder.jpg"

export const FormPreview = ({data}) => {

	const image = data?.images?.[0]?.url || placeholderImage;

	return (
		<>
			<div className="nfd-quick-add-product__form-preview">
				<div className="nfd-quick-add-product__form-preview-product">
					{ image && (
						<div className="nfd-quick-add-product__form-preview-product-image">
							<img src={image} alt="" />
						</div>
					)}
					<div className="nfd-quick-add-product__form-preview-product-summary">
						<div className="nfd-quick-add-product__form-preview-product-title">
							{data?.name ? decodeEntities(data.name) : <div className="nfd-quick-add-product__form-preview-placeholder"></div> }
						</div>
						<div className="nfd-quick-add-product__form-preview-product-price">
							{data?.regular_price ? formatPrice(data.regular_price) : <div className="nfd-quick-add-product__form-preview-placeholder"></div> }
						</div>
						<div className="nfd-quick-add-product__form-preview-product-description">
							{
								data?.short_description
								? decodeEntities( data.short_description.slice(0, 150) )
								: (
									<>
										<div className="nfd-quick-add-product__form-preview-placeholder"></div>
										<div className="nfd-quick-add-product__form-preview-placeholder"></div>
										<div className="nfd-quick-add-product__form-preview-placeholder"></div>
									</>
								)
							}
						</div>
						<div className="nfd-quick-add-product__form-preview-product-add-to-cart">
							<Button size="small">Add to cart</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}