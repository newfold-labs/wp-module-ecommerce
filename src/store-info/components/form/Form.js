
import {useState} from "react";
import {_x} from "@wordpress/i18n";
import PropTypes from 'prop-types';
import {TextField, SelectField, Button, Title} from "@newfold/ui-component-library";
import {saveStoreInfo} from "../../functions";

const Form = ({onFormSubmit, title = ''}) => {

	const [formData, setFormData] = useState(NFDStoreInfo.data);
	const [loading, setLoading] = useState(false);

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

		setLoading(true);

		try {
			await saveStoreInfo(formData)
		} catch (error) {
			console.error(error);
		}

		setLoading(false);

		// Dispatch event.
		document.dispatchEvent( new CustomEvent( 'nfd-submit-store-info-form' ) );

		onFormSubmit?.();
	}

	return (
		<>
			<div className="nfd-store-info__form">
				<Title as="h2" size="2">{title || _x( 'Store details', 'Store info modal title', 'wp-module-ecommerce')}</Title>
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
							NFDStoreInfo?.stateOptions[formData.country]
								? <SelectField
									id="store-state"
									name="state"
									label={_x('State', 'Store info form field label.', 'wp-module-ecommerce')}
									value={formData.state}
									options={NFDStoreInfo.stateOptions[formData.country]}
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
							options={NFDStoreInfo?.countryOptions}
							onChange={handleCountryChange}
						/>
					</div>
					<div className="nfd-store-info__form-field nfd-store-info__store-industries">
						<SelectField
							id="store-industry"
							name="industry"
							label={_x('Industry', 'Store info form field label.', 'wp-module-ecommerce')}
							value={formData.industry}
							options={NFDStoreInfo?.industries}
							onChange={(val) => updateFormData('industry', val)}
						/>
					</div>
					<div className="nfd-store-info__form-submit">
						<Button
							type="submit"
							disabled={loading}
						>
							{_x('Save', 'Store info form submit button label', 'wp-module-ecommerce')}
						</Button>
					</div>
				</form>
			</div>
		</>
	)
}

Form.propTypes = {
	title: PropTypes.string,
	onFormSubmit: PropTypes.func
}

export default Form;