import {Root, Modal} from "@newfold/ui-component-library";
import {useCallback, useEffect, useState} from 'react';
import {Form} from './components/form'


export const ModalForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const closeModal = useCallback(() => setIsOpen(false), []);
	const openModal = useCallback(() => setIsOpen(true), []);

	// Listen for button click.
	useEffect(() => {

		const handleButtonClick = (ev) => {
			if (ev.target.hasAttribute('data-store-info-trigger')) {
				ev.preventDefault();
				openModal()
			}
		}

		document.addEventListener('click', handleButtonClick);
		return () => {document.removeEventListener('click', handleButtonClick);}
	}, []);

	// Listen trigger.
	useEffect(() => {
		document.addEventListener('nfd-open-store-info-modal', openModal);
		return () => {document.removeEventListener('click', openModal);}
	}, [])

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
