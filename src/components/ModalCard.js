import { Modal } from '@wordpress/components';

const ModalCard = (props) => {
  return (
    <Modal
      overlayClassName='nfd-ecommerce-modal-overlay'
      className='nfd-ecommerce-atoms nfd-ecommerce-modal'
      isFullScreen={props.modal.isFullScreen}
      shouldCloseOnEsc={false}
      shouldCloseOnClickOutside={false}
      onRequestClose={() => props.setShowModal(false)}
    >
      {props.modal.contentType == 'component' ? (
        <props.modal.content
          onComplete={async () => {
            for (let refreshDependency of props.modal?.onClose ?? []) {
              await props.onRefresh(refreshDependency);
            }
            props.setShowModal(false);
          }}
        />
      ) : (
        { ...props.modal.content }
      )}
    </Modal>
  );
};
export default ModalCard;