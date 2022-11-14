import { __ } from "@wordpress/i18n";

export function ExtendedCard(props) {
  let { image: Icon } = props.assets(props.state);
  const actionCompleted = props.state.actionCompleted;
  const actionInProgress = props.state.actionInProgress;
  const isActionQueueEmpty = props.state.isQueueEmpty;

  let { title, description, actionName } = props.text(actionCompleted);

  const buttonClickHandler = () => {
    props.actions.buttonClick(actionCompleted, props.onRefresh);
  };

  return (
    <button
      className="nfd-ecommerce-card"
      data-variant="extended"
      type="button"
      data-completed="false"
    >
      <div className="nfd-ecommerce-card-image">
        <div className="nfd-ecommerce-card-circle">
          <Icon />
        </div>
      </div>
      <span className="nfd-ecommerce-card-title">
        {title}
        <div className="nfd-ecommerce-card-subtitle">{description}</div>
      </span>

      <div className="nfd-ecommerce-card-action">
        {actionCompleted || isActionQueueEmpty ? (
          <button onClick={buttonClickHandler}>{actionName}</button>
        ) : (
          <>
            {actionInProgress ? (
              <div data-inqueue={true}>
                {__(" installing...", "wp-module-ecommerce")}
                <div className="bwa-loader nfd-ecommerce-loader-mini grey-loader" />
              </div>
            ) : (
              <div data-inqueue={false}>
                {__(
                  "Please wait while other features are being installed",
                  "wp-module-ecommerce"
                )}
              </div>
            )}
          </>
        )}
      </div>
    </button>
  );
}
