import './tailwind.pcss';

import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { QuickAddProductModal } from './QuickAddProductModal';
import { ModalForm } from './ModalForm';
import { WidgetForm } from "./WidgetForm";

const ROOT_MODAL_FORM_ID = 'nfd-quick-add-product-modal';
const ROOT_WIDGET_FORM_ID = 'nfd-quick-add-product-widget';
const ROOT_QUICK_ADD_PRODUCT_MODAL_ID = 'nfd-quick-add-product-modal-only';

const initQuickAddProductModal = () => {
	const quickAddProductModalRoot = document.getElementById(ROOT_QUICK_ADD_PRODUCT_MODAL_ID);
	const renderedClass = `${ROOT_QUICK_ADD_PRODUCT_MODAL_ID}--rendered`;

	if (!quickAddProductModalRoot || quickAddProductModalRoot.classList.contains(renderedClass)) {
		return;
	}

	createRoot(quickAddProductModalRoot).render(
		<QuickAddProductModal openAtRender={ true }/>
	);

	quickAddProductModalRoot.classList.add(renderedClass);
};


domReady( () => {

	// RENDER WIDGET
	const widgetRoot = document.getElementById( ROOT_WIDGET_FORM_ID );
	if ( null !== widgetRoot ) {
		createRoot( widgetRoot ).render( <WidgetForm /> );
	}

	// RENDER MODAL
	// Add root elem for modal button.
	const modalRootElem  = document.createElement( 'div' );
	modalRootElem.setAttribute('id', ROOT_MODAL_FORM_ID);
	// Look for product actions and append root.
	const productActions = document.querySelectorAll( '.edit-php.post-type-product .page-title-action' );
	if ( productActions ) {
		const lastProductAction = productActions[productActions.length - 1];
		lastProductAction?.after( modalRootElem )
	}

	// Look for root elem.
	const modalRoot = document.getElementById( ROOT_MODAL_FORM_ID );
	if ( null !== modalRoot ) {
		createRoot( modalRoot ).render( <ModalForm /> );
	}

	window.addEventListener('nfd-open-quick-add-product-modal', initQuickAddProductModal );
} );