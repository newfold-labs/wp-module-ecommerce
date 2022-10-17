import { useState } from "@wordpress/element";
import { ReactComponent as Arrow } from "../icons/goto-arrow.svg";
import { ReactComponent as CompletedTask } from "../icons/task-completed-solid.svg";
import ModalCard from "./ModalCard";

export function StandardCard(props) {
  const [showModal, setShowModal] = useState(null);
  let modal = props.modal();
  let { image: Icon } = props.assets(props.state);
  const taskCompleted = props.state.taskCompleted;
  let { title, actionName } = props.text(taskCompleted);
  let Action = props.isLoading
    ? Arrow
    : () => <div className="bwa-loader nfd-ecommerce-loader-mini" />;

  const buttonClickHandler = () => {
    const data = {
      taskCompleted,
    };
    props.actions.buttonClick(data, setShowModal);
  };

  return (
    <>
      <button
        className={`nfd-ecommerce-card ${
          taskCompleted ? "nfd-ecommerce-taskCompleted" : ""
        }`}
        data-variant="standard"
        type="button"
        onClick={buttonClickHandler}
      >
        {taskCompleted && (
          <div className="nfd-ecommerce-taskCompleted-image">
            <CompletedTask />
          </div>
        )}
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