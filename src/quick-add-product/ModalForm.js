
import {Root, Modal} from "@newfold/ui-component-library";
import {useCallback, useEffect, useState} from 'react';
import {Form} from './components/form'
import {ProductTypes} from "./components/product-types";

export const ModalForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [productType, setProductType] = useState(null);

	const openModal = useCallback(() => setIsOpen(true), []);
	const closeModal = useCallback(() => {
		setIsOpen(false);
		setProductType(null);
	}, []);

	// Listen for button click.
	useEffect(() => {

		const handleButtonClick = (ev) => {
			if ( ev.target.hasAttribute( 'data-quick-add-product-trigger' ) ) {
				ev.preventDefault();
				! ev.target.hasAttribute( 'disabled' ) && openModal()
			}
		}

		document.addEventListener('click', handleButtonClick);
		return () => {document.removeEventListener('click', handleButtonClick);}
	}, []);

	// Listen trigger.
	useEffect(() => {
		document.addEventListener('nfd-open-quick-add-product-modal', openModal);
		return () => {document.removeEventListener('nfd-open-quick-add-product-modal', openModal);}
	}, [])

	return (
		<Root>
			<Modal isOpen={isOpen} onClose={closeModal} className="nfd-quick-add-product-modal">
				<Modal.Panel>
					{ !productType
						? <ProductTypes onSelect={setProductType}/>
						: <Form hasPreview={true} showTitle={true} productType={productType} />
					}
				</Modal.Panel>
			</Modal>
		</Root>
	)
}