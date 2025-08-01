import {StartScreen} from "./components/start-screen";
import {StoreInfoForm} from "./components/store-info-form";
import {Form as ProductForm} from "../quick-add-product/components/form";
import {_x} from "@wordpress/i18n";

export const steps = [
	{
		key: 'start-screen',
		nextButtonLabel: _x( 'Start Now', 'Store quick start nav button label', 'wp-module-ecommerce' ),
		component: StartScreen
	},
	{
		key: 'store-info-form',
		component: StoreInfoForm
	},
	{
		key: 'create-product',
		nextButtonLabel: _x( 'Save', 'Store quick start nav button label', 'wp-module-ecommerce' ),
		componentParams: {
			hasPreview: true,
			showTitle: true
		},
		component: ProductForm
	}
];