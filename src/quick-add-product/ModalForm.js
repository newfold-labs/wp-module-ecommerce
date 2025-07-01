
import {Root, Button, Modal} from "@newfold/ui-component-library";
import { Form } from './components/form'
import { useState } from 'react';
import { __ } from "@wordpress/i18n";

export const ModalForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Root>
			<Button onClick={() => setIsOpen(true)}>{__( 'Quick Add Product', 'wp-module-ecommerce' )}</Button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="nfd-quick-add-product-modal">
				<Modal.Panel>
					<Form hasPreview={true} showTitle={true}/>
				</Modal.Panel>
			</Modal>
		</Root>
	)
}