import {Root, Button} from "@newfold/ui-component-library";
import { _x } from "@wordpress/i18n";

export const TriggerButton = () => {
	return (
		<Root>
			<Button size="small" onClick={() => document.dispatchEvent( new CustomEvent( 'nfd-open-quick-add-product-modal' ) )}>{_x( 'Quick add product', 'Modal button label.', 'wp-module-ecommerce' )}</Button>
		</Root>
	);
}