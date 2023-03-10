import { Tooltip } from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { ReactComponent as CompletedTask } from "../icons/task-completed-solid.svg";
import { ReactComponent as InProgressTask } from "../icons/task-incomplete.svg";
import ModalCard from "./ModalCard";

/**
 * @typedef TaskStatusIndicatorProps
 * @property {"complete" | "inprogress" | "pending"} status
 * @property {string?} message Used for inprogress currently
 *
 * @param {TaskStatusIndicatorProps} props
 */
function TaskStatusIndicator({ status, message }) {
  if (status === "complete") {
    return (
      <div className="task-status-indicator">
        <CompletedTask />
      </div>
    );
  }
  if (status === "inprogress") {
    return (
      <Tooltip text={message}>
        <div className="task-status-indicator">
          <InProgressTask />
        </div>
      </Tooltip>
    );
  }
  return null;
}

export function MinimalCard(props) {
  const [showModal, setShowModal] = useState(null);
  let modal = props.modal(props.state);
  let { image: Icon } = props.assets(props.state);

  // TODO: Deprecate taskCompleted and use taskStatus only
  const { taskCompleted, taskStatus = "pending" } = props.state;
  useEffect(() => {
    if ((taskCompleted || taskStatus === "complete") && showModal) {
      setShowModal(false);
    }
  }, [taskCompleted, taskStatus, showModal]);

  // TODO: We should pass complete state here.
  let {
    title,
    actionName,
    inProgressMessage = "",
  } = props.text(taskCompleted, taskStatus);
  const buttonClickHandler = () => {
    props.actions.buttonClick(props.state, setShowModal);
  };
  return (
    <>
      <button
        className={`nfd-ecommerce-card task-status-needed`}
        data-variant="minimal"
        type="button"
        onClick={buttonClickHandler}
        disabled={props.state.isDisabled}
      >
        <TaskStatusIndicator
          status={taskCompleted ? "complete" : taskStatus}
          message={inProgressMessage}
        />
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
