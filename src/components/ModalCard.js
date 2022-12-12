import { Modal } from "@wordpress/components";
import { useEffect } from "@wordpress/element";

const ModalCard = (props) => {
  const closeModal = () => props.setShowModal(false);

  useEffect(() => {
    let captiveFlowCompletion = async (e) => {
      if (
        e.origin === window.location.origin &&
        e?.data?.type === "captive-flow-completion"
      ) {
        for (let refreshDependency of props.modal?.onClose ?? []) {
          await props.onRefresh(refreshDependency);
        }
        closeModal();
      }
    };
    let iframeEvent = window.addEventListener("message", captiveFlowCompletion);
    return () => {
      window.removeEventListener("message", iframeEvent);
    };
  }, []);

  return (
    <Modal
      overlayClassName="nfd-ecommerce-modal-overlay"
      className="nfd-ecommerce-atoms nfd-ecommerce-modal"
      isFullScreen={props.modal.isFullScreen}
      shouldCloseOnEsc={false}
      shouldCloseOnClickOutside={false}
      onRequestClose={closeModal}
    >
      {props.modal.contentType == "component" ? (
        <props.modal.content
          onComplete={async () => {
            for (let refreshDependency of props.modal?.onClose ?? []) {
              await props.onRefresh(refreshDependency);
            }
            closeModal();
          }}
          {...props.modal}
        />
      ) : (
        props.modal.content
      )}
    </Modal>
  );
};
export default ModalCard;
