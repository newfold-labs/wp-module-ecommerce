import { useEffect, useState } from "@wordpress/element";
import { ReactComponent as CompletedTask } from "../icons/task-completed-solid.svg";
import ModalCard from "./ModalCard";

export function MinimalCard(props) {
  const [showModal, setShowModal] = useState(null);
  let modal = props.modal();
  let { image: Icon } = props.assets(props.state);
  const taskCompleted = props.state.taskCompleted;
  useEffect(() => {
    if (taskCompleted && showModal) {
      setShowModal(false);
    }
  }, [taskCompleted, showModal]);
  let { title, actionName } = props.text(taskCompleted);
  const buttonClickHandler = () => {
    const data = {
      taskCompleted: taskCompleted,
    };
    props.actions.buttonClick(data, setShowModal);
  };

  return (
    <>
      <button
        className={`nfd-ecommerce-card
         ${taskCompleted ? "nfd-ecommerce-taskCompleted" : ""} 
        `}
        data-variant="minimal"
        type="button"
        onClick={buttonClickHandler}
        disabled={props.state.isDisabled}
      >
        {taskCompleted && (
          <div className="nfd-ecommerce-taskCompleted-image">
            <CompletedTask />
          </div>
        )}
        {Icon && (
          <div className="nfd-ecommerce-card-image">
            <Icon />
          </div>
        )}
        <span className="nfd-ecommerce-card-title">
          {title}
          {actionName ? (
            <span className="nfd-ecommerce-card-link">{actionName}</span>
          ) : null}
        </span>
      </button>
      {showModal && (
        <ModalCard {...props} modal={modal} setShowModal={setShowModal} />
      )}
    </>
  );
}
