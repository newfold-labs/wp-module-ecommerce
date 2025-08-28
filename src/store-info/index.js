import './tailwind.pcss';

import domReady from '@wordpress/dom-ready';
import {createRoot} from '@wordpress/element';
import {ModalForm} from "./ModalForm";

domReady( () => {

	const root = createRoot( document.getElementById( 'nfd-store-info-modal-wrapper' ) );

	if (root) {
		document.addEventListener('click', (ev) => {
			if (ev.target.hasAttribute('data-store-info-trigger')) {
				ev.preventDefault();

				root.render(<ModalForm />);
			}
		})
	}
} );