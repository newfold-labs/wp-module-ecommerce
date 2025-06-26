
import {Root, Button, Modal, Title} from "@newfold/ui-component-library";
import { Form } from './components/form'
import { useState } from 'react';
import { __ } from "@wordpress/i18n";

export const ModalForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Root>
			<Button onClick={() => setIsOpen(true)}>{__( 'Quick Add Product', 'wp-module-ecommerce' )}</Button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<Modal.Panel>
					<Title as="h2">{__( 'Quick Add Product', 'wp-module-ecommerce' )}</Title>
					<Form />
				</Modal.Panel>
			</Modal>
		</Root>
	)
}