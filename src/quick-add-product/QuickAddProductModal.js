import { useEffect, useState, useMemo } from 'react';
import { Modal } from '@newfold/ui-component-library';
import { Form } from './components/form';
import classNames from 'classnames';

export const QuickAddProductModal = ( {
	isOpen: isOpenProp,
	onClose: onCloseProp,
	openAtRender = false,
	className,
} ) => {
	const isControlled = useMemo( () => typeof isOpenProp === 'boolean', [ isOpenProp ] );

	const [ internalOpen, setInternalOpen ] = useState( openAtRender );
	const isOpen = isControlled ? isOpenProp : internalOpen;
	const setIsOpen = isControlled ? ( isOpening ) => (isOpening ? null : onCloseProp?.()) : setInternalOpen;

	useEffect( () => {
		const handleOpenModal = () => setIsOpen( true );
		window.addEventListener( 'nfd-open-quick-add-product-modal', handleOpenModal );
		return () => window.removeEventListener( 'nfd-open-quick-add-product-modal', handleOpenModal );
	}, [ setIsOpen ] );

	return (
		<Modal
			isOpen={ isOpen }
			onClose={ () => setIsOpen( false ) }
			className={ classNames(
				'nfd-quick-add-product-modal',
				className
			) }
		>
			<Modal.Panel>
				<Form hasPreview showTitle/>
			</Modal.Panel>
		</Modal>
	);
};