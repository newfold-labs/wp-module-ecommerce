import { __ } from "@wordpress/i18n";
import { ReactComponent as LaunchStoreIllustration } from "../icons/launch-store.svg";
import { ReactComponent as StoreOnlineIllustration } from "../icons/store-online.svg";
import { DashboardContent } from "./DashboardContent";
export function LaunchStore(props) {
  let { toggleComingSoon } = props.actions;
  let { Modal, useState } = props.wpModules;
  let [showModal, setModal] = useState(true);
  return (
    <DashboardContent
      title={__("Launch Your Store!", "wp-module-ecommerce")}
      subtitle={__(
        "Once you're ready, click the button below to set your store live to the world!",
        "wp-module-ecommerce"
      )}
    >
      <div
        style={{ display: "grid", placeItems: "center", paddingBottom: "32px" }}
      >
        <LaunchStoreIllustration />
        <button
          className="nfd-ecommerce-button"
          onClick={() => {
            toggleComingSoon().then(() => {
              setModal(true);
            });
          }}
        >
          {__("Launch your store", "wp-module-ecommerce")}
        </button>
      </div>
      {showModal ? (
        <Modal
          className="nfd-ecommerce-atoms nfd-ecommerce-modal"
          actionsComponent={
            <button onClick={() => setModal(false)}>
              {__("Continue", "wp-module-ecommerce")}
            </button>
          }
          onRequestClose={() => setModal(false)}
        >
          <StoreOnlineIllustration className="nfd-ecommerce-hero" />
          <h1>
            {__(
              "Your store is online and ready for business!",
              "wp-module-ecommerce"
            )}
          </h1>
          <span>
            {__(
              "Not ready? You can re-enable the 'Coming Soon' mode if you need.",
              "wp-module-ecommerce"
            )}
          </span>
        </Modal>
      ) : null}
    </DashboardContent>
  );
}
