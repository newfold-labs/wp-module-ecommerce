import { Modal } from "@wordpress/components";

const ModalCard = (props) => {
  let refreshCalls = [];
  (props.modal?.onClose ?? []).forEach((endpoint) => {
    Object.entries(props.responses)?.forEach(([key, value] = response) => {
      if (key == endpoint) {
        refreshCalls.push(value[endpoint]);
      }
    });
  });

  return (
    <Modal
      overlayClassName="nfd-ecommerce-modal-overlay"
      className="nfd-ecommerce-atoms nfd-ecommerce-modal"
      isFullScreen={props.modal.isFullScreen}
      shouldCloseOnEsc={false}
      shouldCloseOnClickOutside={false}
      onRequestClose={() => props.setShowModal(false)}
    >
      {props.modal.contentType == "component" ? (
        <props.modal.content
          onComplete={() => {
            refreshCalls?.forEach(async (refresh) => await refresh());
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
