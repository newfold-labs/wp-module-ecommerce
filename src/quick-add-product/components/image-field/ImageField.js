import { Label } from "@newfold/ui-component-library";
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { __ } from "@wordpress/i18n";

const ImageField = ({id, label, onChange, name = ''}) => {

	const [images, setImages] = useState([]);

	useEffect(() => {
		if ( typeof onChange === "function" ) {
			onChange( images );
		}
	}, [images]);

	// Init frame.
	const mediaFrame = wp?.media({
		title: __('Set product image', 'wp-module-ecommerce'),
		button: {
			text: __( 'Use as product image', 'wp-module-ecommerce' ),
		},
		multiple: false, // Set to true to allow multiple files to be selected
	});

	// Listen frame image selection.
	mediaFrame?.on( 'select', () => setImages( [ ...images, mediaFrame.state().get('selection').first().toJSON() ] ) );

	// Open frame.
	const openMediaFrame = (event) => {
		event.preventDefault();
		mediaFrame?.open();
	}

	// Remove image.
	const removeImage = (image_id) => {
		setImages( images.filter( image => image.id !== image_id ) );
	}

	return (
		<>
			<div className="nfd-quick-add-product__image-field">
				<div className="nfd-flex nfd-items-center nfd-mb-2">
					<Label htmlFor={id} label={label} />
				</div>

				{
					images.length
					? images.map(
						image => (
							<div key={image.id} className="nfd-quick-add-product__image-preview">
								<img src={image.url} alt={image.alt} />

								<button className="nfd-quick-add-product__image-remove" onClick={() => removeImage(image.id)}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="nfd-h-3 nfd-w-3">
										<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
									</svg>
								</button>
							</div>
						)
					)
					: (
						<div className="nfd-quick-add-product__image-uploader" onClick={openMediaFrame}>
							<span>{__('Set product image', 'wp-module-ecommerce')}</span>
						</div>
					)
				}

				<input type="hidden" id={id} name={name || id} value={JSON.stringify(images)}/>
			</div>
		</>
	);
}

ImageField.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string,
	onChange: PropTypes.func
}

export default ImageField;
