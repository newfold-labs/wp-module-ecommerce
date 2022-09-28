import { useState } from "@wordpress/element";
import { ReactComponent as Arrow } from "../icons/goto-arrow.svg";
import ModalCard from "./ModalCard";

export function StandardCard(props) {
  const [showModal, setShowModal] = useState(null);
  let modal = props.modal();
  let { image: Icon } = props.assets();
  let responses = props.responses;
  for (const key in responses) {
    const response = responses[key];
    response.parsedData = response.parser(response.data);
  }
  const taskCompleted = props.taskCompleted(responses);
  let { title, actionName } = props.text(taskCompleted);
  let Action = responses
    ? Arrow
    : () => <div className="bwa-loader nfd-ecommerce-loader-mini" />;

  const buttonClickHandler = () => {
    if (taskCompleted) {
      props.actions.buttonClick();
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        className="nfd-ecommerce-card"
        data-variant="standard"
        type="button"
        onClick={buttonClickHandler}
      >
        <div className="nfd-ecommerce-card-image">
          <Icon />
        </div>
        <span className="nfd-ecommerce-card-title">
          {title}
          <span className="nfd-ecommerce-card-link">
            {actionName} <Action />
          </span>
        </span>
      </button>
      {showModal && (
        <ModalCard {...props} modal={modal} setShowModal={setShowModal} />
      )}
    </>
  );
}
