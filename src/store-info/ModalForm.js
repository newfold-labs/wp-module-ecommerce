import {Root, Modal} from "@newfold/ui-component-library";
import {useState} from 'react';
import {Form} from './components/form'


export const ModalForm = () => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<Root>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="nfd-store-info__modal">
				<Modal.Panel>
					<Form />
				</Modal.Panel>
			</Modal>
		</Root>
	)
}
