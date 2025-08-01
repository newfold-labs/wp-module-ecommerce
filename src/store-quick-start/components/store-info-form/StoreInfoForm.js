import {useState, forwardRef, useImperativeHandle} from "react";
import {TextField, Title, SelectField} from "@newfold/ui-component-library";
import {_x} from "@wordpress/i18n";
import {saveStoreInfo} from "../../functions";

export const StoreInfoForm = forwardRef((props, ref) => {

	const [formData, setFormData] = useState(storeQuickStart.storeInfo);

	useImperativeHandle(ref, () => ({formSubmit}));

	const updateFormData = (key, value) => {
		setFormData( oldData => ({
			...oldData,
			[key]: value
		}))
	}

	const handleCountryChange = (country) => {
		updateFormData('country', country);
		// Always empty state field to prevent wrong data to be displayed.
		updateFormData('state', '');
	}

	const formSubmit = async (ev) => {
		ev?.preventDefault();

		try {
			await saveStoreInfo(formData)
		} catch (error) {
			console.error(error);
			return false;
		}

		return true;
	}

	return (
		<>
			<Title as="h2" size="2">{_x( 'Your Store Info', 'Store info modal title', 'wp-module-ecommerce')}</Title>
			<form method="POST" onSubmit={formSubmit}>
				<div className="nfd-store-info__form-field nfd-store-info__store-address-field">
					<TextField
						id="store-address"
						name="address"
						label={_x('Store Address', 'Store info form field label.', 'wp-module-ecommerce')}
						value={formData.address}
						onChange={(e) => updateFormData('address', e.target.value)}
					/>
				</div>
				<div className="nfd-store-info__form-field nfd-store-info__store-city-field">
					<TextField
						id="store-city"
						name="city"
						label={_x('City', 'Store info form field label.', 'wp-module-ecommerce')}
						value={formData.city}
						onChange={(e) => updateFormData('city', e.target.value)}
					/>
				</div>
				<div className="nfd-store-info__form-field nfd-store-info__store-postcode-field">
					<TextField
						id="store-postcode"
						name="postcode"
						label={_x('Postcode', 'Store info form field label.', 'wp-module-ecommerce')}
						value={formData.postcode}
						onChange={(e) => updateFormData('postcode', e.target.value)}
					/>
				</div>
				<div className="nfd-store-info__form-field nfd-store-info__store-state-field">
					{
						storeQuickStart?.stateOptions[formData.country]
						? <SelectField
								id="store-state"
								name="state"
								label={_x('State', 'Store info form field label.', 'wp-module-ecommerce')}
								value={formData.state}
								options={storeQuickStart.stateOptions[formData.country]}
								onChange={(val) => updateFormData('state', val)}
							/>
						: <TextField
								id="store-state"
								name="state"
								label={_x('State', 'Store info form field label.', 'wp-module-ecommerce')}
								value={formData.state}
								onChange={(e) => updateFormData('state', e.target.value)}
							/>
					}
				</div>
				<div className="nfd-store-info__form-field nfd-store-info__store-country-field">
					<SelectField
						id="store-country"
						name="country"
						label={_x('Country', 'Store info form field label.', 'wp-module-ecommerce')}
						value={formData.country}
						options={storeQuickStart?.countryOptions}
						onChange={handleCountryChange}
					/>
				</div>
				<div className="nfd-store-info__form-field nfd-store-info__store-industries">
					<SelectField
						id="store-industry"
						name="industry"
						label={_x('Industry', 'Store info form field label.', 'wp-module-ecommerce')}
						value={formData.industry}
						options={storeQuickStart?.industries}
						onChange={(val) => updateFormData('industry', val)}
					/>
				</div>
			</form>
		</>
	)
});