import {__} from "@wordpress/i18n";
import {Button} from "@newfold/ui-component-library";

export const FormResponse = ({product, resetFormCallback}) => {

	// Get featured image from product.
	const image = product?.images?.shift()?.src || quickAddProduct?.productPlaceholderImage;

	 return (
		 <>
			 <div id="nfd-quick-add-product__response">

				 <div className="nfd-quick-add-product__response-data">
					 { image && (
					 	<div className="nfd-quick-add-product__response-image">
							<img src={image} alt="" />
							<span>
								<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12.1953 4.19526C12.4556 3.93491 12.8777 3.93491 13.1381 4.19526C13.3784 4.43558 13.3969 4.81374 13.1935 5.07527L13.1381 5.13807L6.47139 11.8047C6.23107 12.0451 5.85292 12.0635 5.59139 11.8602L5.52859 11.8047L2.86192 9.13807C2.60157 8.87772 2.60157 8.45561 2.86192 8.19526C3.10224 7.95494 3.4804 7.93645 3.74192 8.1398L3.80473 8.19526L5.99999 10.39L12.1953 4.19526Z" fill="#ffffff"/>
								</svg>
							</span>
						</div>
					 )}

					 <div className="nfd-quick-add-product__response-details">
						 <span className="nfd-quick-add-product__response-product-name">{product.name}</span>
						 {__('added to your product catalog.', 'wp-module-ecommerce')}
						 <a href={product.permalink} title={product.name} target="_blank" className="nfd-quick-add-product__response-product-permalink">
							 {__('View product', 'wp-module-ecommerce')}
						 </a>
					 </div>
				 </div>

				 <Button as="a" variant="secondary" href={product.edit_url} target="_blank">
					 {__('Edit product details', 'wp-module-ecommerce')}
				 </Button>
				 <Button onClick={resetFormCallback}>
					 {__('Add another product', 'wp-module-ecommerce')}
				 </Button>
			 </div>
		 </>
	 )
 }