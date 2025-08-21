
import {Root, Button, Modal} from "@newfold/ui-component-library";
import { Form } from './components/form'
import { useState } from 'react';
import {QuickAddProductModal} from './QuickAddProductModal'

export const ModalForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Root>
			<Button size="small" onClick={() => setIsOpen(true)}>{_x( 'Quick add product', 'Modal button label.', 'wp-module-ecommerce' )}</Button>
			<QuickAddProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</Root>
	)
}