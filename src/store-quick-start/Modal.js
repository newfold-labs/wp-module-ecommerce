import {Root, Modal} from "@newfold/ui-component-library";
import {useState} from 'react';
import {StepsProvider} from "./StepsProvider";
import {ModalStep} from "./components/modal-step";


export const ModalStoreQuickStart = () => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<Root>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="nfd-store-quick-start-modal">
				<Modal.Panel>
					<StepsProvider>
						<ModalStep />
					</StepsProvider>
				</Modal.Panel>
			</Modal>
		</Root>
	)
}
