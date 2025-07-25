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
							<svg version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
								<g><g transform="translate(278.000000, 232.000000)">
									<path d="M-226.2-181.6h-39.5c-2.3,0-4.2-1.9-4.2-4.2v-28.2c0-2.3,1.9-4.2,4.2-4.2h39.5c2.3,0,4.2,1.9,4.2,4.2v28.2C-222-183.5-223.9-181.6-226.2-181.6L-226.2-181.6z M-265.8-215.5c-0.8,0-1.4,0.6-1.4,1.4v28.2c0,0.8,0.6,1.4,1.4,1.4h39.5c0.8,0,1.4-0.6,1.4-1.4v-28.2c0-0.8-0.6-1.4-1.4-1.4H-265.8L-265.8-215.5z"/>
									<path d="M-238.9-201.5c-3.1,0-5.5-2.5-5.5-5.5s2.5-5.5,5.5-5.5s5.5,2.5,5.5,5.5S-235.9-201.5-238.9-201.5L-238.9-201.5z M-238.9-210c-1.6,0-2.9,1.3-2.9,2.9c0,1.6,1.3,2.9,2.9,2.9c1.6,0,2.9-1.3,2.9-2.9C-236-208.7-237.3-210-238.9-210L-238.9-210z" />
									<polyline points="-231.4,-182.1 -254.5,-203.8 -267.7,-191.6 -269.5,-193.5 -254.5,-207.4 -229.6,-184 -231.4,-182.1"/>
									<polyline points="-224.2,-189.3 -231.9,-195.5 -238.3,-190.2 -240,-192.3 -231.9,-198.9 -222.6,-191.3 -224.2,-189.3"/>
								</g></g>
							</svg>
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
