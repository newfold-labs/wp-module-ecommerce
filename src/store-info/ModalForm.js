import {Root, Modal} from "@newfold/ui-component-library";
import {useCallback, useState} from 'react';
import {Form} from './components/form'


export const ModalForm = () => {
	const [isOpen, setIsOpen] = useState(true);
	const closeModal = useCallback(() => setIsOpen(false), [])

	return (
		<Root>
			<Modal isOpen={isOpen} onClose={closeModal} className="nfd-store-info__modal">
				<Modal.Panel>
					<Form onFormSubmit={closeModal}/>
				</Modal.Panel>
			</Modal>
		</Root>
	)
}
