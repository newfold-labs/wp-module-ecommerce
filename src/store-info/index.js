import './tailwind.pcss';

import domReady from '@wordpress/dom-ready';
import {createRoot} from '@wordpress/element';
import {ModalForm} from "./ModalForm";

domReady( () => {

	const rootElem = document.getElementById( 'nfd-store-info-modal-wrapper' );

	if (rootElem) {
		createRoot( rootElem ).render(<ModalForm />);
	}
} );