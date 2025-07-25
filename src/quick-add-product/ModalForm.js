
import {Root, Button, Modal} from "@newfold/ui-component-library";
import { Form } from './components/form'
import { useState } from 'react';
import { _x } from "@wordpress/i18n";

export const ModalForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Root>
			<Button size="small" onClick={() => setIsOpen(true)}>{_x( 'Quick add product', 'Modal button label.', 'wp-module-ecommerce' )}</Button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="nfd-quick-add-product-modal">
				<Modal.Panel>
					<Form hasPreview={true} showTitle={true}/>
				</Modal.Panel>
			</Modal>
		</Root>
	)
}