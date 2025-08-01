import './tailwind.pcss';

import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import {ModalStoreQuickStart} from "./Modal";

domReady( () => {

	const root = createRoot( document.getElementById( 'nfd-store-quick-start' ) );

	root.render(<ModalStoreQuickStart />);

	// document.querySelector('[data-store-quick-start]').addEventListener('click', (ev) => {
	// 	ev.preventDefault();
	//
	// 	root.render(<ModalStoreQuickStart />);
	// })
} );