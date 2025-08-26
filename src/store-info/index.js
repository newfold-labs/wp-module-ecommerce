import './tailwind.pcss';

import domReady from '@wordpress/dom-ready';
import {createRoot} from '@wordpress/element';
import {ModalForm} from "./ModalForm";

domReady( () => {

	const root = createRoot( document.getElementById( 'nfd-store-info-modal-wrapper' ) );

	if (root) {
		document.querySelector('[data-store-info-trigger]')?.addEventListener('click', (ev) => {
			ev.preventDefault();

			root.render(<ModalForm />);
		})
	}
} );