import {Button} from "@newfold/ui-component-library";
import {_x} from "@wordpress/i18n";

export const ProductTypesAction = ({productType, onClick}) => {

	const productTypeData = quickAddProduct.productTypes.find( type => productType === type.key );

	const premiumUpsellCTB 	= productTypeData?.premiumData?.ctbId;
	const premiumActivation = productTypeData?.premiumData && ! premiumUpsellCTB;

	return (
		<div className="nfd-quick-add-product__types-action">
			<Button
				as={ 'a' }
				href={"#"}
				onClick={onClick}
				data-ctb-id={premiumUpsellCTB}
				data-nfd-installer-plugin-activate={premiumActivation || null}
				data-nfd-installer-download-url={premiumActivation ? productTypeData.premiumData.download : null}
				data-nfd-installer-plugin-basename={premiumActivation ? productTypeData.premiumData.basename : null}
				data-nfd-installer-plugin-name={premiumActivation ? productTypeData.premiumData.name : null}
				data-nfd-installer-pls-provider={premiumActivation ? productTypeData.premiumData.plsProviderName : null}
				data-nfd-installer-pls-slug={premiumActivation ? productTypeData.premiumData.plsSlug : null}
			>
				{_x('Next', 'Quick add product modal button label', 'wp-module-ecommerce')}
			</Button>
		</div>
	)
}
